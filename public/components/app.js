import Header from './Header';
import Snow from './Snow';
import Leaf from './Leaf';
import Measure from "./Measure";

export default function App() {
  return (
    <div id="contentcontainer" class="shadow">
      <Header />
      <main id="maincontent">
        <Measure />
        <Snow />
        <Leaf />
      </main>
    </div>
  )
}