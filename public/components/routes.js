import lazy from 'preact-iso/lazy';
const HomePage = lazy(() => import('../pages/home'));

export const routes = [
  {
    url: '/',
    title: 'Zhenyang Hua',
    Route: HomePage
  }
];