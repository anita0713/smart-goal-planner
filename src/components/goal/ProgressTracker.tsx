/**
 * 進度追蹤組件
 * 展示目標完成進度、統計數據和階段性建議
 */
import React, { useState, useEffect } from 'react';
import { ProgressTrackerProps, Progress, ProgressStats, ProgressUpdate } from '../../types/progress';

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  goalId,
  initialProgress = [],
  onUpdate
}) => {
  const [progress, setProgress] = useState<Progress[]>(initialProgress);
  const [stats, setStats] = useState<ProgressStats | null>(null);

  // 更新進度
  const handleProgressUpdate = async (update: ProgressUpdate) => {
    try {
      await onUpdate(update);
      calculateStats();
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  // 計算統計數據
  const calculateStats = () => {
    if (progress.length === 0) {
      setStats(null);
      return;
    }

    // 實現統計計算邏輯
    const totalProgress = progress.reduce((sum, p) => sum + p.score, 0) / progress.length;
    
    setStats({
      totalProgress,
      weeklyProgress: [],  // 待實現
      completedMilestones: [],  // 待實現
      nextMilestones: []  // 待實現
    });
  };

  useEffect(() => {
    calculateStats();
  }, [progress]);

  return (
    <div className="space-y-6">
      {/* 進度統計 */}
      {stats && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">進度統計</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">總體完成度</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${stats.totalProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;