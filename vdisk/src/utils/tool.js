export default function getLocal(key) {
  const uuid = Math.random().toString(16).slice(2);
  return new Promise((pResolve) => {
    // 执行获取
    if ("yyzd" in window) {
      window.__CALLBACK__ = {
        ...(window.__CALLBACK__ || {}),
        [uuid]: {
          resolve: (value) => {
            pResolve(value);
          },
        },
      };

      window.yyzd.getnative(`yyzd://loadLocalStorage=${uuid}|${key}`);
    } else {
      pResolve(localStorage.getItem(key) || "");
    }
  });
}
