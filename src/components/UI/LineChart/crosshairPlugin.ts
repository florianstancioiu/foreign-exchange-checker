import { type Plugin } from "chart.js";

export const crosshairPlugin: Plugin = {
  id: "crosshair",

  afterDraw(chart) {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
      tooltip,
    } = chart;

    if (!tooltip || tooltip.opacity === 0) {
      return;
    }

    const x = tooltip.caretX;
    const y = tooltip.caretY;

    ctx.save();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#999";
    ctx.setLineDash([5, 5]);

    // Vertical line
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();

    ctx.restore();
  },
};
