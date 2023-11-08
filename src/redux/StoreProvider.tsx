"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import React from "react";
import { store } from "@/redux/store";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
