export default function debounce(fn, delay) {
  let isCooldown;

  return () => {
    if (isCooldown) {
      clearTimeout(isCooldown);
    }

    isCooldown = setTimeout(() => {
      fn();
    }, delay);
  };
}
