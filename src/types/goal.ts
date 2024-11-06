
/**
 * 定義目標相關的類型和接口
 * 包含目標屬性、表單Props和分析結果的類型定義
 */
export type Priority = "high" | "medium" | "low";

export interface Goal {
  title: string;
  description: string;
  timeframe: string;
  priority: Priority;
}

export interface GoalInputProps {
  onSubmit: (goal: Goal) => Promise<void>;
  isLoading?: boolean;
}

