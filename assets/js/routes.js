import Dashboard from './components/Dashboard';
import { Router as CirclesRouter } from './components/pages/circles';
import PaymentsRouter from './components/pages/payments';
import { StudentsRouter } from './components/pages/students';
import ProgramsRouter from './components/pages/programs/ProgramsRouter';

const ROUTES = [
  {
    name: 'home',
    url: '/',
    component: Dashboard,
    isDefault: true,
  }, {
    name: 'Κύκλοι',
    url: '/circles',
    component: CirclesRouter,
  }, {
    name: 'payments',
    url: '/payments',
    component: PaymentsRouter,
  }, {
    name: 'programs',
    url: '/programs',
    component: ProgramsRouter,
  }, {
    name: 'students',
    url: '/students',
    component: StudentsRouter,
  },
];

export default ROUTES;
