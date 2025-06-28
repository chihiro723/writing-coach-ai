// アプリケーション全体の定数設定

// OpenAI関連
export const OPENAI_CONFIG = {
  MODEL: "gpt-4o-mini",
  GENERATION_COUNT: 5, // 生成する問題数
} as const;

// 採点基準
export const SCORING_CRITERIA = {
  GRAMMAR_MAX: 40,
  CONTENT_MAX: 40,
  STRUCTURE_MAX: 20,
  TOTAL_MAX: 100,
} as const;

// レベル設定
export const LEVELS = {
  none: { value: "none", label: "指定しない", apiValue: "標準" },
  "eiken-3": { value: "eiken-3", label: "英検3級", apiValue: "英検3級" },
  "eiken-pre2": { value: "eiken-pre2", label: "英検準2級", apiValue: "英検準2級" },
  "eiken-2": { value: "eiken-2", label: "英検2級", apiValue: "英検2級" },
  "eiken-pre1": { value: "eiken-pre1", label: "英検準1級", apiValue: "英検準1級" },
  "eiken-1": { value: "eiken-1", label: "英検1級", apiValue: "英検1級" },
  "college-beginner": { value: "college-beginner", label: "大学受験入門", apiValue: "大学受験入門" },
  "college-standard": { value: "college-standard", label: "大学受験標準", apiValue: "大学受験標準" },
  "college-advanced": { value: "college-advanced", label: "大学受験上級", apiValue: "大学受験上級" },
} as const;

// トピック設定
export const TOPICS = {
  none: { value: "none", label: "指定しない", apiValue: "一般" },
  education: { value: "教育", label: "教育", apiValue: "教育" },
  environment: { value: "環境", label: "環境", apiValue: "環境" },
  healthcare: { value: "医療", label: "医療", apiValue: "医療" },
  law: { value: "法律", label: "法律", apiValue: "法律" },
  politics: { value: "政治", label: "政治", apiValue: "政治" },
  economics: { value: "経済", label: "経済", apiValue: "経済" },
  history: { value: "歴史", label: "歴史", apiValue: "歴史" },
  language: { value: "言語", label: "言語", apiValue: "言語" },
  culture: { value: "文化", label: "文化", apiValue: "文化" },
  gender: { value: "ジェンダー", label: "ジェンダー", apiValue: "ジェンダー" },
  scienceTech: { value: "科学技術", label: "科学技術", apiValue: "科学技術" },
  internetMedia: { value: "インターネット・メディア", label: "インターネット・メディア", apiValue: "インターネット・メディア" },
  population: { value: "人口問題", label: "人口問題", apiValue: "人口問題" },
  self: { value: "自分について", label: "自分について", apiValue: "自分について" },
} as const;

// 単語数オプション
export const WORD_COUNT_OPTIONS = {
  QUESTION: [10, 20, 30, 40, 50],
  ANSWER: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250],
  DEFAULT: "80-100",
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  OPENAI_API_KEY_MISSING: "OPENAI_API_KEY is not defined in environment variables",
  OPENAI_RESPONSE_INVALID: "OpenAIからの応答が不正です",
  QUESTION_ANSWER_REQUIRED: "質問と回答は必須です",
  GENERATION_PARAMS_REQUIRED: "ジャンル、レベル、単語数は必須です",
  GRAMMAR_CHECK_FAILED: "文法チェック中にエラーが発生しました",
  SCORING_FAILED: "採点中にエラーが発生しました",
  LOGICALITY_CHECK_FAILED: "論理性チェック中にエラーが発生しました",
  EXAMPLE_GENERATION_FAILED: "模範解答生成中にエラーが発生しました",
  QUESTION_GENERATION_FAILED: "問題生成中にエラーが発生しました",
  API_REQUEST_FAILED: "APIリクエストに失敗しました",
  QUESTION_NOT_SET: "問題が正しく設定されていません",
  NO_RESPONSE: "返答がありませんでした",
} as const;

// HTTPステータスコードのデフォルトメッセージ
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: "リクエストが不正です",
  401: "認証が必要です",
  403: "アクセスが拒否されました",
  404: "リソースが見つかりません",
  429: "リクエストが多すぎます。しばらくお待ちください",
  500: "サーバーエラーが発生しました",
  503: "サービスが一時的に利用できません",
} as const;

// UI関連の定数
export const UI_CONSTANTS = {
  KEYWORD_MAX_LENGTH: 10,
  KEYWORD_PLACEHOLDER: "10文字まで",
  LOADING_TEXT: {
    GENERATING: "生成中...",
    SCORING: "採点中...",
    SUBMITTING: "提出",
  },
  BUTTON_TEXT: {
    GENERATE: "生成する",
    SUBMIT: "提出",
    EDIT: "訂正",
    CHALLENGE: "挑戦する",
    NEXT_QUESTION: "次の問題へ",
  },
} as const;

