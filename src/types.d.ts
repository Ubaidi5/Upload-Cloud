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

type field_placement =
  | "top_left"
  | "top_center"
  | "top_right"
  | "left_center"
  | "right_center"
  | "bottom_left"
  | "bottom_center"
  | "bottom_right";

interface Field {
  _id: string;
  placement: field_placement;
  alignment: "horizontal" | "vertical";
  color: string;
  size: number;
  gap: number;
  backgroundColor: string;
  offsetX: number;
  offsetY: number;
  paddingX: number;
  paddingY: number;
  borderColor: string;
  borderRadius: number;
  shadow: string;
  showOnDesktop: true;
  showOnMobile: true;
  icons: string | { label: string; url: string; type: "default"; link: string }[];
  instanceId: string;
  createdAt: string;
  status: string;
}
