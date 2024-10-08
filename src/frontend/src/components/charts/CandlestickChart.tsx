import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartType,
  ChartData,
  ChartOptions,
  Element
} from 'chart.js';
// import { DeepPartial } from 'chart.js/types/utils';
import 'chartjs-adapter-date-fns';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
declare module 'chart.js' {
    interface ChartTypeRegistry {
      candlestick: {
        type: 'candlestick';
        element: typeof CandlestickElement;
        data: CandlestickData;
        dataset: CandlestickDataset;
        options: ChartOptions<'candlestick'>;
      };
    }
  }

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CandlestickController,
  CandlestickElement
);
interface CandlestickData {
  x: Date;
  o: number;
  h: number;
  l: number;
  c: number;
}

interface CandlestickDataset {
  type: 'candlestick';
  data: CandlestickData[];
  color: {
    up: string;
    down: string;
  };
  borderColor: {
    up: string;
    down: string;
  };
  borderWidth: number;
}


const CandlestickChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const createGradient = (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(38, 166, 154, 0.1)');
      gradient.addColorStop(1, 'rgba(38, 166, 154, 0)');
      return gradient;
    };

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data: CandlestickData[] = [
      { x: new Date('2024-01-01'), o: 120, h: 125, l: 115, c: 118 },
      { x: new Date('2024-01-02'), o: 118, h: 130, l: 116, c: 129 },
      { x: new Date('2024-01-03'), o: 129, h: 135, l: 126, c: 130 },
      { x: new Date('2024-01-04'), o: 130, h: 140, l: 128, c: 135 },
      { x: new Date('2024-01-05'), o: 135, h: 145, l: 132, c: 140 },
      { x: new Date('2024-01-06'), o: 140, h: 148, l: 137, c: 142 },
      { x: new Date('2024-01-07'), o: 142, h: 150, l: 140, c: 145 },
    ];

    const config = {
      type: 'candlestick' as const,
      data: {
        datasets: [{
          type: 'candlestick' as const,
          data: data,
          color: {
            up: '#26a69a',
            down: '#ef5350',
          },
          borderColor: {
            up: '#26a69a',
            down: '#ef5350',
          },
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index' as const,
        },
        scales: {
          x: {
            type: 'time' as const,
            time: {
              unit: 'day',
              displayFormats: {
                day: 'MMM d'
              }
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              drawBorder: false,
            },
            ticks: {
              color: '#fff',
              maxRotation: 0,
            }
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              drawBorder: false,
            },
            ticks: {
              color: '#fff',
              callback: (value: number) => `$${value}`
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context: any) => {
                const data = context.raw as CandlestickData;
                return [
                  `Open: $${data.o.toFixed(2)}`,
                  `High: $${data.h.toFixed(2)}`,
                  `Low: $${data.l.toFixed(2)}`,
                  `Close: $${data.c.toFixed(2)}`
                ];
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          }
        }
      }
    };

    // Create new chart instance
    chartInstanceRef.current = new Chart(canvas, config as any);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px', backgroundColor: '#1a1a1a' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CandlestickChart;