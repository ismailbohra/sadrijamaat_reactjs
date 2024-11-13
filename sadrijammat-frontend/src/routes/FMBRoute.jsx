import * as FMB_LD from "../utils/Lazyload/FMB_LD";

export const FMB_MENU = [
  {
    path: "",
    component: FMB_LD.ViewMenu,
  },
];
export const CHECK_THALI = [
  {
    path: "",
    component: FMB_LD.ViewSkippedThaliScreen,
  },
];
export const SKIP_THALI = [
  {
    path: "",
    component: FMB_LD.SkipThaliScreen,
  },
  {
    path: "apply-skip",
    component: FMB_LD.ApplyForSkipThaliScreen,
  },
];
export const CREATE_FMB_MENU = [
  {
    path: "",
    component: FMB_LD.CreateMenuScreen,
  },
  {
    path: "add-menu",
    component: FMB_LD.AddMenuSceen,
  },
];
