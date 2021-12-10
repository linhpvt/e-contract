import { useEffect } from 'react';

export default function useEventListener(
  eventName: string,
  eventHandler: EventListenerOrEventListenerObject,
  el?: HTMLElement | Document | Window,
) {
  useEffect(() => {
    // add listner
    const element = el || document;
    element.addEventListener(eventName, eventHandler);
    // clean up.
    return () => {
      element.removeEventListener(eventName, eventHandler);
    };
  }, [eventName, eventHandler, el]);
}
