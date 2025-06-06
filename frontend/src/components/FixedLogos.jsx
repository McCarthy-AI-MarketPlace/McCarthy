import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../src/App.css";

const FixedLogos = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        marginTop: "40px",
        marginBottom: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* ChatGPT */}
      <Link to="https://openai.com/index/chatgpt/" target="_blank" rel="noopener noreferrer">
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

      {/* Gemini (Latest optimized inline SVG) */}
      <Link to="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIsMEMxMS43NDMsNi41MTgsNi41MTgsMTEuNzQzLDAsMTJjNi41MTgsMC4yNTcsMTEuNzQzLDUuNDgyLDEyLDEyYzAuMjU3LTYuNTE4LDUuNDgyLTExLjc0MywxMi0xMkMxNy40ODIsMTEuNzQzLDEyLjI1Nyw2LjUxOCwxMiwweiBNMTIsMTcuMTYzQzEwLjc0MywxNS4wMzksOC45NjEsMTMuMjU3LDYuODM3LDEyQzguOTYxLDEwLjc0MywxMC43NDMsOC45NjEsMTIsNi44MzdjMS4yNTcsMi4xMjQsMy4wMzksMy45MDYsNS4xNjMsNS4xNjNDMTUuMDM5LDEzLjI1NywxMy4yNTcsMTUuMDM5LDEyLDE3LjE2M3oiPjwvcGF0aD48L3N2Zz4="
          alt="Gemini Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>

      {/* Grok AI */}
      <Link to="https://x.ai/" target="_blank" rel="noopener noreferrer">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cG9seWdvbiBmaWxsPSIjMjEyMTIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHBvaW50cz0iMjQuMDMyLDI4LjkxOSA0MC4xNDUsNS45ODkgMzMuMTQ1LDUuOTg5IDIwLjUxOCwyMy45NTgiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wb2x5Z29uPjxwb2x5Z29uIGZpbGw9IiMyMTIxMjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcG9pbnRzPSIxNC41OTEsMzIuMzkzIDcuMTQ1LDQyLjk4OSAxNC4xNDUsNDIuOTg5IDE4LjEwNSwzNy4zNTQiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wb2x5Z29uPjxwb2x5Z29uIGZpbGw9IiMyMTIxMjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcG9pbnRzPSIxNC41NDcsMTguOTg5IDcuNTQ3LDE4Ljk4OSAyNC41NDcsNDIuOTg5IDMxLjU0Nyw0Mi45ODkiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wb2x5Z29uPjxwb2x5Z29uIGZpbGw9IiMyMTIxMjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcG9pbnRzPSIzNSwxNi43ODkgMzUsNDMgNDEsNDMgNDEsOC4yNTEiIGNsaXAtcnVsZT0iZXZlbm9kZCI+PC9wb2x5Z29uPjwvc3ZnPg=="
          alt="Grok AI Logo"
          className="animated-logo"
          style={{
            width: "60px",
            borderRadius: "50%",
          }}
        />
      </Link>


      

     {/* ✅ Perplexity AI */}
      <Link to="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/perplexity.svg"
          alt="Perplexity Logo"
          className="animated-logo"
          style={{
            width: "60px",
            filter: "grayscale(100%)",
          }}
        />
      </Link>
    </div>
  );
};

export default FixedLogos;
