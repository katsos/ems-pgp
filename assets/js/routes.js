import Dashboard from './components/Dashboard';
import { Router as CirclesRouter } from './components/pages/circles';
import PaymentsRouter from './components/pages/payments';
import { StudentsRouter } from './components/pages/students';

const ROUTES = [
  {
    name: 'home',
    label: 'ΑΡΧΙΚΗ',
    url: '/',
    component: Dashboard,
    isDefault: true,
  }, {
    name: 'circles',
    label: 'ΚΥΚΛΟΙ',
    url: '/circles',
    component: CirclesRouter,
  }, {
    name: 'students',
    label: 'ΦΟΙΤΗΤΕΣ',
    url: '/students',
    component: StudentsRouter,
  }, {
    name: 'payments',
    label: 'ΠΛΗΡΩΜΕΣ ΦΟΙΤΗΤΩΝ',
    url: '/payments',
    component: PaymentsRouter,
  },
];

export default ROUTES;
