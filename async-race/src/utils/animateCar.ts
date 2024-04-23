/* eslint-disable no-param-reassign */

const animateCar = (element: HTMLElement, time: number, width: number) => {
  const start = performance.now();

  return new Promise<void>(resolve => {
    const frame = (timestamp: number) => {
      if (element) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / time, 1);
        element.style.transform = `translateX(${progress * width}px)`;

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          resolve();
        }
      }
    };
    requestAnimationFrame(frame);
  });
};

export default animateCar;