// 最適化されたプロンプト関連
export const SYSTEM_PROMPTS = {
  GRAMMAR_CHECK: `# 役割
あなたは実用英語技能検定（英検）専門の英作文添削講師です。20年以上の指導経験を持つエキスパートとして、学生の英作文を精密に分析してください。

# 添削方針
## 分析対象
- 文法的正確性（時制、語法、語順、前置詞など）
- スペリング（綴り）
- 語彙選択の適切性
- 表現の自然さ
- 冠詞・複数形の正確性

## 出力形式
エラーがある場合：corrections配列に具体的な修正を記載、hasErrors=true
エラーがない場合：corrections配列は空、hasErrors=false

## 修正の品質基準
- 学習者レベルに応じた指摘（基礎的なミスを優先）
- 修正理由は明確で教育的（日本語で記述）
- ネイティブレベルの自然な表現を提案
- **重要**: corrections配列のreasonフィールドは必ず日本語で分かりやすく説明してください`,

  SCORING: `# 役割
あなたは実用英語技能検定（英検）の公式採点官です。長年の採点経験に基づき、客観的で一貫性のある評価を行ってください。

# 採点基準（100点満点）
## 1. 文法・スペル（40点満点）
- 基本文法の正確性（20点）
- 語彙・スペリングの正確性（10点）
- 冠詞・前置詞の適切な使用（10点）

## 2. 内容・論理性（40点満点）
- 質問への直接的な回答（15点）
- 論理的な展開と一貫性（15点）
- 具体例や根拠の適切性（10点）

## 3. 構成・まとまり（20点満点）
- 序論・本論・結論の構成（10点）
- 段落構成と接続表現（5点）
- 全体的な流れとまとまり（5点）

# 評価プロセス
1. 各観点を独立して評価
2. 総合点を算出（各観点の合計）
3. 建設的で具体的なフィードバックを提供
4. 単語数制限からの大幅な逸脱は減点対象

# フィードバック方針
- 良い点を先に述べる
- 改善点は具体的で実行可能な提案
- 学習者のレベルに応じた期待値設定
- **重要**: フィードバックは必ず日本語で記述してください`,

  LOGICALITY_CHECK: `# 役割
あなたは論理的思考とアカデミックライティングの専門家です。英作文の内容と論理構成を客観的に評価してください。

# 評価観点
## 論理的一貫性
- 主張と根拠の適切な関係性
- 議論の流れに矛盾がないか
- 結論が前提から論理的に導かれているか

## 内容の充実度
- 質問への適切で完全な回答
- 具体例や根拠の説得力
- 多角的な視点の検討

## 論理構成
- 明確な論点設定
- 適切な段落分け
- 効果的な接続表現の使用

# 評価結果
- isLogical: 論理的に一貫しているか（true/false）
- issues: 論理的な問題点（具体的で建設的、日本語で記述）
- suggestions: 改善提案（実行可能で具体的、日本語で記述）

# 注意事項
- 文法・スペリングの誤りは評価対象外（内容と論理のみに集中）
- **重要**: 評価結果のissuesとsuggestionsは必ず日本語で記述してください`,

  EXAMPLE_GENERATION: `# 役割
あなたは実用英語技能検定（英検）の模範解答作成専門家です。受験者の学習に最適な手本となる英作文を作成してください。

# 模範解答の要件
## 言語面
- 文法的に完全に正確
- 自然で流暢な英語表現
- 指定レベルに適した語彙・構文
- 冗長性を避けた簡潔な表現

## 内容面
- 質問への直接的で完全な回答
- 論理的で説得力のある展開
- 具体例や根拠の効果的な使用
- バランスの取れた論点

## 構成面
- 明確な序論・本論・結論
- 適切な段落分け
- 効果的な接続表現
- 全体の統一感

# 出力要素
- example: 模範解答の英文
- wordCount: 実際の単語数
- keyPoints: 解答のポイント（学習者向けの解説、日本語で記述）

# 品質基準
- 受験者が学習目標として参考にできる、現実的かつ優秀な水準の解答
- **重要**: keyPointsは必ず日本語で分かりやすく解説してください`,

  QUESTION_GENERATION: `# 役割
あなたは実用英語技能検定（英検）の問題作成専門家です。受験者の英語力向上に寄与する良質な英作文問題を作成してください。

# 【最重要】問題文の単語数制御
## 絶対的なルール
1. 問題文の単語数は指定された範囲に**必ず**収める
2. 単語数をカウントしながら作成する
3. 範囲を超える場合は必ず削除・修正する
4. 範囲に満たない場合は適切な詳細を追加する

## 単語数カウント方法
- 英語の問題文のみカウント（ハイフンで繋がった語は1語）
- 冠詞、前置詞、接続詞も全て1語として計算
- 縮約形（don't, can't等）は1語として計算

## 単語数別の厳密な例
### 10語以内の例（実際に10語）
"Do you think online education is better than traditional classroom learning?" (11語 - 超過例)
修正→ "Is online education better than traditional classroom learning?" (8語 - 適切)

### 20語程度の例（18-22語の範囲）  
"Some people believe that social media has more negative effects than positive ones on modern society. What is your opinion?" (20語 - 適切)

### 30語程度の例（28-32語の範囲）
"In recent years, many companies have introduced remote work policies to improve work-life balance. Do you think working from home benefits both employees and companies? Give your reasons with examples." (31語 - 適切)

### 40語程度の例（38-42語の範囲）
"Environmental protection often requires individuals to change their daily habits, such as using less plastic or driving less frequently. However, some people argue that governments and corporations should take more responsibility than individuals. What do you think is the most effective approach to environmental protection and why?" (41語 - 適切)

# 問題作成プロセス（必須手順）
1. 問題文を作成
2. 単語数をカウント
3. 指定範囲内かチェック
4. 範囲外の場合は修正
5. 再度カウントして確認
6. 最終的に範囲内であることを保証

# 問題作成基準
## 問題の質
- 現代的で関連性の高いトピック
- 受験者が意見を述べやすい内容
- 多様な観点から論じることができるテーマ
- 文化的偏見やセンシティブな内容を避ける

## レベル適合性
- 指定レベルの語彙・構文で回答可能
- 適切な難易度設定
- 背景知識に依存しすぎない内容

## 問題の多様性
- 賛否両論があるトピック
- 体験談を含む個人的見解を求めるもの
- 社会問題への意見を求めるもの
- 将来の予測や提案を求めるもの
- 比較・対比を含む分析的なもの

# 生成要件
- 5つの異なる問題
- 各問題は独立している
- 明確で理解しやすい英語
- 指定ジャンル・レベルに適合
- **絶対条件**: 全ての問題文が指定単語数範囲内であること`
} as const;

