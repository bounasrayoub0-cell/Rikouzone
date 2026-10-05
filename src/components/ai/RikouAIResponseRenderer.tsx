import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface RikouAIResponseRendererProps {
  content: string;
  isRtl?: boolean;
}

// Clean internal technical instruction leaks from AI output if present
function sanitizeResponseText(rawText: string): string {
  if (!rawText) return '';

  const lines = rawText.split('\n');
  const cleanedLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if line is an unwanted raw prompt leak
    const isPromptLeak =
      /^(?:Typography|Contrast|Design instructions|Internal prompt|Prompt instructions)\s*[:\-]/i.test(trimmed) ||
      /^(?:الكاميرا|المؤثر الصوتي|التوجه البصري|المؤثرات الصوتية)\s*[:\-]/i.test(trimmed) ||
      /^📌\s*(?:التعديلات المطبقة|Changes applied)/i.test(trimmed) ||
      /^(?:نصيحة المخرج|Director's tip)\s*:\s*استعمل/i.test(trimmed);

    if (isPromptLeak) {
      continue;
    }

    // Clean inline prompt markers like "• سر القوة:" or "• الهوك:" to be natural
    let polishedLine = line
      .replace(/•\s*(?:سر القوة|القوة الكامنة)\s*:\s*/gi, '• **السر في نجاحها:** ')
      .replace(/•\s*(?:الهوك|الخطاف)\s*:\s*/gi, '• **صيغة الهوك المقترحة:** ')
      .replace(/\[\s*(?:زاوية\s*[^\]]+)\]\s*:\s*/gi, '')
      .replace(/\[\s*(?:The\s+[^\]]+Angle)\]\s*:\s*/gi, '');

    cleanedLines.push(polishedLine);
  }

  // Remove excessive consecutive blank lines
  return cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Helper to render bold, italic, and inline code formatting inside a text segment
