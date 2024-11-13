import * as OverallRazaLD from "../utils/Lazyload/OverallRazaLD";

const OverallRazaRoute = [
  {
    path: "",
    component: OverallRazaLD.RazaHome,
  },
  {
    path: "view/:id",
    component: OverallRazaLD.RazaView,
  },
];
export default OverallRazaRoute;
