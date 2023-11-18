<script setup lang="ts">
import { reactive } from 'vue'
import { WEAPONS, ARMOR_SLOT_NAMES, ARMOR_SLOTS, ARMOR_NAMES } from '../constants'

interface Property {
  type: string;
  value: any;
}

interface Settings {
  armor: {
    'ArmorSlots_Enum::NewEnumerator0': string | null,
    'ArmorSlots_Enum::NewEnumerator1': string | null,
    'ArmorSlots_Enum::NewEnumerator2': string | null,
    'ArmorSlots_Enum::NewEnumerator3': string | null,
    'ArmorSlots_Enum::NewEnumerator4': string | null,
    'ArmorSlots_Enum::NewEnumerator5': string | null,
    'ArmorSlots_Enum::NewEnumerator6': string | null,
    'ArmorSlots_Enum::NewEnumerator7': string | null,
    'ArmorSlots_Enum::NewEnumerator8': string | null,
    'ArmorSlots_Enum::NewEnumerator9': string | null,
  }
  weapons: {
    'Weapon R': string,
    'Weapon L': string,
    'Weapon Slot Back': string,
    'Weapon Slot R 1': string,
    'Weapon Slot L 1': string
  },
  score: number,
  health: number,
  level: number
}

class NoneProperty implements Property {
  type: string = 'none'
  value: any = null
}

class ObjectProperty implements Property {
  type: string = 'object'
  value: any

  constructor(value: any) {
    this.value = value
  }
}

class NameProperty implements Property {
  type: string = 'name'
  value: any

  constructor(value: any) {
    this.value = value
  }
}

class ArrayProperty implements Property {
  type: string = 'array'
  value: any[] = []
  constructor(value: any[]) {
    this.value = value
  }
}

class DoubleProperty implements Property {
  type: string = 'double'
  value: number
  constructor(value: number) {
    this.value = value
  }
}

class IntProperty implements Property {
  type: string = 'int'
  value: number
  constructor(value: number) {
    this.value = value
  }
}

class MapProperty implements Property {
  type: string = 'map'
  key_type: string
  value_type: string
  flags: number
  value: Map<any, any>

  constructor(key_type: string, value_type: string, flags: number, value: any) {
    this.key_type = key_type
    this.value_type = value_type
    this.flags = flags
    this.value = value
  }
}

class GVAS {
  magic: Uint8Array;
  version: number;
  unknown: Uint8Array;
  engine_version: {
    major: number;
    minor: number;
    patch: number;
    build: number;
    branch: string;
  }
  custom_version: number;
  custom_var_length: number;
  // custom_vars: Map<string, number>;
  custom_vars: Uint8Array;
  filename: string;
  values: Map<string, Property>;

  constructor(reader: FileReader) {
    this.magic = reader.read(4);
    this.version = reader.readNum(4)
    this.unknown = reader.read(8);
    this.engine_version = {
      major: reader.readNum(2),
      minor: reader.readNum(2),
      patch: reader.readNum(2),
      build: reader.readNum(4),
      branch: reader.readString()
    }

    this.custom_version = reader.readNum(4);
    this.custom_var_length = reader.readNum(4);
    this.custom_vars = reader.read(this.custom_var_length * 20);
    // this.custom_vars = new Map();
    // for (let x = 0; x < cvLength; x++) {
    //     const uuid = reader.read(16);
    //     const num_ = reader.readNum(4);
    //     this.custom_vars.set(uuid.toString(), num_);
    // }
    this.filename = reader.readString() // File name
    this.values = new Map();
    while(reader.index < reader.buffer.length) {
      const [key, value] = reader.readEntry()
      this.values.set(key as string, value as Property)
    }
  }
  write() {
    const writer = new Writer()
    console.log(this.values);
    writer.write(this.magic);
    writer.writeInt(this.version, 4);
    writer.write(this.unknown);

    writer.writeInt(this.engine_version.major, 2);
    writer.writeInt(this.engine_version.minor, 2);
    writer.writeInt(this.engine_version.patch, 2);
    writer.writeInt(this.engine_version.build, 4);
    writer.writeProp(this.engine_version.branch);
    writer.writeInt(this.custom_version, 4);
    writer.writeInt(this.custom_var_length, 4);
    writer.write(this.custom_vars);
    writer.writeProp(this.filename);
    for (const [key, value] of this.values.entries()) {
      if(key === 'None') continue;
      writer.writeEntry(key, value);
    }
    writer.writeEntry('None', new NoneProperty())

    const url = URL.createObjectURL(writer.toBlob());
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Save_Crash.sav';
    a.textContent = 'Download file';
    a.click();
    URL.revokeObjectURL(url);
  }
}