function renderFormattedInlineText(text: string): React.ReactNode {
  if (!text) return null;

  // Split by bold (**...**) and inline code (`...`)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={match.index} className="font-bold text-purple-300 hover:text-purple-200 transition-colors">
          {boldText}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const codeText = token.slice(1, -1);
      parts.push(
        <code
          key={match.index}
          className="rounded bg-purple-950/30 border border-purple-800/30 px-1.5 py-0.5 text-xs text-purple-200 font-mono"
        >
          {codeText}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const italicText = token.slice(1, -1);
      parts.push(
        <em key={match.index} className="italic text-zinc-300">
          {italicText}
        </em>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts.length > 0 ? parts : text;
}

// Code Block with Copy Button
const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0e12] shadow-md text-left" dir="ltr">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#14151c] px-3.5 py-2 text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5 font-mono">
          <Terminal className="h-3.5 w-3.5 text-purple-400" />
          <span>{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] text-zinc-400 hover:bg-purple-500/15 hover:text-purple-300 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs font-mono text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const RikouAIResponseRenderer: React.FC<RikouAIResponseRendererProps> = ({ content, isRtl = false }) => {
  const sanitized = sanitizeResponseText(content);

  // Parse blocks: code blocks vs text blocks
  const blocks: Array<{ type: 'code' | 'text'; language?: string; content: string }> = [];
  const codeBlockRegex = /```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g;
  let lastPos = 0;
  let codeMatch: RegExpExecArray | null;

  while ((codeMatch = codeBlockRegex.exec(sanitized)) !== null) {
    if (codeMatch.index > lastPos) {
      blocks.push({
        type: 'text',
        content: sanitized.substring(lastPos, codeMatch.index),
      });
    }
    blocks.push({
      type: 'code',
      language: codeMatch[1]?.trim() || 'code',
      content: codeMatch[2]?.trimEnd() || '',
    });
    lastPos = codeBlockRegex.lastIndex;
  }

  if (lastPos < sanitized.length) {
    blocks.push({
      type: 'text',
      content: sanitized.substring(lastPos),
    });
  }

  return (
    <div className={`space-y-3.5 leading-relaxed text-xs sm:text-sm text-zinc-200 ${isRtl ? 'text-right' : 'text-left'}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'code') {
          return <CodeBlock key={bIdx} language={block.language || 'text'} code={block.content} />;
        }

        // Parse paragraphs, headings, lists, callouts within text block
        const paragraphs = block.content.split(/\n\n+/);

        return (
          <React.Fragment key={bIdx}>
            {paragraphs.map((para, pIdx) => {
              const trimmedPara = para.trim();
              if (!trimmedPara) return null;

              // Check for horizontal divider
              if (/^(?:---|━━━+|___+)/.test(trimmedPara)) {
                return (
                  <hr key={pIdx} className="my-4 border-t border-zinc-800/80" />
                );
              }

              // Check for Markdown headings (### or ## or #)
              const headingMatch = trimmedPara.match(/^(#{1,4})\s+(.+)$/m);
              if (headingMatch && trimmedPara.startsWith(headingMatch[1])) {
                const level = headingMatch[1].length;
                const headingText = headingMatch[2].trim();
                const remainder = trimmedPara.replace(/^(#{1,4})\s+.+(\n|$)/, '').trim();

                return (
                  <div key={pIdx} className="my-2 first:mt-0">
                    <h4
                      className={`font-black tracking-tight text-white flex items-center gap-2 ${
                        level <= 2
                          ? 'text-sm sm:text-base text-purple-300 pb-1 border-b border-purple-500/20 mb-2'
                          : 'text-xs sm:text-sm text-purple-400 font-bold mb-1.5'
                      }`}
                    >
                      <span>{renderFormattedInlineText(headingText)}</span>
                    </h4>
                    {remainder && (
                      <div className="space-y-2 mt-1.5 text-zinc-300">
                        {renderParagraphContent(remainder)}
                      </div>
                    )}
                  </div>
                );
              }

              // Check for Callout / Tip Card (starts with 💡 or 📌 or ⚡ or 💬 or ✨)
              if (/^(?:💡|📌|⚡|💬|✨)/.test(trimmedPara)) {
                return (
                  <div
                    key={pIdx}
                    className="my-3 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-3.5 sm:p-4 text-xs sm:text-sm text-purple-100/90 shadow-sm"
                  >
                    {renderParagraphContent(trimmedPara)}
                  </div>
                );
              }

              // Standard Paragraph or List
              return (
                <div key={pIdx} className="space-y-1.5 text-zinc-200">
                  {renderParagraphContent(trimmedPara)}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Render lines inside a paragraph, with support for bullets and numbered items
function renderParagraphContent(paraText: string): React.ReactNode {
  const lines = paraText.split('\n');

  return lines.map((line, idx) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;

    // Bullet point (•, *, -)
    if (/^[•\*\-]\s+/.test(trimmedLine)) {
      const cleanLine = trimmedLine.replace(/^[•\*\-]\s+/, '');
      return (
        <div key={idx} className="flex items-start gap-2.5 my-1 text-zinc-300">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
          <span className="flex-1 leading-relaxed">
            {renderFormattedInlineText(cleanLine)}
          </span>
        </div>
      );
    }

    // Numbered item (e.g. "1. " or "1) ")
    const numMatch = trimmedLine.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numMatch) {
      return (
        <div key={idx} className="flex items-start gap-2.5 my-1.5 text-zinc-100">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/10 border border-purple-500/25 text-[11px] font-black text-purple-300">
            {numMatch[1]}
          </span>
          <span className="flex-1 leading-relaxed">
            {renderFormattedInlineText(numMatch[2])}
          </span>
        </div>
      );
    }

    // Regular line
    return (
      <p key={idx} className="leading-relaxed">
        {renderFormattedInlineText(trimmedLine)}
      </p>
    );
  });
}
