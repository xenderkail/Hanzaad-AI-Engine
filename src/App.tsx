/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Trash2,
  Send,
  CornerDownLeft,
  Play,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Download,
  ExternalLink,
  Globe,
  FileText,
  Maximize,
  AlertTriangle,
  X,
  Check,
  ArrowRight,
  BarChart3,
  Trello,
  Gamepad2,
  TrendingUp,
  FileCode,
  SquareCode,
  StopCircle,
  PlusCircle,
  Calendar,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';

const ACTIVE_CODE_KEY = 'hamzaad_active_code';
const CHAT_HISTORY_KEY = 'hamzaad_chat_history';

const DEFAULT_SEED_APP = `<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hamzaad Pulse - Autonomous Engine Workspace</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="h-full flex flex-col bg-slate-950 font-sans p-6 overflow-y-auto">
  <div class="max-w-6xl mx-auto w-full space-y-6">
    <!-- Header -->
    <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-800 gap-4">
      <div class="flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <i data-lucide="cpu" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white">Hamzaad Pulse Control System</h1>
          <p class="text-xs text-slate-400">Autonomous Application Engine Live Canvas Demo</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          AI Studio In-built Key Active
        </span>
      </div>
    </header>

    <!-- KPI Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>Total Executions</span>
          <i data-lucide="zap" class="w-4 h-4 text-amber-400"></i>
        </div>
        <p class="text-2xl font-bold text-white mt-2">2,840</p>
        <span class="text-xs text-emerald-400 font-medium">+24.8% throughput</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>Backend Auth</span>
          <i data-lucide="shield-check" class="w-4 h-4 text-indigo-400"></i>
        </div>
        <p class="text-2xl font-bold text-white mt-2">Zero Config</p>
        <span class="text-xs text-indigo-400 font-medium">Auto Injected Secrets</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>Active Models</span>
          <i data-lucide="layers" class="w-4 h-4 text-teal-400"></i>
        </div>
        <p class="text-2xl font-bold text-white mt-2">Gemini 3.8</p>
        <span class="text-xs text-teal-400 font-medium">Automatic Failover</span>
      </div>
      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow">
        <div class="flex items-center justify-between text-slate-400 text-xs">
          <span>Render Sandbox</span>
          <i data-lucide="gauge" class="w-4 h-4 text-emerald-400"></i>
        </div>
        <p class="text-2xl font-bold text-white mt-2">8ms</p>
        <span class="text-xs text-emerald-400 font-medium">Isolated DOM execution</span>
      </div>
    </div>

    <!-- Chart & Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-semibold text-slate-200">Real-time Inference Velocity</h2>
          <span class="text-xs text-slate-400">Tokens/sec (Simulated)</span>
        </div>
        <div class="h-64">
          <canvas id="pulseChart"></canvas>
        </div>
      </div>
      <div class="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
        <div>
          <h2 class="text-sm font-semibold text-slate-200 mb-3">Studio Directives</h2>
          <ul class="space-y-2.5 text-xs text-slate-300">
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Single-File Autonomous HTML</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Tailwind CSS & Chart.js Pre-Configured</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Live Bi-Directional Code Sync</span>
            </li>
            <li class="flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
              <span>Device Viewport Sandbox</span>
            </li>
          </ul>
        </div>
        <button onclick="simulateTick()" class="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl transition shadow">
          Trigger Live Data Pulse
        </button>
      </div>
    </div>
  </div>

  <script>
    lucide.createIcons();
    const ctx = document.getElementById('pulseChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [{
          label: 'Inference Velocity',
          data: [65, 82, 110, 145, 120, 168, 190],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        }, {
          label: 'Failover Headroom',
          data: [40, 45, 55, 70, 60, 85, 95],
          borderColor: '#6366f1',
          borderDash: [5, 5],
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { size: 11 } } }
        },
        scales: {
          x: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#64748b' } },
          y: { grid: { color: 'rgba(51, 65, 85, 0.2)' }, ticks: { color: '#64748b' } }
        }
      }
    });

    function simulateTick() {
      const nextVal = Math.floor(Math.random() * 80) + 120;
      chart.data.datasets[0].data.shift();
      chart.data.datasets[0].data.push(nextVal);
      chart.update();
    }
  </script>
</body>
</html>`;

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  hasGeneratedCode?: boolean;
  modelUsed?: string;
  timestamp?: string;
  suggestions?: string[];
}

