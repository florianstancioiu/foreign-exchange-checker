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
import { crosshairPlugin } from "./crosshairPlugin";
import { chartGradient } from "../../../helpers/chartGradient";
import { getChartDate } from "../../../helpers/dates";
import toFixed from "../../../helpers/toFixed";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  crosshairPlugin,
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
    labels: Array.isArray(labels) ? labels : [],
    datasets: [
      {
        label: title.trim().length > 0 ? title : "Untitled dataset",
        data: Array.isArray(data) ? data : [],
        fill: true,
        backgroundColor: chartGradient,
        borderColor: "#CEF739",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-neutral-700 py-4 px-3 rounded-2xl border border-neutral-600 xl:p-5 light:bg-blue-100 light:border-blue-200">
      <div className="flex justify-between items-center mb-5">
        <p
          className="text-base font-medium leading-[120%] tracking-[1px] text-neutral-50 uppercase light:text-neutral-900"
          data-testid="line_chart_base_quote_currencies"
        >
          {baseCurrency}/{quoteCurrency}
        </p>
        <p
          className="text-neutral-50 opacity-70 font-normal text-xs leading-[120%] tracking-[0.5px] light:text-neutral-900"
          data-testid="line_chart_rate"
        >
          {toFixed(rate, 4)} · {getChartDate()}
        </p>
      </div>
      <div>
        <Line
          data={chartData}
          options={{
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              tooltip: {
                enabled: true,
                intersect: false,
              },
              legend: {
                display: false, // hide the legend
              },
            },
            scales: {
              x: {
                ticks: {
                  align: "start",
                  maxTicksLimit: 5, // limit the number of bottom labels to 5
                },
              },
              y: {
                ticks: {
                  maxTicksLimit: 10, // limit the number of left side labels to 3
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
