import * as ManageRoleLD from "../utils/Lazyload/ManageRoleLD";

export const MANAGE_ROLE = [
  {
    path: "",
    component: ManageRoleLD.ManageRoleScreen,
  },
  {
    path: "new-role",
    component: ManageRoleLD.AddNewRole,
  },
  {
    path: "modify-route",
    component: ManageRoleLD.ModifyRoleRoute,
  },
];
