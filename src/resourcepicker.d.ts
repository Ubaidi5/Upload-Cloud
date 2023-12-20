interface ResourcePickerInterface {
  open: boolean;
  type: "products" | "collections" | "variants";
  onSelection?: (selection: Array<any>, variants: any) => void;
  onCancel: () => void;
  initialSelections?: Array<Omit<ProductInterface, "media" | "productOptions">>;
  selectedVariants?: Array<any>;
}

/**
 * Resource Picker Interfaces
 */
interface ProductInterface {
  id: string;
  name: string;
  media: any;
  productOptions: VariantInterface[];
  isSelected?: boolean; // Variable to track if the item is selected
}

interface VariantInterface {
  name: string;
  choices: ChoicesInterface[];
  optionType: string;
}

interface ChoicesInterface {
  value: string;
  description: string;
  inStock: boolean;
  visible: boolean;
  isSelected?: boolean; // Variable to track if the item is selected
}

interface InitialSelectionInterface {
  id: string;
  variants?: { id: string }[];
}
