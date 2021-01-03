import Measure from "../components/Measure";
import Snow from "../components/Snow";
import Leaf from "../components/Leaf";
import {useAnchor, useTitle} from "../utils/dom";


export default function Tools () {
  useTitle();
  useAnchor();

  return (
    <>
      <Measure />
      <Snow />
      <Leaf />
    </>
  )
}