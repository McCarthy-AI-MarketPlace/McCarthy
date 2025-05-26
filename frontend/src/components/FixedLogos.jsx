// import { useState, useEffect } from "react";
// import { Image } from "react-bootstrap";
// import { Link } from "react-router-dom"; 
// import axios from "axios";
// import "../../src/App.css";

// const FixedLogos = () => {
//   const [tools, setTools] = useState([]);

//   useEffect(() => {
//     axios
//       .get("api/tool/")
//       .then((response) => {
//         setTools(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching tools:", error);
//       });
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "40px",
//         marginTop: "40px",
//         marginBottom: "40px",
//         flexWrap: "wrap", 
//       }}
//     >
//       {tools.slice(0,4).map((tool) => (
//         <a
//           href={tool.toolUrl}
//           key={tool._id}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             src={tool.image}
//             alt={tool.title}
//             className="animated-logo"
//             style={{
//               width: "60px",
//               borderRadius: "50%",
//             }}
//           />
//         </a>
//       ))}
//     </div>
//   );
// };

// export default FixedLogos;

import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src/App.css";

const FixedLogos = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",  // center logos horizontally
        alignItems: "center",      // center vertically (if needed)
        gap: "40px",
        marginTop: "40px",         // add some spacing from top if needed
        marginBottom: "40px",      // spacing from below
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
};

export default FixedLogos;
