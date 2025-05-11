import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import LoadingAnimation from './LoadingAnimation';
import DynamicIcon from './DynamicIcon';
import TagIcon from './TagIcon';
import { useTags } from '../contexts/TagsContext';

const ExpenseDoughnutChart = ({ expenses, isLoading }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const { getTag } = useTags();

  useEffect(() => {
    if (!expenses || expenses.length === 0) {
      setCategoryData([]);
      setTotalAmount(0);
      return;
    }

    // Calculate total amount
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);

    // Group expenses by area tag
    const categoryMap = {};
    
    expenses.forEach(expense => {
      // Use the first area tag as the category
      if (expense.area_tags && expense.area_tags.length > 0) {
        expense.area_tags.forEach(tag => {
          if (!categoryMap[tag]) {
            categoryMap[tag] = {
              name: tag,
              amount: 0,
              count: 0,
              icon: expense.main_tag_icon || tag, // Use the icon from the expense if available, or the tag name itself
              tagId: expense.tag_id // Store tagId for click handling
            };
          }
          // Add the full expense amount to each tag
          categoryMap[tag].amount += expense.amount;
          categoryMap[tag].count += 1;
        });
      } else {
        // If no area tags, categorize as "Other"
        if (!categoryMap['Other']) {
          categoryMap['Other'] = {
            name: 'Other',
            amount: 0,
            count: 0,
            icon: 'HelpCircle'
          };
        }
        categoryMap['Other'].amount += expense.amount;
        categoryMap['Other'].count += 1;
      }
    });

    // Convert to array and calculate percentages
    const categories = Object.values(categoryMap).map(category => ({
      ...category,
      percentage: Math.round((category.amount / total) * 100)
    }));

    // Sort by amount (descending)
    categories.sort((a, b) => b.amount - a.amount);
    
    setCategoryData(categories);

    // Prepare chart data with colors directly from TagsContext
    const chartData = categories.map(category => {
      const tag = category.tagId ? getTag(category.tagId) : getTag(category.name);
      const color = tag?.colors?.hex || '#d1d5db'; // Use color from context tag
      
      return {
        name: category.name,
        value: category.amount,
        itemStyle: { color }
      };
    });

    // Set chart options
    setChartOptions({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const category = categories.find(c => c.name === params.name);
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
              <div>Amount: $${params.value.toFixed(2)}</div>
              <div>Percentage: ${params.percent}%</div>
              <div>Expenses: ${category ? category.count : 0}</div>
            </div>
          `;
        }
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        type: 'scroll',
        textStyle: {
          color: '#666'
        }
      },
      series: [
        {
          name: 'Expenses by Category',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false // Disable the label that appears when clicking on a slice
            },
            scale: true, // Keep the slice scaling effect
            scaleSize: 10 // Slightly expand the slice when clicked
          },
          labelLine: {
            show: false
          },
          data: chartData
        }
      ]
    });
  }, [expenses, getTag]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-6 flex items-center justify-center" style={{ minHeight: '300px' }}>
        <LoadingAnimation />
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col items-center justify-center" style={{ minHeight: '300px' }}>
        <DynamicIcon name="PieChart" className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500 text-center">No expense data available for this period</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Spending by Category</h2>
      <p className="text-sm text-gray-500 mb-4">Total: ${totalAmount.toFixed(2)}</p>
      
      <div className="h-80">
        <ReactECharts
          option={chartOptions}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      
      <div className="mt-4 space-y-3">
        {categoryData.map((category, index) => {
          const tag = category.tagId ? getTag(category.tagId) : getTag(category.name);
          const color = tag?.colors?.hex || '#d1d5db'; // Use color from context tag
          
          // Create percentage badge style
          const badgeStyle = {
            backgroundColor: `${color}20`, // 20 is hex for 12% opacity
            color: color
          };
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <TagIcon
                  iconName={tag?.icon || 'tag'}
                  iconColor={color}
                  size={20}
                  className="mr-2"
                  fallbackIcon="tag"
                />
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">${category.amount.toFixed(2)}</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={badgeStyle}>
                  {category.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseDoughnutChart;
