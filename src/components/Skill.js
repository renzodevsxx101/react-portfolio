import React from 'react';
import { themeTokens } from "./ui";

function Skill({ source, alt, title, theme }) {
  const t = themeTokens(theme);
  const cardBg =
    theme === "light"
      ? `theme-card-light ${t.hoverBorder}`
      : `theme-card-dark ${t.hoverBorder}`;

  return (
    <div className={`flex h-full min-h-[132px] flex-col items-center justify-center gap-3 rounded-lg border p-4 transition duration-300 hover:-translate-y-1 ${cardBg}`}>
      {source ? (
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white p-2">
          <img
            src={source}
            alt={alt || title}
            title={title}
            className="h-12 w-12 object-contain transition duration-300"
          />
        </div>
      ) : (
        <div className={`flex h-16 w-16 items-center justify-center rounded-md border px-2 text-center text-sm font-semibold ${t.badge}`} title={title}>
          {title}
        </div>
      )}
      <span className="text-sm font-semibold text-center">{title}</span>
    </div>
  );
}

export default Skill;
