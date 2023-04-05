import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

 const Counter = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const numberOfProjects = 15;
    let start = 0;
    let end = numberOfProjects;
    const speed = [...Array(end)].map((elm, i) => {
      switch (i) {
        case end - 2:
          return 200;
        case end - 1:
          return 400;
        case end:
          return 500;
        case end + 1:
          return 800;
        default:
          return 100;
      }
    });

    console.log("SPEED", speed);

    let incrementTime = speed[start];
    const registerTimeout = (incTime: number) => {
      console.log("INC TIME", incTime);
      let timer = setTimeout(() => {
        start += 1;
        setValue(start);
        if (start === end) {
          clearInterval(timer);
        } else {
          const newTime = speed[start];
          registerTimeout(newTime);
        }
      }, incTime);
    };

    registerTimeout(incrementTime);
  }, []);

  return <span className={styles.counterValue}>{value}</span>;
};


export default Counter;