import { useEffect, useRef } from "react";
import { cursorRippleConfig } from "../data/portfolio";
import { createRippleRenderer } from "./cursorRippleWebGL";

const interactiveSelector = [
  "a",
  "button",
  "[role='button']",
  ".game-card",
  ".project-card",
  ".contact-link-card",
].join(",");

function colorWithAlpha(color, alpha) {
  const value = color.replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function CursorRipple() {
  const webglCanvasRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const webglCanvas = webglCanvasRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const hoverPointer = window.matchMedia("(hover: hover)");

    if (!canvas || !cursorRippleConfig.enabled || !finePointer.matches || !hoverPointer.matches) {
      return undefined;
    }

    let reduced = reducedMotion.matches;
    const useWebGL = cursorRippleConfig.useWebGL && webglCanvas;
    const renderer = useWebGL
      ? createRippleRenderer(webglCanvas, {
        ...cursorRippleConfig,
        damping: 0.985,
        radius: cursorRippleConfig.maxRadius,
        color: cursorRippleConfig.color1,
      })
      : null;
    const context = renderer ? null : canvas.getContext("2d", { alpha: true });

    if (!renderer && !context) {
      return undefined;
    }

    const targetCanvas = renderer ? webglCanvas : canvas;
    targetCanvas.dataset.motionMode = reduced ? "reduced-motion" : "full-motion";
    targetCanvas.dataset.renderer = renderer ? "webgl" : "2d";
    console.info(
      `[CursorRipple] ${renderer ? "WebGL" : "2D"} renderer active; ${reduced ? "gentle reduced-motion" : "full-motion"} mode`,
    );

    let frameId = 0;
    let lastFrameTime = 0;
    let lastActivityTime = 0;
    let lastRippleTime = 0;
    let lastRipplePoint = null;
    let pixelRatio = 1;
    let isVisible = document.visibilityState === "visible";
    let isHovering = false;
    const ripples = [];
    const pendingWaveImpulses = [];
    const delayedRippleTimers = new Set();
    const minimumFrameTime = 1000 / 60;
    const maxRipples = 40;
    let pointer = { x: -100, y: -100 };
    let easedPointer = { x: -100, y: -100 };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(window.innerWidth * pixelRatio);
      const height = Math.round(window.innerHeight * pixelRatio);
      targetCanvas.width = width;
      targetCanvas.height = height;
      targetCanvas.style.width = `${window.innerWidth}px`;
      targetCanvas.style.height = `${window.innerHeight}px`;

      if (renderer) {
        renderer.resize();
      } else {
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }
    };

    const addRipple = (x, y, { maxRadius, alpha, speed }) => {
      if (renderer) {
        pendingWaveImpulses.push({
          x: x / window.innerWidth,
          y: y / window.innerHeight,
          strength: alpha,
        });
        if (pendingWaveImpulses.length > 8) pendingWaveImpulses.shift();
      } else {
        ripples.push({
          x,
          y,
          radius: 2,
          maxRadius,
          alpha,
          speed,
        });
        if (ripples.length > maxRipples) ripples.shift();
      }
    };

    const addMovementRipple = (x, y, time) => {
      const movedDistance = lastRipplePoint
        ? Math.hypot(x - lastRipplePoint.x, y - lastRipplePoint.y)
        : Infinity;
      if (time - lastRippleTime < 40 && movedDistance < 24) return;

      const baseAlpha = reduced ? 0.2 : 0.42 * cursorRippleConfig.intensity;
      const radiusVariation = ((Math.round(x + y) % 4) + 1) * 7;
      addRipple(x, y, {
        maxRadius: reduced ? 58 : Math.min(cursorRippleConfig.maxRadius, 72 + radiusVariation),
        alpha: baseAlpha,
        speed: reduced ? 1.8 : 2.2,
      });
      lastRippleTime = time;
      lastRipplePoint = { x, y };
    };

    const scheduleFrame = () => {
      if (!frameId && isVisible) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const drawRipple = (ripple) => {
      const progress = Math.min(ripple.radius / ripple.maxRadius, 1);
      const fade = Math.max(0, 1 - progress);
      const alpha = ripple.alpha * fade;
      const radii = [ripple.radius - 3, ripple.radius, ripple.radius + 3];
      const colors = [cursorRippleConfig.color2, cursorRippleConfig.color1, cursorRippleConfig.color2];
      const strengths = [0.7, 1, 0.48];

      radii.forEach((radius, index) => {
        if (radius <= 0) return;
        context.beginPath();
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.strokeStyle = colorWithAlpha(colors[index], alpha * strengths[index]);
        context.lineWidth = 1.5;
        context.stroke();
      });
    };

    const drawPointer = () => {
      if (pointer.x < 0) return;

      const radius = isHovering ? 34 : 20;
      const gradient = context.createRadialGradient(
        easedPointer.x,
        easedPointer.y,
        0,
        easedPointer.x,
        easedPointer.y,
        radius,
      );
      gradient.addColorStop(0, colorWithAlpha(cursorRippleConfig.color1, reduced ? 0.16 : 0.24));
      gradient.addColorStop(0.45, colorWithAlpha(cursorRippleConfig.color2, reduced ? 0.08 : 0.12));
      gradient.addColorStop(1, colorWithAlpha(cursorRippleConfig.color1, 0));
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(easedPointer.x, easedPointer.y, radius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.arc(easedPointer.x, easedPointer.y, 3.2, 0, Math.PI * 2);
      context.fillStyle = colorWithAlpha("#d8caff", reduced ? 0.68 : 0.9);
      context.shadowColor = cursorRippleConfig.color1;
      context.shadowBlur = 12;
      context.fill();
      context.shadowBlur = 0;
    };

    const draw = (timestamp) => {
      frameId = 0;
      if (!isVisible) return;

      if (timestamp - lastFrameTime < minimumFrameTime) {
        scheduleFrame();
        return;
      }
      const elapsed = lastFrameTime
        ? Math.min((timestamp - lastFrameTime) / minimumFrameTime, 2)
        : 1;
      lastFrameTime = timestamp;

      easedPointer.x += (pointer.x - easedPointer.x) * 0.15;
      easedPointer.y += (pointer.y - easedPointer.y) * 0.15;

      if (renderer) {
        renderer.render({
          pointer: easedPointer,
          hovering: isHovering,
          impulses: pendingWaveImpulses.splice(0, 4),
        });
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.globalCompositeOperation = "lighter";

        for (let index = ripples.length - 1; index >= 0; index -= 1) {
          const ripple = ripples[index];
          ripple.radius += ripple.speed * elapsed;
          ripple.alpha *= Math.pow(0.965, elapsed);
          drawRipple(ripple);

          if (ripple.radius >= ripple.maxRadius || ripple.alpha < 0.012) {
            ripples.splice(index, 1);
          }
        }

        drawPointer();
        context.globalCompositeOperation = "source-over";
      }

      const pointerSettled =
        Math.abs(pointer.x - easedPointer.x) < 0.5 &&
        Math.abs(pointer.y - easedPointer.y) < 0.5;
      const hasRipples = ripples.length > 0 || pendingWaveImpulses.length > 0;
      if (!hasRipples && pointerSettled && timestamp - lastActivityTime > 100) {
        if (renderer) renderer.clear();
        return;
      }

      scheduleFrame();
    };

    const handlePointerMove = (event) => {
      if (!finePointer.matches || !hoverPointer.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      lastActivityTime = performance.now();
      addMovementRipple(event.clientX, event.clientY, lastActivityTime);
      scheduleFrame();
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "mouse" || !finePointer.matches || !hoverPointer.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      lastActivityTime = performance.now();
      const strength = reduced ? 0.28 : 0.58 * cursorRippleConfig.intensity;
      addRipple(event.clientX, event.clientY, {
        maxRadius: reduced ? 78 : 180,
        alpha: strength,
        speed: reduced ? 1.8 : 2.5,
      });

      for (let index = 1; index <= 2; index += 1) {
        const timer = window.setTimeout(() => {
          delayedRippleTimers.delete(timer);
          if (!isVisible) return;
          addRipple(event.clientX, event.clientY, {
            maxRadius: reduced ? 62 : 128,
            alpha: reduced ? 0.18 : 0.34 * cursorRippleConfig.intensity,
            speed: reduced ? 1.8 : 2.2,
          });
          scheduleFrame();
        }, index * 80);
        delayedRippleTimers.add(timer);
      }
      scheduleFrame();
    };

    const handlePointerOver = (event) => {
      const nextHovering = Boolean(event.target.closest(interactiveSelector));
      if (nextHovering === isHovering) return;
      isHovering = nextHovering;
      lastActivityTime = performance.now();
      scheduleFrame();
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (!isVisible) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        if (renderer) renderer.clear();
        else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }
      lastFrameTime = 0;
      scheduleFrame();
    };

    const handleMotionPreferenceChange = () => {
      reduced = reducedMotion.matches;
      targetCanvas.dataset.motionMode = reduced ? "reduced-motion" : "full-motion";
      console.info(`[CursorRipple] ${reduced ? "gentle reduced-motion" : "full-motion"} mode`);
      lastActivityTime = performance.now();
      scheduleFrame();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      delayedRippleTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      if (renderer) {
        renderer.clear();
        renderer.dispose();
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };
  }, []);

  return (
    <>
      <canvas
        ref={webglCanvasRef}
        className="cursor-ripple-canvas cursor-ripple-webgl"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="cursor-ripple-canvas cursor-ripple-2d"
        aria-hidden="true"
      />
    </>
  );
}

export default CursorRipple;
