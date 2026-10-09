import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { AIToolConfig, ChatMessage, ChatAttachment, SavedChatSession } from '../../types';
import { aiToolsList, sendChatMessageToRikouAI } from '../../data/aiTools';
import { RikouAIResponseRenderer } from './RikouAIResponseRenderer';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  RotateCw,
  Copy, 
  Check, 
  Lightbulb, 
  FileText, 
  Zap, 
  AlignLeft, 
  Hash, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  BarChart3, 
  Image as ImageIcon, 
  User, 
  DollarSign, 
  Calendar, 
  Film,
  User as UserIcon,
  X,
  Paperclip,
  History,
  Trash2,
  Plus,
  Flame,
  ChevronRight,
  CornerDownLeft,
  File,
  AlertCircle
} from 'lucide-react';

interface RikouAIViewProps {
  onCopyText: (text: string, label: string) => void;
  initialToolId?: string;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Lightbulb,
  FileText,
  Zap,
  Sparkles,
  AlignLeft,
  Hash,
  MessageSquare,
  RefreshCw,
  Search,
  BarChart3,
  Image: ImageIcon,
  User,
  DollarSign,
  Calendar,
  Film
};

// Clean, professional markdown presenter for Rikou AI responses
const FormattedAIMessage: React.FC<{ content: string; isRTL: boolean }> = ({ content, isRTL }) => {
  // 1. Sanitize raw prompt or director-instruction leaks if present
  const lines = content.split('\n').filter((l) => {
    const trimmed = l.trim().toLowerCase();
    if (
      trimmed.startsWith('typography:') ||
      trimmed.startsWith('typography :') ||
      trimmed.startsWith('contrast:') ||
      trimmed.startsWith('contrast :') ||
      trimmed.startsWith('• التوجه البصري:') ||
      trimmed.startsWith('• الكاميرا:') ||
      trimmed.startsWith('• المؤثر الصوتي:') ||
      trimmed.startsWith('• سر القوة:')
    ) {
      return false;
    }
    return true;
  });

  const renderInline = (text: string): React.ReactNode => {
    // Process bold **text** and `code`
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={idx} className="font-bold text-purple-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code key={idx} className="rounded bg-purple-950/30 px-1.5 py-0.5 font-mono text-xs text-purple-200 border border-purple-800/30">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const blocks: React.ReactNode[] = [];
  let currentList: { type: 'bullet' | 'number'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === 'bullet') {
        blocks.push(
          <ul key={`list-${blocks.length}`} className="my-2 space-y-1.5 ps-5 list-disc marker:text-purple-400">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed text-zinc-200">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`list-${blocks.length}`} className="my-2 space-y-1.5 ps-5 list-decimal marker:text-purple-400">
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed text-zinc-200">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Horizontal Divider
    if (line.startsWith('---') || line.startsWith('━━━') || line.startsWith('___')) {
      flushList();
      blocks.push(<hr key={`hr-${idx}`} className="my-3 border-zinc-800" />);
      return;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h4 key={`h4-${idx}`} className="mt-4 mb-2 text-sm sm:text-base font-black text-white tracking-wide border-b border-zinc-800/60 pb-1">
          {renderInline(line.replace('### ', ''))}
        </h4>
      );
      return;
    }
    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h3 key={`h3-${idx}`} className="mt-4 mb-2 text-base sm:text-lg font-black text-purple-300">
          {renderInline(line.replace('## ', ''))}
        </h3>
      );
      return;
    }
    if (line.startsWith('# ')) {
      flushList();
      blocks.push(
        <h2 key={`h2-${idx}`} className="mt-4 mb-2 text-lg sm:text-xl font-black text-white">
          {renderInline(line.replace('# ', ''))}
        </h2>
      );
      return;
    }

    // Bullet points: * or - or •
    const bulletMatch = line.match(/^[\*\-•]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'bullet') {
        flushList();
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      return;
    }

    // Numbered lists: 1. or 2.
    const numberMatch = line.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'number') {
        flushList();
        currentList = { type: 'number', items: [] };
      }
      currentList.items.push(numberMatch[2]);
      return;
    }

    // Regular paragraph
    flushList();
    blocks.push(
      <p key={`p-${idx}`} className="my-1.5 leading-relaxed text-xs sm:text-sm text-zinc-200">
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return (
    <div className={`space-y-0.5 ${isRTL ? 'text-right' : 'text-left'} break-words`}>
      {blocks}
    </div>
  );
};

