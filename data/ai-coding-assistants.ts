export type AICodingCategory = "code-completion" | "ai-ide" | "code-review" | "testing-debugging" | "documentation";

export interface AICodingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AICodingCategory;
  tags: string[];
  url: string;
  affiliateUrl?: string;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
  logo: string;
  domain?: string;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
}

export const AI_CODING_CATEGORIES: Record<AICodingCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "code-completion": { label: "Code Completion", emoji: "⚡", description: "Inline AI suggestions that autocomplete code as you type in your editor.", gradient: "from-green-600/30 to-emerald-800/40" },
  "ai-ide": { label: "AI-Native IDEs", emoji: "💻", description: "Full development environments built from the ground up with AI at the core.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "code-review": { label: "Code Review & Analysis", emoji: "🔍", description: "AI tools that review pull requests, find bugs, and suggest improvements.", gradient: "from-purple-600/30 to-violet-800/40" },
  "testing-debugging": { label: "Testing & Debugging", emoji: "🧪", description: "AI-powered tools for generating tests, finding bugs, and debugging code.", gradient: "from-orange-600/30 to-red-800/40" },
  "documentation": { label: "Documentation & Explanation", emoji: "📝", description: "Tools that generate documentation, explain code, and create technical content.", gradient: "from-teal-600/30 to-cyan-800/40" },
};

