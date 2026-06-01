import "./HowItWorksCard.css";


function HowItWorksCard() {
    return ( 
        <article className="how-card">
            <h2>Så funkar det</h2>

            <ul>
                <li>Skapa en profil</li>
                <li>Välj dina matlådor</li>
                <li>Se makros direkt</li>
                <li>Få maten levererad</li>
            </ul>

            <p>
                Vi har leveransdagar måndagar och onsdagar, 
                du väljer själv vilka rätter du vill ha och vilka dagar du vill ha din leverans.
                
            </p>

            <p>
                alla matlådor kommer med tillagat datum, allergener och makros.
            </p>
        </article>
     );
}

export default HowItWorksCard;