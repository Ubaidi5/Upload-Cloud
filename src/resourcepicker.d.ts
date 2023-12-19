interface ResourcePickerInterface {
  open: boolean;
  type: "products" | "collections" | "variants";
  onOk?: (selection: any, variants: any) => void;
  closeModal?: () => void;
  initialSelections?: Array<ProductInterface>;
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
