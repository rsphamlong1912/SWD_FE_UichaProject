import config from '~/config';
import Billing from '~/pages/Billing/Billing';
import Categories from '~/pages/Categories/Categories';
import Customers from '~/pages/Customers/Customers';
import Dashboard from '~/pages/Dashboard/Dashboard';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// Public routes
const publicRoutes = [
  { path: config.routes.signin, component: SignIn },
  { path: config.routes.signup, component: SignUp },
  // { path: config.routes.home, component: Dashboard },
];

const privateRoutes = [
  // Private routes
  { path: config.routes.dashboard, component: Dashboard },
  { path: config.routes.customers, component: Customers },
  { path: config.routes.billing, component: Billing },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.categories, component: Categories },
];

export { publicRoutes, privateRoutes };
