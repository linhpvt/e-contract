import { useEffect, useRef, useCallback } from 'react';

import SignaturePad from '../signature-pad/libs/signature-pad';
const Events = {
  RESIZE: 'resize',
};

const Signature = (props: SignaturePadProps): any => {
  const canvasRef = useRef();
  const signPad = useRef(null);
  const { canvasProps } = props;
  const excludeOurProps = useCallback(() => {
    const { canvasProps, clearOnResize, ...sigPadProps } = props;
    return sigPadProps;
  }, [props]);

  const resizeCanvas = useCallback(() => {
    const { canvasProps = {} } = props;
    const { width, height } = canvasProps;
    // don't resize if the canvas has fixed width and height
    if (width && height) {
      return;
    }

    const canvas: any = canvasRef.current || {};
    /* When zoomed out to less than 100%, for some very strange reason,
      some browsers report devicePixelRatio as less than 1
      and only part of the canvas is cleared then. */
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    if (!width) {
      canvas.width = canvas.offsetWidth * ratio;
    }
    if (!height) {
      canvas.height = canvas.offsetHeight * ratio;
    }
    canvas.getContext('2d').scale(ratio, ratio);

    // this.clear();
  }, [props]);

  const checkClearOnResize = useCallback(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  // start events
  const on = useCallback(() => {
    window.addEventListener(Events.RESIZE, checkClearOnResize);
    if (signPad.current) {
      // @ts-ignore
      signPad.current.on();
    }
  }, [checkClearOnResize, signPad]);

  // clear events
  const off = useCallback(() => {
    window.removeEventListener(Events.RESIZE, checkClearOnResize);
    // @ts-ignore
    signPad.current.off();
  }, [checkClearOnResize, signPad]);

  // first loaded
  useEffect(() => {
    // @ts-ignore
    signPad.current = new SignaturePad(canvasRef.current, excludeOurProps());
  }, [excludeOurProps]);

  // every updating
  useEffect(() => {
    resizeCanvas();
    on();

    // clean up
    return () => {
      off();
    };
  });
  // @ts-ignore
  return <canvas ref={canvasRef} {...canvasProps}></canvas>;
};
export default Signature;

export interface SignaturePadProps {
  // signature_pad's props
  velocityFilterWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  minDistance?: number;
  dotSize?: number | Function;
  penColor?: string;
  throttle?: number;
  onEnd?: Function;
  onBegin?: Function;

  // props specific to the React wrapper
  canvasProps?: { width?: number; height?: number };
  clearOnResize?: boolean;
}
