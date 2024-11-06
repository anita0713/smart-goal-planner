// src/services/ai/analyzer.ts
/**
 * 實際的AI分析服務
 * 整合OpenAI API，提供目標分析和建議
 * 待開發階段實現
 */
export enum Priority {
    High = 'high',
    Medium = 'medium',
    Low = 'low'
  }
  
  export interface Goal {
    title: string;
    description: string;
    timeframe: string;
    priority: Priority;
  }
  
  export async function analyzeGoal(goal: Goal) {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  }