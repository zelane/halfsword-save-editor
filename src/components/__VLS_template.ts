import { WEAPONS } from '../constants';
import { __VLS_internalComponent, __VLS_componentsOption, __VLS_name, ui, changeWeapon, getArmorInSlot } from './HelloWorld.vue';

function __VLS_template() {
  let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
  /* Components */
  let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
  let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & (new () => { $slots: typeof __VLS_slots; })>;
  let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
  let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
  /* Style Scoped */
  type __VLS_StyleScopedClasses = {};
  let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
  /* CSS variable injection */
  /* CSS variable injection end */
  let __VLS_resolvedLocalAndGlobalComponents!: {};
  __VLS_intrinsicElements.main; __VLS_intrinsicElements.main;
  __VLS_intrinsicElements.article; __VLS_intrinsicElements.article; __VLS_intrinsicElements.article; __VLS_intrinsicElements.article;
  __VLS_intrinsicElements.h3; __VLS_intrinsicElements.h3; __VLS_intrinsicElements.h3; __VLS_intrinsicElements.h3;
  __VLS_intrinsicElements.select; __VLS_intrinsicElements.select; __VLS_intrinsicElements.select; __VLS_intrinsicElements.select;
  __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option; __VLS_intrinsicElements.option;
  __VLS_intrinsicElements.label; __VLS_intrinsicElements.label;
  __VLS_intrinsicElements.button; __VLS_intrinsicElements.button;
  if (__VLS_ctx.ui.settings) {
    {
      const __VLS_0 = __VLS_intrinsicElements["main"];
      const __VLS_1 = __VLS_elementAsFunctionalComponent(__VLS_0);
      const __VLS_2 = __VLS_1({ ...{}, class: ("container"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
      ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_0, typeof __VLS_2> & Record<string, unknown>) => void)({ ...{}, class: ("container"), });
      const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
      let __VLS_4!: __VLS_NormalizeEmits<typeof __VLS_3.emit>;
      {
        const __VLS_5 = __VLS_intrinsicElements["article"];
        const __VLS_6 = __VLS_elementAsFunctionalComponent(__VLS_5);
        const __VLS_7 = __VLS_6({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_5, typeof __VLS_7> & Record<string, unknown>) => void)({ ...{}, });
        const __VLS_8 = __VLS_pickFunctionalComponentCtx(__VLS_5, __VLS_7)!;
        let __VLS_9!: __VLS_NormalizeEmits<typeof __VLS_8.emit>;
        for (const [[slot, current]] of __VLS_getVForSourceType((Object.entries(__VLS_ctx.ui.settings.weapons))!)) {
          {
            const __VLS_10 = __VLS_intrinsicElements["h3"];
            const __VLS_11 = __VLS_elementAsFunctionalComponent(__VLS_10);
            const __VLS_12 = __VLS_11({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_11));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_10, typeof __VLS_12> & Record<string, unknown>) => void)({ ...{}, });
            const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_10, __VLS_12)!;
            let __VLS_14!: __VLS_NormalizeEmits<typeof __VLS_13.emit>;
            (slot);
            (__VLS_13.slots!).default;
          }
          {
            const __VLS_15 = __VLS_intrinsicElements["select"];
            const __VLS_16 = __VLS_elementAsFunctionalComponent(__VLS_15);
            const __VLS_17 = __VLS_16({ ...{ onChange: {} as any, }, }, ...__VLS_functionalComponentArgsRest(__VLS_16));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_15, typeof __VLS_17> & Record<string, unknown>) => void)({ ...{ onChange: {} as any, }, });
            const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_15, __VLS_17)!;
            let __VLS_19!: __VLS_NormalizeEmits<typeof __VLS_18.emit>;
            let __VLS_20 = { 'change': __VLS_pickEvent(__VLS_19['change'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_16, typeof __VLS_17>).onChange) };
            __VLS_20 = { change: ((e) => __VLS_ctx.changeWeapon(slot, (e.currentTarget as HTMLInputElement)?.value)) };
            {
              const __VLS_21 = __VLS_intrinsicElements["option"];
              const __VLS_22 = __VLS_elementAsFunctionalComponent(__VLS_21);
              const __VLS_23 = __VLS_22({ ...{}, value: ((null)), }, ...__VLS_functionalComponentArgsRest(__VLS_22));
              ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_21, typeof __VLS_23> & Record<string, unknown>) => void)({ ...{}, value: ((null)), });
              const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_21, __VLS_23)!;
              let __VLS_25!: __VLS_NormalizeEmits<typeof __VLS_24.emit>;
            }
            for (const [[weapon, path]] of __VLS_getVForSourceType((Object.entries(__VLS_ctx.WEAPONS))!)) {
              {
                const __VLS_26 = __VLS_intrinsicElements["option"];
                const __VLS_27 = __VLS_elementAsFunctionalComponent(__VLS_26);
                const __VLS_28 = __VLS_27({ ...{}, selected: ((path == current)), value: ((path)), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
                ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_26, typeof __VLS_28> & Record<string, unknown>) => void)({ ...{}, selected: ((path == current)), value: ((path)), });
                const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28)!;
                let __VLS_30!: __VLS_NormalizeEmits<typeof __VLS_29.emit>;
                (weapon);
                (__VLS_29.slots!).default;
              }
              // @ts-ignore
              [ui, ui, changeWeapon, WEAPONS,];
            }
            (__VLS_18.slots!).default;
          }
        }
        (__VLS_8.slots!).default;
      }
      {
        const __VLS_31 = __VLS_intrinsicElements["article"];
        const __VLS_32 = __VLS_elementAsFunctionalComponent(__VLS_31);
        const __VLS_33 = __VLS_32({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_31, typeof __VLS_33> & Record<string, unknown>) => void)({ ...{}, });
        const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33)!;
        let __VLS_35!: __VLS_NormalizeEmits<typeof __VLS_34.emit>;
        {
          const __VLS_36 = __VLS_intrinsicElements["h3"];
          const __VLS_37 = __VLS_elementAsFunctionalComponent(__VLS_36);
          const __VLS_38 = __VLS_37({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
          ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_36, typeof __VLS_38> & Record<string, unknown>) => void)({ ...{}, });
          const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38)!;
          let __VLS_40!: __VLS_NormalizeEmits<typeof __VLS_39.emit>;
          (__VLS_39.slots!).default;
        }
        for (const [[slot, value]] of __VLS_getVForSourceType((Object.entries(__VLS_ctx.ui.settings.armor))!)) {
          {
            const __VLS_41 = __VLS_intrinsicElements["label"];
            const __VLS_42 = __VLS_elementAsFunctionalComponent(__VLS_41);
            const __VLS_43 = __VLS_42({ ...{}, }, ...__VLS_functionalComponentArgsRest(__VLS_42));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_41, typeof __VLS_43> & Record<string, unknown>) => void)({ ...{}, });
            const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_41, __VLS_43)!;
            let __VLS_45!: __VLS_NormalizeEmits<typeof __VLS_44.emit>;
            (__VLS_ctx.ARMOR_SLOT_NAMES[slot]);
            (__VLS_44.slots!).default;
          }
          {
            const __VLS_46 = __VLS_intrinsicElements["select"];
            const __VLS_47 = __VLS_elementAsFunctionalComponent(__VLS_46);
            const __VLS_48 = __VLS_47({ ...{}, value: ((__VLS_ctx.ui.settings.armor[value])), }, ...__VLS_functionalComponentArgsRest(__VLS_47));
            ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_46, typeof __VLS_48> & Record<string, unknown>) => void)({ ...{}, value: ((__VLS_ctx.ui.settings.armor[value])), });
            const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_46, __VLS_48)!;
            let __VLS_50!: __VLS_NormalizeEmits<typeof __VLS_49.emit>;
            {
              const __VLS_51 = __VLS_intrinsicElements["option"];
              const __VLS_52 = __VLS_elementAsFunctionalComponent(__VLS_51);
              const __VLS_53 = __VLS_52({ ...{}, value: ((null)), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
              ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_51, typeof __VLS_53> & Record<string, unknown>) => void)({ ...{}, value: ((null)), });
              const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53)!;
              let __VLS_55!: __VLS_NormalizeEmits<typeof __VLS_54.emit>;
            }
            for (const [option] of __VLS_getVForSourceType((slot.options)!)) {
              {
                const __VLS_56 = __VLS_intrinsicElements["option"];
                const __VLS_57 = __VLS_elementAsFunctionalComponent(__VLS_56);
                const __VLS_58 = __VLS_57({ ...{}, key: ((option)), value: ((option)), selected: ((__VLS_ctx.getArmorInSlot(slot.enum) == option)), }, ...__VLS_functionalComponentArgsRest(__VLS_57));
                ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_56, typeof __VLS_58> & Record<string, unknown>) => void)({ ...{}, key: ((option)), value: ((option)), selected: ((__VLS_ctx.getArmorInSlot(slot.enum) == option)), });
                const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_56, __VLS_58)!;
                let __VLS_60!: __VLS_NormalizeEmits<typeof __VLS_59.emit>;
                (option);
                (__VLS_59.slots!).default;
              }
              // @ts-ignore
              [ui, ARMOR_SLOT_NAMES, ui, ui, getArmorInSlot, getArmorInSlot,];
            }
            (__VLS_49.slots!).default;
          }
        }
        (__VLS_34.slots!).default;
      }
      {
        const __VLS_61 = __VLS_intrinsicElements["button"];
        const __VLS_62 = __VLS_elementAsFunctionalComponent(__VLS_61);
        const __VLS_63 = __VLS_62({ ...{ onClick: {} as any, }, }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        ({} as (props: __VLS_FunctionalComponentProps<typeof __VLS_61, typeof __VLS_63> & Record<string, unknown>) => void)({ ...{ onClick: {} as any, }, });
        const __VLS_64 = __VLS_pickFunctionalComponentCtx(__VLS_61, __VLS_63)!;
        let __VLS_65!: __VLS_NormalizeEmits<typeof __VLS_64.emit>;
        let __VLS_66 = { 'click': __VLS_pickEvent(__VLS_65['click'], ({} as __VLS_FunctionalComponentProps<typeof __VLS_62, typeof __VLS_63>).onClick) };
        __VLS_66 = {
          click: $event => {
            if (!((__VLS_ctx.ui.settings))) return;
            __VLS_ctx.ui.gvas.write;
            // @ts-ignore
            [ui,];
          }
        };
        (__VLS_64.slots!).default;
      }
      (__VLS_3.slots!).default;
    }
  }
  if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    __VLS_styleScopedClasses["container"];
  }
  var __VLS_slots!: {};
  return __VLS_slots;
}
