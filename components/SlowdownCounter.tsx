import { useEffect, useState } from "react";

const SlowdownCounter = ({ start = 0, end = 100, duration = 2000 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let current = start;
    const totalSteps = 50; // Number of updates
    let step = 0;

    const updateCount = () => {
      if (step < totalSteps) {
        // Ease-out effect: Larger steps initially, smaller steps later
        const progress = step / totalSteps;
        const easedStep = Math.pow(progress, 3); // Cubic easing
        const nextCount = Math.round(start + easedStep * (end - start));

        setCount(nextCount);
        step++;

        // Gradually increasing interval
        const delay = 10 + easedStep * (duration / totalSteps);
        setTimeout(updateCount, delay);
      } else {
        setCount(end); // Ensure final value is set
      }
    };

    updateCount();
  }, [start, end, duration]);

  return <p className="font-bold contents text-xl">{count}</p>;
};

export default SlowdownCounter;
