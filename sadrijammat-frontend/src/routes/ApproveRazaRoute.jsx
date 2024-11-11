import * as ApproveRazaLD from "../utils/Lazyload/ApproveRazaLD";

const approveRazaRoute = [
  {
    path: "",
    component: ApproveRazaLD.RazaHome,
  },
  {
    path: "view/:id",
    component: ApproveRazaLD.RazaView,
  },
  {
    path: "approve/:id",
    component: ApproveRazaLD.RazaApprove,
  },
];
export default approveRazaRoute;
