// import config from "~/config";
// import Billing from "~/pages/Billing";
// import Customers from "~/pages/Customers";
// import Dashboard from "~/pages/Dashboard";
// import Profile from "~/pages/Profile";
// import SignIn from "~/pages/SignIn";

import config from "../config";
import Billing from "../pages/Billing";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";

const publicRoutes = [
    { path: config.routes.signin, component: SignIn},
    { path: config.routes.dashboard, component: Dashboard},
    { path: config.routes.customers, component: Customers},
    { path: config.routes.billing, component: Billing},
    { path: config.routes.profile, component: Profile},
];


const privateRoutes = [];

export { publicRoutes, privateRoutes };
