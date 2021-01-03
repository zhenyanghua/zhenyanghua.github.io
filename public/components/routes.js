import lazy from 'preact-iso/lazy';
const Tools = lazy(() => import('../pages/tools'));

export const routes = [
  {
    url: '/',
    title: 'Zhenyang Hua',
    label: 'Tools',
    Route: Tools
  }
];