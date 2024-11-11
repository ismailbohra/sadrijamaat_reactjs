import * as ApplyRazaLazyLoad from "../utils/Lazyload/ApplyRazaLD";

const applyRazaRoutes = [
  {
    path: "",
    component: ApplyRazaLazyLoad.RazaHome,
  },
  {
    path: "edit/:id",
    component: ApplyRazaLazyLoad.RazaEdit,
  },
  {
    path: "apply",
    component: ApplyRazaLazyLoad.RazaApply,
  },
  {
    path: "view/:id",
    component: ApplyRazaLazyLoad.RazaView,
  },
];
export default applyRazaRoutes;
