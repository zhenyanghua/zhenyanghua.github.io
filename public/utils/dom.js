export function injectScript(url, async = true) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = async;
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}