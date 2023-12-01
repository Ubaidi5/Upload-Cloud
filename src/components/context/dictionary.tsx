"use client";
import React, { createContext, useState, useContext } from "react";

const english = {
  increase_your_brand_awareness: "Increase your brand awareness with floating icons",
  current_plan: "Current Plan",
  trial_days_left: "Trial days left",
  preview: "Preview",
  premium: "Premium",
  upgrade: "Upgrade",
  plan: "plan",
  setup_service: "Setup service",
  need_any_help: "Need any help, feel free to contact support",
  button: {
    create: "Create",
  },
  your_trial_has_expired: "Your trial has expired",
  upgrade_your_plan_to_continue: "Upgrade your plan to continue",
  create_exciting_icons_for_your_website: "Create exciting icons for your website",
  please_upgrade_your_plan_to_create_more_fields: "Please upgrade your plan to create more fields",
  trial_expired_please_upgrade: "Trial expired - please upgrade!",
  please_choose_a_paid_plan: "Please choose a paid plan.",
  back: "Back",
  please_select_your_paid_plan: "Please select your paid plan",
  choose_a_plan_that_suits_you: "Choose a plan that suits you and your business.",
  monthly: "Monthly",
  yearly: "Yearly",
  baisc_plan_name: "BASIC PLAN",
  premium_plan_name: "PREMIUM PLAN",
  one_icon_field: "Single field",
  multiple_icon_fields: "Multiple icon fields",
  unlimited_icons: "Unlimited Icons",
  custom_icons: "Custom icons",
  "24/7_support": "24/7 Support",
  oops: "Oops",
  there_is_some_error_with_the_installation: "There is some error with the installation",
  please_reinstall_the_app_by_using_the_link: "Please reinstall the app by using the link below",
  install_app: "Install App",
  create_awesome_icons: "Create Awesome Icons",
  publish: "Publish",
  select_from_template: "Select from template",
  select_social_channel: "Select Social Channel",
  design: "Design",
  alignment: "Alignment",
  icon_color: "Icon color",
  icon_size: "Icon size",
  space_between_icons: "Space between icons",
  horizontal: "Horizontal",
  vertical: "Vertical",
  clear: "Clear",
  container: "Container",
  advance_options: "Advance options",
  select_icon_position: "Set Icons position",
  show_on_desktop: "Show on desktop",
  show_on_mobile: "Show on mobile",
  select_templete: "Select template",
  most_popular: "Most popular",
  select_icon: "Select icon",
  add: "Add",
  close: "Close",
  edit: "Edit",
  delete: "Delete",
  click_on_templete_to_select_it: "Click on template to select it",
};

declare global {
  type Dictionary = typeof english;
}

type T = [Dictionary, React.Dispatch<React.SetStateAction<Dictionary>>];

const DictionaryContext = createContext<T>([english, () => {}]);

type Props = { children: JSX.Element };

const DictionaryProvider: React.FC<Props> = (props) => {
  const [dictionaryData, setDictionaryData] = useState({ ...english });

  return (
    <DictionaryContext.Provider value={[dictionaryData, setDictionaryData]}>
      {props.children}
    </DictionaryContext.Provider>
  );
};

export default DictionaryProvider; // Use to wrap as Provider

/**
 * Custom hook to access dictionary
 */
export const useDictionary = (dicionary_data?: Dictionary): Dictionary => {
  const [state, setState] = useContext(DictionaryContext);

  if (dicionary_data) {
    setState(dicionary_data);
  }

  return state;
};
