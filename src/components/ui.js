import React from "react";

export const themeTokens = (theme) => {
  const isLight = theme === "light";

  return {
    page: isLight ? "theme-page-light" : "theme-page-dark",
    mutedPage: isLight ? "theme-muted-light" : "theme-muted-dark",
    card: isLight ? "theme-card-light" : "theme-card-dark",
    softCard: isLight ? "theme-soft-light" : "theme-soft-dark",
    nav: isLight ? "theme-nav-light" : "theme-nav-dark",
    mutedText: isLight ? "theme-text-muted-light" : "theme-text-muted-dark",
    subtleText: isLight ? "theme-text-subtle-light" : "theme-text-subtle-dark",
    input: isLight ? "theme-input-light" : "theme-input-dark",
    accent: isLight ? "theme-accent-text" : "theme-accent-text-dark",
    accentBg: isLight ? "theme-accent-bg text-white" : "theme-accent-bg-dark",
    accentSoft: isLight ? "theme-accent-soft-light" : "theme-accent-soft-dark",
    warm: isLight ? "theme-warm-text" : "theme-warm-text-dark",
    warmBg: isLight ? "theme-warm-bg" : "theme-warm-bg-dark",
    badge: isLight ? "theme-badge" : "theme-badge-dark",
    focus: isLight ? "theme-focus" : "theme-focus-dark",
    hoverAccent: isLight ? "theme-hover-accent" : "theme-hover-accent-dark",
    hoverBorder: isLight ? "theme-hover-border" : "theme-hover-border-dark",
    outline: isLight ? "border theme-outline" : "border theme-outline-dark",
  };
};

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  icon,
  theme = "light",
  headingRef,
  descriptionRef,
  titleClassName = "",
}) {
  const t = themeTokens(theme);

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase ${t.accent}`}>
          {eyebrow}
        </p>
      )}
      <h2 ref={headingRef} className={`text-3xl font-bold leading-tight sm:text-4xl ${titleClassName}`}>
        {title} {highlight && <span className={t.warm}>{highlight}</span>}
      </h2>
      {description && (
        <p ref={descriptionRef} className={`mx-auto mt-4 max-w-2xl text-base leading-7 ${t.mutedText}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Button({ as = "button", children, className = "", variant = "primary", theme = "light", ...props }) {
  const Component = as;
  const t = themeTokens(theme);
  const variants = {
    primary: `${t.accentBg} border-transparent shadow-lg`,
    secondary:
      theme === "light"
        ? "border-gray-900 bg-gray-900 text-white hover:bg-gray-800"
        : "border-white border-opacity-20 bg-white bg-opacity-10 text-white hover:bg-opacity-20",
    outline: t.outline,
    ghost:
      `border-transparent text-current ${t.hoverAccent}`,
  };

  return (
    <Component
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold transition duration-200 focus:outline-none ${t.focus} disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export const Card = React.forwardRef(function Card(
  { as = "div", children, className = "", theme = "dark", ...props },
  ref
) {
  const Component = as;
  const t = themeTokens(theme);
  return (
    <Component ref={ref} className={`rounded-lg border ${t.card} ${className}`} {...props}>
      {children}
    </Component>
  );
});

export function Badge({ children, className = "", theme = "light" }) {
  const t = themeTokens(theme);

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${t.badge} ${className}`}>
      {children}
    </span>
  );
}
