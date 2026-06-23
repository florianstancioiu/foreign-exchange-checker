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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartGradient } from "../../../helpers/chartGradient";

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

export type LineChartProps = {
  data: number[];
  labels: string[];
  title: string;
  baseCurrency: string;
  quoteCurrency: string;
  rate: number;
};

const LineChart = ({
  data,
  labels,
  title,
  baseCurrency,
  quoteCurrency,
  rate,
}: LineChartProps) => {
  const chartData = {
    labels: Array.isArray(labels)
      ? labels
      : ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: title.trim().length > 0 ? title : "Untitled dataset",
        data: Array.isArray(data) ? data : [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: chartGradient,
        borderColor: "#CEF739",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-neutral-700 py-4 px-3 rounded-2xl border border-neutral-600 xl:p-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50">
          {baseCurrency}/{quoteCurrency}
        </p>
        <p className="text-neutral-50 opacity-70 font-normal text-xs leading-[120%] tracking-[0.5px]">
          {rate.toFixed(4)} · MAY 14
          <span className="hidden sm:inline"> 16:00 CET</span>
        </p>
      </div>
      <div>
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // hide the legend
              },
            },
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 5, // limit the number of bottom labels to 5
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
