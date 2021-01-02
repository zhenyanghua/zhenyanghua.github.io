import Measure from "../components/Measure";
import Snow from "../components/Snow";
import Leaf from "../components/Leaf";
import { useTitle } from "../utils/dom";


export default function Tools () {
  useTitle();

  return (
    <>
      <Measure />
      <Snow />
      <Leaf />
    </>
  )
}