import React from 'react';

function Skill({ source, alt, title, theme }) {
  const cardBg =
    theme === "light"
      ? "bg-white/60"
      : "bg-white/10";

  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-xl ${cardBg} transition-transform duration-300 hover:scale-105`}>
      {source ? (
        <div className="bg-white rounded-lg p-2 flex items-center justify-center">
          <img
            src={source}
            alt={alt || title}
            title={title}
            className="icon"
          />
        </div>
      ) : (
        <div className="icon flex items-center justify-center text-sm font-semibold text-center px-2" title={title}>
          {title}
        </div>
      )}
      <span className="text-sm font-semibold text-center">{title}</span>
    </div>
  );
}

export default Skill;
