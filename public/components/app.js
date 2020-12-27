import Header from './Header';
import Snow from './Snow';
import Leaf from './Leaf';

export default function App() {
  return (
    <div id="contentcontainer" class="shadow">
      <Header />
      <main id="maincontent">
        <Snow />
        <Leaf />
      </main>
    </div>
  )
}