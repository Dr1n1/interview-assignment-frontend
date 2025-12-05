import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { Button } from './Button';
import { IoMoon, IoSunny, IoRefresh } from 'react-icons/io5';

interface SettingsSectionProps {
  onResetData?: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ onResetData }) => {
  const { theme, setTheme, chartColors, setChartColors } = useUserStore();
  const [localBarColor, setLocalBarColor] = useState(chartColors.barChart);
  const [localPieColors, setLocalPieColors] = useState([...chartColors.pieChartColors]);

  useEffect(() => {
    setLocalBarColor(chartColors.barChart);
    setLocalPieColors([...chartColors.pieChartColors]);
  }, [chartColors]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleBarColorChange = (color: string) => {
    setLocalBarColor(color);
    setChartColors({ ...chartColors, barChart: color });
  };

  const handlePieColorChange = (index: number, color: string) => {
    const newPieColors = [...localPieColors];
    newPieColors[index] = color;
    setLocalPieColors(newPieColors);
    setChartColors({ ...chartColors, pieChartColors: newPieColors });
  };

  const addPieColor = () => {
    const newPieColors = [...localPieColors, '#10b981'];
    setLocalPieColors(newPieColors);
    setChartColors({ ...chartColors, pieChartColors: newPieColors });
  };

  const removePieColor = (index: number) => {
    if (localPieColors.length > 1) {
      const newPieColors = localPieColors.filter((_, i) => i !== index);
      setLocalPieColors(newPieColors);
      setChartColors({ ...chartColors, pieChartColors: newPieColors });
    }
  };

  const resetChartColors = () => {
    const defaultColors = {
      barChart: '#10b981',
      pieChartColors: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5', '#ecfdf5'],
    };
    setLocalBarColor(defaultColors.barChart);
    setLocalPieColors([...defaultColors.pieChartColors]);
    setChartColors(defaultColors);
  };

  const handleResetData = () => {
    if (onResetData) {
      onResetData();
    } else {
      if (window.confirm('Are you sure you want to reset all data? This will clear all changes and reload from the original CSV file.')) {
        localStorage.removeItem('user-management-storage');
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Settings
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Customize your application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Theme
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Switch between light and dark mode
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <IoMoon /> : <IoSunny />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Data Management
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Reset all data and reload from the original CSV file
              </p>
            </div>
            <Button
              variant="danger"
              onClick={handleResetData}
            >
              <IoRefresh /> Reset Data
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Chart Colors
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={resetChartColors}
            >
              Reset to Default
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Customize the colors used in your charts
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Bar Chart Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={localBarColor}
                onChange={(e) => handleBarColorChange(e.target.value)}
                className="w-20 h-12 md:w-16 md:h-12 rounded border border-gray-300 dark:border-gray-600 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={localBarColor}
                onChange={(e) => handleBarColorChange(e.target.value)}
                className="flex-1 h-12 md:h-12 px-3 text-base md:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="#10b981"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                Pie Chart Colors
              </label>
              <Button
                variant="secondary"
                size="sm"
                onClick={addPieColor}
              >
                Add Color
              </Button>
            </div>
            <div className="space-y-3 my-5 md:my-0">
              {localPieColors.map((color, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handlePieColorChange(index, e.target.value)}
                    className="w-20 h-12 md:w-16 md:h-12 rounded border border-gray-300 dark:border-gray-600 cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handlePieColorChange(index, e.target.value)}
                    className="flex-1 min-w-[120px] h-12 md:h-12 px-3 text-base md:text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="#10b981"
                  />
                  {localPieColors.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removePieColor(index)}
                      className="flex-shrink-0 h-12 md:h-12"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