export const RikouAIView: React.FC<RikouAIViewProps> = ({ onCopyText, initialToolId }) => {
  const { language, isRTL, t, localizeTool } = useLanguage();
  const isArabicFamily = language === 'ar' || language === 'ary';
  const isFr = language === 'fr';

  // Saved chat sessions management
  const [savedSessions, setSavedSessions] = useState<SavedChatSession[]>(() => {
    try {
      const stored = localStorage.getItem('rikou_ai_saved_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved sessions:', e);
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    try {
      const storedId = localStorage.getItem('rikou_ai_current_session_id');
      if (storedId) return storedId;
    } catch {}
    return `session-${Date.now()}`;
  });

  // Load chat messages from current session or fallback to legacy storage
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const storedSessions = localStorage.getItem('rikou_ai_saved_sessions');
      const storedCurrentId = localStorage.getItem('rikou_ai_current_session_id');
      if (storedSessions && storedCurrentId) {
        const sessions: SavedChatSession[] = JSON.parse(storedSessions);
        const current = sessions.find((s) => s.id === storedCurrentId);
        if (current && current.messages.length > 0) {
          return current.messages;
        }
      }
      const legacySaved = localStorage.getItem('rikou_ai_chat_history');
      if (legacySaved) {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    }
    return [];
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeQuickActionId, setActiveQuickActionId] = useState<string | null>(initialToolId || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [attachment, setAttachment] = useState<ChatAttachment | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatInputContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync currentSessionId and messages to localStorage and update session title
  useEffect(() => {
    try {
      localStorage.setItem('rikou_ai_current_session_id', currentSessionId);
      localStorage.setItem('rikou_ai_chat_history', JSON.stringify(messages));

      if (messages.length > 0) {
        const firstUser = messages.find((m) => m.role === 'user');
        const autoTitle = firstUser 
          ? (firstUser.content.slice(0, 38).trim() + (firstUser.content.length > 38 ? '...' : ''))
          : t.ai.conversation;

        setSavedSessions((prev) => {
          const existingIdx = prev.findIndex((s) => s.id === currentSessionId);
          if (existingIdx >= 0) {
            const updated = [...prev];
            updated[existingIdx] = {
              ...updated[existingIdx],
              messages,
              title: updated[existingIdx].title && updated[existingIdx].title !== 'محادثة بدون عنوان' && updated[existingIdx].title !== 'New Conversation'
                ? updated[existingIdx].title 
                : autoTitle,
              updatedAt: Date.now(),
              activeQuickActionId: activeQuickActionId || undefined,
            };
            try {
              localStorage.setItem('rikou_ai_saved_sessions', JSON.stringify(updated));
            } catch {}
            return updated;
          } else {
            const newSession: SavedChatSession = {
              id: currentSessionId,
              title: autoTitle,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              messages,
              activeQuickActionId: activeQuickActionId || undefined,
            };
            const updated = [newSession, ...prev];
            try {
              localStorage.setItem('rikou_ai_saved_sessions', JSON.stringify(updated));
            } catch {}
            return updated;
          }
        });
      }
    } catch (e) {
      console.warn('Failed to sync session storage:', e);
    }
  }, [messages, currentSessionId, activeQuickActionId, language, t.ai.conversation]);

  // Handle initialToolId change
  useEffect(() => {
    if (initialToolId) {
      const tool = aiToolsList.find((t) => t.id === initialToolId);
      if (tool) {
        setActiveQuickActionId(tool.id);
        const loc = localizeTool(tool);
        const prefix = isArabicFamily 
          ? (tool.promptPrefixAr || tool.arabicPlaceholder || loc.title) 
          : isFr 
          ? (tool.promptPrefixFr || tool.frenchPlaceholder || loc.title) 
          : (tool.promptPrefixEn || tool.placeholder || loc.title);
        setInputPrompt(prefix || '');
      }
    }
  }, [initialToolId, language, isArabicFamily, isFr, localizeTool]);

  // Scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isGenerating]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputPrompt]);

  const activeTool = aiToolsList.find((t) => t.id === activeQuickActionId) || null;

  // 1. NEW CHAT: Clears visible chat, starts fresh context, keeps old saved
  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
    localStorage.removeItem('rikou_ai_chat_history');
    localStorage.setItem('rikou_ai_current_session_id', newId);
    setActiveQuickActionId(null);
    setInputPrompt('');
    setAttachment(null);
    setIsHistoryOpen(false);
  };

  // Open an existing session from history
  const handleSelectSession = (session: SavedChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setActiveQuickActionId(session.activeQuickActionId || null);
    setInputPrompt('');
    setAttachment(null);
    setIsHistoryOpen(false);
  };

  // Delete an individual conversation
  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const updated = savedSessions.filter((s) => s.id !== sessionId);
    setSavedSessions(updated);
    try {
      localStorage.setItem('rikou_ai_saved_sessions', JSON.stringify(updated));
    } catch {}

    // If the active conversation was deleted, reset to fresh chat
    if (sessionId === currentSessionId) {
      handleNewChat();
    }
  };

  // Delete all conversations with confirmation
  const handleDeleteAllSessions = () => {
    if (window.confirm(t.ai.confirmDeleteAll)) {
      setSavedSessions([]);
      try {
        localStorage.removeItem('rikou_ai_saved_sessions');
      } catch {}
      handleNewChat();
    }
  };

  // 2. COPY AI RESPONSE: Copy ONLY assistant content and show feedback
  const handleCopyMessage = (msgId: string, content: string) => {
    onCopyText(content, t.ai.responseCopied);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 3. REGENERATE RESPONSE: Regenerates new answer to same user request with context
  const handleRegenerate = async (msgIndex?: number) => {
    if (isGenerating) return;

    // Find the assistant message to regenerate (or latest assistant message)
    let targetAssistantIdx = -1;
    if (typeof msgIndex === 'number' && messages[msgIndex]?.role === 'assistant') {
      targetAssistantIdx = msgIndex;
    } else {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'assistant') {
          targetAssistantIdx = i;
          break;
        }
      }
    }

    if (targetAssistantIdx === -1) return;

    // The messages up to the user message that prompted this assistant response
    const contextMessages = messages.slice(0, targetAssistantIdx);
    if (contextMessages.length === 0) return;

    setIsGenerating(true);
    try {
      const reply = await sendChatMessageToRikouAI(
        contextMessages,
        activeQuickActionId || undefined,
        language,
        true // isRegenerate = true
      );

      const updated = [...messages];
      updated[targetAssistantIdx] = {
        ...updated[targetAssistantIdx],
        content: reply,
        timestamp: Date.now(),
      };
      setMessages(updated);
    } catch (err) {
      console.error('Failed to regenerate response:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 6. QUICK ACTIONS: Select and prepare in chat
  const handleSelectQuickAction = (tool: AIToolConfig) => {
    setActiveQuickActionId(tool.id);
    const loc = localizeTool(tool);
    const prefix = isArabicFamily 
      ? (tool.promptPrefixAr || tool.arabicPlaceholder || loc.title) 
      : isFr 
      ? (tool.promptPrefixFr || tool.frenchPlaceholder || loc.title) 
      : (tool.promptPrefixEn || tool.placeholder || loc.title);
    setInputPrompt(prefix || '');

    // Focus input and scroll to it smoothly
    if (textareaRef.current) {
      textareaRef.current.focus();
      const len = (prefix || '').length;
      textareaRef.current.setSelectionRange(len, len);
    }
    chatInputContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // 7. IMAGE / FILE UPLOAD PREPARATION
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Max 10MB limit safety
    if (file.size > 10 * 1024 * 1024) {
      alert(t.ai.fileTooLarge || 'File size too large (max 10MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachment({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl: reader.result as string,
      });
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be chosen again if desired
    e.target.value = '';
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if ((!text && !attachment) || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'user',
      content: text || t.ai.analyzeFile,
      timestamp: Date.now(),
      quickActionId: activeQuickActionId || undefined,
      attachment: attachment || undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputPrompt('');
    setAttachment(null);
    setIsGenerating(true);

    try {
      const reply = await sendChatMessageToRikouAI(
        newMessages, 
        activeQuickActionId || undefined, 
        language,
        false
      );

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
        quickActionId: activeQuickActionId || undefined,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      console.error('Failed to get Rikou AI reply:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: t.ai.networkError || (isArabicFamily ? 'سمح ليا، كاين ضغط مؤقت فالخادم. عاود جرب دابا وغادي نجاوبك فوراً!' : 'Sorry, a temporary processing issue occurred. Please retry and I will assist you right away!'),
        timestamp: Date.now(),
      };
      setMessages([...newMessages, fallbackMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filtered saved sessions for search
  const filteredSessions = savedSessions.filter((s) => {
    if (!historySearch.trim()) return true;
    return s.title.toLowerCase().includes(historySearch.toLowerCase());
  });

  // Starter prompts when chat is empty - localized for all 9 languages
  const starterPrompts = useMemo(() => {
    const promptsMap: Record<string, { label: string; prompt: string }[]> = {
      ary: [
        {
          label: '💡 10 ديال أفكار فيديوهات YouTube مربحة لـ 2026',
          prompt: 'عطيني 10 ديال الأفكار لفيديوهات YouTube مربحة ومطلوبة دابا فـ 2026'
        },
        {
          label: '🎬 سكريبت ريلز 45 ثانية على المونطاج للمبتدئين',
          prompt: 'كتب ليا سكريبت ريلز 45 ثانية سريع وممتع عن مونتاج الفيديوهات للمبتدئين'
        },
        {
          label: '⚡ 5 هوكات واعرين للتجارة الإلكترونية',
          prompt: 'عطيني 5 هوكات افتتاحية واعرين لفيديو كيهضر على التجارة الإلكترونية'
        },
        {
          label: '🚀 10 عناوين يوتيوب بنسبة نقر طالعة (CTR)',
          prompt: 'اقترح عليا 10 عناوين يوتيوب كيجيبو نقرات كثار لفيديو جديد'
        }
      ],
      ar: [
        {
          label: '💡 10 أفكار لفيديوهات YouTube عن الربح من الإنترنت',
          prompt: 'عطيني 10 أفكار لفيديوهات YouTube عن الربح من الإنترنت'
        },
        {
          label: '🎬 سكريبت فيديو ريلز 45 ثانية عن المونتاج',
          prompt: 'اكتب لي سيناريو ريلز سريع مدته 45 ثانية عن مونتاج الفيديو للمبتدئين'
        },
        {
          label: '⚡ 5 خطافات (Hooks) خاطفة لمحتوى التجارة الإلكترونية',
          prompt: 'عطيني 5 هوكات افتتاحية صادمة تمنع التمرير لفيديو عن التجارة الإلكترونية'
        },
        {
          label: '🚀 10 عناوين يوتيوب ذات نسبة نقر عالية (CTR)',
          prompt: 'اقترح لي 10 عناوين يوتيوب ذات نسبة نقر عالية جداً لفيديو جديد'
        }
      ],
      fr: [
        {
          label: '💡 10 idées de vidéos YouTube sur les revenus en ligne',
          prompt: 'Donne-moi 10 idées de vidéos YouTube sur les revenus en ligne'
        },
        {
          label: '🎬 Script de Reel 45s sur le montage vidéo',
          prompt: 'Rédige un script de Reel de 45 secondes dynamique sur le montage vidéo'
        },
        {
          label: '⚡ 5 accroches (hooks) percutantes pour le e-commerce',
          prompt: 'Donne-moi 5 accroches captivantes pour une vidéo e-commerce'
        },
        {
          label: '🚀 10 titres YouTube à fort taux de clic (CTR)',
          prompt: 'Propose 10 titres YouTube à fort CTR pour une vidéo captivante'
        }
      ],
      es: [
        {
          label: '💡 10 ideas de videos de YouTube sobre ingresos online',
          prompt: 'Dame 10 ideas de videos de YouTube sobre ganar dinero online en 2026'
        },
        {
          label: '🎬 Guión de Reel de 45s sobre edición de video',
          prompt: 'Escribe un guión dinámico de Reel de 45 segundos sobre edición de video para principiantes'
        },
        {
          label: '⚡ 5 ganchos irresistibles para comercio electrónico',
          prompt: 'Dame 5 ganchos de apertura de alta conversión para un video de comercio electrónico'
        },
        {
          label: '🚀 10 títulos de YouTube con alto CTR',
          prompt: 'Sugiere 10 títulos de YouTube con alto porcentaje de clics para un nuevo video'
        }
      ],
      de: [
        {
          label: '💡 10 YouTube-Videoideen über Online-Einkommen',
          prompt: 'Gib mir 10 YouTube-Videoideen über Online-Geldverdienen im Jahr 2026'
        },
        {
          label: '🎬 45-Sekunden-Reel-Skript über Videobearbeitung',
          prompt: 'Schreibe ein dynamisches 45-Sekunden-Reel-Skript über Videoschnitt für Einsteiger'
        },
        {
          label: '⚡ 5 fesselnde Hooks für E-Commerce',
          prompt: 'Gib mir 5 hochkonvertierende Eröffnungs-Hooks für ein E-Commerce-Video'
        },
        {
          label: '🚀 10 klickstarke YouTube-Titel mit hoher CTR',
          prompt: 'Schlage 10 YouTube-Titel mit hoher Klickrate für ein neues Video vor'
        }
      ],
      it: [
        {
          label: '💡 10 idee di video YouTube sui guadagni online',
          prompt: 'Dammi 10 idee per video YouTube su come guadagnare online nel 2026'
        },
        {
          label: '🎬 Script Reel da 45s sul montaggio video',
          prompt: 'Scrivi uno script dinamico per Reel da 45 secondi sul montaggio video per principianti'
        },
        {
          label: '⚡ 5 ganci ad alta conversione per e-commerce',
          prompt: 'Dammi 5 ganci di apertura irresistibili per un video sull\'e-commerce'
        },
        {
          label: '🚀 10 titoli YouTube ad alto CTR',
          prompt: 'Suggerisci 10 titoli YouTube ad alto tasso di clic per un nuovo video'
        }
      ],
      pt: [
        {
          label: '💡 10 ideias de vídeos do YouTube sobre renda online',
          prompt: 'Dê-me 10 ideias de vídeos do YouTube sobre como ganhar dinheiro online em 2026'
        },
        {
          label: '🎬 Roteiro de Reel de 45s sobre edição de vídeo',
          prompt: 'Escreva um roteiro dinâmico de Reel de 45 segundos sobre edição de vídeo para iniciantes'
        },
        {
          label: '⚡ 5 ganchos irresistíveis para e-commerce',
          prompt: 'Dê-me 5 ganchos de abertura de alta conversão para um vídeo de e-commerce'
        },
        {
          label: '🚀 10 títulos do YouTube com alto CTR',
          prompt: 'Sugira 10 títulos do YouTube com alta taxa de cliques para um novo vídeo'
        }
      ],
      zh: [
        {
          label: '💡 10个2026年高收益YouTube视频内容创意',
          prompt: '请给我10个关于2026年在线变现与内容创作的高价值YouTube视频创意'
        },
        {
          label: '🎬 45秒短视频剪辑教程脚本',
          prompt: '请为新手编写一个快节奏、吸引人的45秒短视频剪辑教程脚本'
        },
        {
          label: '⚡ 5个电商带货高转化黄金开头钩子 (Hooks)',
          prompt: '请为电商带货视频提供5个防止用户划走的强吸引力黄金开头钩子'
        },
        {
          label: '🚀 10个高点击率 (High CTR) YouTube视频标题',
          prompt: '请为新视频推荐10个极具吸引力、高点击率的YouTube视频标题'
        }
      ],
      en: [
        {
          label: '💡 10 YouTube video ideas on making money online',
          prompt: 'Give me 10 YouTube video ideas on making money online'
        },
        {
          label: '🎬 45s Reel script about video editing',
          prompt: 'Write a fast and punchy 45-second Reel script about video editing for beginners'
        },
        {
          label: '⚡ 5 thumb-stopping hooks for e-commerce',
          prompt: 'Give me 5 high-converting opening hooks for an e-commerce video'
        },
        {
          label: '🚀 10 high-CTR YouTube titles for gaming or tech',
          prompt: 'Suggest 10 high-CTR YouTube video titles'
        }
      ]
    };
    const list = promptsMap[language] || promptsMap.en;
    const toolIds = ['ai-content-ideas', 'ai-script-generator', 'ai-hook-generator', 'youtube-title-generator'];
    return list.map((item, idx) => ({
      ...item,
      toolId: toolIds[idx] || 'ai-content-ideas'
    }));
  }, [language]);

  // Derive contextual follow-up suggestions based on the latest AI message
  const getFollowUpSuggestions = (lastMsg: string) => {
    const lower = lastMsg.toLowerCase();
    const suggestions: { label: string; prompt: string }[] = [];

    const getLocalizedSuggestion = (key: string): { label: string; prompt: string } => {
      const dict: Record<string, Record<string, { label: string; prompt: string }>> = {
        scriptIdea3: {
          ary: { label: '🎬 سكريبت الفكرة رقم 3', prompt: 'الفكرة رقم 3 عجباتني، كتب ليا سكريبت كامل عليها' },
          ar: { label: '🎬 سكريبت الفكرة رقم 3', prompt: 'الفكرة رقم 3 ممتازة، اكتب لي سكريبت كامل عنها' },
          en: { label: '🎬 Script for Idea #3', prompt: 'Idea #3 looks great, write the full script' },
          fr: { label: '🎬 Script Idée #3', prompt: 'L\'idée 3 est top, rédige le script complet' },
          es: { label: '🎬 Guión para la Idea #3', prompt: 'La idea 3 es genial, redacta el guión completo' },
          de: { label: '🎬 Skript für Idee #3', prompt: 'Idee #3 sieht super aus, schreibe das komplette Skript' },
          it: { label: '🎬 Script per Idea #3', prompt: 'L\'idea #3 è ottima, scrivi lo script completo' },
          pt: { label: '🎬 Roteiro para a Ideia #3', prompt: 'A ideia 3 é ótima, escreva o roteiro completo' },
          zh: { label: '🎬 撰写第3个创意的完整脚本', prompt: '第3个创意很棒，请为它编写一份完整的视频脚本' }
        },
        scriptIdea1: {
          ary: { label: '🎬 سكريبت الفكرة رقم 1', prompt: 'الفكرة رقم 1 زوينة، كتب ليا سكريبت كامل عليها' },
          ar: { label: '🎬 سكريبت الفكرة رقم 1', prompt: 'الفكرة رقم 1 ممتازة، اكتب لي سكريبت فيديو كامل عنها' },
          en: { label: '🎬 Script for Idea #1', prompt: 'Idea #1 is great, write a full script for it' },
          fr: { label: '🎬 Script Idée #1', prompt: 'Rédige le script complet de l\'idée 1' },
          es: { label: '🎬 Guión para la Idea #1', prompt: 'La idea 1 es excelente, escribe el guión completo' },
          de: { label: '🎬 Skript für Idee #1', prompt: 'Idee #1 ist toll, schreibe ein komplettes Skript dazu' },
          it: { label: '🎬 Script per Idea #1', prompt: 'L\'idea #1 è fantastica, scrivi lo script per questa idea' },
          pt: { label: '🎬 Roteiro para a Ideia #1', prompt: 'A ideia 1 é excelente, faça um roteiro completo dela' },
          zh: { label: '🎬 撰写第1个创意的完整脚本', prompt: '第1个创意非常好，请为它撰写详细的视频拍摄脚本' }
        },
        youtubeTitles: {
          ary: { label: '🚀 عناوين يوتيوب لهاد الأفكار', prompt: 'عطيني عناوين يوتيوب زوينين لهاد الأفكار' },
          ar: { label: '🚀 اقترح عناوين يوتيوب لهذه الأفكار', prompt: 'اقترح لي عناوين يوتيوب جذابة وعالية النقر لهذه الأفكار' },
          en: { label: '🚀 Suggest titles for these ideas', prompt: 'Suggest high-CTR YouTube titles for these ideas' },
          fr: { label: '🚀 Titres YouTube pour ces idées', prompt: 'Propose des titres YouTube accrocheurs pour ces idées' },
          es: { label: '🚀 Títulos de YouTube sugeridos', prompt: 'Sugiere títulos de YouTube con alto CTR para estas ideas' },
          de: { label: '🚀 YouTube-Titel für diese Ideen', prompt: 'Schlage klickstarke YouTube-Titel für diese Ideen vor' },
          it: { label: '🚀 Titoli YouTube per queste idee', prompt: 'Suggerisci titoli YouTube ad alto CTR per queste idee' },
          pt: { label: '🚀 Títulos do YouTube para estas ideias', prompt: 'Sugira títulos do YouTube com alto CTR para essas ideias' },
          zh: { label: '🚀 为这些创意推荐爆款标题', prompt: '请为这些创意推荐10个高点击率的YouTube视频标题' }
        },
        moreSuspense: {
          ary: { label: '🔥 خليه أكثر حماس وتشويق', prompt: 'عاود صياغة هاد السكربت وخليه أكثر تشويقاً' },
          ar: { label: '🔥 اجعله أكثر تشويقاً وحماساً', prompt: 'اجعله أكثر تشويقاً وحماساً مع رفع وتيرة الإثارة' },
          en: { label: '🔥 Make it more suspenseful', prompt: 'Make it more suspenseful and high-stakes' },
          fr: { label: '🔥 Rendre plus captivant', prompt: 'Rends ce script plus percutant et captivant' },
          es: { label: '🔥 Hacerlo más emocionante', prompt: 'Reescribe este guión haciéndolo más intrigante y emocionante' },
          de: { label: '🔥 Spannender gestalten', prompt: 'Mache dieses Skript packender und spannungsgeladener' },
          it: { label: '🔥 Rendilo più coinvolgente', prompt: 'Riscrivi questo script rendendolo più avvincente e dinamico' },
          pt: { label: '🔥 Tornar mais envolvente', prompt: 'Reescreva este roteiro deixando-o mais empolgante e com suspense' },
          zh: { label: '🔥 增强悬念与情绪张力', prompt: '请重写这个脚本，加快节奏并增强戏剧悬念和吸引力' }
        },
        shorten30s: {
          ary: { label: '⏱️ قصّرو لـ 30 ثانية', prompt: 'قصّر هاد السكربت في 30 ثانية لتيك توك' },
          ar: { label: '⏱️ اختصره لـ 30 ثانية', prompt: 'اجعله أقصر ومكثفاً في 30 ثانية لتيك توك' },
          en: { label: '⏱️ Shorten to 30s', prompt: 'Make it shorter and punchy for 30s TikTok' },
          fr: { label: '⏱️ Raccourcir à 30s', prompt: 'Raccourcis ce script à 30 secondes pour TikTok' },
          es: { label: '⏱️ Acortar a 30s', prompt: 'Acorta este guión a 30 segundos contundentes para TikTok' },
          de: { label: '⏱️ Auf 30s kürzen', prompt: 'Kürze dieses Skript auf 30 Sekunden für TikTok' },
          it: { label: '⏱️ Riduci a 30s', prompt: 'Accorcia questo script a 30 secondi incisivi per TikTok' },
          pt: { label: '⏱️ Reduzir para 30s', prompt: 'Encurte este roteiro para 30 segundos rápidos para o TikTok' },
          zh: { label: '⏱️ 精简压缩至30秒', prompt: '请将此脚本精简至30秒，适合TikTok与短视频快节奏呈现' }
        },
        captionHashtags: {
          ary: { label: '📱 كابشن وهاشتاغات', prompt: 'اكتب ليا كابشن وهاشتاغات واعرين للنشر' },
          ar: { label: '📱 اكتب كابشن وهاشتاقات', prompt: 'اكتب لي كابشن تفاعلي وهاشتاقات مناسبة لنشر هذا الفيديو' },
          en: { label: '📱 Caption & hashtags', prompt: 'Write an engaging caption and hashtags for this script' },
          fr: { label: '📱 Légende & hashtags', prompt: 'Rédige une légende engageante avec des hashtags pertinents' },
          es: { label: '📱 Pie de foto y hashtags', prompt: 'Escribe un copy atractivo y hashtags para publicar este video' },
          de: { label: '📱 Caption & Hashtags', prompt: 'Schreibe eine ansprechende Caption und Hashtags für diesen Beitrag' },
          it: { label: '📱 Caption e hashtag', prompt: 'Scrivi una didascalia accattivante e hashtag mirati per questo post' },
          pt: { label: '📱 Legenda e hashtags', prompt: 'Escreva uma legenda atraente e hashtags virais para esta publicação' },
          zh: { label: '📱 文案与爆款标签', prompt: '请为这个视频脚本编写高互动率文案及相关热门标签' }
        },
        moreAngles: {
          ary: { label: '💡 زوايا وأفكار أخرى', prompt: 'عطيني زوايا أخرى مبتكرة لنفس الموضوع' },
          ar: { label: '💡 اقترح أفكاراً وزوايا إضافية', prompt: 'اقترح لي زوايا أخرى مبتكرة لنفس الموضوع' },
          en: { label: '💡 Give more creative angles', prompt: 'Give me more creative angles on this topic' },
          fr: { label: '💡 Autres angles créatifs', prompt: 'Donne-moi d\'autres angles créatifs sur ce sujet' },
          es: { label: '💡 Más ángulos creativos', prompt: 'Dame más ángulos y enfoques creativos sobre este tema' },
          de: { label: '💡 Weitere kreative Blickwinkel', prompt: 'Gib mir weitere kreative Perspektiven zu diesem Thema' },
          it: { label: '💡 Altre prospettive creative', prompt: 'Forniscimi ulteriori angolazioni creative su questo tema' },
          pt: { label: '💡 Mais ângulos criativos', prompt: 'Dê-me mais abordagens e ângulos criativos sobre este tema' },
          zh: { label: '💡 探索更多切入角度', prompt: '请为这个主题提供更多不同切入角度与创意延展' }
        },
        fiveHooks: {
          ary: { label: '⚡ 5 هوكات افتتاحية', prompt: 'عطيني 5 هوكات قوية تمنع التمرير' },
          ar: { label: '⚡ 5 خطافات افتتاحية صادمة', prompt: 'عطيني 5 هوكات قوية ومثيرة للفضول لنفس هذا الموضوع' },
          en: { label: '⚡ Give me 5 viral hooks', prompt: 'Give me 5 punchy hooks for this topic' },
          fr: { label: '⚡ 5 accroches percutantes', prompt: 'Donne-moi 5 accroches percutantes pour ce thème' },
          es: { label: '⚡ 5 ganchos de alto impacto', prompt: 'Dame 5 ganchos iniciales magnéticos para este tema' },
          de: { label: '⚡ 5 starke Eröffnungs-Hooks', prompt: 'Gib mir 5 wirkungsvolle Hooks für dieses Thema' },
          it: { label: '⚡ 5 hook accattivanti', prompt: 'Dammi 5 ganci d\'apertura irresistibili su questo argomento' },
          pt: { label: '⚡ 5 ganchos de abertura', prompt: 'Dê-me 5 ganchos fortes para prender a atenção neste tema' },
          zh: { label: '⚡ 5个高留存黄金开头', prompt: '请针对该主题提供5个高留存、防止用户划走的黄金开头' }
        }
      };

      const item = dict[key];
      return item?.[language] || item?.en || { label: '', prompt: '' };
    };

    if (lower.includes('فكرة') || lower.includes('1️⃣') || lower.includes('ideas') || lower.includes('idées') || lower.includes('ideation')) {
      suggestions.push(getLocalizedSuggestion('scriptIdea3'));
      suggestions.push(getLocalizedSuggestion('scriptIdea1'));
      suggestions.push(getLocalizedSuggestion('youtubeTitles'));
    }

    if (lower.includes('سيناريو') || lower.includes('script') || lower.includes('[00:')) {
      suggestions.push(getLocalizedSuggestion('moreSuspense'));
      suggestions.push(getLocalizedSuggestion('shorten30s'));
      suggestions.push(getLocalizedSuggestion('captionHashtags'));
    }

    if (suggestions.length === 0) {
      suggestions.push(getLocalizedSuggestion('moreAngles'));
      suggestions.push(getLocalizedSuggestion('fiveHooks'));
    }

    return suggestions.filter(s => Boolean(s.label)).slice(0, 3);
  };

  const categoryLabels: Record<string, Record<string, string>> = {
    all: {
      ary: 'الكل (15 أداة)', ar: 'الكل (15 أداة)', en: 'All Tools (15)', fr: 'Tous (15)',
      es: 'Todas (15)', de: 'Alle (15)', it: 'Tutti (15)', pt: 'Todas (15)', zh: '全部 (15)'
    },
    Ideation: {
      ary: 'الأفكار والمفاهيم', ar: 'الأفكار والمفاهيم', en: 'Ideation', fr: 'Idéation',
      es: 'Ideación', de: 'Ideenfindung', it: 'Ideazione', pt: 'Ideação', zh: '创意构思'
    },
    Scripting: {
      ary: 'السيناريو والكتابة', ar: 'السيناريو والكتابة', en: 'Scripting', fr: 'Scripts',
      es: 'Guiones', de: 'Skripte', it: 'Sceneggiatura', pt: 'Roteiros', zh: '脚本编写'
    },
    Optimization: {
      ary: 'الهوكات والعناوين', ar: 'الخطافات والعناوين', en: 'Optimization', fr: 'Optimisation',
      es: 'Optimización', de: 'Optimierung', it: 'Ottimizzazione', pt: 'Otimização', zh: '优化与标题'
    },
    'Social Media': {
      ary: 'منصات التواصل', ar: 'منصات التواصل', en: 'Social Media', fr: 'Réseaux Sociaux',
      es: 'Redes Sociales', de: 'Social Media', it: 'Social Media', pt: 'Redes Sociais', zh: '社交媒体'
    },
    SEO: {
      ary: 'السيو والأرشفة', ar: 'السيو والأرشفة', en: 'SEO', fr: 'SEO',
      es: 'SEO', de: 'SEO', it: 'SEO', pt: 'SEO', zh: '搜索引擎优化'
    },
    Writing: {
      ary: 'إعادة الصياغة', ar: 'إعادة الصياغة', en: 'Writing', fr: 'Rédaction',
      es: 'Redacción', de: 'Texterstellung', it: 'Scrittura', pt: 'Redação', zh: '文案撰写'
    },
    Design: {
      ary: 'الصور والتصميم', ar: 'الصور والتصميم', en: 'Design', fr: 'Design',
      es: 'Diseño', de: 'Design', it: 'Design', pt: 'Design', zh: '视觉与设计'
    },
    'E-commerce': {
      ary: 'الأفيلييت والتجارة', ar: 'الأفيلييت والتجارة', en: 'E-commerce', fr: 'E-commerce',
      es: 'Comercio Electrónico', de: 'E-Commerce', it: 'E-commerce', pt: 'Comércio Eletrônico', zh: '电商与联盟'
    },
  };

  const categories = useMemo(() => [
    { id: 'all' },
    { id: 'Ideation' },
    { id: 'Scripting' },
    { id: 'Optimization' },
    { id: 'Social Media' },
    { id: 'SEO' },
    { id: 'Writing' },
    { id: 'Design' },
    { id: 'E-commerce' },
  ].map(cat => ({
    id: cat.id,
    label: categoryLabels[cat.id]?.[language] || categoryLabels[cat.id]?.['en'] || cat.id
  })), [language]);

  const filteredTools = aiToolsList.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6 py-6 sm:py-8 font-sans">
      
      {/* Hidden File Input for Image/Document Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Unified Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3.5 py-1 text-xs font-bold text-purple-300 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>{t.ai.unifiedTitle}</span>
        </div>
        
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Rikou <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-2 text-base sm:text-lg font-bold text-zinc-100">
          {t.ai.pageSubtitle}
        </p>

        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {t.ai.howCanIHelpDesc}
        </p>
      </div>

      {/* Main Unified Chat Frame with History Panel Integration */}
      <div className="relative rounded-3xl border border-zinc-800 bg-[#0d0e12] shadow-2xl overflow-hidden flex flex-col min-h-[580px] max-h-[820px]">
        
        {/* Chat Control Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3.5 border-b border-zinc-800/90 bg-[#12131a] z-20">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center">
              <img
                src="/file_00000000790481f48f32726a32633267.png"
                onError={(e) => {
                  e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                }}
                alt="Rikou AI"
                referrerPolicy="no-referrer"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-amber-500/35 select-none bg-zinc-950"
                width={36}
                height={36}
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white">Rikou AI</span>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  {t.ai.online}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">
                {t.ai.multilingualSupport}
              </p>
            </div>
          </div>

          {/* Action Buttons: Conversation History & New Chat */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Conversation History Toggle */}
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                isHistoryOpen
                  ? 'border-purple-500/50 bg-purple-500/15 text-purple-300'
                  : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-purple-500/30 hover:bg-zinc-800'
              }`}
              title={t.ai.history}
            >
              <History className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">
                {t.ai.history}
              </span>
              {savedSessions.length > 0 && (
                <span className="rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 px-1.5 py-0.2 text-[10px] font-bold">
                  {savedSessions.length}
                </span>
              )}
            </button>

            {/* 1. NEW CHAT BUTTON */}
            <button
              id="rikou-new-chat-btn"
              onClick={handleNewChat}
              className="flex items-center gap-1.5 rounded-xl border border-purple-500/30 bg-purple-950/40 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-purple-200 hover:text-white hover:bg-purple-600 hover:border-purple-500 transition-all active:scale-95 shadow-sm"
              title={t.ai.newChat}
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>
                {t.ai.newChat}
              </span>
            </button>
          </div>
        </div>

        {/* Sliding History Drawer / Sidebar Overlay */}
        {isHistoryOpen && (
          <div className="absolute inset-0 z-30 flex">
            {/* Backdrop Blur to close */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsHistoryOpen(false)}
            />

            {/* History Panel Content */}
            <div className={`relative z-10 w-full sm:w-80 md:w-96 bg-[#0f1015] border-${isRTL ? 'l' : 'r'} border-zinc-800 flex flex-col h-full shadow-2xl animate-in slide-in-from-${isRTL ? 'right' : 'left'} duration-200`}>
              
              {/* History Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-[#14151c]">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-black text-white">
                    {t.ai.history}
                  </span>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* History Search & Clear All */}
              <div className="p-3 border-b border-zinc-800/80 bg-[#0f1015] space-y-2">
                <div className="relative">
                  <Search className="absolute top-2.5 start-3 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder={t.ai.searchConversations}
                    className="w-full rounded-xl border border-zinc-800 bg-[#161720] py-2 ps-9 pe-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500/50"
                  />
                  {historySearch && (
                    <button
                      onClick={() => setHistorySearch('')}
                      className="absolute top-2.5 end-3 text-zinc-500 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {savedSessions.length > 0 && (
                  <div className="flex items-center justify-between text-[11px] pt-1 px-1">
                    <span className="text-zinc-400">
                      {savedSessions.length} {t.ai.conversation}
                    </span>
                    <button
                      onClick={handleDeleteAllSessions}
                      className="text-red-400 hover:text-red-300 font-semibold hover:underline"
                    >
                      {t.ai.deleteAll}
                    </button>
                  </div>
                )}
              </div>

              {/* Sessions List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredSessions.length === 0 ? (
                  <div className="py-12 text-center text-xs text-zinc-500 space-y-2">
                    <History className="h-8 w-8 mx-auto text-zinc-700" />
                    <p>
                      {historySearch 
                        ? t.ai.noResults
                        : t.ai.noHistory}
                    </p>
                  </div>
                ) : (
                  filteredSessions.map((session) => {
                    const isSelected = session.id === currentSessionId;
                    const dateLocaleMap: Record<string, string> = {
                      ary: 'ar-MA',
                      ar: 'ar-SA',
                      fr: 'fr-FR',
                      es: 'es-ES',
                      de: 'de-DE',
                      it: 'it-IT',
                      pt: 'pt-PT',
                      zh: 'zh-CN',
                      en: 'en-US'
                    };
                    const dateFormatted = new Date(session.updatedAt).toLocaleDateString(
                      dateLocaleMap[language] || 'en-US',
                      { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
                    );

                    return (
                      <div
                        key={session.id}
                        onClick={() => handleSelectSession(session)}
                        className={`group relative flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-purple-500/40 bg-purple-950/25 shadow-sm'
                            : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/80'
                        }`}
                      >
                        <div className="flex-1 min-w-0 pe-2">
                          <h4 className="text-xs font-bold text-zinc-200 group-hover:text-purple-300 truncate transition-colors">
                            {session.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-400">
                            <span>{dateFormatted}</span>
                            <span>•</span>
                            <span>
                              {session.messages.length} {t.ai.conversation}
                            </span>
                          </div>
                        </div>

                        {/* 5. DELETE CONVERSATION BUTTON */}
                        <button
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title={t.ai.delete}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Bottom Start New Chat Shortcut */}
              <div className="p-3 border-t border-zinc-800 bg-[#0f1015]">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 py-2.5 text-xs font-black text-white shadow-md active:scale-95 transition-all"
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                  <span>{t.ai.newChat}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Message Feed Canvas */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-5 sm:space-y-6">
          
          {/* Empty Chat Welcome State */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center max-w-xl mx-auto space-y-5 animate-in fade-in duration-300">
              {/* Official Rikou AI Center Avatar */}
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-3 rounded-3xl bg-amber-500/20 blur-2xl pointer-events-none" />
                <img
                  src="/file_00000000790481f48f32726a32633267.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                  }}
                  alt="Rikou AI Official Avatar"
                  referrerPolicy="no-referrer"
                  className="relative h-32 w-32 sm:h-44 sm:w-44 md:h-48 md:w-48 rounded-3xl object-cover border-2 border-amber-500/40 shadow-2xl shadow-amber-500/15 select-none bg-zinc-950 transition-transform duration-300 hover:scale-105"
                  width={192}
                  height={192}
                />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {t.ai.howCanIHelp}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {t.ai.howCanIHelpDesc}
                </p>
              </div>

              {/* Starter Quick Suggestions */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {starterPrompts.map((s: { label: string; prompt: string; toolId?: string }, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (s.toolId) setActiveQuickActionId(s.toolId);
                      setInputPrompt(s.prompt);
                      handleSendMessage(s.prompt);
                    }}
                    className="flex items-center gap-2.5 rounded-2xl border border-zinc-800 bg-[#13141c] p-3 text-start transition-all hover:border-purple-500/40 hover:bg-[#181924] active:scale-[0.98] group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-zinc-300 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Render Messages */}
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            const isLatest = index === messages.length - 1;
            const followUps = !isUser && isLatest ? getFollowUpSuggestions(msg.content) : [];

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
              >
                {/* Assistant Avatar */}
                {!isUser && (
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center mt-1">
                    <img
                      src="/file_00000000790481f48f32726a32633267.png"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                      }}
                      alt="Rikou AI"
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-amber-500/35 select-none bg-zinc-950"
                      width={36}
                      height={36}
                    />
                  </div>
                )}

                {/* Message Body */}
                <div className={`max-w-[92%] sm:max-w-[82%] rounded-3xl p-4 sm:p-5 transition-all ${
                  isUser
                    ? 'bg-purple-600 text-white font-medium shadow-md shadow-purple-950/40 border border-purple-500/30'
                    : 'border border-zinc-800/90 bg-[#12131a] text-zinc-100 shadow-md'
                }`}>
                  
                  {/* Top Bar for Assistant Message: Header, Copy & Regenerate Buttons */}
                  {!isUser && (
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800/80 text-[11px] font-bold text-zinc-400 gap-2">
                      <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                        <img
                          src="/file_00000000790481f48f32726a32633267.png"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                          }}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="h-4 w-4 rounded-full object-cover border border-amber-500/30 select-none"
                          width={16}
                          height={16}
                        />
                        <span>Rikou AI</span>
                      </span>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* 2. COPY AI RESPONSE BUTTON */}
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 bg-zinc-800/80 hover:bg-purple-600 hover:text-white text-zinc-300 transition-all active:scale-95"
                          title={t.ai.copy}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-[10px] text-emerald-400 font-bold">
                                {t.ai.copied}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span className="text-[10px]">
                                {t.ai.copy}
                              </span>
                            </>
                          )}
                        </button>

                        {/* 3. REGENERATE RESPONSE BUTTON */}
                        <button
                          onClick={() => handleRegenerate(index)}
                          disabled={isGenerating}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 bg-zinc-800/80 hover:bg-purple-600 hover:text-white text-zinc-300 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                          title={t.ai.regenerate}
                        >
                          <RotateCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                          <span className="text-[10px]">
                            {t.ai.regenerate}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 7. Image / File Attachment Preview in User Message */}
                  {isUser && msg.attachment && (
                    <div className="mb-2.5">
                      {msg.attachment.dataUrl && msg.attachment.type.startsWith('image/') ? (
                        <div className="rounded-xl overflow-hidden border border-black/20 max-w-xs shadow-inner">
                          <img 
                            src={msg.attachment.dataUrl} 
                            alt={msg.attachment.name}
                            className="max-h-48 w-auto object-cover rounded-xl"
                          />
                          <div className="px-2 py-1 bg-black/20 text-[10px] text-zinc-900 truncate">
                            {msg.attachment.name}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl bg-black/20 px-3 py-2 text-xs font-semibold text-zinc-900 border border-black/10 max-w-xs">
                          <File className="h-4 w-4 shrink-0" />
                          <span className="truncate">{msg.attachment.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content */}
                  {isUser ? (
                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-white font-medium">
                      {msg.content}
                    </div>
                  ) : (
                    <RikouAIResponseRenderer content={msg.content} isRtl={isRTL} />
                  )}

                  {/* Contextual Follow-Up Quick Chips (Only under latest AI response) */}
                  {!isUser && followUps.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-800">
                      <div className="text-[11px] font-bold text-zinc-400 mb-2 flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-purple-400" />
                        <span>{t.ai.nextActionSuggestions}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {followUps.map((fu, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => {
                              setInputPrompt(fu.prompt);
                              handleSendMessage(fu.prompt);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-purple-500/25 bg-purple-950/30 px-3 py-1.5 text-[11px] font-bold text-purple-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all active:scale-95"
                          >
                            <span>{fu.label}</span>
                            <ChevronRight className="h-3 w-3 rtl:rotate-180" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 border border-zinc-700 text-zinc-300 mt-1 shadow-sm">
                    <UserIcon className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing/Generating Indicator */}
          {isGenerating && (
            <div className="flex gap-2.5 sm:gap-4 items-start animate-in fade-in duration-150">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-zinc-950 overflow-hidden">
                <img
                  src="/file_00000000790481f48f32726a32633267.png"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/rikou-ai-avatar.png';
                  }}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-[#14151e] px-4 sm:px-5 py-3 sm:py-4 text-xs text-zinc-300 flex items-center gap-2.5 shadow-md">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="font-semibold text-purple-200">
                  {t.ai.thinking}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating / Bottom Chat Input Dock */}
        <div 
          ref={chatInputContainerRef}
          className="border-t border-zinc-800/80 bg-[#101117] p-2.5 sm:p-4 backdrop-blur-xl relative"
        >
          {/* Active Quick Action Indicator Banner */}
          {activeTool && (
            <div className="mb-2.5 flex items-center justify-between rounded-xl bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 text-xs text-purple-300 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 truncate">
                <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                <span className="font-bold">
                  {`${t.ai.activeActionLabel}: ${localizeTool(activeTool).title}`}
                </span>
              </div>
              <button
                onClick={() => setActiveQuickActionId(null)}
                className="text-zinc-400 hover:text-white p-0.5 rounded-md hover:bg-zinc-800 transition-colors"
                title={t.ai.dismiss}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* 7. Image / File Attached Preview Bar Above Input */}
          {attachment && (
            <div className="mb-2 flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-200 animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5 truncate">
                {attachment.dataUrl && attachment.type.startsWith('image/') ? (
                  <img
                    src={attachment.dataUrl}
                    alt={attachment.name}
                    className="h-8 w-8 rounded-lg object-cover border border-purple-500/30"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-purple-400">
                    <File className="h-4 w-4" />
                  </div>
                )}
                <div className="truncate">
                  <p className="font-bold truncate text-white">{attachment.name}</p>
                  <p className="text-[10px] text-zinc-400">
                    {attachment.size ? `${(attachment.size / 1024).toFixed(1)} KB` : t.ai.ready}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveAttachment}
                className="p-1 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                title={t.ai.removeFile}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Input Box with 📎 Attachment Button and Send Button */}
          <div className="relative flex items-end gap-1.5 rounded-2xl border border-zinc-800 bg-[#161720] p-1.5 focus-within:border-purple-500/60 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all shadow-inner">
            
            {/* 7. ATTACHMENT BUTTON (📎) */}
            <button
              type="button"
              id="rikou-attachment-btn"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-zinc-400 hover:text-purple-300 hover:bg-zinc-800 transition-all active:scale-95 shrink-0"
              title={t.ai.attachFile}
            >
              <Paperclip className="h-4 w-4" />
            </button>

            {/* Main Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.ai.inputPlaceholder}
              className="flex-1 bg-transparent px-2 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none max-h-40 leading-relaxed"
              disabled={isGenerating}
            />

            {/* Send Button */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                id="rikou-ai-send-btn"
                onClick={() => handleSendMessage()}
                disabled={(!inputPrompt.trim() && !attachment) || isGenerating}
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black shadow-md shadow-purple-900/40 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed transition-all"
                title={t.ai.send}
              >
                {isGenerating ? (
                  <Sparkles className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Send className="h-4 w-4 rtl:rotate-180" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-zinc-500">
            <span>
              {t.ai.pressEnterToSend}
            </span>
            <span className="font-semibold text-purple-400/80">
              RikouZone Engine
            </span>
          </div>
        </div>

      </div>

      {/* 6. 15 Integrated Quick Actions / Shortcuts Section */}
      <div className="mt-10 sm:mt-14">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>{t.ai.quickActionsBarTitle}</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
              {t.ai.quickActionsTitle}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              {t.ai.quickActionsBarSubtitle}
            </p>
          </div>

          {/* Category Filter Pills (Mobile Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
            {categories.slice(0, 5).map((cat: { id: string; label: string }) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:border-purple-500/30 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 15 Quick Actions Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {filteredTools.map((tool) => {
            const IconComp = iconMap[tool.iconName] || Sparkles;
            const isSelected = activeQuickActionId === tool.id;
            const loc = localizeTool(tool);
            const title = loc.title;
            const desc = loc.desc;

            return (
              <div
                key={tool.id}
                id={`quick-action-card-${tool.id}`}
                onClick={() => handleSelectQuickAction(tool)}
                className={`group relative cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all backdrop-blur-sm ${
                  isSelected
                    ? 'border-purple-500/50 bg-purple-950/20 shadow-md'
                    : 'border-zinc-800/80 bg-[#12131a] hover:border-purple-500/30 hover:bg-[#161722] hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-zinc-800 text-purple-400 group-hover:bg-purple-600 group-hover:text-white'
                  }`}>
                    <IconComp className="h-5 w-5 stroke-[2.2]" />
                  </div>

                  <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[10px] font-semibold text-zinc-400 border border-zinc-700/50">
                    {tool.category}
                  </span>
                </div>

                <h3 className="mt-3.5 text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {title}
                </h3>

                <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {desc}
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300">
                  <span>{t.ai.loadInChat}</span>
                  <CornerDownLeft className="h-3.5 w-3.5 rtl:rotate-90 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
