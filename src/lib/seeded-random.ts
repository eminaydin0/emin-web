export function createSeededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function generateGrid(seed: number, length: number, threshold = 0.6) {
  const random = createSeededRandom(seed);
  return Array.from({ length }, () =>
    random() > threshold ? Math.floor(random() * 4) + 1 : 0
  );
}
