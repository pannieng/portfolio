"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export default function LineChart4() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.5)")
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)")

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Visitors",
            data: [1200, 1900, 3000, 5000, 6000, 4500, 3500, 4200, 5800, 7500, 8500, 9800],
            borderColor: "rgb(124, 58, 237)",
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "rgb(124, 58, 237)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              borderDash: [5, 5],
            },
            ticks: {
              callback: (value) => {
                if (value >= 1000) {
                  return value / 1000 + "k"
                }
                return value
              },
            },
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
