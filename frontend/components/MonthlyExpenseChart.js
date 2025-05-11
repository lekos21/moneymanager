import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import LoadingAnimation from './LoadingAnimation';

const MonthlyExpenseChart = ({ 
  activeTab, 
  monthlyTotal, 
  weeklyTotal, 
  dailyExpenses, 
  weeklyExpenses,
  budget 
}) => {
  const [chartOptions, setChartOptions] = useState({});
  
  useEffect(() => {
    // Calculate budget progress
    const budgetProgress = budget ? (monthlyTotal / budget) * 100 : null;
    const budgetRemaining = budget ? budget - monthlyTotal : null;
    const budgetStatus = budgetRemaining && budgetRemaining < 0 ? 'over' : 'under';
    
    // Prepare chart data based on active tab
    if (activeTab === 'monthly') {
      // Use all days of the month instead of just the last 15
      const xAxisData = dailyExpenses.map(day => day.day);
      const seriesData = dailyExpenses.map(day => day.amount);
      
      // Calculate max value for better visualization
      const maxValue = Math.max(...seriesData, 1); // Ensure at least 1 to avoid division by zero
      
      setChartOptions({
        grid: {
          top: 20,
          right: '1%', 
          bottom: 30,
          left: '1%',
          containLabel: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // Format date as "May, 1" instead of "Day 1"
            const date = new Date();
            const month = date.toLocaleString('en-US', { month: 'short' });
            return `${month}, ${params[0].name}: $${params[0].value.toFixed(2)}`;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#fff',
          textStyle: {
            color: '#333'
          }
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            width: 2,
            type: 'dashed'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
              width: 2
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 10,
            interval: 1,
            align: 'center',
            margin: 12
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            barWidth: '40%', // Thinner bars like in the reference image
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255, 255, 255, 0.9)' },
                { offset: 1, color: 'rgba(255, 255, 255, 0.3)' }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(255, 255, 255, 1)' },
                  { offset: 1, color: 'rgba(255, 255, 255, 0.5)' }
                ])
              }
            }
          }
        ]
      });
    } else {
      // Weekly chart
      const xAxisData = weeklyExpenses.map(day => day.day);
      const seriesData = weeklyExpenses.map(day => day.amount);
      
      // Calculate max value for better visualization
      const maxValue = Math.max(...seriesData, 1); // Ensure at least 1 to avoid division by zero
      
      setChartOptions({
        grid: {
          top: 20, // Consistent with monthly
          right: '1%', // Consistent with monthly 
          bottom: 30, // Consistent with monthly
          left: '1%', // Consistent with monthly
          containLabel: false // Consistent with monthly
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            // Format date properly
            return `${params[0].name}: $${params[0].value.toFixed(2)}`;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#fff',
          textStyle: {
            color: '#333'
          }
        },
        axisPointer: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            width: 2,
            type: 'dashed'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)',
              width: 2 // Increased thickness
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 10
          },
          axisTick: {
            show: true, // Show ticks
            alignWithLabel: true, // Align ticks with labels
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)' // Match axis line color
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          // max: maxValue * 1.2 // Removed for simplification and consistency
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255, 255, 255, 0.9)' },
                { offset: 1, color: 'rgba(255, 255, 255, 0.3)' }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(255, 255, 255, 1)' },
                  { offset: 1, color: 'rgba(255, 255, 255, 0.5)' }
                ])
              }
            }
          }
        ]
      });
    }
  }, [activeTab, dailyExpenses, weeklyExpenses, monthlyTotal, weeklyTotal, budget]);

  return (
    <div className="rounded-3xl shadow-lg p-6 text-white overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #42A5F5, #cf8ef9, #fe9169)' }}>
      <div className="mb-2">
        <h2 className="text-sm font-medium text-white text-opacity-90">
          {activeTab === 'monthly' ? 'Monthly' : 'Weekly'} Expenses
        </h2>
      </div>
      <div className="flex justify-between items-end mb-4">
        <p className="text-4xl font-bold">
          $ {activeTab === 'monthly' ? monthlyTotal.toFixed(2) : weeklyTotal.toFixed(2)}
        </p>
      </div>
      
      {/* Budget Progress - Only shown if budget is set */}
      {budget && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-white">Budget Progress</span>
            <span className="text-xs font-medium text-white">
              {Math.min(100, Math.round((activeTab === 'monthly' ? monthlyTotal : weeklyTotal) / budget * 100))}%
            </span>
          </div>
          <div className="h-2.5 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full" 
              style={{ 
                width: `${Math.min(100, (activeTab === 'monthly' ? monthlyTotal : weeklyTotal) / budget * 100)}%`,
                background: (activeTab === 'monthly' ? monthlyTotal : weeklyTotal) > budget 
                  ? 'linear-gradient(90deg, #ff6b6b, #ff8787)' 
                  : 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.7))'
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1.5 text-white">
            <span>${(activeTab === 'monthly' ? monthlyTotal : weeklyTotal).toFixed(0)} spent</span>
            <span>${budget.toFixed(0)} budget</span>
          </div>
        </div>
      )}
      
      {/* ECharts Component */}
      <div className="mt-6">
        <div className="h-36"> 
          <ReactECharts
            option={chartOptions}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;
