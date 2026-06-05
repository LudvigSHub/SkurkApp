import { useEffect, useState } from "react";

import mascotBottom from "../../assets/animations/Mascot_Animation_Bottom.png";
import mascotMiddle from "../../assets/animations/Mascot_Animation_Middle.png";
import mascotTop from "../../assets/animations/Mascot_Animation_Top.png";

import "./OrderLoading.css";

// Bilderna som används för mascot-animationen
const mascotFrames = [
  mascotBottom,
  mascotMiddle,
  mascotTop,
  mascotMiddle,
];

function OrderLoading() {
  const [frameIndex, setFrameIndex] = useState(0);

   // Byter bild med ett intervall för att skapa en enkel animation
   // Varje 180ms byts bilden i ordning: bottom -> middle -> top -> middle -> bottom -> ...
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % mascotFrames.length);
    }, 180);

    // Rensar intervallet när komponenten tas bort
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