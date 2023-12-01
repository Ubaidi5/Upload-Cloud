"use client";
import React, { createContext, useState, useContext } from "react";

type AppData = {
  store: Partial<Store>;
  instance: Partial<Instance>;
  site: Partial<Site>;
};

const initialState: AppData = {
  store: {},
  instance: {},
  site: {},
};

type T = [AppData, React.Dispatch<React.SetStateAction<AppData>>];

const StoreContext = createContext<T>([initialState, () => {}]);

type Props = { children: JSX.Element };

const AppProvider = (props: Props) => {
  const [appData, setAppData] = useState({ ...initialState });

  return (
    <StoreContext.Provider value={[appData, setAppData]}>{props.children}</StoreContext.Provider>
  );
};

export default AppProvider; // Use to wrap as Provider

export const useAppData = (app_data?: AppData): T => {
  const [state, setState] = useContext(StoreContext);

  if (app_data) {
    setState(app_data);
  }

  return [state, setState];
};
