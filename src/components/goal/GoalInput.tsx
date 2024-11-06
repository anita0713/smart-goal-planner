import React, { useState } from 'react';
import { Priority } from '../../types/goal';

interface GoalFormData {
  title: string;
  description: string;
  timeframe: string;
  priority: Priority;
}

interface GoalInputProps {
  onSubmit: (data: GoalFormData) => void;
}

const GoalInput: React.FC<GoalInputProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<GoalFormData>({
    title: '',
    description: '',
    timeframe: '',
    priority: 'medium'
  });

  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 基本驗證
    if (!formData.title.trim()) {
      setError('請輸入目標標題');
      return;
    }
    if (!formData.description.trim()) {
      setError('請輸入目標描述');
      return;
    }
    if (!formData.timeframe) {
      setError('請選擇時間框架');
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          目標標題
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="例：學習西班牙語"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          詳細描述
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="描述你的目標細節..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
            時間框架
          </label>
          <select
            id="timeframe"
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">選擇時間</option>
            <option value="1_week">一週</option>
            <option value="1_month">一個月</option>
            <option value="3_months">三個月</option>
            <option value="6_months">半年</option>
            <option value="1_year">一年</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            優先級
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        開始分析
      </button>
    </form>
  );
};

export default GoalInput;