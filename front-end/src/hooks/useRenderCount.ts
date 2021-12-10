/*
  This hook is used to determine how many time your component get rendered.
  It's useful to debug and optimize your code to get higher performance
  by reducing the redundant rendering times of your components.
*/

import { useEffect, useRef } from 'react';

export default function useRenderCount() {
  // the very first value
  const ref = useRef(0);
  // console.log('Weird ', Date.now());
  /*
    The React.StrictMode causes the ref.current increased by 2.
    in other words, everything outside hooks will run twice.
  */
  // ref.current = ref.current + 1;

  // useEffect only run once for a time it's triggered.
  useEffect(() => {
    ref.current++;
  });
  return ref.current;
}
