// src/app/api/analyze/route.ts

import { NextResponse } from 'next/server';
import { type Goal } from '@/services/ai/analyzer';

function generateMockAnalysis(goal: Goal) {
  return `
# ${goal.title} - 目標分析報告

## 1. 目標分解
### 準備階段（${goal.timeframe}的前30%）
- 收集所需資源和材料
- 制定詳細學習計劃
- 建立學習環境

### 執行階段（${goal.timeframe}的中間50%）
- 每週固定學習時間安排
- 實際操作和練習
- 定期複習和測試

### 鞏固階段（${goal.timeframe}的最後20%）
- 總結學習成果
- 實戰應用
- 建立長期計劃

## 2. 時間分配建議
- 每日固定時段：2小時
- 週末集中學習：4小時
- 彈性復習時間：1小時

## 3. 重要里程碑
1. 第一週：完成基礎概念學習
2. 第二週：開始實際操練
3. 第三週：達到基本對話能力

## 4. 潛在挑戰和解決方案
### 挑戰1：時間管理
- 解決方案：使用番茄工作法
- 建議：設定提醒，堅持固定時間

### 挑戰2：學習動力
- 解決方案：設立階段性獎勵
- 建議：加入學習社群，相互督促

### 挑戰3：學習效果
- 解決方案：多實際練習
- 建議：尋找練習夥伴

## 5. 成功指標
- 短期：完成每週學習目標
- 中期：達到階段性里程碑
- 長期：實現最終學習目標

優先級：${goal.priority}
預期完成時間：${goal.timeframe}
`;
}

export async function POST(request: Request) {
  try {
    const goal: Goal = await request.json();
    
    // 使用模擬數據
    const analysis = generateMockAnalysis(goal);

    return NextResponse.json({
      success: true,
      data: analysis
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}