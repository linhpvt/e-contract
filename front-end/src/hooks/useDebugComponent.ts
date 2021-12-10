/*
  This hook is used to track the number of rendering times of a component
  and which properties changes for each render.
*/

import { useEffect, useRef } from 'react';
import useRenderCount from './useRenderCount';

export default function useDebugComponent(componentName: string, props: any) {
  // rendering times
  const count = useRenderCount();

  const prevProps = useRef(props);
  const lastTimeRender = useRef(Date.now());

  // merge all keys
  const keys = Object.keys({ ...props, ...prevProps.current });

  // calculate props changes
  const changedProps = keys.reduce((aggr: any, key: string) => {
    // no change
    if (props[key] === prevProps.current[key]) {
      return aggr;
    }
    return {
      ...aggr,
      [key]: { prevVal: prevProps.current[key], currentVal: props[key] },
    };
  }, {});

  const info = {
    'Render times': count,
    changedProps,
    timestamp: `${Date.now() - lastTimeRender.current} millis`,
  };

  // we want log progs every times component get executed.
  useEffect(() => {
    console.log('[log-info]: ', info);
    lastTimeRender.current = Date.now();
  });

  return info;
}
