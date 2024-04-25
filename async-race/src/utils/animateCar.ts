/* eslint-disable no-param-reassign */

const animateCar = (element: HTMLElement, time: number, width: number, shouldContinue: boolean) => {
  const start = performance.now();
  let lastFrame: number;

  const frame = (now: number) => {
    if (!shouldContinue) {
      cancelAnimationFrame(lastFrame);
      return;
    }

    const elapsed = now - start;
    const progress = Math.min(elapsed / time, 1);
    element.style.transform = `translateX(${progress * width}px)`;

    if (progress < 1) {
      lastFrame = requestAnimationFrame(frame);
    }
  };

  lastFrame = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(lastFrame);
  };
};

export default animateCar;