export const AI_CODING_TOOLS: AICodingTool[] = [
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "The original AI pair programmer, now with chat, agents, and multi-file editing",
    description: "GitHub Copilot is the most widely adopted AI coding assistant, used by millions of developers. It started as inline code completion and has evolved into a full AI development platform with chat, workspace agents, multi-file editing, and CLI integration. Copilot integrates natively with VS Code, JetBrains, Neovim, and Visual Studio. Its deep GitHub integration means it understands your repos, PRs, and issues. Copilot X features include pull request summaries, documentation generation, and voice coding.",
    category: "code-completion",
    tags: ["github copilot", "code completion", "ai pair programmer", "vs code", "jetbrains", "github"],
    url: "https://github.com/features/copilot",
    pricing: "freemium",
    featured: true,
    logo: "🐙",
    domain: "github.com",
    pros: ["Largest user base — battle-tested by millions of developers daily", "Deep GitHub integration for PRs, issues, and repository context", "Works in VS Code, JetBrains, Neovim, Visual Studio, and CLI", "Free tier for individual developers and students", "Agent mode for multi-file autonomous coding tasks"],
    cons: ["Code suggestions can sometimes be subtly wrong or insecure", "Enterprise features require the most expensive tier", "Context window limitations can miss important project context", "Privacy concerns about code being sent to cloud for processing"],
    useCases: ["Getting inline code suggestions while writing in your preferred IDE", "Using chat to explain unfamiliar codebases or debug errors", "Generating boilerplate code, tests, and documentation from comments"],
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "AI-native code editor built on VS Code with powerful multi-file editing",
    description: "Cursor is a fork of VS Code rebuilt with AI at the core. Its standout feature is Composer — an agent that can edit multiple files simultaneously to implement features, refactor code, and fix bugs across your codebase. Cursor understands your entire project through codebase indexing and provides context-aware suggestions. Tab completion predicts multi-line edits, and the chat lets you ask questions about your code with full project context. It has quickly become the preferred editor for AI-first developers.",
    category: "ai-ide",
    tags: ["cursor", "ai ide", "code editor", "vs code fork", "multi-file editing", "composer"],
    url: "https://cursor.com",
    pricing: "freemium",
    featured: true,
    logo: "🖱️",
    domain: "cursor.com",
    pros: ["Composer agent can edit multiple files simultaneously for complex changes", "Full codebase indexing provides deeply context-aware suggestions", "VS Code compatibility — all your extensions and keybindings work", "Supports multiple AI models (GPT-4, Claude, etc.)", "Tab completion predicts multi-line edits intelligently"],
    cons: ["Subscription required for heavy usage — free tier is limited", "Being a VS Code fork means it may lag behind VS Code updates", "Can be resource-intensive on older machines", "Some developers prefer staying in their existing editor"],
    useCases: ["Implementing a full feature across multiple files with Composer", "Refactoring a codebase by describing the desired changes in natural language", "Quickly understanding and navigating an unfamiliar codebase via chat"],
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    tagline: "Anthropic's agentic coding tool that lives in your terminal",
    description: "Claude Code is Anthropic's AI coding agent that operates directly in your terminal. Unlike IDE-based tools, it understands your entire codebase, can run commands, edit files, create commits, and execute multi-step development tasks autonomously. It excels at large-scale refactoring, debugging complex issues, and implementing features end-to-end. Claude Code uses Claude's 200K context window to reason about large codebases and maintains a development loop of thinking, editing, testing, and iterating.",
    category: "ai-ide",
    tags: ["claude code", "anthropic", "terminal", "agentic coding", "cli", "autonomous"],
    url: "https://docs.anthropic.com/en/docs/claude-code",
    pricing: "paid",
    featured: true,
    logo: "🟤",
    domain: "anthropic.com",
    pros: ["Terminal-native — works with any editor, any project, any language", "Full codebase understanding with 200K context window", "Can run tests, fix errors, and iterate autonomously", "Excellent at large-scale refactoring and multi-file changes", "Tight git integration for commits, PRs, and branch management"],
    cons: ["Requires Anthropic API access or Claude Pro/Max subscription", "Terminal-based interface has a learning curve for visual thinkers", "Token costs can add up for large codebases and complex tasks", "Newer than Copilot — smaller community and ecosystem"],
    useCases: ["Implementing a full feature from requirements to tested, committed code", "Debugging a complex issue by having the agent investigate and fix it", "Performing large-scale codebase refactoring across hundreds of files"],
  },
  {
    slug: "tabnine",
    name: "Tabnine",
    tagline: "AI code assistant focused on privacy and enterprise security",
    description: "Tabnine is an AI code completion tool that differentiates through privacy and security. It offers on-premise deployment, SOC-2 compliance, and models trained only on permissively licensed code. Tabnine supports 30+ languages and integrates with all major IDEs. For enterprises concerned about code privacy, IP, and compliance, Tabnine is often the top choice over Copilot.",
    category: "code-completion",
    tags: ["tabnine", "code completion", "privacy", "enterprise", "on-premise", "secure ai"],
    url: "https://www.tabnine.com",
    pricing: "freemium",
    featured: true,
    logo: "⚙️",
    domain: "tabnine.com",
    pros: ["On-premise deployment for complete code privacy", "Trained only on permissively licensed code — no IP risk", "SOC-2 compliance and enterprise security certifications", "Supports 30+ programming languages", "Lightweight and fast completions"],
    cons: ["Suggestions are generally less powerful than Copilot or Cursor", "Chat and agent features are less mature than competitors", "Free tier is very limited compared to Copilot free", "Smaller community and less ecosystem integration"],
    useCases: ["Enterprise teams needing AI coding with strict data privacy requirements", "Regulated industries that cannot send code to third-party clouds", "Organizations requiring only permissively-licensed training data"],
  },
  {
    slug: "codeium-windsurf",
    name: "Windsurf (Codeium)",
    tagline: "Free AI coding assistant with IDE and powerful Cascade agent",
    description: "Windsurf, created by the Codeium team, is an AI-native IDE with a powerful Cascade agent for multi-file editing. Codeium's free tier offers unlimited code completions across all major IDEs — a key differentiator. Windsurf's Cascade feature provides agentic coding capabilities similar to Cursor's Composer, enabling complex multi-file changes through natural language instructions.",
    category: "ai-ide",
    tags: ["windsurf", "codeium", "free ai coding", "cascade", "code completion", "ai ide"],
    url: "https://codeium.com",
    pricing: "freemium",
    featured: true,
    logo: "🌊",
    domain: "codeium.com",
    pros: ["Generous free tier with unlimited code completions", "Cascade agent for multi-file autonomous editing", "Fast completions with low latency", "Supports all major IDEs and 70+ languages", "Growing rapidly with strong user satisfaction"],
    cons: ["Smaller user base and community than GitHub Copilot", "Enterprise features and self-hosting still maturing", "IDE may lag behind VS Code in extension compatibility", "Less integrated with existing developer workflows (GitHub, etc.)"],
    useCases: ["Developers wanting free unlimited AI code completions", "Teams evaluating AI coding tools before committing to paid plans", "Building features with multi-file editing via the Cascade agent"],
  },
  { slug: "amazon-codewhisperer", name: "Amazon Q Developer", tagline: "AWS's AI coding assistant with deep cloud and security expertise", description: "Amazon Q Developer (formerly CodeWhisperer) provides AI code suggestions optimized for AWS services and cloud development. It includes security scanning, reference tracking for open-source code, and deep integration with the AWS ecosystem. Free for individual developers with unlimited code suggestions.", category: "code-completion", tags: ["amazon q", "aws", "code completion", "cloud development", "security scanning"], url: "https://aws.amazon.com/q/developer/", pricing: "freemium", featured: false, logo: "🔸", domain: "aws.amazon.com" },
  { slug: "codium-ai", name: "CodiumAI (Qodo)", tagline: "AI-powered test generation and code quality analysis", description: "Qodo (formerly CodiumAI) focuses on code integrity — generating meaningful tests, analyzing code behavior, and suggesting improvements. It generates comprehensive test suites by understanding code logic, edge cases, and expected behaviors. Integrates with VS Code and JetBrains.", category: "testing-debugging", tags: ["qodo", "codium ai", "test generation", "code quality", "edge cases", "vs code"], url: "https://www.qodo.ai", pricing: "freemium", featured: false, logo: "🧪", domain: "qodo.ai" },
  { slug: "sourcegraph-cody", name: "Sourcegraph Cody", tagline: "AI coding assistant with unmatched codebase context and code search", description: "Cody by Sourcegraph combines AI coding assistance with Sourcegraph's powerful code intelligence. It understands your entire codebase through code graph analysis, providing deeply contextual answers and suggestions. Code search across repositories and context fetching makes it uniquely suited for large, complex codebases.", category: "code-review", tags: ["sourcegraph", "cody", "code search", "context", "enterprise", "code intelligence"], url: "https://sourcegraph.com/cody", pricing: "freemium", featured: false, logo: "🔎", domain: "sourcegraph.com" },
  { slug: "replit-ai", name: "Replit AI", tagline: "Cloud IDE with built-in AI for coding, debugging, and deployment", description: "Replit's AI features are deeply integrated into its cloud development environment. The AI agent can build full applications from natural language descriptions, debug issues, and deploy apps — all in the browser. Replit is particularly strong for rapid prototyping and learning to code.", category: "ai-ide", tags: ["replit", "cloud ide", "ai agent", "prototyping", "deployment", "browser"], url: "https://replit.com", pricing: "freemium", featured: false, logo: "🔁", domain: "replit.com" },
  { slug: "coderabbit", name: "CodeRabbit", tagline: "AI-powered code review bot that reviews every pull request automatically", description: "CodeRabbit provides automated AI code reviews on every pull request. It analyzes code changes for bugs, security issues, performance problems, and style inconsistencies. Integrates with GitHub and GitLab, providing inline comments and summaries just like a human reviewer.", category: "code-review", tags: ["coderabbit", "code review", "pull request", "github", "gitlab", "automated review"], url: "https://coderabbit.ai", pricing: "freemium", featured: false, logo: "🐰", domain: "coderabbit.ai" },
  { slug: "mintlify", name: "Mintlify", tagline: "AI-powered documentation generation and beautiful docs hosting", description: "Mintlify generates and maintains developer documentation using AI. It analyzes your codebase to generate accurate API docs, guides, and references. The platform also hosts beautiful documentation sites with search, versioning, and analytics built in.", category: "documentation", tags: ["mintlify", "documentation", "api docs", "developer docs", "hosting", "ai generation"], url: "https://mintlify.com", pricing: "freemium", featured: false, logo: "📗", domain: "mintlify.com" },
  { slug: "aider", name: "Aider", tagline: "Open-source AI pair programming tool that works in your terminal", description: "Aider is an open-source command-line tool for AI pair programming. It can edit multiple files, understands git history, and works with GPT-4, Claude, and open-source models. Aider maps your entire repository to provide context-aware edits and automatically creates git commits for each change.", category: "ai-ide", tags: ["aider", "open source", "terminal", "pair programming", "git", "multi-model"], url: "https://aider.chat", pricing: "free", featured: false, logo: "🛠️", domain: "aider.chat" },
  { slug: "continue-dev", name: "Continue", tagline: "Open-source AI coding assistant that you can customize and self-host", description: "Continue is an open-source AI coding assistant for VS Code and JetBrains. It supports any LLM (local or cloud), custom slash commands, and context providers. Teams can self-host and customize it to fit their specific workflows, making it the most flexible AI coding tool available.", category: "code-completion", tags: ["continue", "open source", "customizable", "self-hosted", "vs code", "jetbrains"], url: "https://continue.dev", pricing: "free", featured: false, logo: "🔄", domain: "continue.dev" },
  { slug: "pieces", name: "Pieces for Developers", tagline: "AI-powered developer productivity suite with on-device processing", description: "Pieces is a developer productivity tool that saves, enriches, and reuses code snippets with AI. It provides on-device AI processing for privacy, context-aware code suggestions, and workflow copilot features. Integrates across browsers, IDEs, and collaboration tools.", category: "documentation", tags: ["pieces", "code snippets", "on-device ai", "productivity", "privacy", "workflow"], url: "https://pieces.app", pricing: "freemium", featured: false, logo: "🧩", domain: "pieces.app" },
  { slug: "codeclimate", name: "Code Climate", tagline: "Automated code review and engineering analytics platform", description: "Code Climate provides automated code review with AI-powered analysis for test coverage, maintainability, and code quality. Its Velocity product offers engineering analytics to measure team productivity. Used by thousands of organizations to maintain code quality standards.", category: "code-review", tags: ["code climate", "code quality", "test coverage", "engineering analytics", "maintainability"], url: "https://codeclimate.com", pricing: "freemium", featured: false, logo: "🌡️", domain: "codeclimate.com" },
];
