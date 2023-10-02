export const clearNavigationHistory = () => {
  const pathname = window?.location.pathname;
  const fullPath = pathname ? `${pathname}` : "./";

  setTimeout(() => {
    window?.history.replaceState({}, document?.title, fullPath);
  }, 200);
};
