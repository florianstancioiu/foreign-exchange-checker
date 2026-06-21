import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const options = {
  plugins: {
    legend: {
      display: false, // hide the legend
    },
  },
};

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: (context: ScriptableContext<"line">) => {
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
        gradient.addColorStop(1, "#CEF739");
        return gradient;
      },
      borderColor: "#CEF739",
      tension: 0.1,
    },
  ],
};

const LineChart = () => {
  return (
    <div className="bg-neutral-700 py-4 px-3 rounded-2xl border border-neutral-600 xl:p-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
          USD/EUR
        </p>
        <p className="text-neutral-50 opacity-70 font-normal text-xs leading-[120%] tracking-[0.5px]">
          0.8530 · MAY 14<span className="hidden sm:inline"> 16:00 CET</span>
        </p>
      </div>
      <div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
