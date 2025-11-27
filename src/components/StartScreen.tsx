import React from 'react';
import './StartScreen.css';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="title-section">
        <h1>💕 恋爱占有欲测试 💕</h1>
        <p className="subtitle">测测你对另一半的控制欲有多强？</p>
      </div>
      
      <div className="intro-section">
        <div className="intro-icon">💑</div>
        <p className="intro-text">
          在恋爱中，你是自由飞翔的小鸟，还是粘人的小猫咪？
          <br />
          通过30道生活场景题，了解你的恋爱占有欲指数～
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>30道场景题</h3>
          <p>真实的恋爱日常场景</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>科学评分</h3>
          <p>0-100分精准测评</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>专业建议</h3>
          <p>给你的恋爱小贴士</p>
        </div>
      </div>

      <div className="test-info">
        <p>⏱️ 预计用时：3-5分钟</p>
        <p>🎯 请根据真实感受作答</p>
      </div>

      <div className="btn" onClick={onStart}>
        <p>开始测试 💖</p>
      </div>
    </div>
  );
};
