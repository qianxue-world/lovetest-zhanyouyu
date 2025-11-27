import React from 'react';
import { TestResult } from '../types';
import './ResultScreen.css';

interface ResultScreenProps {
  result: TestResult;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ result }) => {
  // 根据分数计算进度条颜色
  const getScoreColor = (score: number) => {
    if (score <= 20) return '#A8E6CF'; // 绿色
    if (score <= 40) return '#FFD3B6'; // 浅橙色
    if (score <= 60) return '#FFAAA5'; // 粉色
    if (score <= 80) return '#FF8B94'; // 深粉色
    return '#FF6B6B'; // 红色
  };

  const scoreColor = getScoreColor(result.score);

  return (
    <div className="result-screen">
      {/* 分数展示 */}
      <div className="score-display">
        <div className="score-circle" style={{ borderColor: scoreColor }}>
          <div className="score-number" style={{ color: scoreColor }}>
            {result.score}
          </div>
          <div className="score-label">分</div>
        </div>
        <div className="score-level" style={{ color: scoreColor }}>
          {result.level}
        </div>
      </div>

      {/* 结果标题 */}
      <div className="result-title">
        <h2>{result.title}</h2>
      </div>

      {/* 进度条 */}
      <div className="score-bar-container">
        <div className="score-bar">
          <div 
            className="score-bar-fill" 
            style={{ 
              width: `${result.score}%`,
              background: `linear-gradient(90deg, ${scoreColor}88, ${scoreColor})`
            }}
          />
        </div>
        <div className="score-labels">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>

      {/* 描述 */}
      <div className="result-description">
        <h3>💕 你的恋爱画像</h3>
        <p>{result.description}</p>
      </div>

      {/* 建议 */}
      <div className="result-advice">
        <h3>💡 给你的小建议</h3>
        <p>{result.advice}</p>
      </div>

      {/* 分享按钮 */}
      <div className="share-section">
        <button 
          className="share-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: '恋爱占有欲测试',
                text: `我的占有欲分数是${result.score}分，${result.level}！快来测测你的吧～`,
                url: window.location.href
              });
            } else {
              alert('分享功能暂不支持，请手动复制链接分享～');
            }
          }}
        >
          分享结果 💌
        </button>
      </div>
    </div>
  );
};
