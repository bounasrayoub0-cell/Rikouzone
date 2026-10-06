import React, { useState, useEffect, useRef } from 'react';
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
  const { language, isRTL, t } = useLanguage();
  const isAr = language === 'ar';
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
          : (isAr ? 'محادثة بدون عنوان' : isFr ? 'Conversation' : 'New Conversation');

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
  }, [messages, currentSessionId, activeQuickActionId, isAr, isFr]);

  // Handle initialToolId change
  useEffect(() => {
    if (initialToolId) {
      const tool = aiToolsList.find((t) => t.id === initialToolId);
      if (tool) {
        setActiveQuickActionId(tool.id);
        const prefix = isAr ? (tool.promptPrefixAr || tool.arabicPlaceholder) : isFr ? (tool.promptPrefixFr || tool.frenchPlaceholder) : (tool.promptPrefixEn || tool.placeholder);
        setInputPrompt(prefix || '');
      }
    }
  }, [initialToolId, isAr, isFr]);

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
    const confirmText = isAr 
      ? 'هل أنت متأكد من حذف جميع المحادثات السابقة نهائياً؟'
      : isFr 
      ? 'Êtes-vous sûr de vouloir supprimer tout l’historique des conversations ?'
      : 'Are you sure you want to delete all conversation history?';

    if (window.confirm(confirmText)) {
      setSavedSessions([]);
      try {
        localStorage.removeItem('rikou_ai_saved_sessions');
      } catch {}
      handleNewChat();
    }
  };

  // 2. COPY AI RESPONSE: Copy ONLY assistant content and show feedback
  const handleCopyMessage = (msgId: string, content: string) => {
    onCopyText(content, isAr ? 'تم نسخ الرد بنجاح!' : isFr ? 'Réponse copiée avec succès !' : 'Response copied successfully!');
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
    const prefix = isAr ? (tool.promptPrefixAr || tool.arabicPlaceholder) : isFr ? (tool.promptPrefixFr || tool.frenchPlaceholder) : (tool.promptPrefixEn || tool.placeholder);
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
      alert(isAr ? 'حجم الملف كبير جداً (الحد الأقصى 10MB)' : 'File size too large (max 10MB)');
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
      content: text || (isAr ? 'تحليل الملف المرفق' : 'Analyze attached file'),
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
        content: isAr
          ? 'نعتذر، حدث ضغط مؤقت في المعالجة. يرجى إعادة المحاولة وسأكون جاهزاً للإجابة فوراً!'
          : isFr
          ? 'Désolé, un problème temporaire est survenu. Veuillez réessayer pour obtenir votre réponse immédiatement.'
          : 'Sorry, a temporary processing issue occurred. Please retry and I will assist you right away!',
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

  // Starter prompts when chat is empty
  const starterPrompts = [
    {
      labelAr: '💡 10 أفكار لفيديوهات YouTube عن الربح من الإنترنت',
      labelEn: '💡 10 YouTube video ideas on making money online',
      labelFr: '💡 10 idées de vidéos YouTube sur les revenus en ligne',
      prompt: isAr 
        ? 'عطيني 10 أفكار لفيديوهات YouTube عن الربح من الإنترنت'
        : 'Give me 10 YouTube video ideas on making money online',
      toolId: 'ai-content-ideas',
    },
    {
      labelAr: '🎬 سكريبت فيديو ريلز 45 ثانية عن المونتاج',
      labelEn: '🎬 45s Reel script about video editing',
      labelFr: '🎬 Script de Reel 45s sur le montage vidéo',
      prompt: isAr
        ? 'كتب ليا سكريبت ريلز 45 ثانية سريع وممتع عن مونتاج الفيديوهات للمبتدئين'
        : 'Write a fast and punchy 45-second Reel script about video editing for beginners',
      toolId: 'ai-script-generator',
    },
    {
      labelAr: '⚡ 5 خطافات (Hooks) خاطفة لمحتوى التجارة الإلكترونية',
      labelEn: '⚡ 5 thumb-stopping hooks for e-commerce',
      labelFr: '⚡ 5 accroches (hooks) percutantes pour le e-commerce',
      prompt: isAr
        ? 'عطيني 5 هوكات افتتاحية صادمة تمنع التمرير لفيديو عن التجارة الإلكترونية'
        : 'Give me 5 high-converting opening hooks for an e-commerce video',
      toolId: 'ai-hook-generator',
    },
    {
      labelAr: '🚀 10 عناوين يوتيوب ذات نسبة نقر عالية (CTR)',
      labelEn: '🚀 10 high-CTR YouTube titles for gaming or tech',
      labelFr: '🚀 10 titres YouTube à fort taux de clic',
      prompt: isAr
        ? 'اقترح لي 10 عناوين يوتيوب ذات نسبة نقر عالية جداً لفيديو جديد'
        : 'Suggest 10 high-CTR YouTube video titles',
      toolId: 'youtube-title-generator',
    },
  ];

  // Derive contextual follow-up suggestions based on the latest AI message
  const getFollowUpSuggestions = (lastMsg: string) => {
    const lower = lastMsg.toLowerCase();
    const suggestions: { label: string; prompt: string }[] = [];

    if (lower.includes('فكرة') || lower.includes('1️⃣') || lower.includes('ideas')) {
      suggestions.push({
        label: isAr ? '🎬 سكريبت الفكرة رقم 3' : isFr ? '🎬 Script Idée #3' : '🎬 Script for Idea #3',
        prompt: isAr ? 'الفكرة رقم 3 عجباتني، كتب ليا Script كامل' : 'Idea #3 looks great, write the full script',
      });
      suggestions.push({
        label: isAr ? '🎬 سكريبت الفكرة رقم 1' : isFr ? '🎬 Script Idée #1' : '🎬 Script for Idea #1',
        prompt: isAr ? 'الفكرة رقم 1 ممتازة، اكتب لي سكريبت فيديو كامل عنها' : 'Idea #1 is great, write a full script for it',
      });
      suggestions.push({
        label: isAr ? '🚀 اقترح عناوين يوتيوب لهذه الأفكار' : isFr ? '🚀 Titres YouTube pour ces idées' : '🚀 Suggest titles for these ideas',
        prompt: isAr ? 'اقترح لي عناوين يوتيوب جذابة وعالية النقر لهذه الأفكار' : 'Suggest high-CTR YouTube titles for these ideas',
      });
    }

    if (lower.includes('سيناريو') || lower.includes('script') || lower.includes('[00:')) {
      suggestions.push({
        label: isAr ? '🔥 خليه أكثر تشويقاً وحماساً' : isFr ? '🔥 Rendre plus captivant' : '🔥 Make it more suspenseful',
        prompt: isAr ? 'خليه أكثر تشويقاً وحماساً مع رفع وتيرة الإثارة' : 'Make it more suspenseful and high-stakes',
      });
      suggestions.push({
        label: isAr ? '⏱️ خليه أقصر (30 ثانية)' : isFr ? '⏱️ Raccourcir à 30s' : '⏱️ Shorten to 30s',
        prompt: isAr ? 'خليه أقصر ومكثف في 30 ثانية لتيك توك' : 'Make it shorter and punchy for 30s TikTok',
      });
      suggestions.push({
        label: isAr ? '📱 اكتب كابشن وهاشتاقات لهاد السكربت' : isFr ? '📱 Légende & hashtags' : '📱 Caption & hashtags for this',
        prompt: isAr ? 'اكتب لي كابشن تفاعلي وهاشتاقات مناسبة لنشر هذا الفيديو' : 'Write an engaging caption and hashtags for this script',
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        label: isAr ? '💡 اقترح أفكاراً إضافية' : isFr ? '💡 Autres angles' : '💡 Give more angles',
        prompt: isAr ? 'اقترح لي زوايا أخرى مبتكرة لنفس الموضوع' : 'Give me more creative angles on this',
      });
      suggestions.push({
        label: isAr ? '⚡ أعطني 5 هوكات افتتاحية' : isFr ? '⚡ 5 accroches' : '⚡ Give me 5 hooks',
        prompt: isAr ? 'عطيني 5 هوكات قوية ومثيرة للفضول لنفس هذا الموضوع' : 'Give me 5 punchy hooks for this topic',
      });
    }

    return suggestions.slice(0, 3);
  };

  const categories = [
    { id: 'all', labelAr: 'الكل (15 أداة)', labelEn: 'All Tools (15)', labelFr: 'Tous (15)' },
    { id: 'Ideation', labelAr: 'الأفكار والمفاهيم', labelEn: 'Ideation', labelFr: 'Idéation' },
    { id: 'Scripting', labelAr: 'السيناريو والكتابة', labelEn: 'Scripting', labelFr: 'Scripts' },
    { id: 'Optimization', labelAr: 'الخطافات والعناوين', labelEn: 'Optimization', labelFr: 'Optimisation' },
    { id: 'Social Media', labelAr: 'منصات التواصل', labelEn: 'Social Media', labelFr: 'Réseaux Sociaux' },
    { id: 'SEO', labelAr: 'السيو والأرشفة', labelEn: 'SEO', labelFr: 'SEO' },
    { id: 'Writing', labelAr: 'إعادة الصياغة', labelEn: 'Writing', labelFr: 'Rédaction' },
    { id: 'Design', labelAr: 'الصور والتصميم', labelEn: 'Design', labelFr: 'Design' },
    { id: 'E-commerce', labelAr: 'الأفيلييت والتجارة', labelEn: 'E-commerce', labelFr: 'E-commerce' },
  ];

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
          <span>{isAr ? 'ذكاء اصطناعي محادثاتي موحد' : isFr ? 'IA Conversationnelle Unifiée' : 'Unified Conversational AI'}</span>
        </div>
        
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Rikou <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-2 text-base sm:text-lg font-bold text-zinc-100">
          {isAr
            ? 'مساعدك الذكي لصناعة المحتوى والعمل والتعلم'
            : isFr
            ? 'Votre assistant intelligent pour la création de contenu, le travail et l\'apprentissage'
            : 'Your AI Assistant for Content Creation, Work & Learning'}
        </p>

        <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          {isAr
            ? 'محادثة ذكية تفهم سياقك خطوة بخطوة. اطلب أي فكرة، سكريبت، عنوان، أو كابشن، واطلب التعديل والتطوير في نفس المحادثة بكل سلاسة.'
            : isFr
            ? 'Assistant intelligent multi-tours qui mémorise votre contexte. Brainstormez, générez des scripts complets, affinez vos accroches en continu.'
            : 'Multi-turn intelligent assistant that remembers context. Brainstorm ideas, draft full scripts, refine hooks, and adapt formats seamlessly.'}
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
                  {isAr ? 'متصل وجاهز' : isFr ? 'En ligne' : 'Online'}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">
                {isAr ? 'يفهم الدارجة، العربية الفصحى، الإنجليزية والفرنسية' : isFr ? 'Comprend Arabe, Darija, Français et Anglais' : 'Supports Arabic, Darija, English & French'}
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
              title={isAr ? 'سجل المحادثات' : isFr ? 'Historique' : 'Chat History'}
            >
              <History className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">
                {isAr ? 'سجل المحادثات' : isFr ? 'Historique' : 'History'}
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
              title={isAr ? 'محادثة جديدة' : isFr ? 'Nouvelle conversation' : 'New Chat'}
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>
                {isAr ? 'محادثة جديدة' : isFr ? 'Nouvelle conversation' : 'New Chat'}
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
                    {isAr ? 'سجل المحادثات' : isFr ? 'Historique des conversations' : 'Conversation History'}
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
                    placeholder={isAr ? 'بحث في المحادثات...' : isFr ? 'Rechercher...' : 'Search conversations...'}
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
                      {isAr ? `${savedSessions.length} محادثات مسجلة` : `${savedSessions.length} saved chats`}
                    </span>
                    <button
                      onClick={handleDeleteAllSessions}
                      className="text-red-400 hover:text-red-300 font-semibold hover:underline"
                    >
                      {isAr ? 'حذف الكل' : isFr ? 'Tout supprimer' : 'Delete All'}
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
                        ? (isAr ? 'لا توجد نتائج مطابقة' : 'No matching conversations')
                        : (isAr ? 'لا توجد محادثات سابقة حتى الآن' : isFr ? 'Aucune conversation précédente' : 'No previous conversations yet')}
                    </p>
                  </div>
                ) : (
                  filteredSessions.map((session) => {
                    const isSelected = session.id === currentSessionId;
                    const dateFormatted = new Date(session.updatedAt).toLocaleDateString(
                      isAr ? 'ar-MA' : isFr ? 'fr-FR' : 'en-US',
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
                              {session.messages.length} {isAr ? 'رسائل' : 'messages'}
                            </span>
                          </div>
                        </div>

                        {/* 5. DELETE CONVERSATION BUTTON */}
                        <button
                          onClick={(e) => handleDeleteSession(e, session.id)}
                          className="shrink-0 p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title={isAr ? 'حذف هذه المحادثة' : isFr ? 'Supprimer' : 'Delete'}
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
                  <span>{isAr ? 'بدء محادثة جديدة' : isFr ? 'Nouvelle conversation' : 'Start New Chat'}</span>
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
                  {isAr ? 'كيف يمكنني مساعدتك الآن؟' : isFr ? 'Comment puis-je vous aider aujourd\'hui ?' : 'How can I assist you today?'}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {isAr
                    ? 'اكتب أي فكرة أو سؤال مباشرة، أو اختر أحد الأمثلة السريعة بالأسفل للبدء فوراً:'
                    : isFr
                    ? 'Posez n\'importe quelle question directement, ou choisissez une suggestion rapide :'
                    : 'Ask anything directly, or pick one of the quick suggestions below to start immediately:'}
                </p>
              </div>

              {/* Starter Quick Suggestions */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {starterPrompts.map((s, idx) => (
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
                      {isAr ? s.labelAr : isFr ? s.labelFr : s.labelEn}
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
                          title={isAr ? 'نسخ' : isFr ? 'Copier' : 'Copy'}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-[10px] text-emerald-400 font-bold">
                                {isAr ? 'تم النسخ ✓' : isFr ? 'Copié ✓' : 'Copied ✓'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span className="text-[10px]">
                                {isAr ? 'نسخ' : isFr ? 'Copier' : 'Copy'}
                              </span>
                            </>
                          )}
                        </button>

                        {/* 3. REGENERATE RESPONSE BUTTON */}
                        <button
                          onClick={() => handleRegenerate(index)}
                          disabled={isGenerating}
                          className="flex items-center gap-1 rounded-lg px-2 py-1 bg-zinc-800/80 hover:bg-purple-600 hover:text-white text-zinc-300 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                          title={isAr ? 'إعادة التوليد' : isFr ? 'Régénérer' : 'Regenerate'}
                        >
                          <RotateCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                          <span className="text-[10px]">
                            {isAr ? 'إعادة التوليد' : isFr ? 'Régénérer' : 'Regenerate'}
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
                    <RikouAIResponseRenderer content={msg.content} isRtl={isAr} />
                  )}

                  {/* Contextual Follow-Up Quick Chips (Only under latest AI response) */}
                  {!isUser && followUps.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-800">
                      <div className="text-[11px] font-bold text-zinc-400 mb-2 flex items-center gap-1.5">
                        <Flame className="h-3.5 w-3.5 text-purple-400" />
                        <span>{isAr ? 'اقتراحات للمتابعة والتطوير:' : isFr ? 'Actions suggérées :' : 'Next Action Suggestions:'}</span>
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
                  {isAr 
                    ? 'Rikou AI يقوم بالتفكير وصياغة الرد...' 
                    : isFr
                    ? 'Rikou AI réfléchit et prépare la réponse...'
                    : 'Rikou AI is thinking and formulating response...'}
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
                  {isAr ? `إجراء مفعّل: ${activeTool.arabicTitle}` : isFr ? `Action : ${activeTool.frenchTitle}` : `Active Action: ${activeTool.title}`}
                </span>
              </div>
              <button
                onClick={() => setActiveQuickActionId(null)}
                className="text-zinc-400 hover:text-white p-0.5 rounded-md hover:bg-zinc-800 transition-colors"
                title={isAr ? 'إلغاء التفعيل' : 'Dismiss'}
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
                    {attachment.size ? `${(attachment.size / 1024).toFixed(1)} KB` : (isAr ? 'جاهز للتحليل' : 'Ready')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveAttachment}
                className="p-1 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                title={isAr ? 'إزالة الملف' : 'Remove'}
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
              title={isAr ? 'إرفاق صورة أو ملف (📎)' : isFr ? 'Joindre une image ou un fichier' : 'Attach image or file'}
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
              placeholder={
                isAr
                  ? 'اكتب طلبك لـ Rikou AI هنا (مثال: عطيني 10 أفكار، كتب ليا سكريبت، خليه أكثر تشويقاً)...'
                  : isFr
                  ? 'Écrivez votre demande à Rikou AI ici (ex: 10 idées, rédige un script, rends-le plus captivant)...'
                  : 'Type your request here (e.g., 10 video ideas, write full script, make it punchier)...'
              }
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
                title={isAr ? 'إرسال الطلب (Enter)' : isFr ? 'Envoyer (Enter)' : 'Send request (Enter)'}
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
              {isAr ? 'اضغط Enter للإرسال، و Shift+Enter لسطر جديد' : isFr ? 'Entrée pour envoyer, Maj+Entrée pour nouvelle ligne' : 'Press Enter to send, Shift+Enter for new line'}
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
              <span>{isAr ? 'إجراءات وأدوات سريعة داخل Rikou AI' : isFr ? 'Actions Rapides & Raccourcis Rikou AI' : 'Quick Actions & Tool Shortcuts'}</span>
            </div>
            <h2 className="mt-1 text-xl sm:text-2xl font-black text-white">
              {isAr ? 'الـ 15 أداة كإجراءات سريعة ومباشرة' : isFr ? '15 Actions Rapides intégrées dans Rikou AI' : '15 Quick Actions inside Rikou AI'}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-zinc-400">
              {isAr
                ? 'انقر على أي إجراء لتجهيز الأمر فوراً في نفس المحادثة أعلاه دون الانتقال لأي صفحة منفصلة.'
                : isFr
                ? 'Cliquez sur une action pour préparer automatiquement la consigne dans le chat ci-dessus.'
                : 'Click any action to automatically prepare the instruction in the chat above.'}
            </p>
          </div>

          {/* Category Filter Pills (Mobile Scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
            {categories.slice(0, 5).map((cat) => {
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
                  {isAr ? cat.labelAr : isFr ? cat.labelFr : cat.labelEn}
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
            const title = isAr ? tool.arabicTitle : isFr ? tool.frenchTitle : tool.title;
            const desc = isAr ? tool.arabicDescription : isFr ? tool.frenchDescription : tool.description;

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
                  <span>{isAr ? 'تجهيز في المحادثة' : isFr ? 'Préparer dans le chat' : 'Load into Chat'}</span>
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