const STARTER_PRESETS = [
  {
    title: 'SaaS Analytics Hub',
    icon: BarChart3,
    color: 'emerald',
    desc: 'KPI monitoring suite with Chart.js charts, filters, and transaction tables',
    prompt: 'Build a high-performance Enterprise SaaS Analytics Dashboard using Tailwind CSS and Chart.js. Include conversion rate line charts, monthly revenue trajectory, a filterable customer transactions table with search, and interactive date-range controls.'
  },
  {
    title: 'Sprint Kanban Board',
    icon: Trello,
    color: 'indigo',
    desc: 'Agile workflow board with columns, card creator, priorities, and local storage',
    prompt: 'Build a full-featured Agile Kanban Board with Tailwind CSS. Include drag-and-drop or column move actions for Backlog, In Progress, Review, and Done. Support adding cards with priority tags (High, Medium, Low), task estimation points, search filter, and localStorage persistence.'
  },
  {
    title: 'Cyberpunk Arcade',
    icon: Gamepad2,
    color: 'amber',
    desc: 'Playable space shooter game with HTML5 Canvas, synth sound, and particle explosions',
    prompt: 'Build a Cyberpunk Retro Space Arcade game in HTML5 Canvas and Tailwind CSS. The player pilots a ship fighting waves of neon alien invaders with laser beams, power-ups, particle explosions, high score tracking, sound effects via Web Audio API synth, and responsive touch/keyboard controls.'
  },
  {
    title: 'Crypto Portfolio Simulator',
    icon: TrendingUp,
    color: 'teal',
    desc: 'Real-time ticker simulator with interactive Chart.js donut and line graphs',
    prompt: 'Build a Real-Time Cryptocurrency Portfolio Simulator with Tailwind CSS and Chart.js. Include a live price ticker updating every 2 seconds with realistic random walks, portfolio balance allocation donut chart, buy/sell simulation modal, and transaction history.'
  },
  {
    title: 'Interactive Schedule Planner',
    icon: Calendar,
    color: 'purple',
    desc: 'Daily appointment & event planner with timetable view and reminder tags',
    prompt: 'Build an elegant Daily Schedule Planner & Time-Blocking Studio using Tailwind CSS. Include a 24-hour interactive timetable, event creation modal with color tags, category filters (Work, Health, Personal), and progress completion meter.'
  }
];

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<'canvas' | 'code'>('canvas');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeCode, setActiveCode] = useState<string>(DEFAULT_SEED_APP);
  const [editorValue, setEditorValue] = useState<string>(DEFAULT_SEED_APP);
  const [appTitle, setAppTitle] = useState('Hamzaad Pulse Analytics');
  const [fileSizeKb, setFileSizeKb] = useState('14.8');

  // Backend / Model Status
  const [backendStatus, setBackendStatus] = useState<{
    hasApiKey: boolean;
    models: string[];
    defaultModel: string;
  }>({
    hasApiKey: true,
    models: ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite', 'gemini-2.5-flash'],
    defaultModel: 'gemini-3.8-flash'
  });

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome',
        role: 'assistant',
        text: `Welcome to **Hamzaad** — Autonomous AI Application Engine & Live Studio.\n\nAll AI requests are automatically powered by **AI Studio In-built Keys** — no manual key setup or vault required!\n\n✨ **What would you like to build?** Choose a starter template or describe any application below.`,
        suggestions: [
          'Create a SaaS Analytics Hub with Chart.js',
          'Build a Kanban Workflow Board',
          'Make a Retro Canvas Arcade Game',
          'Build a Crypto Portfolio Simulator'
        ]
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isStartersOpen, setIsStartersOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'error' | 'info' } | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check backend status on mount
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ready') {
          setBackendStatus(data);
        }
      })
      .catch(err => {
        console.warn('Backend status check failed:', err);
      });

    // Load persisted active code
    try {
      const savedCode = localStorage.getItem(ACTIVE_CODE_KEY);
      if (savedCode && savedCode.trim().length > 50) {
        setActiveCode(savedCode);
        setEditorValue(savedCode);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save chat history
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Update title & file size
  useEffect(() => {
    let title = 'Hamzaad Application';
    const match = activeCode.match(/<title>([^<]+)<\/title>/i);
    if (match && match[1]) {
      title = match[1].trim();
    }
    setAppTitle(title);

    const bytes = new Blob([activeCode]).size;
    setFileSizeKb((bytes / 1024).toFixed(1));

    if (iframeRef.current) {
      iframeRef.current.srcdoc = activeCode;
    }

    try {
      localStorage.setItem(ACTIVE_CODE_KEY, activeCode);
    } catch {
      // ignore
    }
  }, [activeCode]);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating, generationStage]);

  // Elapsed timer during generation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isGenerating) {
      setElapsedSeconds(0);
      interval = setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Extract HTML from response
  const extractCode = (raw: string): { code: string | null; text: string } => {
    const regex = /```(?:html)?\s*([\s\S]*?)```/i;
    const match = raw.match(regex);
    if (match && match[1] && match[1].includes('<')) {
      const code = match[1].trim();
      const text = raw.replace(regex, '').trim();
      return { code, text };
    }
    if (raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')) {
      return { code: raw.trim(), text: 'Application synthesized successfully.' };
    }
    return { code: null, text: raw };
  };

  // Generate / Refine Application via Server
  const handleSend = async (customPrompt?: string) => {
    const promptToSend = (customPrompt || inputPrompt).trim();
    if (!promptToSend || isGenerating) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputPrompt('');
    setIsGenerating(true);
    setGenerationStage('Consulting Gemini 3.8 Flash with in-built AI Studio credentials...');

    // Progress stage simulation
    const stage1 = setTimeout(() => {
      setGenerationStage('Architecting UI, Tailwind styling, and Chart.js telemetry...');
    }, 1800);
    const stage2 = setTimeout(() => {
      setGenerationStage('Compiling self-contained single-file sandbox bundle...');
    }, 3800);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      // Provide conversational history context for seamless iteration
      const recentHistory = messages.slice(-4).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          history: recentHistory,
          currentCode: activeCode
        }),
        signal: controller.signal
      });

      clearTimeout(stage1);
      clearTimeout(stage2);

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const rawText = data.response || '';
      const modelUsed = data.modelUsed || 'gemini-3.8-flash';

      const { code, text } = extractCode(rawText);

      if (code) {
        setActiveCode(code);
        setEditorValue(code);

        // Generate tailored follow-up suggestion chips
        const followUps = [
          'Add Dark Mode / Light Mode toggle',
          'Add Search & Filter Controls',
          'Add Export Data to CSV / JSON',
          'Enhance with Animated Micro-interactions'
        ];

        setMessages(prev => [
          ...prev,
          {
            id: 'msg-' + Date.now(),
            role: 'assistant',
            text: text || 'Application synthesized successfully and loaded into Panel 2 Live Canvas.',
            hasGeneratedCode: true,
            modelUsed: modelUsed,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: followUps
          }
        ]);

        showToast(`Synthesized with ${modelUsed}!`, 'success');
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: 'msg-' + Date.now(),
            role: 'assistant',
            text: rawText,
            hasGeneratedCode: false,
            modelUsed: modelUsed,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }

    } catch (err: unknown) {
      clearTimeout(stage1);
      clearTimeout(stage2);
      const error = err as Error;

      if (error.name === 'AbortError') {
        showToast('Generation stopped', 'info');
      } else {
        console.error('Generation error:', error);
        setMessages(prev => [
          ...prev,
          {
            id: 'err-' + Date.now(),
            role: 'assistant',
            text: `⚠️ **Generation Error**: ${error.message}\n\nPlease try again or refine your prompt.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        showToast(error.message, 'error');
      }
    } finally {
      setIsGenerating(false);
      setGenerationStage('');
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleApplyEditorCode = () => {
    setActiveCode(editorValue);
    setActiveTab('canvas');
    showToast('Code changes applied to Live Canvas!', 'success');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      showToast('Source code copied to clipboard!', 'success');
    } catch {
      showToast('Failed to copy', 'error');
    }
  };

  const handleDownloadApp = () => {
    let filename = 'hamzaad-app.html';
    const match = activeCode.match(/<title>([^<]+)<\/title>/i);
    if (match && match[1]) {
      filename = match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';
    }
    const blob = new Blob([activeCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Saved as ${filename}`, 'success');
  };

  const handleDownloadStandaloneStudio = () => {
    const a = document.createElement('a');
    a.href = '/Hamzaad.html';
    a.download = 'Hamzaad.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Downloaded standalone Hamzaad.html!', 'success');
  };

  const handlePopout = () => {
    const blob = new Blob([activeCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear conversation history?')) {
      const resetMsg: ChatMessage = {
        id: 'msg-' + Date.now(),
        role: 'assistant',
        text: 'Conversation cleared. What would you like to synthesize next?',
        suggestions: [
          'Build a SaaS Analytics Hub',
          'Create an Interactive Time Planner',
          'Build a Crypto Portfolio Simulator'
        ]
      };
      setMessages([resetMsg]);
      localStorage.removeItem(CHAT_HISTORY_KEY);
      showToast('Conversation cleared', 'info');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans select-none antialiased">
      
      {/* TOP HEADER */}
      <header className="h-14 border-b border-slate-800/80 bg-slate-900/90 backdrop-blur px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                HAMZAAD
              </h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                v2.5 Autonomous Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">AI Application Engine &amp; Live Preview Canvas Studio</p>
          </div>
        </div>

        {/* Central In-Built Key & Cascade Status */}
        <div className="hidden md:flex items-center gap-2.5 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Studio In-built Key Active</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Cascade:</span>
            <span className="font-mono text-indigo-300 font-medium">{backendStatus.defaultModel}</span>
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Templates Trigger */}
          <button
            onClick={() => setIsStartersOpen(true)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition font-medium"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          {/* Standalone File Export Button */}
          <button
            onClick={handleDownloadStandaloneStudio}
            title="Download standalone Hamzaad.html file"
            className="text-xs px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition font-medium"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline font-mono text-[11px]">Hamzaad.html</span>
          </button>
        </div>
      </header>

      {/* MAIN SPLIT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* PANEL 1: CHAT COPILOT (~42% width) */}
        <section className="w-full md:w-[42%] flex flex-col bg-slate-900 border-r border-slate-800 z-10 shrink-0 select-text">
          
          {/* Copilot Bar */}
          <div className="h-10 px-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Autonomous Prompt Copilot</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                isGenerating ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {isGenerating ? `Synthesizing (${elapsedSeconds}s)` : 'Online'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Clear Chat Thread"
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => {
              const isUser = msg.role === 'user';
              return (
                <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}>
                  
                  <div
                    className={`text-xs sm:text-sm rounded-2xl px-4 py-3 shadow-sm leading-relaxed ${
                      isUser
                        ? 'max-w-[88%] bg-emerald-600 text-white rounded-tr-sm'
                        : 'max-w-[92%] bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {/* CODE SUPPRESSION BADGE (Replaces thousands of lines of raw HTML) */}
                    {msg.hasGeneratedCode && (
                      <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>✨ [Single-File Application Rendered to Panel 2 Live Canvas]</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => setActiveTab('canvas')}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>Live Canvas</span>
                          </button>
                          <button
                            onClick={() => setActiveTab('code')}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
                          >
                            <Code2 className="w-3 h-3" />
                            <span>Source Code</span>
                          </button>
                          <button
                            onClick={handleDownloadApp}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Export</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Follow-up suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && !isGenerating && (
                      <div className="mt-3 pt-2.5 border-t border-slate-700/40">
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1.5">
                          Suggested Next Iterations:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(sug)}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/40 transition text-left"
                            >
                              + {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-500 px-1 font-mono flex items-center gap-1">
                    <span>{isUser ? 'You' : (msg.modelUsed ? `Hamzaad • ${msg.modelUsed}` : 'Hamzaad Copilot')}</span>
                    {msg.timestamp && <span>• {msg.timestamp}</span>}
                  </span>
                </div>
              );
            })}

            {/* Live Progress Stage Indicator */}
            {isGenerating && (
              <div className="p-3.5 bg-indigo-950/60 border border-indigo-800/60 rounded-2xl text-xs space-y-2 animate-pulse text-indigo-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                    <span className="font-semibold text-white">Synthesizing Application</span>
                  </div>
                  <span className="font-mono text-indigo-300 text-[11px]">{elapsedSeconds}s</span>
                </div>
                <p className="text-[11px] text-indigo-300">{generationStage}</p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleStopGeneration}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 flex items-center gap-1 transition"
                  >
                    <StopCircle className="w-3 h-3" />
                    <span>Stop Generation</span>
                  </button>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input Box Area */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/80 shrink-0">
            {/* Quick Blueprint Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[11px]">
              <span className="text-slate-500 text-[10px] uppercase font-semibold shrink-0">Ideas:</span>
              <button
                onClick={() => handleSend('Build a high-performance Enterprise SaaS Analytics Dashboard using Tailwind CSS and Chart.js with conversion funnels and transaction filters.')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              >
                📊 SaaS Dashboard
              </button>
              <button
                onClick={() => handleSend('Build an Agile Kanban Board with Tailwind CSS supporting Backlog, In Progress, Review, Done, priority tags, and task points.')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              >
                ⚡ Kanban Board
              </button>
              <button
                onClick={() => handleSend('Build a Retro Cyberpunk Space Shooter game in HTML5 Canvas and Tailwind CSS with laser sounds and high scores.')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              >
                🎮 Arcade Game
              </button>
              <button
                onClick={() => handleSend('Build a Real-Time Crypto Portfolio Simulator with Tailwind CSS, Chart.js donut allocation, and live randomized tickers.')}
                className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
              >
                📈 Crypto Portfolio
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="relative"
            >
              <textarea
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={3}
                placeholder="Describe your application or request an enhancement (e.g. 'Build an interactive Sales CRM with lead pipeline and Chart.js analytics')... Press Enter to send, Shift+Enter for newline"
                className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 text-xs sm:text-sm rounded-xl p-3 pb-11 border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 resize-none font-sans"
              />

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 pointer-events-auto text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <CornerDownLeft className="w-3 h-3 text-slate-400" /> Enter sends
                  </span>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <span className="hidden sm:inline">Shift+Enter newline</span>
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  {isGenerating ? (
                    <button
                      type="button"
                      onClick={handleStopGeneration}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow"
                    >
                      <StopCircle className="w-3.5 h-3.5" />
                      <span>Stop</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputPrompt.trim()}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-500/20"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* SPLITTER BAR */}
        <div className="hidden md:flex w-1 bg-slate-800 hover:bg-emerald-500/50 transition cursor-col-resize items-center justify-center z-10" />

        {/* PANEL 2: LIVE CANVAS & CODE INSPECTOR (~58% width) */}
        <section className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          
          {/* Action Header */}
          <div className="h-10 px-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs shrink-0 z-10">
            {/* Dual Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveTab('canvas')}
                className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
                  activeTab === 'canvas'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Live Canvas</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition ${
                  activeTab === 'code'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
            </div>

            {/* Device Viewport Switcher */}
            <div className={`flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 ${
              activeTab === 'code' ? 'opacity-30 pointer-events-none' : ''
            }`}>
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop Viewport (100%)"
                className={`p-1.5 rounded-md transition ${
                  viewport === 'desktop' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet Viewport (768px)"
                className={`p-1.5 rounded-md transition ${
                  viewport === 'tablet' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile Viewport (375px)"
                className={`p-1.5 rounded-md transition ${
                  viewport === 'mobile' ? 'text-emerald-400 bg-slate-800' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleApplyEditorCode}
                title="Apply Code Changes to Canvas"
                className="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-medium transition"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Apply Changes</span>
              </button>
              <button
                onClick={handleCopyCode}
                title="Copy Complete HTML Code"
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                onClick={handleDownloadApp}
                title="Download .html file"
                className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1 transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save (.html)</span>
              </button>
              <button
                onClick={handlePopout}
                title="Open in New Tab"
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MAIN TAB CONTENT AREA */}
          <div className="flex-1 relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4">
            
            {/* TAB 1: LIVE CANVAS VIEW */}
            <div className={`w-full h-full flex flex-col items-center justify-center ${activeTab === 'canvas' ? '' : 'hidden'}`}>
              <div
                style={{
                  width: viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '375px',
                  maxWidth: '100%'
                }}
                className="h-full relative rounded-xl overflow-hidden border border-slate-800 bg-white shadow-2xl transition-all duration-300"
              >
                <iframe
                  ref={iframeRef}
                  title="Hamzaad Live Application Preview"
                  sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                  className="w-full h-full border-0 bg-white"
                />
              </div>
            </div>

            {/* TAB 2: SOURCE CODE EDITOR VIEW */}
            <div className={`w-full h-full ${activeTab === 'code' ? 'flex flex-col' : 'hidden'}`}>
              <div className="flex-1 relative rounded-xl border border-slate-800 overflow-hidden bg-slate-900 flex flex-col">
                <div className="h-8 px-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-2">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hamzaad_App_Bundle.html</span>
                  </span>
                  <span>{editorValue.split('\n').length} lines</span>
                </div>
                <textarea
                  value={editorValue}
                  onChange={e => setEditorValue(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full p-4 bg-slate-950 font-mono text-xs sm:text-sm text-emerald-300/90 leading-relaxed resize-none focus:outline-none selection:bg-emerald-900/40"
                  placeholder="<!-- Generated Single-File HTML Code will appear here -->"
                />
              </div>
            </div>

          </div>

          {/* PANEL 2 FOOTER */}
          <footer className="h-8 px-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0 font-mono">
            <div className="flex items-center gap-2 truncate">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-500">Title:</span>
              <span className="text-slate-200 font-medium truncate">{appTitle}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-500" />
                <span>{fileSizeKb} KB</span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-1">
                <Maximize className="w-3 h-3 text-slate-500" />
                <span>{viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '375px'}</span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Sandbox Active</span>
              </span>
            </div>
          </footer>

        </section>
      </div>

      {/* MODAL: STARTERS / BLUEPRINTS */}
      {isStartersOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Hamzaad Starter Blueprints</h2>
                  <p className="text-xs text-slate-400">Click any preset to synthesize immediately</p>
                </div>
              </div>
              <button onClick={() => setIsStartersOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
              {STARTER_PRESETS.map((starter, index) => {
                const IconComponent = starter.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setIsStartersOpen(false);
                      handleSend(starter.prompt);
                    }}
                    className="text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition group"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-emerald-400 mb-1">
                      <IconComponent className="w-4 h-4 text-emerald-400" />
                      <span>{starter.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{starter.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-10 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          <div
            className={`px-3.5 py-2.5 rounded-xl border text-xs shadow-xl backdrop-blur flex items-center gap-2 pointer-events-auto animate-bounce ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                : toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-200'
                : 'bg-slate-900/90 border-slate-700 text-slate-200'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4 h-4 shrink-0 text-emerald-400" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />}
            {toast.type === 'error' && <X className="w-4 h-4 shrink-0 text-red-400" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
