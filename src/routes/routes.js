import config from '~/config';
import Billing from '~/pages/Billing';
import Customers from '~/pages/Customers';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';

// Public routes
const publicRoutes = [
  { path: config.routes.signin, component: SignIn },
  // { path: config.routes.home, component: Dashboard },
];

const privateRoutes = [
  // Private routes
  { path: config.routes.dashboard, component: Dashboard },
  { path: config.routes.customers, component: Customers },
  { path: config.routes.billing, component: Billing },
  { path: config.routes.profile, component: Profile },
];

export { publicRoutes, privateRoutes };
