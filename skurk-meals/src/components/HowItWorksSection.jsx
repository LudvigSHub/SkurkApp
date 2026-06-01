
import HowItWorksCard from "./cards/HowItWorksCard";
import RegisterCard from "./cards/RegisterCard";

import "./HowItWorksSection.css";

import mascot from "../assets/mascot/Mascot_PekaUppMuskler.png";



function HowItWorksSection() {
    return (
        <section className="how-section">
            <HowItWorksCard/>
            <RegisterCard mascotImage={mascot}/>


        </section>
      );
}

export default HowItWorksSection;