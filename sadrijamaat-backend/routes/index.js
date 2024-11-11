const express = require("express");
const router = express.Router();
const userRoute = require("./userRoutes");
const docsRoute = require('./docs.route');
const razaRoute = require('./razaRoute');
const roleRoute = require('./role');
const NotificationRoute = require('./NotificationRoute');
const FmbRoute = require('./fmbRoutes');
const bulkUploadRoute = require('./bulkUploadRoute');

const Routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/raza",
    route: razaRoute,
  },
  {
    path: "/roles",
    route: roleRoute,
  },
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/notifications',
    route: NotificationRoute,
  },
  {
    path: '/fmb',
    route: FmbRoute,
  },
  {
    path: '/bulkUpload',
    route: bulkUploadRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
