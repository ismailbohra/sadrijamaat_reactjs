import * as ManageRazaLd from "../utils/Lazyload/ManageRazaLD";

export const MANAGE_RAZA = [
  {
    path: "",
    component: ManageRazaLd.ManageRazaScreen,
  },
  {
    path: "add-field/:razaid",
    component: ManageRazaLd.AddFieldScreen,
  },
  {
    path: "edit-field/:razaid/:fieldId",
    component: ManageRazaLd.EditFieldScreen,
  },
  {
    path: "add-approver/:razaid",
    component: ManageRazaLd.AddApproverScreen,
  },
  {
    path: "add-option/:razaid/:field_id",
    component: ManageRazaLd.AddOptionScreen,
  },
  {
    path: "CreateNewRazaType",
    component: ManageRazaLd.CreateNewRazaTypeScreen,
  },
  {
    path: "manage-approver/:razaid",
    component: ManageRazaLd.ManageApproverScreen,
  },
  {
    path: "ModifyRazaType/:razaid",
    component: ManageRazaLd.ModifyRazaTypeScreen,
  },
];
