'use client';

import { useState } from 'react';
import GoalInput from '../components/goal/GoalInput';
import AnalysisResult from '../components/goal/AnalysisResult';
import { analyzeGoal } from '../services/ai/analyzer';

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

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
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          智能目標規劃助手
        </h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <GoalInput onSubmit={handleGoalSubmit} isLoading={isAnalyzing} />
        
        {analysisResult && (
          <AnalysisResult analysis={analysisResult} />
        )}
      </div>
    </main>
  );
}