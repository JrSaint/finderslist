export type AIAgentsCategory = "agent-frameworks" | "workflow-builders" | "chatbot-platforms" | "autonomous-agents" | "enterprise-ai";

export interface AIAgentsTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AIAgentsCategory;
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

export const AI_AGENTS_CATEGORIES: Record<AIAgentsCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "agent-frameworks": { label: "Agent Frameworks", emoji: "🧱", description: "Open-source libraries and SDKs for building custom AI agents from scratch.", gradient: "from-indigo-600/30 to-violet-800/40" },
  "workflow-builders": { label: "Workflow & Automation", emoji: "⚡", description: "Visual platforms for creating multi-step AI workflows without deep coding.", gradient: "from-purple-600/30 to-fuchsia-800/40" },
  "chatbot-platforms": { label: "Chatbot Platforms", emoji: "💬", description: "Tools for deploying conversational AI agents on websites, apps, and messaging.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "autonomous-agents": { label: "Autonomous Agents", emoji: "🤖", description: "Self-directed AI agents that plan, reason, and execute multi-step tasks.", gradient: "from-green-600/30 to-emerald-800/40" },
  "enterprise-ai": { label: "Enterprise AI Platforms", emoji: "🏢", description: "Full-stack enterprise platforms for deploying AI agents at scale.", gradient: "from-slate-600/30 to-zinc-800/40" },
};

