/*
  This hook uses javascript to perform the hover effect when user hovers the html element or not
*/

import { useState } from 'react';
import useEventListener from './useEventListener';

export default function useHover(el: HTMLElement) {
  // we use useState instead of useRef because useRef doesn't cause component re-render, useState cause component re-render
  const [hovered, setHover] = useState(false);
  useEventListener('mouseover', () => setHover(true), el);
  useEventListener('mouseout', () => setHover(false), el);
  return hovered;

  // const isHover = useRef(false);
  // useEventListener('mouseover', () => (isHover.current = true), el);
  // useEventListener('mouseout', () => (isHover.current = false), el);
  // return isHover.current;
}
