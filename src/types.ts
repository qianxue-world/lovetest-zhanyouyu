export interface Question {
  question: string;
  options: Option[];
}

export interface Option {
  text: string;
  score: number; // 0-3分，代表占有欲程度
}

export interface TestResult {
  score: number; // 0-100分
  level: string; // 占有欲等级
  title: string; // 结果标题
  description: string; // 详细描述
  advice: string; // 建议
}
