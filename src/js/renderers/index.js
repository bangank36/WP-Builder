import TextControl, { textControlTester } from "./Primitive/TextControl";
import IntegerControl, { integerControlTester } from "./Primitive/IntegerControl";
import TextTranformControl, { textTransformControlTester } from "./Primitive/TextTransformControl";
import DatepickerControl, { datepickerControlTester } from "./Primitive/DatepickerControl";
import MultilineTextControl, { multilineTextControlTester } from "./Primitive/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "./Primitive/ColorPaletteControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "./Primitive/BooleanCheckboxControl";
import BooleanToggleControl, { booleanToggleControlTester } from "./Primitive/BooleanToggleControl";
import GutenbergToggleGroupControl, { gutenbergToggleGroupTester } from "./Primitive/ToggleGroupControl";
import GutenbergToggleGroupOneOfControl, { gutenbergToggleGroupOneOfTester } from "./Primitive/ToggleGroupOneOfControl";
import GutenbergComboboxControl, { gutenbergComboboxTester } from "./Primitive/ComboboxControl";
import GutenbergComboboxOneOfControl, { gutenbergComboboxOneOfTester } from "./Primitive/ComboboxOneOfControl";
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "./ObjectRenderer";
import GutenbergArrayRenderer, { gutenbergArrayControlTester } from "./ArrayControlRenderer";
import GutenbergEnumArrayRenderer, { gutenbergEnumArrayRendererTester } from "./MultiEnumArrayControl";
import PortedArrayRenderer, { portedArrayControlTester } from "./PortedArrayRenderer";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "./NavigatorLayout";
import GutenbergVerticalLayoutRenderer, { gutenbergVerticalLayoutTester } from "./layouts/GutenbergVerticalLayout";
import GutenbergHorizontalLayoutRenderer, { gutenbergHorizontalLayoutTester } from "./layouts/GutenbergHorizontalLayout";
import GutenbergGroupLayoutRenderer, { gutenbergGroupLayoutTester } from "./layouts/GutenbergGroupLayout";

export const gutenbergRenderers = [
    { tester: textControlTester, renderer: TextControl },
    { tester: integerControlTester, renderer: IntegerControl },
    { tester: textTransformControlTester, renderer: TextTranformControl },
    { tester: datepickerControlTester, renderer: DatepickerControl },
    { tester: multilineTextControlTester, renderer: MultilineTextControl },
    { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
    { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl },
    { tester: booleanToggleControlTester, renderer: BooleanToggleControl },
    { tester: gutenbergToggleGroupTester, renderer: GutenbergToggleGroupControl },
    { tester: gutenbergToggleGroupOneOfTester, renderer: GutenbergToggleGroupOneOfControl },
    { tester: gutenbergComboboxTester, renderer: GutenbergComboboxControl },
    { tester: gutenbergComboboxOneOfTester, renderer: GutenbergComboboxOneOfControl },
    { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer },
    { tester: gutenbergArrayControlTester, renderer: GutenbergArrayRenderer },
    { tester: gutenbergEnumArrayRendererTester, renderer: GutenbergEnumArrayRenderer },
    // { tester: portedArrayControlTester, renderer: PortedArrayRenderer },
    { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer },
    { tester: gutenbergVerticalLayoutTester, renderer: GutenbergVerticalLayoutRenderer },
    { tester: gutenbergHorizontalLayoutTester, renderer: GutenbergHorizontalLayoutRenderer },
    { tester: gutenbergGroupLayoutTester, renderer: GutenbergGroupLayoutRenderer },
];