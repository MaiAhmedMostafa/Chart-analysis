import React from "react";
import { ILineData, ILesson } from "types/generalTypes";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./lineChart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * a common component to display line chart
 * @param labels :array of strings that will be displayed in the chart x-axis
 * @param datasets :array of objects .. each object represent a separate line with its values
 * @param className : className of lineChart container
 * @param onClick optional, onclick any point >> pass its value to the parent component
 * @param xAxis : field that represent x-axis
 * @param yAxis : field that represent y-axis
 * @param displayLegend : flag to show/hide chart legend
 */
const LineChart = ({
  labels,
  datasets,
  className,
  onClick,
  xAxis,
  yAxis,
  displayLegend = false,
}: {
  labels: string[];
  datasets: ILineData[];
  className?: string;
  onClick?: (value: ILesson) => void;
  xAxis: string;
  yAxis: string;
  displayLegend?: boolean;
}) => {
  return (
    <div className={`${className} line-chart__container`}>
      <Line
        data={{ labels, datasets }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: displayLegend,
            },
          },
          onClick: (evt, element) => {
            if (element.length > 0) {
              const ind: number = element[0].index;
              const datasetInd: number = element[0].datasetIndex;
              const data = datasets[datasetInd].data;
              if (onClick) {
                onClick(data[ind]); //passing the value
              }
            }
          },
          parsing: {
            xAxisKey: xAxis,
            yAxisKey: yAxis,
          },
          scales: {
            y: {
              min: 0,
            },
          },
        }}
      />
    </div>
  );
};

export default React.memo(LineChart);
