import { Image } from "react-bootstrap";

import { Link } from "react-router-dom";
import "../../src/App.css"; // for animations

import "../../src/App.css"; // for animations

const FixedLogos = () => {
<<<<<<< HEAD

 return (

  <div

   style={{

    position: "absolute",

    bottom: "25%",

    left: "50%",

    transform: "translateX(-50%)",

    display: "flex",

    gap: "40px",

    zIndex: 100,

   }}

  >

   <Link to="https://www.copy.ai/">

    <Image

     src="https://scontent.fhyd1-2.fna.fbcdn.net/v/t39.30808-6/294330311_418371153648482_1827512636660586645_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=sHh52Iyvd40Q7kNvwFjrnjq&_nc_oc=AdmB9uDcM5EyJJdmf66Qvp7ptPrODv0KFvdGqJCITiDHog8p_qhfwPov-cBLTnIjbHKGi7LJW23pdp5TDauVGwSo&_nc_zt=23&_nc_ht=scontent.fhyd1-2.fna&_nc_gid=Fyjy_zIa4yFWFM15v1XPcg&oh=00_AfL27U-9IRE31ucLpHu8UigpQoqTMOgirVpgonviwmav6g&oe=682BBC23"

     alt="Copy.ai Logo"

     className="animated-logo"

     style={{

      width: "60px",

      borderRadius: "50%",

     }}

    />

   </Link>

   <Link to="https://www.perplexity.ai/">

    <Image

     src="https://programmaticseo.dk/wp-content/uploads/2025/01/perplexityai-logo.webp"

     alt="Perplexity AI Logo"

     className="animated-logo"

     style={{

      width: "60px",

      borderRadius: "50%",

     }}

    />

   </Link>

   <Link to="https://openai.com/index/chatgpt/">

    <Image

     src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-black-background-png-1-1200x1200.png"

     alt="ChatGPT Logo"

     className="animated-logo"

     style={{

      width: "60px",

      borderRadius: "50%",

     }}

    />

   </Link>

   <Link to="https://gemini.google.com/app?hl=en-IN">

    <Image

     src="https://redresscompliance.com/wp-content/uploads/2024/02/AI-Tools-for-Writing-and-Content-Creation.webp"

     alt="Gemini Logo"

     className="animated-logo"

     style={{

      width: "60px",

      borderRadius: "50%",

     }}

    />

   </Link>

  </div>

 );

=======
  return (
    <div
      style={{
        position: "absolute",
        bottom: "25%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "20px",
        zIndex: 10,
      }}
    >
      <Link to="https://www.copy.ai/">
        <Image
          src="https://scontent.fhyd1-2.fna.fbcdn.net/v/t39.30808-6/294330311_418371153648482_1827512636660586645_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=sHh52Iyvd40Q7kNvwFjrnjq&_nc_oc=AdmB9uDcM5EyJJdmf66Qvp7ptPrODv0KFvdGqJCITiDHog8p_qhfwPov-cBLTnIjbHKGi7LJW23pdp5TDauVGwSo&_nc_zt=23&_nc_ht=scontent.fhyd1-2.fna&_nc_gid=Fyjy_zIa4yFWFM15v1XPcg&oh=00_AfL27U-9IRE31ucLpHu8UigpQoqTMOgirVpgonviwmav6g&oe=682BBC23"
          alt="Copy.ai Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>

      <Link to="https://www.perplexity.ai/">
        <Image
          src="https://programmaticseo.dk/wp-content/uploads/2025/01/perplexityai-logo.webp"
          alt="Perplexity AI Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>

      <Link to="https://openai.com/index/chatgpt/">
        <Image
          src="https://www.edigitalagency.com.au/wp-content/uploads/chatgpt-logo-white-black-background-png-1-1200x1200.png"
          alt="ChatGPT Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>

      <Link to="https://gemini.google.com/app?hl=en-IN">
        <Image
          src="https://redresscompliance.com/wp-content/uploads/2024/02/AI-Tools-for-Writing-and-Content-Creation.webp"
          alt="Gemini Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>
    </div>
  );
>>>>>>> c5a6ecc0fb89505f81830eba885e878aa466fb42
};

export default FixedLogos;
