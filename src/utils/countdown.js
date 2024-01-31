import { useState, useEffect } from "react";

const countdown = () => {
  const [counter, setCounter] = useState(60);
  useEffect(() => {
    if (counter == 0) return;
    const interval = setInterval(() => {
      setCounter((timeLeft) => (timeLeft = counter - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);
  return counter

}



export default countDown;
