export function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/i);
  if (!match) return null;

  return {
    target: Number(match[1]),
    suffix: match[2],
  };
}

export function isNumericStatValue(value: string) {
  return parseStatValue(value) !== null;
}