class Writer {
  buffers: any[];
  index: number;

  constructor() {
    this.buffers = [];
    this.index = 0;
  }
  toBlob(): Blob {
    return new Blob(this.buffers, { type: 'application/octet-stream' });
  }
  length(): number {
    return this.buffers.reduce((acc, buffer) => acc + buffer.length, 0);
  }
  write(array: Uint8Array) {
    this.buffers.push(array);
  }
  writeString(str: string) {
    this.buffers.push(new TextEncoder().encode(str));
  }
  writeObj(obj: ObjectProperty) {
    const obj_writer = new Writer();
    obj_writer.writeProp(obj.value);
    this.writeInt(obj_writer.length(), 8);
    this.writeSeparator();
    this.buffers = [...this.buffers,...obj_writer.buffers];
  }
  writeSeparator() {
    this.buffers.push(new Uint8Array([0x00]))
  }
  writeInt(num: number, length: number) {
    const numbuff = new ArrayBuffer(length);
    const view = new DataView(numbuff);
    if(length === 2) {
      view.setInt16(0, num, true);
    }
    else if(length === 4) {
      view.setInt32(0, num, true);
    }
    else if(length === 8) {
      view.setBigUint64(0, BigInt(num), true);
    }
    this.buffers.push(new Uint8Array(numbuff));
  }
  writeProp(str: string) {
    const enc = new TextEncoder().encode(str)
    this.writeInt(enc.length + 1, 4); // Plus one to include separator
    this.buffers.push(enc);
    this.writeSeparator();
  }
  writeDouble(num: number) {
    this.writeInt(8, 8);
    this.writeSeparator();
    const numbuff = new ArrayBuffer(8);
    const view = new DataView(numbuff);
    view.setFloat64(0, num, true);
    this.buffers.push(new Uint8Array(numbuff));
  }
  writePInt(num: number) {
    this.writeInt(4, 8);
    this.writeSeparator();
    const numbuff = new ArrayBuffer(4);
    const view = new DataView(numbuff);
    view.setInt32(0, num, true);
    this.buffers.push(new Uint8Array(numbuff));
  }
  writeMap(map: MapProperty) {
    const headerWriter = new Writer();
    const bodyWriter = new Writer();

    headerWriter.writeProp(map.key_type)
    headerWriter.writeProp(map.value_type)
    headerWriter.writeSeparator()
    bodyWriter.writeInt(map.flags, 4)
    bodyWriter.writeInt(map.value.size, 4)
    for (const [key, value] of map.value.entries()) {
      bodyWriter.writeProp(key)
      bodyWriter.writeProp(value)
    }
    this.writeInt(bodyWriter.length(), 8);
    this.buffers = [...this.buffers,...headerWriter.buffers,...bodyWriter.buffers];
  }
  writeEntry(key: string, value: Property) {
    this.writeProp(key);
    if(value instanceof NoneProperty) {
      this.write(new Uint8Array([0x00,0x00,0x00,0x00]));
    }
    else if(value instanceof ObjectProperty) {
      this.writeProp("ObjectProperty");
      this.writeObj(value);
    }
    else if(value instanceof DoubleProperty) {
      this.writeProp("DoubleProperty");
      this.writeDouble(value.value);
    }
    else if(value instanceof IntProperty) {
      this.writeProp("IntProperty");
      this.writePInt(value.value);
    }
    else if(value instanceof MapProperty) {
      this.writeProp("MapProperty");
      this.writeMap(value);
    }
  }
}

class FileReader {
  buffer: Uint8Array;
  index: number;

  constructor(buffer: ArrayBuffer) {
    this.buffer = new Uint8Array(buffer);
    this.index = 0;
  }

