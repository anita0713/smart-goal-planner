/**
 * 進度追蹤相關的類型定義
 */

// 里程碑類型
export interface Milestone {
    id: string;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
  }
  
  // 進度記錄
  export interface Progress {
    id: string;
    goalId: string;
    date: string;
    completedTasks: string[];
    notes: string;
    score: number; // 0-100
    milestones: string[]; // 完成的里程碑ID
    mood: 'good' | 'neutral' | 'bad'; // 學習心情
  }
  
  // 進度更新請求
  export interface ProgressUpdate {
    date: string;
    tasks: string[];
    notes?: string;
    mood?: 'good' | 'neutral' | 'bad';
    completedMilestones?: string[];
  }
  
  // 進度統計
  export interface ProgressStats {
    totalProgress: number;
    weeklyProgress: {
      week: string;
      progress: number;
    }[];
    completedMilestones: string[];
    nextMilestones: string[];
    averageMood?: number; // 可選的心情平均值
  }
  
  // 進度追蹤組件屬性
  export interface ProgressTrackerProps {
    goalId: string;
    initialProgress?: Progress[];
    milestones: Milestone[];
    onUpdate: (update: ProgressUpdate) => Promise<void>;
    onMilestoneComplete: (milestoneId: string) => Promise<void>;
  }