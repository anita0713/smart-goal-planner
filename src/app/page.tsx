// src/app/page.tsx
'use client';
import { GoalInput } from '../components/goal/GoalInput';
import { AnalysisResult } from '../components/goal/AnalysisResult';
import { analyzeGoal } from '../services/ai/analyzer';
import { useState } from 'react';

export default function Home() {
  // 狀態管理
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // 處理目標提交
  const handleGoalSubmit = async (goal: {
    title: string;
    description: string;
    timeframe: string;
    priority: 'high' | 'medium' | 'low';
  }) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeGoal(goal);
      setAnalysisResult(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析過程發生錯誤');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Smart Goal Planner</h1>
      
      {/* 目標輸入區域 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
        <GoalInput onSubmit={handleGoalSubmit} isLoading={isAnalyzing} />
      </div>

      {/* 分析結果顯示區域 */}
      {error && (
        <div className="bg-red-50 p-4 mb-4 rounded text-red-600">
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>
          <AnalysisResult result={analysisResult} />
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center p-4">
          <p>Analyzing your goal...</p>
        </div>
      )}
    </main>
  );
}