import React from 'react';

interface AnalysisResultProps {
  analysis: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow">
      <div className="prose prose-blue max-w-none">
        {/* 先用簡單的文本顯示，之後再添加 Markdown 支持 */}
        <pre className="whitespace-pre-wrap">{analysis}</pre>
      </div>
    </div>
  );
};

export default AnalysisResult;