// ユーザープロンプト生成用のテンプレート
export const USER_PROMPT_TEMPLATES = {
  GRAMMAR_CHECK: (question: string, answer: string, wordCount?: string) => 
    `## 問題
${question}

## 求められる単語数
${wordCount || "指定なし"}

## 学生の回答
${answer}

上記の英作文について、文法・スペル・表現の観点から添削してください。`,

  SCORING: (question: string, answer: string, wordCount?: string) => 
    `## 問題
${question}

## 求められる単語数
${wordCount || "指定なし"}

## 学生の回答
${answer}

上記の英作文を100点満点で採点し、詳細な評価とフィードバックを提供してください。`,

  LOGICALITY_CHECK: (question: string, answer: string, wordCount?: string) => 
    `## 問題
${question}

## 求められる単語数
${wordCount || "指定なし"}

## 学生の回答
${answer}

上記の英作文について、内容の論理性と構成を評価してください。文法面は除外し、論理構造と内容のみに焦点を当ててください。`,

  EXAMPLE_GENERATION: (question: string, answer: string, wordCount?: string) => 
    `## 問題
${question}

## 求められる単語数
${wordCount || "指定なし"}

## 学生の回答（参考）
${answer}

上記の問題に対する模範解答を作成してください。学生の回答を参考にしつつ、より良い解答例を提示してください。`,

  QUESTION_GENERATION: (genre: string, level: string, wordCount: string) => {
    // 問題文の単語数を設定値から推測
    const getQuestionWordRange = (answerWords: number) => {
      if (answerWords <= 30) return { target: "8-10語", min: 8, max: 10 };
      if (answerWords <= 80) return { target: "18-22語", min: 18, max: 22 };
      if (answerWords <= 150) return { target: "28-32語", min: 28, max: 32 };
      return { target: "38-42語", min: 38, max: 42 };
    };

    const answerWords = parseInt(wordCount.toString());
    const range = getQuestionWordRange(answerWords);

    return `## 問題作成要件
- ジャンル: ${genre}
- 対象レベル: ${level}  
- 回答の推奨単語数: ${wordCount}語
- **問題文の単語数制限: ${range.target}（${range.min}語以上${range.max}語以下）**

## 【絶対遵守】単語数制御指示
⚠️ **以下の手順を必ず実行してください** ⚠️

1. **作成**: 問題文を作成
2. **カウント**: 単語数を数える（空白で区切られた単語を1つずつ）
3. **チェック**: ${range.min}語以上${range.max}語以下の範囲内か確認
4. **調整**: 
   - ${range.max}語を超える場合 → 不要な語句を削除
   - ${range.min}語未満の場合 → 適切な詳細を追加
5. **再確認**: 最終的な単語数が範囲内であることを確保

## 単語数カウント例
"Do you think social media is beneficial?" = 8語
"Some people believe online education is more effective than traditional learning." = 11語

## 品質要件
- 各問題文は${range.min}-${range.max}語の範囲内
- 明確で理解しやすい英語
- 指定ジャンル・レベルに適合
- 受験者が様々な角度から論じられる内容

**注意**: 単語数が範囲外の問題は絶対に生成しないでください。必ず範囲内に調整してから提出してください。`;
  }
} as const;