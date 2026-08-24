import React from 'react';
import { themeTokens } from "./ui";

function Skill({ source, alt, title, theme }) {
  const t = themeTokens(theme);
  const cardBg =
    theme === "light"
      ? `theme-card-light ${t.hoverBorder}`
      : `theme-card-dark ${t.hoverBorder}`;

  return (
    <div className={`flex h-full min-h-[110px] flex-col items-center justify-center gap-2.5 rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 ${cardBg} cursor-default`}>
      {source ? (
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg p-1.5 ${theme === "light" ? "bg-surface-50" : "bg-surface-800"}`}>
          <img
            src={source}
            alt={alt || title}
            title={title}
            className="h-9 w-9 object-contain"
          />
        </div>
      ) : (
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg border px-1.5 text-center text-[10px] font-semibold ${t.badge}`} title={title}>
          {title}
        </div>
      )}
      <span className="text-xs font-medium text-center leading-tight">{title}</span>
    </div>
  );
}

export default Skill;
