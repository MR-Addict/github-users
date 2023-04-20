export default function formatNumber(num: number, fixed: number = 1) {
  if (num < 1e3) return num.toString();
  else if (num < 1e6) return (num / 1e3).toFixed(fixed) + "K";
  else return (num / 1e6).toFixed(fixed) + "M";
}
