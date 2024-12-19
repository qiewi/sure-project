import React from 'react';

const LoadingBar = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="wave-bar">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <style jsx>{`
        .wave-bar {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }
        .wave-bar span {
          display: inline-block;
          width: 8px;
          height: 30px;
          background: black;
          animation: wave 1.5s infinite;
        }
        .wave-bar span:nth-child(1) {
          animation-delay: 0s;
        }
        .wave-bar span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .wave-bar span:nth-child(3) {
          animation-delay: 0.4s;
        }
        .wave-bar span:nth-child(4) {
          animation-delay: 0.6s;
        }
        .wave-bar span:nth-child(5) {
          animation-delay: 0.8s;
        }
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(2);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingBar;
