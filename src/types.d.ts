interface Store {
  _id: string;
  siteUrl: string;
  installedAt: string;
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

interface Window {
  Wix: {
    Utils: {
      getInstanceId: () => string;
      getViewMode: () => "dashboard" | "standalone" | "editor";
    };
  };
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
  __v: 0;
}
