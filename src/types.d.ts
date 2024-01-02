interface Store {
  _id: string;
  siteUrl: string;
  createdAt: string;
  updatedAt: string;
  instanceId: string;
  refreshToken: string;
}

interface Instance {
  instanceId: string;
  appName: string;
  appVersion: string;
  isFree: boolean;
  permissions: Array<{ packageName: string; source: string }>;
  availablePlans: Array<any>;
  billing?: {
    autoRenewing: boolean;
    billingCycle: string;
    expirationDate: string;
    invoiceId: string;
    packageName: string;
    timeStamp: string;
  };
  originInstanceId: string;
  isOriginSiteTemplate: boolean;
  copiedFromTemplate: boolean;
}
interface Site {
  siteDisplayName: string;
  locale: string;
  paymentCurrency: string;
  multilingual: {
    isMultiLingual: boolean;
    supportedLanguages: Array<any>;
  };
  url: string;
  installedWixApps: Array<string>;
  siteId: string;
}

interface Field {
  fieldName: string;
  isRequired: boolean;
  targeting: string;
  labelText: string;
  buttonText: string;
  helpText: string;
  labelSize: string;
  labelColor: string;
  buttonTextSize: string;
  buttonTextColor: string;
  helpTextSize: string;
  helpTextColor: string;
  paddingX: string;
  paddingY: string;
  buttonBackgroundColor: string;
  buttonHoverColor: string;
  buttonRadius: string;
  buttonWidth: string;
  showPreview: boolean;
  numberOfFiles: string;
  min: string;
  max: string;
  dimension: string;
  imageWidth: string;
  imageHeight: string;
  previewStyle: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  enabled: boolean;
  instanceId: string;
  selectedItems: string;
}

interface Order {
  _id: string;
  orderId: string;
  orderNumber: number;
  data: string;
  lineItems: string;
  buyerInfo: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  instanceId: string;
}

type option_type = { title: string; value: string };

interface product_options_type {
  name: string;
  images: string[];
  selected_variants: Array<option_type>;
}

interface BuyerInfo {
  id: string;
  type: string;
  identityType: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface LineItem {
  index: number;
  quantity: number;
  price: string;
  name: string;
  translatedName: string;
  productId: string;
  totalPrice: string;
  lineItemType: string;
  options: Array<{ option: string; selection: string }>;
  customTextFields: Array<{ title: string; value: string }>;
  mediaItem: {
    mediaType: string;
    url: string;
    width: number;
    height: number;
    mediaId: string;
    id: string;
  };
  sku: string;
  variantId: string;
  tax: string;
  taxIncludedInPrice: boolean;
  priceData: {
    taxIncludedInPrice: boolean;
    price: string;
    totalPrice: string;
  };
}
