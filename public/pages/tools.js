import { useEffect } from 'preact/hooks';
import Measure from "../components/Measure";
import Snow from "../components/Snow";
import Leaf from "../components/Leaf";

export default function Tools () {
  useEffect(() => {
    document.title = 'Zhenyang Hua';
  }, []);

  return (
    <>
      <Measure />
      <Snow />
      <Leaf />
    </>
  )
}