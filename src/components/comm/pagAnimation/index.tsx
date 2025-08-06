import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

interface PagAnimationProps {
  pag: string;
  infinite?: boolean;
  aspectRatio?: number;
  className?: string;
}

export interface PagAnimationMethods {
  play: () => void;
  reset: () => void;
}

export const PagAnimation = forwardRef(
  ({ pag, infinite, aspectRatio = 1, className }: PagAnimationProps, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const pagView = useRef<any>();

    const setSize = useCallback(() => {
      if (!containerRef.current || !canvasRef.current || !pagView.current)
        return;
      const styleDeclaration = window.getComputedStyle(
        containerRef.current,
        null
      );
      const width = Number(styleDeclaration.width.replace("px", ""));
      canvasRef.current.width = width;
      canvasRef.current.height = width * aspectRatio;
      pagView.current?.updateSize();
      pagView.current?.flush();
    }, []);

    useEffect(() => {
      return () => {
        if (pagView.current) {
          pagView.current?.destroy();
        }
      };
    }, []);

    useEffect(() => {
      const initAnimation = async () => {
        try {
          const __getPAG = (window as any).__getPAG;
          if (!canvasRef.current || !__getPAG) return;

          const PAG = await __getPAG();

          const response = await fetch(pag);
          const arrayBuffer = await response.arrayBuffer();
          const pagFile = await PAG.PAGFile.load(arrayBuffer);
          pagView.current = await PAG.PAGView.init(pagFile, canvasRef.current, {
            useScale: false,
          });
          pagView.current.setRepeatCount(infinite ? 0 : 1);
          setSize();
          if (infinite) {
            pagView.current.play();
          }
        } catch (err) {
          console.error("pagAnimation", err);
        }
      };

      if ((window as any).__loaded) {
        initAnimation();
      } else {
        window.addEventListener("__loaded", initAnimation, false);
      }
      return () => {
        pagView.current?.destroy();
        window.removeEventListener("__loaded", initAnimation, false);
      };
    }, [infinite]);

    const play = () => {
      pagView.current?.play();
    };

    const reset = () => {
      pagView.current?.stop();
    };

    useImperativeHandle(ref, (): PagAnimationMethods => {
      return {
        play,
        reset,
      };
    }, []);

    useEffect(() => {
      window.addEventListener("resize", setSize, false);
      return () => {
        window.addEventListener("resize", setSize, false);
      };
    }, [aspectRatio]);

    return (
      <div className={`w-full ${className}`} ref={containerRef}>
        <canvas ref={canvasRef}></canvas>
      </div>
    );
  }
);
