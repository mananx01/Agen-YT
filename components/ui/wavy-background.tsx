"use client";

import { cn } from "@/lib/utils";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createNoise3D } from "simplex-noise";

type WavyBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
};

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const wRef = useRef<number>(0);
  const hRef = useRef<number>(0);
  const ntRef = useRef<number>(0);
  const animationId = useRef<number | null>(null);

  const [isSafari, setIsSafari] = useState(false);
  const noise = useMemo(() => createNoise3D(), []);

  const getSpeed = useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  const waveColors = useMemo(
    () =>
      colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
      ],
    [colors]
  );

  
  const drawWave = useCallback(
    (n: number) => {
      const ctx = ctxRef.current;
      const w = wRef.current;
      const h = hRef.current;
      if (!ctx) return;

      ntRef.current += getSpeed();

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }

        ctx.stroke();
        ctx.closePath();
      }
    },
    [waveWidth, waveColors, noise, getSpeed]
  );

  const render = useCallback(() => {
    const ctx = ctxRef.current;
    const w = wRef.current;
    const h = hRef.current;
    if (!ctx) return;

    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity;
    ctx.fillRect(0, 0, w, h);

    drawWave(5);
    animationId.current = requestAnimationFrame(render);
  }, [backgroundFill, waveOpacity, drawWave]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    ctx.filter = `blur(${blur}px)`;

    ctxRef.current = ctx;
    wRef.current = width;
    hRef.current = height;

    window.onresize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      ctx.filter = `blur(${blur}px)`;
      wRef.current = w;
      hRef.current = h;
    };

    render();
  }, [blur, render]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    init();
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [init]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsSafari(
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
      );
    }
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
