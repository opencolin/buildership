// Auto-generated from the AI Agents Hackathon 2026 (Berlin) submission CSV.
// Public-safe columns only — internal judge comments and builder emails/phone
// are intentionally omitted; emails/phones embedded in the team field are stripped.

export type BerlinProject = {
  name: string;
  oneLiner: string;
  description: string;
  whatBuilt: string;
  focusTrack: string;
  bonusTracks: string[];
  team: string;
  builder: string;
  date: string;
  links: {
    repo: string | null;
    live: string | null;
    demo: string | null;
    x: string | null;
    telegram: string | null;
  };
};

export const BERLIN_PROJECTS: BerlinProject[] = [
  {
    "name": "Gladio Reality Frames",
    "oneLiner": "Ground truth for machines. Reality, frame by frame.",
    "description": "The problem\nAI agents can't see the physical world. An LLM can reason about anything except where things actually are right now: which satellite is overhead, whether a coordinate is in coverage, what's passing in the next 90 minutes. That data is either unstructured or locked behind enterprise contracts and API keys no autonomous agent can navigate. RealityFrames closes that gap: an authoritative, queryable stream of physical state (orbital first — satellites and coverage via SGP4/TLEs) a machine can consume directly.\n\nAgentic AI\nThe customer is the agent, not a person. An agent with skills (search, stream, check-coverage) turns a request like \"where is the ISS\" into concrete queries against the world model. A resolver sits at the boundary: a request comes in, it either serves the data or demands payment, then resolves. Skills never bill — the resolver does — so another AI can call RealityFrames as a tool and feed verified ground truth into its own world model.\n\nBlockchain\nSettlement is x402: request hits a gated endpoint → 402 Payment Required → agent pays → access granted, all in one programmatic flow. No keys, no signup. Payment is USDC on Base (testnet live; mainnet via Coinbase CDP), with the agent spending from its own Circle wallet. Price maps to product: pay per frame.\n\nWhy both\nPayment without agents is just a rail; agents without payment can't transact alone. Together: an agent discovers, pays for, and consumes physical ground truth on its own — no human in the loop.",
    "whatBuilt": "An AI agent that autonomously buys verifiable physical-world data with on-chain money — no human in the loop. Ask in natural language; the agent picks a tool, hits a paywalled endpoint, meets an HTTP 402, settles a stablecoin micropayment from its own wallet, receives a signed license envelope, and answers — usually in one turn.\n\nEnd-to-end flow\nRequest → Claude Opus 4.8 (Haiku fallback) running a bounded tool-use loop.\nThe model selects a capability. Each is a two-phase Skill: plan() declares what data is needed and never touches a wallet; execute() does the work against acquired access. plan() emits one of two request kinds — data (a priced dataset behind a gate) or meter (open-ended work priced by output).\n\nA Resolver sits between the two phases and is the only component that spends money. For a data request it calls the buy() accept-or-pay primitive.\n\nbuy() checks the held-license cache first; on miss it resolves a BuyerSigner (resolveBuyerSigner() → Circle agent wallet when configured, local key fallback) and drives an x402 fetch under a spend cap.\n\nThe fetch meets a 402 built by the target chain's settlement client (EvmSettlement / AvmSettlement) through its accepts() method, advertising the field-level price (pricingAdvert) and accepted chains.\n\nThe signer produces a gasless USDC EIP-3009 authorization (scheme exact); the settlement client's settle() finalizes through the Coinbase CDP facilitator on Base, which broadcasts and pays gas. Native ETH (eth-transfer) and ALGO (algo-transfer) are alternate schemes, verified on-chain and via chain indexer respectively. A replay guard rejects any reused tx hash.\n\nOn settlement the server issues a ProofMeta StatusUpdateEnvelope, advancing it through the lifecycle OPEN → PENDING → GRANTED. The GRANTED envelope — ed25519-signed, self-contained (scope, fields, expiry, payment proof) — returns as granted_envelope.\nbuy() extracts the credential token, caches it as a held license, and the Skill's execute() reads the data. Subsequent reads replay the envelope via the X-LICENSE header — no new settlement. For meter skills, settleMetered() runs after execute(), prices by output volume, and settles USDC directly.\n\n\nStack (all live)\nLayer\tTech\nReasoning\tAnthropic Claude (Opus 4.8 + Haiku)\nPayments\tx402 + EIP-3009 gasless USDC\nSettlement\tCoinbase CDP facilitator on Base\nAgent wallet\tCircle developer-controlled wallet\nSecond chain\tAlgorand (native-asset, independently verified)\nCredentials\tProofMeta ed25519-signed StatusUpdateEnvelope\nWeb capability\tTavily (metered per use)",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "Mohamad El Boudi - Information & Technology - @modefi92\nDaud Zulfacar - Distribution & Licensing - @blockchainberlin",
    "builder": "Mohamad El Boudi",
    "date": "20.06.2026",
    "links": {
      "repo": null,
      "live": "https://realityframes.gladio.ai/apps/agent",
      "demo": "https://www.loom.com/share/42b98be9f49d40aeb2559e8f1637bc95",
      "x": null,
      "telegram": "https://t.me/modefi92"
    }
  },
  {
    "name": "402Cards",
    "oneLiner": "Autonomous agents that buy real digital goods with x402 USDC on Base thru Bitrefill no human checkout required.",
    "description": "402Cards lets AI agents buy real-world digital goods with crypto, no cards, no manual checkout. Today, agents can reason and act online, but paying for services still means human wallets, KYC’d accounts, and brittle integrations.\n\n402Cards bridges that gap: an autonomous Circle Agent Stack wallet quotes a Bitrefill Mobile Legends diamond pack, pays via the x402 HTTP payment protocol (USDC on Base), and receives a redemption code, all in one click. A proxy service handles x402 settlement and forwards USDC to Bitrefill, while the agent orchestrates quoting, balance checks, payment approval, and fulfillment polling.\n\nAgentic AI: The agent runs end-to-end without hardcoded scripts, it inspects x402 endpoints, validates quotes, manages wallet state, and handles user prompts (e.g. player ID) using Circle’s agent tools and an LLM.\n\nBlockchain: Payments use USDC on Base through x402 (HTTP 402 + on-chain settlement), with a single Circle agent wallet as both payer and settlement source, demonstrating machine-to-machine commerce on stablecoins.",
    "whatBuilt": "Everything was done from scratch using the agent-stack-ecosystem-kits and cursor and the bitrefill api.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Blockchain for Good"
    ],
    "team": "Armando Medina",
    "builder": "Armando Medina",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/armsves/402Cards",
      "live": "https://402cards.vercel.app/",
      "demo": "https://youtu.be/IVR98Z-7cGQ",
      "x": "https://x.com/armsves",
      "telegram": "https://t.me/Beerus_2020"
    }
  },
  {
    "name": "Scout - Autonomous Competitive Intelligence Agent",
    "oneLiner": "From blank input to structured competitive brief in under 30 seconds.",
    "description": "Competitive research is slow, expensive, and manual — analysts spend hours Googling, tab-switching, and synthesising scattered results into a brief\n  that's outdated by the time it's written.\n\n  Scout solves this with an autonomous AI agent that researches a competitor on demand, pays for its own intelligence, and returns a structured brief\n  with receipts — in under 30 seconds.\n\n  The user enters a company name and a USDC budget. Scout breaks the research into five strategic categories (competitors, recent moves, customer\n  sentiment, pricing, and tech signals), then autonomously pays for each Tavily search query via an x402 nanopayment from a Circle Agent Wallet — $0.01\n  USDC per query, settled on Base. Every payment produces an on-chain receipt. A hard budget cap ensures the agent never overspends. Once all five\n  searches complete, Nebius Token Factory (Qwen3-30B) synthesises the raw results into a structured competitive brief. The user receives the full brief\n  alongside a spend ledger showing exactly what each insight cost and why the agent decided it was worth buying.\n\n  Scout demonstrates a new pattern for agentic AI: agents that don't just reason, but pay — autonomously acquiring the data they need, one micropayment\n  at a time, with full accountability on-chain.",
    "whatBuilt": "Core agent & payments\n  - runScout() — 5-category research loop with budget cap and spend ledger\n  - Circle Agent Wallet integration — x402 nanopayments via payForService(), wallet balance check\n  - x402-gated /api/premium-search endpoint using @x402/next + Coinbase facilitator\n  - End-to-end live Circle payment test on Base Sepolia (funded and verified)\n\n  Search & synthesis\n  - Tavily integration — 5 strategic query templates, search_depth: advanced\n  - Nebius Token Factory integration — direct API (not OpenRouter), Qwen3-30B synthesises raw results into a structured 6-section JSON brief\n\n  Frontend\n  - Full dark dashboard (/app/page.tsx landing + /app/research/page.tsx)\n  - Competitive brief display — 6 sections with skeleton loaders and stagger animations\n  - Spend ledger panel — per-entry cost, reason, BaseScan receipt links\n  - Research queries panel — what was searched and why\n  - Progress animation with live budget tracking during a run\n  - JSON / Markdown / PDF export\n\n  Infrastructure & demo\n  - Mock mode (USE_MOCK=true) with pre-baked Notion brief — demo never breaks\n  - Deployed to Vercel with environment variables configured\n  - README with prize track documentation\n  - Pitch deck",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "Dorde Dordevic, full-stack developer, @george_from_school",
    "builder": "Dorde Dordevic",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/djordje82/scout",
      "live": "https://scout-two-mocha.vercel.app/",
      "demo": "https://youtu.be/i5JWIOlA-7Y?feature=shared",
      "x": null,
      "telegram": "https://t.me/george_from_school"
    }
  },
  {
    "name": "Polyglot Procurement Agent — autonomous language learning agent using LangChain, Circle Agent Stack, and Tavily",
    "oneLiner": "An AI agent that autonomously finds real German content, manages its own USDC budget, and pays for premium vocabulary analysis — producing a verifiable on-chain receipt.",
    "description": "Language learning tools are expensive and generic. You pay flat subscriptions for content that may not interest you. This agent finds real native content on topics you actually care about and pays only for what it uses — per lesson, not per month.",
    "whatBuilt": "TypeScript agent built from scratch during the hackathon on top of the Circle LangChain starter kit. Specifically:\n\nReplaced the monorepo-dependent starter kit files with standalone implementations of tools.ts, agent.ts, config.ts, theme.ts, and index.ts — removing all broken workspace dependencies and rewriting core logic to work in a Node 18 environment\nBuilt three custom LangChain tools: a Tavily web search tool for live German content retrieval, a Circle Agent Wallet balance checker, and a USDC micropayment tool with human-in-the-loop approval\nWrote a conversational agent loop in index.ts with a bootstrap prompt that drives the full search → budget check → pay → deliver workflow\nIntegrated Tavily's real-time search API for live content, pulling actual current German-language articles about Berlin\nImplemented simulated Circle Agent Stack payment flow with randomised transaction hashes and receipt formatting, matching the Circle API schema, ready for live credentials",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "Danny Flynn — Solo developer — ",
    "builder": "Danny Flynn",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/danfly1989/AgentHackathon",
      "live": null,
      "demo": "https://www.youtube.com/watch?v=Kc1bn5k_eZ8",
      "x": null,
      "telegram": "https://t.me/danfly1989"
    }
  },
  {
    "name": "hyperflow",
    "oneLiner": "Hyperflow is the an app that pay for the signal, attach the receipt to the decision, enforce budget/risk policy, then trade or hold all powered by circle agent wallet and travily",
    "description": "HyperFlow is an agent wallet trading app where a Circle Agent Wallet buys paid market intelligence, attaches receipts and live source evidence to each decision, runs model review and risk checks, then executes approved actions on Hyperliquid testnet. If the primary review request fails, the backend uses a configured secondary model helper for the same review contract; the dashboard does not expose a separate provider panel.",
    "whatBuilt": "HyperFlow was built as an agent wallet trading app. During the\n  hackathon, we implemented a live Circle Agent Wallet workflow where\n  the agent pays for market intelligence, records the payment receipt,\n  attaches source evidence, runs model/risk review, and only then\n  proceeds toward Hyperliquid execution.\n\n  Specific work built:\n\n  - Circle Agent Wallet integration through Circle CLI agent-wallet\n    sessions.\n\n  - Real circle services pay flow for paid x402 signal access.\n  - SQLite spend ledger with wallet address, chain, amount, service\n    URL, status, receipt, and reason.\n\n  - Budget cap enforcement through circleAgentWallet.maxUsdcPerCall.\n  - Hyperliquid testnet API-wallet execution path with account checks,\n    position sizing, leverage limits, stop/take-profit logic, and\n    execution logging.\n\n  - Vercel AI SDK ToolLoopAgent review layer using Nebius DeepSeek V4\n    Pro.\n\n  - Secondary model helper path if primary review request fails,\n    without exposing provider failure UI.\n\n  - Tavily source-evidence integration using @tavily/core; non-hold\n    trade candidates now require live market/news source evidence\n    before model review.\n\n  - Tavily source URLs, request id, credits, snippets, and source\n    count are persisted into traces.execution_result.market_research.\n\n  - Svelte dashboard for live loop status, wallet spend ledger, trade\n    tape, source evidence links, bridge history, and runtime blockers.\n\n  - Circle bridge support for Arc Testnet to Base Sepolia Agent Wallet\n    top-ups.\n\n  - CCTP route support for Arc Testnet to Arbitrum Sepolia.\n  - Public config moved to config/hyperflow.config.json; secrets stay\n    in .env.\n\n  - Railway deployment support with Dockerfile and persistent volume\n    setup.\n\n  Current runtime behavior is explicit: if Hyperliquid account value\n  is zero, the app blocks at HL_EMPTY before paid signal or Tavily\n  spend.\n\n  Sources used for Tavily integration:\n\n  - https://docs.tavily.com/sdk/javascript/quick-start\n  - https://docs.tavily.com/sdk/javascript/reference\n  -\n  https://docs.tavily.com/documentation/api-reference/endpoint/search",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly",
      "Blockchain for Good"
    ],
    "team": "Ibrahim Fawuzan",
    "builder": "Zan Ibrahim",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/fozagtx/hyperflow",
      "live": "https://hyperflow-production.up.railway.app/",
      "demo": "https://youtu.be/vzB4zqw4MjQ",
      "x": "https://x.com/zanbuilds",
      "telegram": "https://t.me/zanbuilds"
    }
  },
  {
    "name": "Agent-Diary",
    "oneLiner": "Agent Diary turns AI session traces into paid, shareable diary entries — agents pay USDC per call via Circle x402; humans browse the collective diary for free.",
    "description": "Agent Diary gives AI agents a place to record what they actually did each day — without humans writing logs or managing API keys.\n\nProblem: Agents run hundreds of tool calls, but their work leaves no durable, readable history. Operators can’t see patterns (failing tools, workload spikes, incomplete tasks) at scale. Traditional APIs need signups, keys, and subscriptions — a poor fit for autonomous agents.\n\nAgentic AI: Agents submit normalized session reports (tools, tokens, timing, outcomes). The service aggregates signals and uses Claude Haiku to synthesize first-person diary prose grounded in that data. A separate reflect endpoint analyzes trends across days.\n\nBlockchain: All API access is gated by Circle Gateway x402 — agents pay USDC micropayments on Arc Testnet per request ($0.001 write, $0.0005 read, $0.01 reflect). No accounts or credit cards; payment is embedded in the HTTP flow (402 → pay → 200). This is developer API monetization for the agentic economy.",
    "whatBuilt": "Built a Next.js 15 pay-per-call diary API for AI agents: three Circle x402 endpoints on Arc Testnet (write/read/reflect, USDC micropayments via @circle-fin/x402-batching), custom Next.js payment middleware adapter, Supabase persistence (agents + diary_entries), and a Claude Haiku pipeline (aggregate session traces → derive signals → synthesize diary prose + reflection). Added OpenAI/Claude trace extractors, validation, Vitest tests, collective-diary UI, Vercel deployment, demo script, AGENTS.md, and Circle Marketplace submission. Verified production 402 → paid POST → persisted entry.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle"
    ],
    "team": "Ulrike Bloch, solo-dev",
    "builder": "Ulrike Bloch",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/lr1ke/agent-diary",
      "live": "https://agent-diary-henna.vercel.app/",
      "demo": "https://www.loom.com/share/c095f51026694e26b4e6eed843ed2575",
      "x": "https://x.com/Uli1038889",
      "telegram": "https://t.me/rikebl"
    }
  },
  {
    "name": "TrustLayer",
    "oneLiner": "Imagine being able to create your own insurance on the fly — tailored to your trip, your   needs, and your budget.",
    "description": "• TrustLayer solves the friction of buying travel insurance by turning a confusing,\n  product-first process into a simple voice chat. Instead of comparing policies and deciphering coverage terms, a traveler just describes their trip, budget, and concerns in plain\n  language, and the system recommends and purchases a suitable parametric flight-delay\n  policy within that budget.",
    "whatBuilt": "During the hackathon, we built an end-to-end prototype of TrustLayer: a chat-first travel\n  insurance demo with a Streamlit frontend, a FastAPI backend, a single LangChain broker\n  agent, and a Solidity insurance manager on Base Sepolia. The implementation includes\n  structured Pydantic schemas, budget authorization and idempotency checks, policy\n  recommendation and purchase/reject flows, Circle Agent Wallet / x402 payment handling,\n  wallet balance and transaction lookup, and privileged oracle-based claim resolution. The\n  mocked parts are the insurance knowledge catalogue, underwriting logic, pool selection,\n  yield/LP mechanics, and flight-oracle inputs — while the customer-facing experience stays\n  simple and non-crypto-native.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Blockchain for Good"
    ],
    "team": "Kristaps Grinbergs, Gellért Bodorkós, Vasiliy Klyosov",
    "builder": "Selim Erunkut",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/selimerunkut/TrustLayer",
      "live": "https://trustlayer.37-27-94-136.sslip.io/",
      "demo": "https://drive.google.com/file/d/1hZnLTYVhoNDMN8V5Dx73VG-akZGUqx0n/view?usp=drive_link",
      "x": "https://x.com/cryptoson_",
      "telegram": "https://t.me/Selim_E"
    }
  },
  {
    "name": "x402-swarm-agent",
    "oneLiner": "Request data seemlessly with tracable transactions",
    "description": "Open Agentic data feed accepting x402 payments, recording request/response traces to swarm feed. Simple demo gets prices - later implementation will perform deep analytics. Users/Agents (i.e. consumers) can ask for data that might be sourced from multiple feeds (handling their own provider subscriptions), but users only need to pay per call via x402.",
    "whatBuilt": "Multi sourced data feed. Request/Response endpoint accepting x402 payments, and publishing/auditing log service using swarm feeds.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Tavilly",
      "Blockchain for Good"
    ],
    "team": "bh2smith.eth",
    "builder": "Ben Smith",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/bh2smith/x402-swarm-agent",
      "live": "https://x402-swarm-agent.vercel.app/",
      "demo": null,
      "x": "https://x.com/bh2smith",
      "telegram": "https://t.me/bh2smith"
    }
  },
  {
    "name": "SparkLead",
    "oneLiner": "An autonomous B2B agent that pays real USDC to find which competitors of your existing customers need exactly what you sell.",
    "description": "SparkLead solves a real B2B sales gap: companies know their existing customers well, but have no systematic way to find which of those customers' competitors need the exact same product — most lead-gen tools optimize for volume over relevance, wasting most outbound spend. An autonomous agent (Claude Agent SDK) reasons about a budget and decides which customers to check, then pays a Circle Agent Wallet's USDC, via x402, to query a service that runs a live Tavily web search and Nebius LLM reasoning pass to identify competitors with evidence and a confidence score — not a generic database lookup. Every payment settles on Base mainnet through Coinbase's CDP facilitator, so the agent's spending is a verifiable on-chain transaction, not a black-box subscription. Results land as a weekly Slack digest, with zero crypto exposure for the end user.",
    "whatBuilt": "Seller service (new, seller/):\nseller_server.py — FastAPI service exposing /competitor-leads behind an x402 paywall (exact scheme, USDC, Base mainnet), using cdp-sdk's create_facilitator_config for real payment verification/settlement via Coinbase's CDP facilitator. Typed Pydantic request/response models, auto-generated OpenAPI spec.\nlead_finder.py — core reasoning logic: builds a Tavily advanced-search query from a customer profile, feeds results to a Nebius-hosted LLM with a system prompt that identifies competitors and explains why each needs the same capability, with a confidence score. Generalized to any vertical via an optional SELLER_DOMAIN setting — not hardcoded to one product category.\nadmin_routes.py + static/admin.html — unpaid CRUD API and dashboard for managing the tracked-customer list and an automation on/off toggle, backed by a real JSON data file.\nrun_weekly_scan.py — headless automation: fetches the live customer list, pays for each query via circle services pay directly (no human approval step), respects a budget, and triggers the Slack digest.\npost_to_slack.py — formats results into a Slack Block Kit digest (stats, top lead, confidence, source) and posts via Incoming Webhook.\nAn in-process async scheduler in seller_server.py that checks the automation config and triggers scans on an interval — no system cron dependency.\n\nBuyer agent (customized within the official Circle starter):\nCustomized kits/claude-agent-sdk's task to fetch the live customer list from our own /admin/customers endpoint via the kit's existing fetch_service tool, then reason about budget and pay for each query via circle_pay_service, instead of the kit's default demo task.\n\nEverything under seller/ is original code written during the hackathon. kits/, packages/circle-tools, and packages/kit-core are Circle's official starter — only the buyer agent's task/prompt was customized, not the underlying SDK wrappers.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "",
    "builder": "Ilya Weinberg",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/iLVino/sparklead",
      "live": "https://sandy-tackiness-annotate.ngrok-free.dev/admin",
      "demo": "https://www.loom.com/share/0d3a406f3695419ba676769af5640031",
      "x": null,
      "telegram": "https://t.me/esistwahr"
    }
  },
  {
    "name": "Amtomat",
    "oneLiner": "Amtomat (Amt + Automat) is an AI public-administration assistant (\"Ämterservice\") reachable over the decentralized Status messenger, with no phone number, no KYC, and end-to-end encryption.",
    "description": "Yes. AI and blockchain!\n\nProblem. Reaching your own AI agent should be as easy as texting a friend, but the channels fall short. Signal needs a phone number, Telegram is unencrypted and centralized.\n\nAgentic AI. Amtomat lives in the decentralized Status messenger: no phone number, end-to-end encrypted, as easy as any chat. And it does not just reply, it acts. Powered by Nebius with tool-calling, the agent reaches the Amt for you and books an appointment.\n\nBlockchain. Each appointment is written as a tamper-proof, content-addressed confirmation on Swarm, verifiable by its hash. The messaging channel itself runs on Waku, a decentralized peer-to-peer network.",
    "whatBuilt": "- Status channel. I can reach the AI now via Status App.\n- Bridge to websocket listing Status node\n- local swam node (docker) \n\nProven end-to-end: Status app -> status-go -> bridge -> Nebius tool-call -> Swarm -> hash returned in the reply, verifiable",
    "focusTrack": "Agent Infrastructure (APIs, ERC-8004, identity, verifiable logs, monitoring & reputation)",
    "bonusTracks": [
      "Nebius",
      "Blockchain for Good"
    ],
    "team": "Niels (engineer)",
    "builder": "Niels Launert",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/Dakavon/AiAgentsHackathon",
      "live": null,
      "demo": "https://nextcloud.launertmedia.de/index.php/s/CLzqSKBtpw7XmHo",
      "x": null,
      "telegram": "https://t.me/niels_eth"
    }
  },
  {
    "name": "NeuroEconomy",
    "oneLiner": "Autonomous multi-agent intelligence economy, set rules once agent does rest powered by Circle USDC",
    "description": "Every SME in Europe has the same problem — they spend weeks manually researching markets, and days processing cross-border payments through expensive, slow, opaque systems.\n\nNeuroEconomy solves both. It's an autonomous AI economy where a Claude-powered orchestrator agent hires five specialist research agents, pays each one in real USDC via Circle Agent Wallets, and delivers a full intelligence brief — in under 30 seconds.\n\nHere's what makes it genuinely different. The Circle Agent Wallet isn't a demo feature — it's the financial backbone. Every agent gets a real USDC transfer with a real transaction hash. Unused budget is automatically refunded. The entire payment trail is recorded and transparent.\n\nThen we go further — into supply chain. Type a product, a quantity, a shipping route. NeuroEconomy fetches live packaging prices from the web, compares freight quotes, calculates landed cost including import duties, and autonomously settles payment with the supplier in USDC. If the balance is insufficient, it stops, shows you the exact shortfall, and generates a PDF invoice either way — so there's always an audit trail.\n\nThis is what programmable money enables. Not just faster payments — fully autonomous, AI-driven financial decisions with complete transparency.",
    "whatBuilt": "Actaully i didnt have knowledge about block chain so that by participating in the hackthon i learnt a lot and as i am AI engineer so i utilize my knowledge specifically agentic one to cennect with next.js as frontend with python as backend power by circle USDC and cluade SDK. So i learnt here two thing one is frontend and other on is blockchain from this hackthon.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Tavilly"
    ],
    "team": "Sunil Kumar , AI Engineer",
    "builder": "Sunil Kumar",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/sun0222/NeuroEconomy.git",
      "live": "https://neuroeconomy.vercel.app/",
      "demo": "https://drive.google.com/file/d/1Z0SddLqy8bRE0PasiSzMO-FZ4hgd42oy/view?usp=sharing",
      "x": null,
      "telegram": "https://t.me/Slk123s"
    }
  },
  {
    "name": "Almoner",
    "oneLiner": "autonomous microgrant officer",
    "description": "Microgrants of $50–500 are the aid grassroots groups need most and can fund least — vetting, disbursing, and verifying each grant by hand costs more than the grant itself, so the money never reaches the people closest to the problem.\nAlmoner is an autonomous AI agent that works as a full grant officer: it intakes applications, scores them on an explicit rubric, screens for fraud and sanctions risk, disburses USDC in milestone tranches, verifies photo evidence before each release, and keeps a public auditable ledger.\nAgentic AI  runs the real reasoning loop — scoring merit and risk separately, deciding within policy (auto / human co-sign / reject), verifying evidence, and writing a rationale for every decision. Blockchain is load-bearing: a Circle Agent Wallet is treasury, identity, and policy at once, with hard spending caps that hold even if the agent is jailbroken by a prompt injection in an application. USDC enables instant borderless tranches, and an on-chain ledger keeps every public dollar transparent while PII stays off-chain via hashes — so it works in low-trust, regulation-sensitive settings (SDG 1 / 13 / 16).",
    "whatBuilt": "ProgramConfig — one JSON config defines a whole program (caps, eligibility, scoring, approval bands, milestones); ships with a climate preset, program-agnostic.\nAgent core (Claude Agent SDK) — full loop intake → score → risk-screen → decide → disburse → verify → reclaim, with a 6-criterion merit rubric and an independent LOW/MEDIUM/HIGH/BLOCK risk tier, each with rationale.\nPolicy engine — validates every action before the wallet: tranche ordering, config compliance, risk rules, duplicate detection.\nCircle Agent Wallet — real USDC tranches on Arc testnet with live tx hashes, balance checks, reclaim; wallet-level caps + $200 auto-approve ceiling enforced independently of the agent.\nx402 nanopayment — agent pays a wallet-screening service per application via Circle CLI.\nVerification pipeline — vision-LLM checks evidence for completeness, authenticity, and content match → confidence verdict → releases next tranche, routing uncertainty to a human.\nLedger + DB — amounts, statuses, tx/rationale hashes on-chain; PII and content off-chain, keyed by hash.\nReact dashboard — Funder / Applicant / Public Ledger: live ledger, budget burndown, per-grant rationale, milestone tracker, co-sign queue, kill-switch.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Blockchain for Good"
    ],
    "team": "1. Nam Lap Vu, full-stack dev, @rrrruiner",
    "builder": "Nam Lap Vu",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/HackatonWinnners/Almoner",
      "live": "https://almoner.042067.xyz",
      "demo": "https://drive.google.com/drive/folders/1HiwlFMFh5usAAVyTi1Dslt3mxA7ZS4Y1?usp=share_link",
      "x": null,
      "telegram": "https://t.me/rrrruiner"
    }
  },
  {
    "name": "ReloGate",
    "oneLiner": "An AI-powered relocation assistant that uses agentic workflows and on-chain USDC payments to generate personalized, research-backed German bureaucracy guides and pre-filled administrative documents.",
    "description": "Relocating to Germany is notoriously complex for foreigners due to fragmented government information, language barriers, and inconsistent or hard-to-navigate administrative processes. Tasks like registration (Anmeldung), visa applications, tax IDs, and health insurance often require understanding official German documents and procedures that are difficult to interpret correctly.\nThis leads to delays, mistakes in paperwork, reliance on expensive consultants, and a generally high cognitive and administrative burden for newcomers.",
    "whatBuilt": "I implemented a full-stack demo of an AI relocation agent that shows how a user would interact with an assistant to navigate German bureaucracy.\nThe system allows users to create a profile and chat with an AI agent that uses Gemini for reasoning and retrieves relevant information from official German government sources via Tavily search to provide general relocation guidance.\nWe built a backend service that connects user context with web-retrieved information and returns structured responses such as requirements and checklists for processes like Anmeldung and visa-related tasks.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Tavilly"
    ],
    "team": "Quan Anh Nguyen ( , role: all-rounder)",
    "builder": "Quan Anh Nguyen",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/Inzagini/ReloGate",
      "live": null,
      "demo": "https://www.loom.com/share/4b8715d2730b4bec840af3708fe65044",
      "x": null,
      "telegram": "https://t.me/izagini"
    }
  },
  {
    "name": "ColdCake",
    "oneLiner": "A personal relationship intelligence agent that remembers your people, creates thoughtful gestures in your voice, and autonomously purchases them through x402.",
    "description": "ColdCake solves a surprisingly human problem: maintaining thoughtful relationships does not scale. Important moments are missed, generic gifts feel impersonal, and researching, choosing, purchasing, and delivering the right gesture requires time and judgment.\n\nColdCake acts as an AI Gift Engineer. It maintains private, tenant-isolated intelligence about the user, recipients, relationship context, preferences, important dates, previous gifts, and spending policies. For each mission, specialist agents research what matters to the recipient, identify a timely and respectful angle, generate creative concepts in the user’s voice, compare compatible products, enforce approval and safety policies, and execute the selected gesture.\n\nThe agent uses Tavily for live, entity-matched public research and NVIDIA Nemotron on Nebius for grounded intelligence and creative reasoning. It then purchases from an x402-protected GiftAgent vendor using a Circle Agent Wallet and Circle Gateway on Base Sepolia. The resulting receipt exposes the verified payment ID, facilitator, network, product price, testnet settlement, and fulfillment status without inventing transaction hashes.\n\nColdCake supports review-everything, smart-approval, and fully headless autopilot modes. It can also publish a private, revocable QR card containing the approved message, artifact, and a scheduling CTA such as Cal.com. Outcomes—including delivery, CTA engagement, and feedback—are written back into relationship memory so future gestures improve.\n\nThe current hackathon deployment uses real Tavily and Nebius inference and a verified x402 testnet payment. Gift fulfillment is transparently sandboxed/simulated until a production fulfillment provider is connected.",
    "whatBuilt": "ColdCake was designed and implemented during the hackathon as a production-oriented, multi-agent commerce application.\n\nWe built:\n\n• A Node.js/Express mission engine orchestrating specialist agents for recipient research, owner preferences, relationship analysis, creative direction, product discovery, concept-product compatibility, policy enforcement, commerce, fulfillment, and memory.\n\n• A tenant-isolated personal intelligence data model covering owner profiles, people, relationships, sourced facts, important dates, missions, concepts, products, approvals, orders, interactions, payment attempts, public cards, scheduling connections, execution jobs, and audit logs.\n\n• Live recipient research through Tavily, including intent-aware queries, source citations, entity matching, grounding validation, confidence tracking, and protections against sensitive or cross-person inferences.\n\n• Creative reasoning through NVIDIA Nemotron-3-Ultra on Nebius, with structured outputs, user voice preferences, anti-hallucination checks, recipient-contamination guards, and deterministic fallback behavior.\n\n• A real x402 commerce flow using a Circle Agent Wallet, Circle Gateway facilitator, and an x402-protected GiftAgent vendor. The primary flow performs an HTTP 402 handshake and returns a verified payment receipt; direct USDC transfer is retained only as an explicitly labeled fallback.\n\n• Server-enforced approval policies with review-everything, smart, and autopilot modes; content-version-pinned approvals; spending limits; capability-scoped service keys; idempotent payment attempts; and separate payment and fulfillment states.\n\n• A fully headless execution API that can run the complete research-to-commerce workflow without an open browser, with durable jobs, restart recovery, scoped permissions, webhook triggers, and duplicate-execution protection.\n\n• Clerk authentication, isolated demo sessions, operator permissions, rate limits, audit trails, and protections preventing demo users from moving real funds.\n\n• Revocable and expiring public recipient cards with opaque QR links, immutable approved content, privacy-safe payloads, scheduling CTAs, and outcome tracking.\n\n• A responsive web interface for onboarding, people and relationship memory, mission creation, live agent progress, concept editing, approval, payment proof, public cards, scheduling, and execution history.\n\n• Automated acceptance, HTTP integration, security, idempotency, public-card privacy, headless execution, x402 ordering, and smoke tests, plus Docker deployment behind the existing Caddy proxy.\n\nThe live deployment demonstrates real Tavily research, live Nebius/Nemotron reasoning, and a verified x402 payment on Base Sepolia. Physical and gift-card fulfillment remain transparently sandboxed for the hackathon demo.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "Alper Koç",
    "builder": "Alper Koç",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/artificialartz/coldcake",
      "live": "https://demo.artificialartz.xyz/coldcake",
      "demo": "https://drive.google.com/drive/folders/1YpE3BgDRrK0kHkLKX1WRvxdcyd7m31vb",
      "x": "https://www.linkedin.com/in/alper-koch/",
      "telegram": "https://t.me/alperkoch"
    }
  },
  {
    "name": "BytomicProxy",
    "oneLiner": "Bytomic Proxy is pay-per-request web egress for AI agents — an agent pays a tenth of a cent in USDC over x402 and routes any request through our proxy, no account or API key, just a funded wallet.",
    "description": "AI agents run from a single datacenter IP that the web blocks the moment they scrape at volume — 429s, geo-walls, bans — and the usual fix, a proxy network, gates access behind accounts, KYC, and monthly contracts a bot can't sign. Bytomic Proxy removes the human from that loop: it turns a proxy egress into a paid HTTP service metered by x402, the open \"HTTP 402 Payment Required\" payment protocol. An autonomous agent discovers the price on a free /catalog, hits the proxy, receives a 402 challenge, signs a USDC micropayment from its Circle Agent Wallet, and retries; Circle Gateway verifies and settles the payment gaslessly on-chain (Base), and only then does the proxy fetch the target through its own IP and stream the response back — with the settlement tx hash returned as a receipt. The wallet is the access credential and the budget: every call is logged to an auditable spend ledger, and the agent stops at its cap. Agentic AI is the buyer (an autonomous Claude Agent SDK loop that shops, pays, and budget-caps); blockchain is the rail (x402 + USDC + Circle Gateway settlement) that makes sub-cent, keyless, per-request commerce between an agent and a service actually work.",
    "whatBuilt": "Everything below was written during the hackathon. Seller (the product): a Node/Express service wrapping the proxy egress with Circle's @circle-fin/x402-batching Gateway middleware — gateway.require(\"$0.001\") on a /proxy?url= route that returns a valid x402-v2 402 challenge, settles via the Circle Gateway facilitator, then forwards the request through the host's egress IP and returns the body plus x-payment-tx. Wrote the spend-ledger layer (per-call receipts → ledger.jsonl: payer, amount, network, tx hash, target, egress IP), a free /catalog discovery endpoint, a live /dashboard (auto-refreshing ledger with on-chain tx links, XSS-escaped), and an optional keyed dev-bypass for fundless demoing. Buyer: a budget-capped buyer script driving the same x402 rail via the Circle CLI (circle services pay … --max-amount as an on-chain overpay guard) on Base Sepolia, plus a runbook to drive the Circle Claude Agent SDK kit as the autonomous buyer. Verified end-to-end: unpaid → 402, paid fetch returns the server's egress IP (proving real relay), receipt logged. Deployed to a public server via Coolify/Docker at https://proxy.bytomic.tech (TLS), and built a marketing landing page (/) and a 9-slide pitch deck (/deck). Repo: github.com/HackatonWinnners/bytomic-proxy.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle"
    ],
    "team": "Kostiantyn Kaimov, Anastasiia Hlushchenko, Pasha Abdulaev",
    "builder": "Kostiantyn Kaimov",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/HackatonWinnners/bytomic-proxy.git",
      "live": "http://proxy.bytomic.tech/",
      "demo": "https://drive.google.com/drive/folders/143h9KvSJXaEKBs8X4OqlfsoNJydZ7Bbl?usp=sharing",
      "x": "https://x.com/madvil2",
      "telegram": "https://t.me/madvil2"
    }
  },
  {
    "name": "THEMIS",
    "oneLiner": "THEMIS is a trust layer that tells AI wallets who to pay, trial, or refuse before   spending money.",
    "description": "THEMIS solves trust for agent commerce. Before an AI wallet pays an unknown\nservice, THEMIS checks verified on-chain reputation, quality history, and wash-\nrisk signals, then returns a clear decision: PAY, TRIAL, or REFUSE.\n \nIt uses agentic AI to discover services, buy data, verify outputs, and route\naround bad providers. It uses blockchain through ERC-8004 identities and\nreputation attestations on Base, making trust evidence public, portable, and\nverifiable.",
    "whatBuilt": "- Circle Agent Wallet / x402 payment flow with simulation mode.\n\n- ERC-8004 service identities and reputation attestations on Base Sepolia.\n  \n- Two-agent demo: Agent A pays, verifies, and attests; Agent B checks reputation\n    and avoids the bad service before spending.\n\n- Trust engine for Quality Score, Wash Risk, Evidence Strength, and PAY / TRIAL /\n    REFUSE decisions.\n\n - Next.js frontend with Trust Explorer, service pages, attestation feed, live\n    replay, and policy engine.\n\n - Exportable wallet policy JSON.\n \n- Integrations with Circle, ERC-8004/Base, Nebius, Tavily, and verifier-style\n    quality checks.",
    "focusTrack": "Agent Infrastructure (APIs, ERC-8004, identity, verifiable logs, monitoring & reputation)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly",
      "Blockchain for Good"
    ],
    "team": "Martin Kaiser, AI Engineer",
    "builder": "Martin Kaiser",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/kaiser-data/themis-trust-layer-for-agent-commerce",
      "live": "https://themis-agent-trust.netlify.app/",
      "demo": "https://www.loom.com/edit/4fae5d86c3d844d69a4b16e0861a83e0",
      "x": "https://www.linkedin.com/in/martin-kaiser-ai",
      "telegram": "https://t.me/kaiser_data"
    }
  },
  {
    "name": "x402Lookout",
    "oneLiner": "An AI-agent payment firewall that prevents autonomous agents from paying malicious, fraudulent, or anomalous requests before funds are transferred.",
    "description": "Lookout is an AI-agent payment firewall that protects autonomous agents from malicious, fraudulent, and unsafe payment requests before funds are transferred.\n\nAs AI agents gain the ability to autonomously purchase resources through protocols like x402, they become vulnerable to scams, untrusted merchants, prompt-injection attacks, and runaway payment loops. Existing payment systems focus on executing transactions, but provide limited safeguards around whether an agent should make a payment in the first place.\n\nLookout acts as a trust and policy layer in front of blockchain payments. When an agent encounters a paid resource, Lookout evaluates the payment request using multiple security checks:\n\n• Spend Control – Prevents agents from exceeding predefined spending limits.\n• Merchant Trust Verification – Uses ERC-8004 identity and reputation data to evaluate merchant legitimacy and block suspicious providers.\n• Behavioral Anomaly Detection – Detects repeated payment attempts that may indicate prompt injection, agent loops, or malicious automation.\n• Web Reputation Investigation – When trust signals are uncertain, Lookout can use Tavily search to gather additional public reputation information before making a payment decision.\n\nOnly after a request passes all security checks is the blockchain payment executed through x402 and settled in USDC. Every decision is logged to create a transparent audit trail of agent spending behavior.\n\nBy combining agentic AI, blockchain payments, identity verification, and reputation analysis, Lookout helps autonomous agents spend money safely and responsibly in an increasingly agent-driven economy.",
    "whatBuilt": "Guardian Policy Engine that evaluates every payment request before execution.\n\nSpend Cap Controls that track per-agent spending and block transactions that exceed configured budgets.\n\nERC-8004 Dummy Identity Verification that checks merchant identities and reputation data before allowing payments.\n\nBehavioral Anomaly Detection that identifies repeated payment requests to the same endpoint and blocks potential agent loops or prompt-injection driven spending.\n\nx402 Integration for real blockchain-based autonomous payments using USDC.\nProtected API Endpoints that require x402 payment before access is granted.\n\nMerchant Trust Registry containing identity, trust score, validation count, and dispute history used by the Guardian decision engine.\n\nPayment Audit Logging that records approvals, rejections, reasons for blocking, spending totals, and transaction metadata.\n\nFlask-based Guardian Service exposing APIs for payment approval, identity lookup, and payment history.\n\nAgent Payment Flow where the buyer agent first requests approval from Guardian and only proceeds with the x402 payment if Guardian authorizes the transaction.\n\nTavily Investigation Layer (prototype) that can be used as a fallback source of reputation information when merchant trust signals are incomplete or uncertain.",
    "focusTrack": "Agent Infrastructure (APIs, ERC-8004, identity, verifiable logs, monitoring & reputation)",
    "bonusTracks": [
      "Tavilly",
      "Blockchain for Good"
    ],
    "team": "Shrey Tusele , developer, \n\nKshitij Nigam, developer",
    "builder": "Shrey Tusele",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/S1T1/X402LOOKOUT",
      "live": null,
      "demo": "https://drive.google.com/file/d/1k79VPPTUfCacllmo-yNZbaXrupcV75Pl/view?usp=sharing",
      "x": null,
      "telegram": "https://t.me/Shreytusele"
    }
  },
  {
    "name": "Agentic Procurement (Circle x402 Track)",
    "oneLiner": "An autonomous procurement agent that researches suppliers via live web search, decides for itself when free data isn't enough, and pays for premium sanctions screening with real USDC over a verified x402-style flow — no human in the loop for the payment decision or the transaction.",
    "description": "Procurement teams routinely need to vet suppliers before committing to bulk orders, but the data that actually matters — sanctions status, compliance risk — usually sits behind a paywall, and deciding whether a given supplier is worth paying to screen is itself a judgment call. This agent makes that judgment call autonomously: it researches a procurement question via Tavily, reads the results, and decides whether free information is sufficient or whether a paid compliance check is warranted — extracting the actual candidate company name to screen if so.\n\nWhen it decides to pay, it doesn't simulate a payment. The agent calls a paywalled endpoint, receives a real HTTP 402 challenge with the price and merchant address, and settles via Circle Developer-Controlled Wallets with a real USDC transfer on ETH-SEPOLIA testnet. The endpoint verifies the transaction actually confirmed on-chain — correct merchant address, correct amount, correct asset — before unlocking anything; a fabricated or replayed payment reference is rejected. Only once payment is verified does the agent receive a live OpenSanctions screening of the company, with the on-chain transaction hash returned as proof of payment. The final recommendation is grounded strictly in what the screening actually returned — the agent does not fabricate financial or credit data the API didn't provide.\n\nThis combines agentic reasoning (the pay/don't-pay decision, company-name extraction, answer synthesis) with a real, verified blockchain settlement rail (x402-style 402-challenge flow over Circle USDC) — autonomous research, autonomous spend decision, autonomous payment, gated real data.",
    "whatBuilt": "Built from scratch during the hackathon, end to end:\n\n- Agent loop (lib/agent.ts): Tavily research → Claude (claude-sonnet-4-6) decision on whether paid data is needed, with company-name extraction → conditional payment → grounded final synthesis.\n- Circle Developer-Controlled Wallets integration (lib/rails/circle.ts): wallet provisioning, USDC transfer execution on ETH-SEPOLIA, and on-chain transaction verification (verifyCirclePayment) that polls Circle's getTransaction API to a terminal state and checks destination address, amount, asset, and chain before any data is released.\n- Paywalled resource endpoint (app/api/paid/route.ts): implements the 402-challenge / pay / re-request pattern, rejects unverified or replayed payment references (402/409), and only then calls the live OpenSanctions API for a real sanctions screening of the extracted company name.\n- PaymentRail interface (lib/rails/types.ts) with an instrument() metrics decorator (lib/rails/metrics.ts), designed so the same agent loop can run against alternative payment rails for comparison.\n- Orchestration route (app/api/agent/route.ts) tying the full flow together end to end.\n\nAll payments are real testnet USDC transactions with verifiable on-chain transaction hashes — not mocked or hardcoded. This implements an x402-style challenge/pay/verify flow rather than the full x402 protocol's EIP-3009 facilitator handshake, a deliberate scope choice for the hackathon timebox.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Tavilly"
    ],
    "team": "",
    "builder": "Nafees Ahamed",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/Nafsgerman/agentic-procurement-circle/tree/main",
      "live": "https://agentic-procurement-circle.vercel.app",
      "demo": "https://www.loom.com/share/7fe0db1bb5334394bd29c2f802eba762",
      "x": null,
      "telegram": "https://t.me/Nafees"
    }
  },
  {
    "name": "TrustLayer",
    "oneLiner": "Economy Trust Coordination Layer - Agents hire Agents",
    "description": "Solving the biggest problem in the field - Can one trust an Agent? ->  Wrapper around Circle Framework with MCP and specialized Agents,  Leveraging ERC-8004 and a \"Middleman\" with ERC-8183 for the TEE validation.",
    "whatBuilt": "The entirety of this project has been build within the scope of the hackathon. Check the git logs file.",
    "focusTrack": "Agent Infrastructure (APIs, ERC-8004, identity, verifiable logs, monitoring & reputation)",
    "bonusTracks": [
      "Circle",
      "Blockchain for Good"
    ],
    "team": "Faris Görlich, James Dyar",
    "builder": "Faris Görlich",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/fgroo/trustlayer",
      "live": "https://trustlayer-bridge-production.up.railway.app/",
      "demo": "https://www.loom.com/share/7923dd1dbbdc497b86b6ffe0352e37c3",
      "x": "https://www.linkedin.com/in/faris-görlich/",
      "telegram": "https://t.me/PaywallWizard420"
    }
  },
  {
    "name": "Tilespree",
    "oneLiner": "Research any topic, get a slide deck made",
    "description": "Research topics publically for free, pay in escrow to keep results private. Integrates Circle SDK for wallet gas sponsoring, escrow, and passkey. Uses tavily and tokenfactory for off-chain search, and inference respecively.",
    "whatBuilt": "webapp using agent in the back with tavily and tokenfactory as tooling. all crypto interaction on circle and arbitrum sepolia",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "Agoston Szoke",
    "builder": "Agoston Szoke",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/agoston0x/tilespree",
      "live": "https://tilespree.xyz",
      "demo": "https://tilespree.xyz/video",
      "x": null,
      "telegram": "https://t.me/agoston0x"
    }
  },
  {
    "name": "Budcle",
    "oneLiner": "Budcle turns any metered API into a Circle/x402-ready agent commerce opportunity by scanning repos and creating maintainer-ready GitHub issues.",
    "description": "Budcle helps grow the supply side of agentic commerce. It analyzes open-source API projects, detects whether they are ready for Circle Agent Wallet, x402 payments, marketplace discovery, schemas, and payment receipts, then creates actionable GitHub issues for maintainers. It uses agentic AI workflows to inspect codebases and generate integration recommendations, and it targets blockchain-based USDC payments through Circle/x402.",
    "whatBuilt": "We built a TypeScript Circle/x402 readiness scanner, Markdown/JSON report generator, GitHub issue workflow, Vercel demo dashboard, and x402-style demo endpoint. We analyzed Firecrawl, Crawl4AI, Browserless, and LibreTranslate, then created public upstream issues tracking how each could add Circle/x402 paid API access. We also prepared and tested a Circle Agent Wallet starter integration with mocked Circle CLI flows.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle"
    ],
    "team": "QIAOQIAO CHEN - DEVELOPER - , BATIKAN BORA ORMANCI - DEVELOPER",
    "builder": "BATIKAN BORA ORMANCI",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/batikanor/Budcle",
      "live": "https://submission-site-six.vercel.app",
      "demo": "https://drive.google.com/drive/folders/1V3p32di1mL7getDLxW1DsBiyGK_P5hGu?usp=sharing",
      "x": "https://www.batikanor.com",
      "telegram": "https://t.me/batikanor"
    }
  },
  {
    "name": "Proprietor",
    "oneLiner": "An AI agent that autonomously owns and operates a profitable micro-SaaS — settling every dollar of revenue and cost in USDC through a Circle Agent Wallet.",
    "description": "Proprietor is a self-running company. Its product is a Company Enrichment API: send it a company domain, it returns a structured profile (industry, size, recent news, key people, funding). The agent is the CEO, the CFO, and the only employee. Its Circle Agent Wallet is the treasury — customers pay it in USDC, and it pays its own suppliers in USDC to fulfill each order. Its single standing goal: stay solvent and grow the treasury.\n\nYou don't watch it send one payment. You watch it run a business: quoting jobs, defending its margin, repricing when costs rise, declining work it would lose money on, and printing a P&L.",
    "whatBuilt": "⏺ - Circle/x402 money layer (TypeScript, net-new) — reusable x402 paid-route factory over @circle-fin/x402-batching (402 when unpaid → verify →\n  receipt, guards batched settlement); Circle CLI treasury adapter (balance, transfer, services pay, services inspect, SCA deploy confirmed via\n  eth_getCode).\n  - Storefront — customer-facing x402 seller (net-new) — paid POST /v1/enrich/<depth> per tier, free /v1/enrich/schema + /v1/preview, unavailable\n  tiers 409 before charge (decline-before-charge); receipt = revenue − wholesale = margin + both tx hashes.\n  - Supplier-agent — second side of the market (net-new) — its own x402 seller + own wallet wrapping the engine, so cost-of-goods is paid in USDC\n  per call (makes the loop two-sided).\n  - CFO — autonomous decision layer (net-new, ~1,900 LOC) — Claude Agent SDK agent with in-process MCP tools (circle_get_balance/inspect/pay);\n  runway → inspect live price → budget gate (daily cap + approval threshold, fail-closed) → pay/decline → receipt.\n  - Repricing logic — inspect live wholesale per tier, compare to target margin, raise/lower retail within floor/ceiling to defend margin.\n  - Spend ledger (SQLite) — per-order P&L + natural-language reasoning + tx hashes, with a CLI read-view.\n  - Fulfilment engine (Python/FastAPI, re-authored in-window) — depth-tiered pipeline (basic|standard|comprehensive): parallel domain research →\n  gap-id → follow-ups → synthesis into typed CompanyProfile; SQLite cache; CostMeter for exact per-call cost; new Tavily (search) +\n  Nebius/TokenFactory (inference) integration; reports cost, never charges.\n  - Two-sided x402 USDC loop on Arc Testnet — buyer → storefront (revenue) + storefront → supplier (cost), both legs settled via Circle Gateway\n  batched settlement.\n  - Proof + glue — live-verify.sh (drives the full loop with real USDC, asserts both legs settled) and cfo-demo.ts (ALLOW / decline-on-cap /\n  escalate-on-approval / reprice).\n  - Deployed landing page — web/ + vercel.json with the live /v1/enrich/schema endpoint + on-chain proof.\n  - ~95 unit tests (82 TypeScript, 13 Python) across the money layer, CFO, gate, ledger, and engine.\n  - Integrations: Circle Agent Wallet + CLI · Circle x402 batched nanopayments (@circle-fin/x402-batching, @x402/core, @x402/evm) · Circle Gateway\n  · Claude Agent SDK · Tavily · Nebius TokenFactory · viem.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly"
    ],
    "team": "zeus intuivo",
    "builder": "Lilly Guo",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/happyhackerbird/proprietor",
      "live": "https://proprietor-livid.vercel.app/",
      "demo": "https://streamable.com/ynp2s8",
      "x": null,
      "telegram": "https://t.me/technocolour"
    }
  },
  {
    "name": "Unified Memory",
    "oneLiner": "Memory layer for AI",
    "description": "The first platform that gives AI agents secure, consent-controlled access to your entire digital life.",
    "whatBuilt": "The whole platform",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle",
      "Nebius",
      "Tavilly",
      "Blockchain for Good"
    ],
    "team": "moe, bayram",
    "builder": "Mohamed Fathy",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/KAWALI-LABS/unified-memory",
      "live": null,
      "demo": "https://github.com/KAWALI-LABS/unified-memory/blob/main/download1781962144285.webm",
      "x": null,
      "telegram": "https://t.me/m4fsm"
    }
  },
  {
    "name": "KnowMarket",
    "oneLiner": "An agent-to-agent marketplace where AI agents publish verified work, discover useful listings, and pay for deliverables using Circle Agent Wallets and x402 USDC payments.",
    "description": "Circle + Sema Agent Marketplace solves the problem of trust, payment, and fulfillment between autonomous agents. Seller agents authenticate with Circle Agent Wallets and publish safe, user-owned listings such as data packs, research, proof services, warm intros, or link/file deliverables. Buyer agents search the marketplace, compare price, proof, risk, and reputation, then approve and pay through an x402-gated endpoint using USDC. Sema adds shared semantic context for provenance, buyer requirements, verification, and reviews. The blockchain/payment layer is used for wallet-based agent identity, USDC checkout, receipts, and seller payout tracking.",
    "whatBuilt": "During the hackathon, we built a working Circle + Sema Agent Marketplace with a Railway-ready Express API, SQLite persistence, wallet-based authentication, listing creation, listing search, x402-gated checkout, purchase receipt tracking, deliverable fulfillment, buyer reviews, seller reputation, and payout ledger logic. We also built a local marketplace web UI for browsing listings and generating buyer prompts or Circle CLI checkout commands. The OpenAI Agents SDK kit was extended with marketplace tools for authentication, scanning safe local value, publishing listings, searching the marketplace, buying listings, fetching delivery, fulfilling purchases, reviewing sellers, and managing pending payouts.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle"
    ],
    "team": "Bruno Eleodoro, Henrik Westerberg",
    "builder": "Bruno Roza",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/BrunoEleodoro/circle-sema-agent-marketplace/tree/feature/marketplace-mvp",
      "live": "https://marketplace-api-production-4b82.up.railway.app",
      "demo": "https://www.loom.com/share/6027f8727c814ba292d60dd52f44efe5",
      "x": "https://x.com/EleodoroRoza",
      "telegram": "https://t.me/BrunoEleodoro"
    }
  },
  {
    "name": "giftr",
    "oneLiner": "AI first gift marketplace: predefined preferences, budget limits, and explicit authorization.",
    "description": "Giftr is a local gift-experience marketplace where anyone can browse and buy handcrafted goods, restaurant vouchers, spa treatments, and creative workshops — all priced and settled \n in USDC via Circle's infrastructure. No accounts, no credit cards, no payment forms. Just a wallet address and a payment that clears in under one second.",
    "whatBuilt": "The marketplace runs as an Express + React app seeded with Berlin-based providers: a craftsman selling olive-wood kitchenware, a trattoria offering dinner vouchers, a ceramics      \n studio, a specialty coffee roaster, spa services and more. \n\nGifts are browsable through a free catalog search and purchasable through a single GET /api/orders/buy endpoint.  \n\n The flow is simple: agent hits the buy endpoint → server returns 402 with payment details → agent pays via circle services pay → Gateway settles in <500ms → server validates the    \n payment and creates the order → a shareable redemption link is delivered on-site, no email needed.                                                                                   \n                                                                                                                                                                                      \nCircle's x402 protocol + Gateway batching means the marketplace never touches a private key, never manages user accounts, and never worries about chain-specific gas \n tokens. A GET request with a wallet address is the entire \"checkout flow.\"  \n\nHow we implemented Circle?                                                                                                                   \n                                                                                                                                                                                      \n 1. Circle Agent Wallet, It authenticates, holds balances, and authorizes payments without API keys, browser  sessions, or manual signing. Our agent logged in once, checked its ARC-TESTNET balance, and was ready to pay.\n                                                                        \n 2. Circle Gateway (GatewayWalletBatched), when the buy endpoint is hit without payment, it returns HTTP 402 Payment Required with base64-encoded x402 payment details in the PAYMENT-REQUIRED header: the seller address, the exact amount in atomic USDC units, the accepted chain (eip155:5042002 = ARC-TESTNET), and the GatewayWalletBatched   \n scheme. The @circle-fin/x402-batching server middleware (createGatewayMiddleware) validates every incoming payment against the Gateway facilitator before the order is created.\n                                                                                                            \n 3. ARC-TESTNET, Circle's testnet where USDC is the native gas token. The wallet holds USDC, the payment is in USDC, the gas is in USDC.\n\nThe API endpoints we created for this:\n\nPublic catalog                                                                                                                                                                       \n - GET /api/catalog — search gifts by keyword, kind, or price. Free.                                                                                                                  \n - GET /api/catalog/:id — get one gift with provider info. Free.                                                                                                                      \n                                                                                                                                                                                      \n Orders — the paid one                                                                                                                                                                \n - GET /api/orders/buy?productId=&buyerAddress=&message=&recipientName= — x402-gated. Returns HTTP 402 with Gateway payment details until paid. On settlement, returns the order with \n a redemption token. This is the only endpoint that costs money.                                                                                                                      \n                                                                                                                                                                                      \n Order lookup (free)                                                                                                                                                                  \n - GET /api/orders/lookup?token= — look up an order by its redemption token. Returns order + gift + provider.                                                                         \n - GET /api/orders/:id — get an order by UUID.                                                                                                                                        \n                                                                                                                                                                                      \n Fulfillment                                                                                                                                                                          \n - POST /api/orders/fulfill — provider marks an order as redeemed via { token }. Requires provider bearer token.                                                                      \n                                                                                                                                                                                      \n Provider dashboard (token-gated)                                                                                                                                                     \n - GET /api/provider/providers — list all providers.                                                                                                                                  \n - GET /api/provider/gifts?providerId= — list your own gift listings.                                                                                                                 \n - POST /api/provider/gifts — create a new gift.                                                                                                                                      \n - PATCH /api/provider/gifts/:id — update a gift's price, description, or status.                                                                                                     \n - DELETE /api/provider/gifts/:id — deactivate a gift.                                                                                                                                \n                                                                                                                                                                                      \n Admin (token-gated, dev only)                                                                                                                                                        \n - GET /api/admin/orders?status= — list all orders.                                                                                                                                   \n - POST /api/admin/orders/:id/status — set order status to open or fulfilled.                                                                                                         \n - POST /api/admin/mock-order — create an order without real payment. Disabled in production.                                                                                         \n                                                                                                                                                                                      \n Twelve endpoints. Only the buy endpoint touches money — a createGatewayMiddleware call sits in front of it, validates the x402 payment against the Circle Gateway facilitator, and   \n only forwards the request once USDC has settled. Everything else is free metadata and lifecycle.",
    "focusTrack": "Agentic Commerce (payments, x402, automation & subscriptions)",
    "bonusTracks": [
      "Circle"
    ],
    "team": "Mel, designer, marketing, slides, ideas",
    "builder": "Alejandro Ramirez",
    "date": "20.06.2026",
    "links": {
      "repo": "https://github.com/faramirezs/gifter",
      "live": "https://numeral-bootie-recognize.ngrok-free.dev/provider",
      "demo": "https://a.cl.ly/Blu8gYGK",
      "x": null,
      "telegram": "https://t.me/alejiri"
    }
  }
];
