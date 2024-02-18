export const debounce = <T extends unknown[]>(
    func: (...args: T) => void,
    delay: number
) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: T) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
};