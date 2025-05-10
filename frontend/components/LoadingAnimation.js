import React from 'react';

export default function LoadingAnimation() {

  return (
    <div 
      className="flex justify-center items-center h-8 space-x-2 py-2 px-3 rounded-3xl shadow-md relative" 
      style={{
        background: 'linear-gradient(45deg, #42A5F5, #cf8ef9, #fe9169)'
      }}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-white"
          style={{ 
            opacity: 0.8,
            transform: 'translateZ(0)', // Hardware acceleration
            animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
