import { useEffect } from 'preact/hooks';

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

/**
 * This is a workaround until the preact-iso Router supports anchor
 */
export function useAnchor() {
  useEffect(() => {
    let scrollTop = 0;
    if (location.hash) {
      scrollTop = document.querySelector(location.hash).offsetTop;
    }
    window.scrollTo({ top: scrollTop });
  }, []);
}

export function useTitle(title) {
  useEffect(() => {
    document.title = `${title ? title + ' - ' : ''}Zhenyang Hua`;
  }, []);
}