export const AI_AGENTS_TOOLS: AIAgentsTool[] = [
  {
    slug: "langchain",
    name: "LangChain",
    tagline: "The most popular framework for building LLM-powered applications and agents",
    description: "LangChain is the de facto standard framework for building applications powered by large language models. It provides modular components for prompt management, memory, chains, and agents — letting developers compose complex AI workflows with any LLM provider. LangGraph extends it with stateful, multi-actor orchestration for production-grade agent systems. The ecosystem includes LangSmith for observability and evaluation, making it a full lifecycle platform. Community adoption is massive with 90K+ GitHub stars.",
    category: "agent-frameworks",
    tags: ["langchain", "llm framework", "ai agents", "python", "langsmith", "langgraph"],
    url: "https://www.langchain.com",
    pricing: "freemium",
    featured: true,
    logo: "🦜",
    domain: "langchain.com",
    pros: ["Largest ecosystem and community — 90K+ GitHub stars and thousands of integrations", "LangGraph provides production-grade stateful agent orchestration", "Works with every major LLM provider (OpenAI, Anthropic, Google, open-source)", "LangSmith adds observability, testing, and evaluation for production apps", "Modular design lets you use only what you need"],
    cons: ["Steep learning curve with rapidly changing APIs", "Abstraction layers can obscure what's happening under the hood", "Performance overhead compared to direct API calls", "Documentation struggles to keep pace with frequent releases"],
    useCases: ["Building a RAG system that retrieves and synthesizes information from company docs", "Creating a multi-step research agent that browses the web and writes reports", "Deploying a customer service agent with tool access and memory"],
  },
  {
    slug: "crewai",
    name: "CrewAI",
    tagline: "Multi-agent orchestration framework for collaborative AI teams",
    description: "CrewAI enables developers to create teams of AI agents that collaborate on complex tasks. Each agent has a defined role, goal, and backstory, and they work together through a structured process — sequential, hierarchical, or consensual. It abstracts away the complexity of multi-agent coordination while providing granular control over delegation, memory, and tool usage. CrewAI has grown rapidly to become one of the top multi-agent frameworks alongside AutoGen and LangGraph.",
    category: "autonomous-agents",
    tags: ["multi-agent", "crew ai", "agent orchestration", "autonomous agents", "python", "collaborative ai"],
    url: "https://www.crewai.com",
    pricing: "freemium",
    featured: true,
    logo: "👥",
    domain: "crewai.com",
    pros: ["Intuitive role-based agent design with natural language definitions", "Supports sequential, hierarchical, and consensual process flows", "Built-in memory and context sharing between agents", "Growing ecosystem of pre-built tools and integrations", "Enterprise platform available for production deployments"],
    cons: ["Relatively new — API still evolving and may have breaking changes", "Complex multi-agent scenarios can be hard to debug", "Token costs multiply with multiple agents communicating", "Limited built-in observability compared to LangChain ecosystem"],
    useCases: ["Assembling a research team with researcher, analyst, and writer agents", "Building a content pipeline where agents plan, write, edit, and publish", "Creating an autonomous QA team that reviews code and writes tests"],
  },
  {
    slug: "autogen",
    name: "AutoGen",
    tagline: "Microsoft's framework for building multi-agent conversational AI systems",
    description: "AutoGen, developed by Microsoft Research, is a framework for building applications where multiple AI agents converse with each other (and optionally humans) to solve tasks. It pioneered the concept of conversable agents with customizable behaviors. AutoGen 0.4 introduced an event-driven architecture with better scalability and modularity. It's particularly strong for research applications and complex reasoning tasks requiring multi-turn agent discussions.",
    category: "agent-frameworks",
    tags: ["autogen", "microsoft", "multi-agent", "conversational ai", "research", "python"],
    url: "https://microsoft.github.io/autogen/",
    pricing: "free",
    featured: true,
    logo: "🔷",
    domain: "microsoft.github.io",
    pros: ["Backed by Microsoft Research with strong academic foundations", "Excellent multi-agent conversation patterns out of the box", "Human-in-the-loop support built into the core architecture", "Event-driven architecture in v0.4 for better scalability", "Free and open-source with active development"],
    cons: ["API underwent major rewrite from v0.2 to v0.4 — migration can be painful", "Primarily Python-focused, limited support for other languages", "Less production tooling compared to LangChain ecosystem", "Documentation can lag behind rapid development pace"],
    useCases: ["Building a coding assistant where agents write, review, and test code together", "Creating a research workflow with debate-style multi-agent reasoning", "Implementing human-supervised AI workflows with approval checkpoints"],
  },
  {
    slug: "make-com",
    name: "Make (formerly Integromat)",
    tagline: "Visual automation platform for building AI-powered workflows without code",
    description: "Make is a powerful visual workflow automation platform that now deeply integrates AI capabilities. Users build workflows by connecting modules on a visual canvas, making it accessible to non-developers. With native OpenAI, Anthropic, and other AI integrations, Make has become a go-to tool for building AI agent workflows that connect to 1,500+ apps. It handles complex branching logic, error handling, and scheduling — all visually.",
    category: "workflow-builders",
    tags: ["make", "automation", "no-code", "workflow builder", "integrations", "visual"],
    url: "https://www.make.com",
    affiliateUrl: "https://www.make.com",
    pricing: "freemium",
    featured: true,
    logo: "🟣",
    domain: "make.com",
    pros: ["Beautiful visual canvas makes complex workflows easy to understand", "1,500+ native app integrations — connects to almost anything", "Powerful branching, looping, and error handling logic", "Free tier includes 1,000 operations per month", "Native AI model integrations (OpenAI, Anthropic, etc.)"],
    cons: ["Complex scenarios can become visually cluttered on the canvas", "Operation-based pricing can get expensive at scale", "Some advanced features require the paid Teams plan", "Learning curve for advanced features like iterators and aggregators"],
    useCases: ["Automating a lead qualification pipeline with AI analysis and CRM updates", "Building an email triage agent that categorizes and responds to inquiries", "Creating a content generation workflow that publishes across platforms"],
  },
  {
    slug: "n8n",
    name: "n8n",
    tagline: "Open-source workflow automation with powerful AI agent capabilities",
    description: "n8n is an open-source, self-hostable workflow automation tool with a visual editor and strong AI agent features. Its AI Agent node lets you build ReAct-style agents that can use tools, access memory, and chain reasoning steps — all configured visually. n8n connects to 400+ services and can be extended with custom code nodes. Self-hosting gives full data control, making it popular with privacy-conscious teams and enterprises.",
    category: "workflow-builders",
    tags: ["n8n", "open source", "self-hosted", "workflow automation", "ai agents", "privacy"],
    url: "https://n8n.io",
    pricing: "freemium",
    featured: true,
    logo: "🔶",
    domain: "n8n.io",
    pros: ["Open-source and self-hostable for full data control", "Visual AI Agent node with ReAct reasoning and tool use", "400+ integrations with custom code extensibility", "Active community with shared workflow templates", "Fair-code license allows inspection and modification"],
    cons: ["Self-hosting requires DevOps knowledge and infrastructure", "Fewer native integrations than Make or Zapier", "AI features are newer and less battle-tested than dedicated frameworks", "Cloud pricing can be expensive for high-volume workflows"],
    useCases: ["Self-hosting an AI agent pipeline for sensitive data processing", "Building a customer support agent that queries databases and sends emails", "Automating internal workflows with AI-powered decision making"],
  },
  { slug: "zapier-ai", name: "Zapier", tagline: "The world's largest automation platform with AI-powered actions and chatbots", description: "Zapier connects 6,000+ apps with automated workflows (Zaps) and now includes AI-powered features like natural language automation creation, AI chatbots, and AI actions that can be embedded in workflows. Its massive integration library makes it the easiest way to connect AI capabilities to business tools.", category: "workflow-builders", tags: ["zapier", "automation", "no-code", "integrations", "chatbots", "ai actions"], url: "https://zapier.com", pricing: "freemium", featured: false, logo: "⚡", domain: "zapier.com" },
  { slug: "voiceflow", name: "Voiceflow", tagline: "Collaborative platform for designing, prototyping, and deploying AI agents", description: "Voiceflow is a conversation design platform purpose-built for creating AI agents and chatbots. Teams can visually design conversation flows, integrate knowledge bases, and deploy agents across web, voice, and messaging channels. It bridges the gap between designers and developers with collaborative tools.", category: "chatbot-platforms", tags: ["voiceflow", "conversation design", "chatbot builder", "voice ai", "collaborative", "no-code"], url: "https://www.voiceflow.com", pricing: "freemium", featured: false, logo: "🎙️", domain: "voiceflow.com" },
  { slug: "botpress", name: "Botpress", tagline: "Open-source platform for building AI-powered chatbots and agents", description: "Botpress is an open-source chatbot platform that combines visual flow building with LLM-powered natural language understanding. It features a built-in knowledge base, personality configuration, and multi-channel deployment. The platform has evolved from rule-based bots to full AI agent capabilities.", category: "chatbot-platforms", tags: ["botpress", "open source", "chatbot", "nlp", "knowledge base", "multi-channel"], url: "https://botpress.com", pricing: "freemium", featured: false, logo: "🤖", domain: "botpress.com" },
  { slug: "semantic-kernel", name: "Semantic Kernel", tagline: "Microsoft's SDK for integrating AI into enterprise applications", description: "Semantic Kernel is Microsoft's open-source SDK for building AI agents and copilots in C#, Python, and Java. It provides a lightweight, extensible architecture for combining LLM prompts with conventional code, plugins, and planners. Deeply integrated with Azure AI services, it's the foundation for many Microsoft Copilot experiences.", category: "enterprise-ai", tags: ["semantic kernel", "microsoft", "enterprise", "c#", "azure", "plugins"], url: "https://learn.microsoft.com/semantic-kernel/", pricing: "free", featured: false, logo: "🔷", domain: "learn.microsoft.com" },
  { slug: "llamaindex", name: "LlamaIndex", tagline: "Data framework for connecting custom data to large language models", description: "LlamaIndex (formerly GPT Index) specializes in connecting LLMs to external data sources. It provides tools for data ingestion, indexing, and retrieval that power RAG applications and data agents. LlamaHub offers 300+ data connectors, and the framework supports building agents that can query structured and unstructured data.", category: "agent-frameworks", tags: ["llamaindex", "rag", "data agents", "indexing", "retrieval", "python"], url: "https://www.llamaindex.ai", pricing: "freemium", featured: false, logo: "🦙", domain: "llamaindex.ai" },
  { slug: "openai-assistants", name: "OpenAI Assistants API", tagline: "OpenAI's native API for building persistent AI assistants with tools", description: "The OpenAI Assistants API lets developers build AI agents with persistent threads, built-in tools (code interpreter, file search, function calling), and managed context. It handles conversation state, tool execution, and retrieval automatically — no framework needed. Best for teams building on OpenAI models who want minimal infrastructure.", category: "enterprise-ai", tags: ["openai", "assistants api", "gpt-4", "function calling", "code interpreter", "managed"], url: "https://platform.openai.com/docs/assistants/overview", pricing: "paid", featured: false, logo: "🟢", domain: "platform.openai.com" },
  { slug: "claude-agent-sdk", name: "Claude Agent SDK", tagline: "Anthropic's SDK for building production AI agents with Claude", description: "The Claude Agent SDK from Anthropic provides a streamlined way to build AI agents powered by Claude models. It supports tool use, multi-turn conversations, and structured outputs with strong safety guardrails. The SDK is designed for building reliable, production-grade agents with Anthropic's focus on AI safety and helpfulness.", category: "agent-frameworks", tags: ["claude", "anthropic", "agent sdk", "tool use", "safety", "python"], url: "https://docs.anthropic.com/en/docs/agents-and-tools/agent-sdk", pricing: "paid", featured: false, logo: "🟤", domain: "docs.anthropic.com" },
  { slug: "dify", name: "Dify", tagline: "Open-source platform for building LLM apps with visual orchestration", description: "Dify is an open-source LLMOps platform that lets teams build AI applications visually. It provides RAG pipeline configuration, agent orchestration, model management, and observability in a unified interface. Self-hostable with a generous cloud free tier, it's popular with teams wanting full control over their AI stack.", category: "workflow-builders", tags: ["dify", "open source", "llmops", "rag", "visual builder", "self-hosted"], url: "https://dify.ai", pricing: "freemium", featured: false, logo: "🔮", domain: "dify.ai" },
  { slug: "superagent", name: "SuperAgent", tagline: "Open-source framework for building production-ready AI assistants", description: "SuperAgent provides a cloud-based and self-hostable platform for creating AI assistants with built-in RAG, tool integration, and multi-model support. It features a REST API for easy integration, workflow orchestration, and support for multiple vector databases and LLM providers.", category: "autonomous-agents", tags: ["superagent", "open source", "ai assistant", "rag", "rest api", "multi-model"], url: "https://www.superagent.sh", pricing: "freemium", featured: false, logo: "🦸", domain: "superagent.sh" },
  { slug: "relevance-ai", name: "Relevance AI", tagline: "No-code platform for building and deploying AI agents for business teams", description: "Relevance AI lets business teams build AI agents without coding. It provides a visual builder for creating agents that can research, analyze data, generate content, and automate workflows. The platform includes pre-built agent templates, knowledge base integration, and team collaboration features.", category: "enterprise-ai", tags: ["relevance ai", "no-code", "business ai", "agent builder", "templates", "collaboration"], url: "https://relevanceai.com", pricing: "freemium", featured: false, logo: "🎯", domain: "relevanceai.com" },
];
