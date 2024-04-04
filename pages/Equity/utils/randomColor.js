export function randomColorList(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    // 生成随机的RGB颜色值
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // 计算颜色的亮度
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

    // 如果颜色太暗，则使其变亮
    let adjustedR = r,
      adjustedG = g,
      adjustedB = b;
    if (brightness < 0.5) {
      adjustedR = Math.min(255, r + 100);
      adjustedG = Math.min(255, g + 100);
      adjustedB = Math.min(255, b + 100);
    }

    // 将RGB转换为十六进制表示
    const colorHex =
      '#' +
      ('00' + adjustedR.toString(16)).slice(-2) +
      ('00' + adjustedG.toString(16)).slice(-2) +
      ('00' + adjustedB.toString(16)).slice(-2);

    colors.push(colorHex);
  }
  return colors;
}
