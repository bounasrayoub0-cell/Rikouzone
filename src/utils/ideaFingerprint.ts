import { ContentIdea } from '../types';

/**
 * Normalizes text for semantic fingerprinting:
 * - Removes Arabic diacritics, prefixes (الـ, و, فـ, بـ)
 * - Removes common English/French/Arabic stop words
 * - Strips punctuation, multiple spaces, and numbers
 */
export function normalizeTextForFingerprint(text: string): string[] {
  if (!text) return [];

  const lower = text.toLowerCase().trim();

  // Remove diacritics from Arabic
  const withoutTashkeel = lower.replace(/[\u064B-\u0652\u0670]/g, '');

  // Normalize alef, yaa, taa marbuta
  const normalizedAr = withoutTashkeel
    .replace(/[إأآآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[^\w\s\u0600-\u06FF]/g, ' ');

  // Tokenize
  const tokens = normalizedAr.split(/\s+/).filter(Boolean);

  // Common stop words across Arabic, English, and French
  const stopWords = new Set([
    // Arabic
    'في', 'من', 'على', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'هذين', 'هؤلاء',
    'التي', 'الذي', 'الذين', 'هو', 'هي', 'هم', 'هن', 'كان', 'كانت', 'يكون',
    'ما', 'ماذا', 'كيف', 'لماذا', 'هل', 'لن', 'لم', 'لا', 'غير', 'كل', 'أكثر',
    'أفضل', 'سر', 'أسرار', 'طريقة', 'خطوات', 'دليل', 'فيديو', 'محتوى', 'الجزء',
    'شرح', 'الـ', 'ديال', 'واش', 'باش', 'شنو', 'علاش', 'كيفاش',
    // English
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'with', 'about', 'how', 'why', 'what', 'this', 'that', 'these', 'those',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'you', 'your', 'my',
    'from', 'vol', 'part', 'step', 'top', 'best', 'secret',
    // French
    'le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'dans', 'en', 'sur',
    'sous', 'avec', 'pour', 'par', 'comment', 'pourquoi', 'ce', 'cette',
    'ces', 'est', 'sont', 'votre', 'mon', 'partie'
  ]);

  return tokens
    .map((t) => (t.startsWith('ال') && t.length > 4 ? t.slice(2) : t))
    .filter((t) => t.length > 2 && !stopWords.has(t));
}

/**
 * Computes a unique content fingerprint representing the core concept.
 * Combines normalized significant tokens, niche, and content angle.
 */
export function generateIdeaFingerprint(idea: Partial<ContentIdea>): string {
  if (idea.id && idea.id.startsWith('custom-fp-')) {
    return idea.id;
  }

  const titleTokens = normalizeTextForFingerprint(
    `${idea.title || ''} ${idea.arabicTitle || ''}`
  );
  const hookTokens = normalizeTextForFingerprint(
    `${idea.hook || ''} ${idea.arabicHook || ''}`
  );

  // Take top distinctive tokens
  const uniqueTokens = Array.from(new Set([...titleTokens, ...hookTokens])).sort();
  const tokenSignature = uniqueTokens.slice(0, 5).join('-');

  const niche = (idea.niche || 'general').toLowerCase().replace(/\s+/g, '_');
  const angle = (idea as any).angle || 'general';

  return `${niche}::${angle}::${tokenSignature || idea.id || 'idea'}`;
}

/**
 * Jaccard similarity between two token sets
 */
function computeJaccardSimilarity(tokensA: string[], tokensB: string[]): number {
  if (!tokensA.length || !tokensB.length) return 0;
  const setA = new Set(tokensA);
  const setB = new Set(tokensB);

  let intersection = 0;
  setA.forEach((token) => {
    if (setB.has(token)) intersection++;
  });

  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

/**
 * Checks if a candidate idea is too close to any existing idea.
 * Compares both exact ID/fingerprint and title/hook semantic similarity.
 */
export function isDuplicateIdea(
  candidate: ContentIdea,
  existingList: ContentIdea[],
  similarityThreshold = 0.48
): { isDuplicate: boolean; duplicateReason?: string; matchedIdeaId?: string } {
  const candidateFp = generateIdeaFingerprint(candidate);

  const cleanCandHookAr = candidate.arabicHook.replace(/[^\w\s\u0600-\u06FF]/g, '').trim().toLowerCase();
  const cleanCandHookEn = candidate.hook.replace(/[^\w\s]/g, '').trim().toLowerCase();
  const candHookTokens = normalizeTextForFingerprint(`${candidate.hook} ${candidate.arabicHook}`);

  const candidateTokens = normalizeTextForFingerprint(
    `${candidate.title} ${candidate.arabicTitle} ${candidate.hook} ${candidate.arabicHook}`
  );

  for (const existing of existingList) {
    // 1. Exact ID match
    if (candidate.id && existing.id && candidate.id === existing.id) {
      return { isDuplicate: true, duplicateReason: 'Exact ID match', matchedIdeaId: existing.id };
    }

    // 2. Normalized Title match
    const cleanExistTitleAr = existing.arabicTitle.replace(/[^\w\s\u0600-\u06FF]/g, '').trim().toLowerCase();
    const cleanCandTitleAr = candidate.arabicTitle.replace(/[^\w\s\u0600-\u06FF]/g, '').trim().toLowerCase();
    if (
      cleanCandTitleAr === cleanExistTitleAr ||
      candidate.title.trim().toLowerCase() === existing.title.trim().toLowerCase()
    ) {
      return { isDuplicate: true, duplicateReason: 'Exact or near-identical Title', matchedIdeaId: existing.id };
    }

    // 3. Normalized Hook match (prohibits duplicate opening lines)
    const cleanExistHookAr = existing.arabicHook.replace(/[^\w\s\u0600-\u06FF]/g, '').trim().toLowerCase();
    const cleanExistHookEn = existing.hook.replace(/[^\w\s]/g, '').trim().toLowerCase();
    if (
      cleanCandHookAr === cleanExistHookAr ||
      cleanCandHookEn === cleanExistHookEn
    ) {
      return { isDuplicate: true, duplicateReason: 'Identical Hook', matchedIdeaId: existing.id };
    }

    // 4. Hook Token Similarity Check (prevent rephrased duplicate hooks)
    const existHookTokens = normalizeTextForFingerprint(`${existing.hook} ${existing.arabicHook}`);
    const hookSim = computeJaccardSimilarity(candHookTokens, existHookTokens);
    if (hookSim >= 0.60) {
      return {
        isDuplicate: true,
        duplicateReason: `Near-identical Hook wording (${Math.round(hookSim * 100)}%)`,
        matchedIdeaId: existing.id
      };
    }

    // 5. Concept Fingerprint collision
    const existingFp = generateIdeaFingerprint(existing);
    if (candidateFp === existingFp) {
      return { isDuplicate: true, duplicateReason: 'Matching Concept Fingerprint', matchedIdeaId: existing.id };
    }

    // 6. Overall semantic similarity threshold on combined tokens
    const existingTokens = normalizeTextForFingerprint(
      `${existing.title} ${existing.arabicTitle} ${existing.hook} ${existing.arabicHook}`
    );
    const sim = computeJaccardSimilarity(candidateTokens, existingTokens);
    if (sim >= similarityThreshold) {
      return {
        isDuplicate: true,
        duplicateReason: `High Semantic Similarity (${Math.round(sim * 100)}%)`,
        matchedIdeaId: existing.id
      };
    }
  }

  return { isDuplicate: false };
}

/**
 * Filters a list of ideas to ensure 100% uniqueness without near-duplicates.
 */
export function filterUniqueIdeas(ideas: ContentIdea[]): ContentIdea[] {
  const uniqueList: ContentIdea[] = [];
  const seenFingerprints = new Set<string>();

  for (const idea of ideas) {
    const fp = generateIdeaFingerprint(idea);
    if (seenFingerprints.has(fp)) continue;

    const dupCheck = isDuplicateIdea(idea, uniqueList);
    if (!dupCheck.isDuplicate) {
      uniqueList.push(idea);
      seenFingerprints.add(fp);
    }
  }

  return uniqueList;
}
