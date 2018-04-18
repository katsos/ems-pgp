import Dashboard from './components/Dashboard';
import PaymentsRouter from './components/pages/payments';
import StudentsRouter from './components/pages/students/Router';
import ProgramsRouter from './components/pages/programs/ProgramsRouter';

const ROUTES = [
  {
    name: 'home',
    url: '/',
    component: Dashboard,
    isDefault: true,
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
