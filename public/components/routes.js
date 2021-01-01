import lazy from 'preact-iso/lazy';
const Tools = lazy(() => import('../pages/tools'));
const Writings = lazy(() => import('../pages/writings'));

export const routes = [
  {
    url: '/',
    title: 'Zhenyang Hua',
    label: 'Tools',
    Route: Tools
  },
  {
    url: '/writings',
    title: 'Writings - Zhenyang Hua',
    label: 'Writings',
    Route: Writings,
  }
];