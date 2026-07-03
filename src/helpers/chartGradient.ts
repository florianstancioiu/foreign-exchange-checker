import { type ScriptableContext } from "chart.js";

export const chartGradient = (context: ScriptableContext<"line">) => {
  const lightModeIsOn = localStorage.getItem("lightMode:v1") === "true";
  const gradientColorStopOne = lightModeIsOn ? "#155dfc" : "#CEF739";

  const chart = context.chart;
  const { ctx, chartArea } = chart;

  if (!chartArea) {
    return;
  }

  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top,
  );

  gradient.addColorStop(0, "#0000");
  gradient.addColorStop(1, gradientColorStopOne);

  return gradient;
};
