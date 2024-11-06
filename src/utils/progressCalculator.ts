/**
 * 進度計算相關的工具函數
 */
import { Progress, ProgressStats } from '../types/progress';

// 計算總體進度
export const calculateTotalProgress = (progresses: Progress[]): number => {
  if (progresses.length === 0) return 0;
  
  const totalScore = progresses.reduce((sum, p) => sum + p.score, 0);
  return Math.round(totalScore / progresses.length);
};

// 計算週進度
export const calculateWeeklyProgress = (progresses: Progress[]): { week: string; progress: number }[] => {
  const weeklyMap = new Map<string, number[]>();
  
  progresses.forEach(progress => {
    const date = new Date(progress.date);
    const weekKey = `${date.getFullYear()}-W${getWeekNumber(date)}`;
    
    const scores = weeklyMap.get(weekKey) || [];
    scores.push(progress.score);
    weeklyMap.set(weekKey, scores);
  });

  return Array.from(weeklyMap.entries()).map(([week, scores]) => ({
    week,
    progress: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
  })).sort((a, b) => a.week.localeCompare(b.week));
};

// 獲取完成的里程碑
export const getCompletedMilestones = (
  progresses: Progress[],
  milestones: string[]
): string[] => {
  const completedTasks = new Set(
    progresses.flatMap(p => p.completedTasks)
  );
  
  return milestones.filter(milestone => 
    completedTasks.has(milestone)
  );
};

// 獲取下一個里程碑
export const getNextMilestones = (
  completedMilestones: string[],
  allMilestones: string[],
  count: number = 3
): string[] => {
  const completed = new Set(completedMilestones);
  return allMilestones
    .filter(milestone => !completed.has(milestone))
    .slice(0, count);
};

// 輔助函數：獲取週數
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// 生成進度統計報告
export const generateProgressStats = (
  progresses: Progress[],
  milestones: string[]
): ProgressStats => {
  const totalProgress = calculateTotalProgress(progresses);
  const weeklyProgress = calculateWeeklyProgress(progresses);
  const completedMilestones = getCompletedMilestones(progresses, milestones);
  const nextMilestones = getNextMilestones(completedMilestones, milestones);

  return {
    totalProgress,
    weeklyProgress,
    completedMilestones,
    nextMilestones
  };
};