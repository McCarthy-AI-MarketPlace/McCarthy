const WaveAnimation = ({ flip }) => {
  return (
    <div className={`wave-container ${flip ? "flip" : ""}`}>
      <svg className="wave wave1" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,160L60,170C120,180,240,200,360,197.3C480,195,600,165,720,144C840,123,960,113,1080,138.7C1200,165,1320,223,1380,250.7L1440,278L1440,320L0,320Z"
          fill="#ebe2f4"
          fillOpacity="0.3"
        />
      </svg>

      <svg className="wave wave2" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          d="M0,160L60,170C120,180,240,200,360,197.3C480,195,600,165,720,144C840,123,960,113,1080,138.7C1200,165,1320,223,1380,250.7L1440,278L1440,320L0,320Z"
          fill="#ebe2f4"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default WaveAnimation;