  read(n: number){
    if (this.index + n > this.buffer.length) {
      throw new Error('Reading beyond the end of the file.');
    }
    const data = this.buffer.slice(this.index, this.index + n);
    this.index += n;
    return data;
  }
  readAhead(n: number) {
    if (this.index + n > this.buffer.length) {
      throw new Error('Reading beyond the end of the file.');
    }
    const data = this.buffer.slice(this.index, this.index + n);
    return this.arrayBufferToHex(data);
  }
  arrayBufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let hex = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        const byte = bytes[i];
        hex += (byte < 16 ? '0' : '') + byte.toString(16);
    }
    return hex;
  }
  readNum(n: number): number {
    const bytes = this.read(n);
    const dataView = new DataView(bytes.buffer);
    if(bytes.length == 2) {
      return dataView.getUint16(0, true);
    }
    else if(bytes.length == 4) {
      return dataView.getUint32(0, true);
    }
    else if(bytes.length == 8) {
      return Number(dataView.getBigUint64(0, true));
    }
    return 0
  }
  readString(): string {
    const length = this.readNum(4);
    const bytes = this.read(length);
    const textDecoder = new TextDecoder();
    return textDecoder.decode(bytes.slice(0, bytes.length - 1));
  }
  readArray(): ArrayProperty {
    this.readNum(8) // Length;
    const type = this.readString();
    this.read(1);
    const items = this.readNum(4);
    const array = [];
    for (let i = 0; i < items; i++) {
      array.push(this.readType(type, false));
    }
    return new ArrayProperty(array);
  }
  readMap(): MapProperty {
    this.readNum(8); // Length
    const key_type = this.readString(); // Byte prop (type of key) byte props can be ENUMS!
    const value_type = this.readString(); // Type of values
    this.read(1); // Separator
    const flags = this.readNum(4); // Flags
    const mapLength = this.readNum(4); // Length
    const map = new MapProperty(key_type, value_type, flags, new Map());
    for (let x = 0; x < mapLength; x++) {
      const key = this.readString();
      map.value.set(key, this.readString());
    }
    return map;
  }
  readObj(readHeader=true): ObjectProperty {
    if(readHeader) {
      this.readNum(8) // Length;
      this.read(1); // Separator
    }
    return new ObjectProperty(this.readString()); 
  }
  readName(readHeader=true): NameProperty {
    if(readHeader) {
      this.readNum(8) // Length;
      this.read(1); // Separator
    }
    return new NameProperty(this.readString()); 
  }
  readDouble(readHeader=true): DoubleProperty {
    if(readHeader) {
      this.readNum(8) // Length;
      this.read(1); // Separator
    }
    const dataView = new DataView(this.read(8).buffer);
    return new DoubleProperty(dataView.getFloat64(0, true));
  }
  readInt(readHeader=true): IntProperty {
    if(readHeader) {
      this.readNum(8) // Length;
      this.read(1); // Separator
    }
    const dataView = new DataView(this.read(4).buffer);
    return new IntProperty(dataView.getUint32(0, true));
  }
  readEntry() {
      const key = this.readString();
      const type = this.readString();
      if(key === 'None') return [key, new NoneProperty()];
      return [key, this.readType(type, true)];
  }
  readType(type: string, readHeader=true) {
      if (type === 'MapProperty') {
        return this.readMap()
      } else if (type === 'ObjectProperty') {
        return this.readObj(readHeader)
      } else if (type === 'DoubleProperty') {
        return this.readDouble(readHeader)
      } else if (type === 'IntProperty') {
        return this.readInt(readHeader)
      } else if (type === 'ArrayProperty') {
        return this.readArray()
      } else if (type === 'NameProperty') {
        return this.readName(readHeader)
      }
      console.error("Unrecognized property type: ", type);
      throw new Error("Unrecognized property type: " + type);
  }
}

interface UI {
  settings: Settings | {};
}

const ui: UI = reactive({ settings: {}})
let gvas: GVAS;

import base from "../assets/base.sav"

