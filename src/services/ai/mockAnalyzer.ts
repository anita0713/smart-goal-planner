/**
 * 提供模擬的AI分析功能
 * 用於開發和測試階段，模擬OpenAI API的返回結果
 */
import { Goal } from '../../types/goal';

export const analyzeMockGoal = async (goal: Goal): Promise<string> => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1000));

  const timeframeMap: Record<string, string> = {
    '1_month': '一個月',
    '3_months': '三個月',
    '6_months': '六個月',
    '1_year': '一年',
  };

  const timeframe = timeframeMap[goal.timeframe] || goal.timeframe;
  
  return `# ${goal.title} - 目標分析報告

## 1. 時間規劃分析
### 第一階段 (${timeframe}的前30%)
${generateFirstPhase(goal)}

### 第二階段 (${timeframe}的中間40%)
${generateSecondPhase(goal)}

### 第三階段 (${timeframe}的最後30%)
${generateFinalPhase(goal)}

## 2. 執行建議
${generateExecutionSuggestions(goal)}

## 3. 潛在挑戰與解決方案
${generateChallenges(goal)}

## 4. 進度追蹤指標
${generateProgressMetrics(goal)}
`;
};

// 輔助函數
function generateFirstPhase(goal: Goal): string {
  return `- 建立基礎知識框架
- 制定詳細學習計劃
- 收集學習資源
- 設定階段性目標`;
}

function generateSecondPhase(goal: Goal): string {
  return `- 深入技能培養
- 實踐與應用
- 定期評估進度
- 調整學習策略`;
}

function generateFinalPhase(goal: Goal): string {
  return `- 統整學習成果
- 實際應用測試
- 建立長期計劃
- 設定下一階段目標`;
}

function generateExecutionSuggestions(goal: Goal): string {
  return `- 每週固定學習時間：4-6小時
- 設置每日提醒機制
- 建立學習社群支持
- 定期回顧與調整`;
}

function generateChallenges(goal: Goal): string {
  return `### 時間管理
- 解決方案：使用番茄工作法
- 建議：設定提醒，堅持固定時間

### 學習效率
- 解決方案：使用間隔重複法
- 建議：製作複習計劃

### 持續動力
- 解決方案：設定階段性獎勵
- 建議：加入學習社群，相互督促`;
}

function generateProgressMetrics(goal: Goal): string {
  return `- 週評估：完成度檢查
- 月評估：技能測試
- 季度回顧：整體進展
- 最終評估：目標達成度`;
}