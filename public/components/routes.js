import lazy from 'preact-iso/lazy';
const HomePage = lazy(() => import('../pages/home'));
const ArticlesPage = lazy(() => import('../pages/articles'));

export const routes = [
  {
    url: '/',
    title: 'Zhenyang Hua',
    label: 'Home',
    Route: HomePage
  },
  {
    url: '/articles',
    title: 'Articles',
    label: 'Articles',
    Route: ArticlesPage
  }
];