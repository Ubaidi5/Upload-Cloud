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
  contactId: string;
  visitorId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface LineItem {
  id: string;
  productName: {
    original: string;
    translated: string;
  };
  catalogReference: {
    catalogItemId: string;
    appId: string;
    options: {
      options: { [key: string]: string };
      customTextFields: { [key: string]: string };
      variantId: string;
    };
  };
  quantity: number;
  totalDiscount: { amount: string; formattedAmount: string };
  descriptionLines: Array<{
    name: { original: string; translated: string };
    colorInfo: { original: string; translated: string; code: string };
    plainText: { original: string; translated: string };
    plainTextValue: { original: string; translated: string };
    lineType: "COLOR" | "PLAIN_TEXT";
    color: string;
  }>;
  image: { id: string; url: string; height: number; width: number };
  physicalProperties: { sku: string; shippable: boolean };
  itemType: { preset: "PHYSICAL" };
  price: { amount: string; formattedAmount: string };
  priceBeforeDiscounts: { amount: string; formattedAmount: string };
  totalPriceBeforeTax: { amount: string; formattedAmount: string };
  totalPriceAfterTax: { amount: string; formattedAmount: string };
  paymentOption: "FULL_PAYMENT_ONLINE";
  taxDetails: {
    taxableAmount: { amount: string; formattedAmount: string };
    taxRate: string;
    totalTax: { amount: string; formattedAmount: string };
  };
  locations: Array<any>;
  lineItemPrice: { amount: string; formattedAmount: string };
  customLineItem: boolean;
}