const init = async () => {
  const file = await fetch(base)
  const buffer = await file.arrayBuffer()

  const reader = new FileReader(buffer);

  gvas = new GVAS(reader);
  
  const vals = gvas.values
  console.log(vals)
  if(vals) {
    const armor_map = vals.get('Armor Slots')?.value as Map<string, string>;
    const settings = {
      weapons: {
        'Weapon L': vals.get('Weapon L')?.value,
        'Weapon R': vals.get('Weapon R')?.value,
        'Weapon Slot Back': vals.get('Weapon Slot Back')?.value,
        'Weapon Slot L 1': vals.get('Weapon Slot L 1')?.value,
        'Weapon Slot R 1': vals.get('Weapon Slot R 1')?.value,
      },
      armor: {
        'ArmorSlots_Enum::NewEnumerator0': null,
        'ArmorSlots_Enum::NewEnumerator1': null,
        'ArmorSlots_Enum::NewEnumerator2': null,
        'ArmorSlots_Enum::NewEnumerator3': null,
        'ArmorSlots_Enum::NewEnumerator4': null,
        'ArmorSlots_Enum::NewEnumerator5': null,
        'ArmorSlots_Enum::NewEnumerator6': null,
        'ArmorSlots_Enum::NewEnumerator7': null,
        'ArmorSlots_Enum::NewEnumerator8': null,
        'ArmorSlots_Enum::NewEnumerator9': null,
      },
      body_health: {
        'head': vals.get('Head Health')?.value,
        'body': vals.get('Body Health')?.value,
        'armR': vals.get('Arm_R Health')?.value,
        'armL': vals.get('Arm_L Health')?.value,
        'legR': vals.get('Leg_R Health')?.value,
        'legL': vals.get('Leg_L Health')?.value,
      },
      dismembered: vals.get('Dismembered Array')?.value.map(x => x.value),
      score: vals.get('Score')?.value,
      health: vals.get('Body Health')?.value,
      level: vals.get('Level')?.value,
    } as Settings;
    if(armor_map) {
      for (const [key, value] of armor_map.entries()) {
        settings.armor[key] = value;
      }
    }
    ui.settings = settings;
  }
}

init()

const download = async () => {
  const new_armor = new Map<string, string>();
  for(const [slot, value] of Object.entries(ui.settings.armor)) {
    if(!value) continue;
    new_armor.set(slot, value);
  }
  gvas.values.get('Armor Slots').value = new_armor;
  for(const [slot, value] of Object.entries(ui.settings.weapons)) {
    if(!value) continue;
    gvas.values.set(slot, new ObjectProperty(value))
  }
  gvas.values.set('Score', new IntProperty(ui.settings.score));
  gvas.values.set('Level', new IntProperty(ui.settings.level));
  gvas.values.set('Health', new IntProperty(ui.settings.health));
  gvas.write();
}

</script>

<template>
  <main class="container" v-if="Object.keys(ui.settings).length > 0">
    
    <article>
      <template v-for="slot in Object.keys(ui.settings.weapons)" :key="slot">
        <h3>{{ slot }}</h3>
        
        <select v-model="ui.settings.weapons[slot]">
          <option :value="null"></option>
          <option v-for="[weapon, path] in WEAPONS.entries()" :value="path">
            {{ weapon }}
          </option>
        </select>
      </template>
    </article>

    <article>
      <h3>Armor slots</h3>
      <template v-for="[slot, value] in Object.entries(ui.settings.armor)" :key="slot">
        <label>{{ ARMOR_SLOT_NAMES[slot] }}</label>
        <select v-model="ui.settings.armor[slot]">
          <option :value="null"></option>
          <option v-for="option in ARMOR_SLOTS[slot]" :key="option" :value="option">
            {{ ARMOR_NAMES.get(option) || option }}
          </option>
        </select>

      </template>
    </article>

    <article v-if="ui.settings.dismembered?.length > 0">
      <h3>Dismembered</h3>
      <ul>
        <li v-for="dismembered in ui.settings.dismembered" :key="dismembered">
          {{ dismembered }}
        </li>
      </ul>
    </article>

    <article>
      <h3>Score</h3>
      <input type="number" v-model="ui.settings.score" />
    </article>

    <article>
      <h3>Health</h3>
      <input type="number" v-model="ui.settings.health" />
    </article>

    <article>
      <h3>Level</h3>
      <input type="number" v-model="ui.settings.level" />
    </article>

    <article>
      <label>Copy to</label>
      <code>%USERPROFILE%\AppData\Local\HalfSwordUE5\Saved\SaveGames</code>
      <button @click="download()">Download</button>
    </article>
  </main>
</template>

<style scoped>
main {
  text-align: left;
}
input, select, textarea {
  font-size: .8rem;
}
</style>
