const getThemeStyles = (theme) =>
  theme === "light" ? "theme-page-light" : "theme-page-dark";

export const getMutedStyles = (theme) =>
  theme === "light" ? "theme-muted-light" : "theme-muted-dark";

export default getThemeStyles;
