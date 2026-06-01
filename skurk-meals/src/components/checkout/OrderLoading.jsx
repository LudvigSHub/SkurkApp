import { useEffect, useState } from "react";

import mascotBottom from "../../assets/animations/Mascot_Animation_Bottom.png";
import mascotMiddle from "../../assets/animations/Mascot_Animation_Middle.png";
import mascotTop from "../../assets/animations/Mascot_Animation_Top.png";

import "./OrderLoading.css";

const mascotFrames = [
  mascotBottom,
  mascotMiddle,
  mascotTop,
  mascotMiddle,
];

function OrderLoading() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % mascotFrames.length);
    }, 180);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="order-loading">
      <img
        src={mascotFrames[frameIndex]}
        alt="SKURK lagar din order"
        className="order-loading-mascot"
      />

      <h1>Skurken lagar din order...</h1>
      <p>På med haklappen.</p>
    </section>
  );
}

export default OrderLoading;