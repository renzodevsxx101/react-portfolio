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
    accentBg: isLight ? "theme-accent-bg" : "theme-accent-bg-dark",
    accentSoft: isLight ? "theme-accent-soft-light" : "theme-accent-soft-dark",
    warm: isLight ? "theme-warm-text" : "theme-warm-text-dark",
    warmBg: isLight ? "theme-warm-bg" : "theme-warm-bg",
    badge: isLight ? "theme-badge" : "theme-badge-dark",
    focus: isLight ? "theme-focus" : "theme-focus-dark",
    hoverAccent: isLight ? "theme-hover-accent" : "theme-hover-accent-dark",
    hoverBorder: isLight ? "theme-hover-border" : "theme-hover-border-dark",
    outline: isLight ? "border theme-outline" : "border theme-outline-dark",
    border: isLight ? "border-surface-200" : "border-surface-700",
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
        <p className={`mb-3 text-xs font-bold uppercase tracking-widest ${t.accent}`}>
          {eyebrow}
        </p>
      )}
      <h2 ref={headingRef} className={`font-heading text-3xl font-bold leading-tight sm:text-4xl ${titleClassName}`}>
        {title} {highlight && <span className={t.accent}>{highlight}</span>}
      </h2>
      {description && (
        <p ref={descriptionRef} className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${t.mutedText}`}>
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
    primary: `${t.accentBg} border-transparent shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`,
    secondary:
      theme === "light"
        ? "border-surface-900 bg-surface-900 text-white hover:bg-surface-800 hover:scale-[1.02] active:scale-[0.98]"
        : "border-surface-600 bg-surface-700 text-surface-100 hover:bg-surface-600 hover:scale-[1.02] active:scale-[0.98]",
    outline: `${t.outline} hover:scale-[1.02] active:scale-[0.98]`,
    ghost: `border-transparent text-current ${t.hoverAccent}`,
  };

  return (
    <Component
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2 ${t.focus} disabled:pointer-events-none disabled:opacity-60 cursor-pointer ${variants[variant]} ${className}`}
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
    <Component ref={ref} className={`rounded-xl border ${t.card} ${className}`} {...props}>
      {children}
    </Component>
  );
});

export function Badge({ children, className = "", theme = "light" }) {
  const t = themeTokens(theme);

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${t.badge} ${className}`}>
      {children}
    </span>
  );
}
