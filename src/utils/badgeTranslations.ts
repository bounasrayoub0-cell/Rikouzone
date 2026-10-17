import { Language } from '../types';
import { BadgeItem } from '../data/challengesDataTypes';

export interface LocalizedBadgeData {
  name: string;
  description: string;
  condition: string;
}

export const BADGE_LOCALIZATIONS: Record<string, Record<Language, LocalizedBadgeData>> = {
  // 1. Existing Badges
  'first-challenge-done': {
    ar: { name: 'الخطوة الأولى', description: 'أكملت أول تحدٍّ تعليمي بنجاح في RikouZone', condition: 'إكمال أي تحدٍّ واحد بنجاح' },
    ary: { name: 'الخطوة اللولى', description: 'كملتي أول تحدي تعليمي بنجاح فـ RikouZone', condition: 'إكمال أي تحدي واحد بنجاح' },
    en: { name: 'First Step', description: 'Completed your very first challenge in RikouZone', condition: 'Complete 1 learning challenge' },
    fr: { name: 'Premier Pas', description: 'Vous avez terminé votre tout premier défi dans RikouZone', condition: 'Terminer 1 défi d’apprentissage' },
    es: { name: 'Primer Paso', description: 'Completaste tu primer desafío en RikouZone', condition: 'Completar 1 desafío' },
    de: { name: 'Erster Schritt', description: 'Erste Herausforderung in RikouZone abgeschlossen', condition: '1 Herausforderung abschließen' },
    it: { name: 'Primo Passo', description: 'Hai completato la tua prima sfida su RikouZone', condition: 'Completa 1 sfida di apprendimento' },
    pt: { name: 'Primeiro Passo', description: 'Completou seu primeiro desafio no RikouZone', condition: 'Completar 1 desafio' },
    zh: { name: '迈出首步', description: '在 RikouZone 成功完成首个学习挑战', condition: '完成 1 个学习挑战' }
  },
  'xp-century-100': {
    ar: { name: 'نادي الـ 100 XP', description: 'جمعت أول 100 نقطة خبرة (XP) من أنشطتك التعليمية', condition: 'الوصول إلى 100 XP' },
    ary: { name: 'نادي 100 XP', description: 'جمعتي أول 100 نقطة خبرة من الأنشطة ديالك', condition: 'الوصول لـ 100 XP' },
    en: { name: '100 XP Club', description: 'Earned your first 100 total experience points', condition: 'Reach 100 XP' },
    fr: { name: 'Club 100 XP', description: 'Vous avez accumulé vos 100 premiers points XP', condition: 'Atteindre 100 XP' },
    es: { name: 'Club 100 XP', description: 'Ganaste tus primeros 100 puntos de experiencia', condition: 'Alcanzar 100 XP' },
    de: { name: '100 XP Club', description: 'Die ersten 100 Erfahrungspunkte gesammelt', condition: '100 XP erreichen' },
    it: { name: 'Club 100 XP', description: 'Hai guadagnato i tuoi primi 100 punti esperienza', condition: 'Raggiungi 100 XP' },
    pt: { name: 'Clube dos 100 XP', description: 'Conquistou seus primeiros 100 pontos de experiência', condition: 'Alcançar 100 XP' },
    zh: { name: '百点俱乐部', description: '通过学习累积获取前 100 点经验值', condition: '达到 100 XP' }
  },
  'first-quiz-mastered': {
    ar: { name: 'باحث المعرفة', description: 'اجتزت أول اختبار قصير بإجابة صحيحة', condition: 'إجابة اختبار تعليمي قصير بنجاح' },
    ary: { name: 'باحث المعرفة', description: 'نجحتي فـ أول كويز تعليمي بإجابة صحيحة', condition: 'إكمال اختبار تعليمي بنجاح' },
    en: { name: 'Knowledge Seeker', description: 'Successfully passed an educational quiz', condition: 'Pass 1 educational quiz' },
    fr: { name: 'Chercheur de Savoir', description: 'Vous avez réussi votre premier quiz éducatif', condition: 'Réussir 1 quiz éducatif' },
    es: { name: 'Buscador de Conocimiento', description: 'Superaste tu primer cuestionario educativo con éxito', condition: 'Aprobar 1 cuestionario educativo' },
    de: { name: 'Wissenssucher', description: 'Erstes Quiz erfolgreich bestanden', condition: '1 Bildungsquiz bestehen' },
    it: { name: 'Cercatore di Sapere', description: 'Hai superato con successo il tuo primo quiz educativo', condition: 'Supera 1 quiz educativo' },
    pt: { name: 'Buscador de Conhecimento', description: 'Passou no seu primeiro questionário com sucesso', condition: 'Passar em 1 quiz educativo' },
    zh: { name: '求知求索', description: '首次成功完成并全对通过单元小测验', condition: '通过 1 个测验' }
  },
  'first-practical-exercise': {
    ar: { name: 'الصانع العملي', description: 'أتممت أول تمرين تطبيقي عملي وأثبتّ فهمك بالمعايير', condition: 'إنجاز تمرين تطبيقي عملي بنجاح' },
    ary: { name: 'الصانع العملي', description: 'كملتي أول تمرين تطبيقي عملي وطبقتي الشروط', condition: 'إنجاز تمرين عملي بنجاح' },
    en: { name: 'Hands-on Builder', description: 'Completed your first practical application exercise', condition: 'Complete 1 hands-on exercise' },
    fr: { name: 'Bâtisseur Pratique', description: 'Vous avez validé votre premier exercice pratique', condition: 'Réussir 1 exercice pratique' },
    es: { name: 'Constructor Práctico', description: 'Completaste tu primer ejercicio práctico con éxito', condition: 'Completar 1 ejercicio práctico' },
    de: { name: 'Praktischer Macher', description: 'Erste praktische Anwendungsübung abgeschlossen', condition: '1 Praxisübung abschließen' },
    it: { name: 'Costruttore Pratico', description: 'Hai completato il tuo primo esercizio pratico sul campo', condition: 'Completa 1 esercizio pratico' },
    pt: { name: 'Criador Prático', description: 'Concluiu seu primeiro exercício prático de aplicação', condition: 'Completar 1 exercício prático' },
    zh: { name: '实战行家', description: '完成首个实操演练项目并达成验收标准', condition: '完成 1 个实战演练' }
  },
  'challenges-five-completed': {
    ar: { name: 'المتحدي المثابر', description: 'أنجزت 5 تحديات تعليمية مختلفة بنجاح واقتدار', condition: 'إكمال 5 تحديات تعليمية' },
    ary: { name: 'المتحدي المثابر', description: 'كملتي 5 ديال التحديات التعليمية بنجاح', condition: 'إكمال 5 تحديات' },
    en: { name: 'Persistent Challenger', description: 'Completed 5 different learning challenges', condition: 'Complete 5 challenges' },
    fr: { name: 'Challenger Persévérant', description: 'Vous avez réussi 5 défis d’apprentissage différents', condition: 'Terminer 5 défis' },
    es: { name: 'Desafiante Constante', description: 'Completaste 5 desafíos de aprendizaje distintos', condition: 'Completar 5 desafíos' },
    de: { name: 'Ausdauernder Herausforderer', description: '5 verschiedene Lernherausforderungen gemeistert', condition: '5 Herausforderungen abschließen' },
    it: { name: 'Sfidante Costante', description: 'Hai completato 5 diverse sfide di apprendimento', condition: 'Completa 5 sfide' },
    pt: { name: 'Desafiante Persistente', description: 'Completou 5 desafios de aprendizagem diferentes', condition: 'Completar 5 desafios' },
    zh: { name: '坚毅攻坚者', description: '稳扎稳打顺利完成 5 项不同领域的进阶挑战', condition: '完成 5 个挑战' }
  },
  'streak-7-days': {
    ar: { name: 'شعلة الاستمرارية (7 أيام)', description: 'حافظت على سلسلة نشاط يومي لمدة 7 أيام متتالية دون انقطاع', condition: '7 أيام متتالية' },
    ary: { name: 'شعلة الاستمرارية (7 أيام)', description: 'حافظتي على النشاط اليومي لـ 7 أيام متابعة بلا انقطاع', condition: '7 أيام متتالية' },
    en: { name: 'Unstoppable Flame', description: 'Maintained a 7-day continuous learning streak', condition: '7-day streak' },
    fr: { name: 'Flamme Continue', description: '7 jours consécutifs d’activité sans interruption', condition: 'Série de 7 jours' },
    es: { name: 'Llama Imparable', description: 'Mantuviste una racha de 7 días consecutivos aprendiendo', condition: 'Racha de 7 días' },
    de: { name: 'Unaufhaltsame Flamme', description: '7 Tage ununterbrochene Lernsträhne gehalten', condition: '7-Tage-Strähne' },
    it: { name: 'Fiamma Inarrestabile', description: 'Hai mantenuto una serie di 7 giorni consecutivi di studio', condition: 'Serie di 7 giorni' },
    pt: { name: 'Chama Imparável', description: 'Manteve uma sequência de 7 dias consecutivos de estudo', condition: 'Sequência de 7 dias' },
    zh: { name: '七日星火', description: '保持持续学习状态，达成连续 7 天不间断活跃打卡', condition: '连续 7 天活跃' }
  },
  'weekly-champion': {
    ar: { name: 'بطل التحديات الأسبوعية', description: 'أنجزت أول تحدٍّ أسبوعي كبير وأثبتّ التزامك العملي', condition: 'إكمال تحدٍّ أسبوعي واحد' },
    ary: { name: 'بطل التحديات الأسبوعية', description: 'كملتي أول تحدي أسبوعي كبير وأثبتي الالتزام ديالك', condition: 'إكمال تحدي أسبوعي' },
    en: { name: 'Weekly Champion', description: 'Conquered a full weekly deep challenge project', condition: 'Complete 1 weekly challenge' },
    fr: { name: 'Champion Hebdomadaire', description: 'Vous avez surmonté un grand défi hebdomadaire', condition: 'Terminer 1 défi hebdomadaire' },
    es: { name: 'Campeón Semanal', description: 'Conquistaste un desafío semanal completo con excelencia', condition: 'Completar 1 desafío semanal' },
    de: { name: 'Wochenchampion', description: 'Eine vollständige wöchentliche Herausforderung gemeistert', condition: '1 wöchentliche Herausforderung' },
    it: { name: 'Campione Settimanale', description: 'Hai completato una sfida settimanale approfondita', condition: 'Completa 1 sfida settimanale' },
    pt: { name: 'Campeão Semanal', description: 'Venceu um grande desafio semanal de aprendizagem', condition: 'Completar 1 desafio semanal' },
    zh: { name: '周度先锋', description: '圆满交付一项高权重的深水区周度综合实战课题', condition: '完成 1 个周挑战' }
  },
  'xp-master-500': {
    ar: { name: 'خبير RikouZone (500 XP)', description: 'تجاوزت حاجز 500 نقطة خبرة وأصبحت من رواد المجتمع الرقمي', condition: 'الوصول إلى 500 XP' },
    ary: { name: 'خبير RikouZone (500 XP)', description: 'فتي 500 نقطة خبرة ووليتي من رواد المنصة', condition: 'الوصول لـ 500 XP' },
    en: { name: 'Digital Prodigy', description: 'Accumulated 500 total XP through persistent learning', condition: 'Reach 500 XP' },
    fr: { name: 'Prodige Digital', description: 'Vous avez dépassé la barre des 500 points XP', condition: 'Atteindre 500 XP' },
    es: { name: 'Prodigio Digital', description: 'Superaste los 500 puntos XP con dedicación constante', condition: 'Alcanzar 500 XP' },
    de: { name: 'Digitales Wunderkind', description: 'Über 500 XP durch kontinuierliches Lernen gesammelt', condition: '500 XP erreichen' },
    it: { name: 'Prodigio Digitale', description: 'Hai superato la soglia dei 500 punti XP totali', condition: 'Raggiungi 500 XP' },
    pt: { name: 'Prodígio Digital', description: 'Ultrapassou a marca de 500 pontos XP acumulados', condition: 'Alcançar 500 XP' },
    zh: { name: '精锐学者', description: '稳扎稳打突破 500 点总经验值大关', condition: '达到 500 XP' }
  },

  // 2. شارات التعلّم (Lessons)
  'lessons-1-done': {
    ar: { name: 'أول خطوة', description: 'أكملت أول درس تعليمي عملي في منصة RikouZone', condition: 'إكمال أول درس' },
    ary: { name: 'أول خطوة', description: 'كملتي أول درس فـ RikouZone وبديتي الطريق', condition: 'إكمال أول درس' },
    en: { name: 'First Step', description: 'Completed your very first educational lesson', condition: 'Complete 1 lesson' },
    fr: { name: 'Premier Pas', description: 'Vous avez terminé votre toute première leçon éducative', condition: 'Compléter 1 leçon' },
    es: { name: 'Primer Paso', description: 'Completaste tu primera lección educativa', condition: 'Completar 1 lección' },
    de: { name: 'Erster Schritt', description: 'Erste Lerneinheit erfolgreich abgeschlossen', condition: '1 Lektion abschließen' },
    it: { name: 'Primo Passo', description: 'Hai completato la tua prima lezione formativa', condition: 'Completa 1 lezione' },
    pt: { name: 'Primeiro Passo', description: 'Concluiu sua primeira aula prática de aprendizagem', condition: 'Completar 1 aula' },
    zh: { name: '启程第一步', description: '在 RikouZone 成功点亮并完成你的第一堂课程', condition: '完成 1 门课' }
  },
  'lessons-5-done': {
    ar: { name: 'متعلم نشيط', description: 'أتممت 5 دروس تعليمية وتقدمت في مسارات المهارات', condition: 'إكمال 5 دروس' },
    ary: { name: 'متعلم نشيط', description: 'كملتي 5 دروس وغادي مزيان فـ التعلم', condition: 'إكمال 5 دروس' },
    en: { name: 'Active Learner', description: 'Completed 5 educational lessons across tracks', condition: 'Complete 5 lessons' },
    fr: { name: 'Apprenant Actif', description: 'Vous avez terminé 5 leçons complètes', condition: 'Compléter 5 leçons' },
    es: { name: 'Estudiante Activo', description: 'Completaste 5 lecciones educativas completas', condition: 'Completar 5 lecciones' },
    de: { name: 'Aktiver Lerner', description: '5 Lerneinheiten erfolgreich absolviert', condition: '5 Lektionen abschließen' },
    it: { name: 'Studente Attivo', description: 'Hai completato 5 lezioni formative strutturate', condition: 'Completa 5 lezioni' },
    pt: { name: 'Estudante Ativo', description: 'Concluiu 5 aulas práticas completas', condition: 'Completar 5 aulas' },
    zh: { name: '笃学新锐', description: '专注投入，累计学完 5 节实用数字化技能课程', condition: '完成 5 门课' }
  },
  'lessons-20-done': {
    ar: { name: 'عاشق المعرفة', description: 'أنجزت 20 درساً تعليمياً بتعمق وشغف حقيقي', condition: 'إكمال 20 درساً' },
    ary: { name: 'عاشق المعرفة', description: 'كملتي 20 درس وبنيتي معرفة قوية', condition: 'إكمال 20 درساً' },
    en: { name: 'Knowledge Enthusiast', description: 'Completed 20 comprehensive lessons', condition: 'Complete 20 lessons' },
    fr: { name: 'Passionné de Savoir', description: 'Vous avez terminé 20 leçons d’apprentissage', condition: 'Compléter 20 leçons' },
    es: { name: 'Amante del Saber', description: 'Completaste 20 lecciones con dedicación', condition: 'Completar 20 lecciones' },
    de: { name: 'Wissensbegeisterter', description: '20 umfassende Lektionen abgeschlossen', condition: '20 Lektionen abschließen' },
    it: { name: 'Appassionato di Conoscenza', description: 'Hai completato 20 lezioni con dedizione', condition: 'Completa 20 lezioni' },
    pt: { name: 'Entusiasta do Conhecimento', description: 'Concluiu 20 aulas com foco e dedicação', condition: 'Completar 20 aulas' },
    zh: { name: '学海笃行', description: '求知若渴，深度研读并消化完成 20 节精品课程', condition: '完成 20 门课' }
  },
  'lessons-50-done': {
    ar: { name: 'خبير التعلّم', description: 'أتممت 50 درساً واكتسبت رصيداً كبيراً في مختلف المجالات', condition: 'إكمال 50 درساً' },
    ary: { name: 'خبير التعلم', description: 'كملتي 50 درس وطورتي مهاراتك بشكل احترافي', condition: 'إكمال 50 درساً' },
    en: { name: 'Learning Expert', description: 'Completed 50 in-depth practical lessons', condition: 'Complete 50 lessons' },
    fr: { name: 'Expert en Apprentissage', description: 'Vous avez validé 50 leçons approfondies', condition: 'Compléter 50 leçons' },
    es: { name: 'Experto en Aprendizaje', description: 'Completaste 50 lecciones prácticas a fondo', condition: 'Completar 50 lecciones' },
    de: { name: 'Lernexperte', description: '50 tiefgehende Lerneinheiten gemeistert', condition: '50 Lektionen abschließen' },
    it: { name: 'Esperto dell’Apprendimento', description: 'Hai completato 50 lezioni con padronanza', condition: 'Completa 50 lezioni' },
    pt: { name: 'Especialista em Aprendizado', description: 'Concluiu 50 aulas práticas completas', condition: 'Completar 50 aulas' },
    zh: { name: '通识博雅', description: '厚积薄发，圆满结课 50 节涵盖各细分赛道的核心课程', condition: '完成 50 门课' }
  },
  'lessons-100-done': {
    ar: { name: 'موسوعة متنقلة', description: 'تجاوزت حاجز 100 درس لتصبح مرجعاً حقيقياً في المهارات الرقمية', condition: 'إكمال 100 درس' },
    ary: { name: 'موسوعة متنقلة', description: 'كملتي 100 درس ووليتي موسوعة فـ المهارات الرقمية', condition: 'إكمال 100 درس' },
    en: { name: 'Walking Encyclopedia', description: 'Mastered 100 educational lessons across RikouZone', condition: 'Complete 100 lessons' },
    fr: { name: 'Encyclopédie Vivante', description: 'Plus de 100 leçons maîtrisées dans l’académie', condition: 'Compléter 100 leçons' },
    es: { name: 'Enciclopedia Andante', description: 'Superaste 100 lecciones convirtiéndote en referente', condition: 'Completar 100 lecciones' },
    de: { name: 'Wandelnde Enzyklopädie', description: '100 Lerneinheiten über alle Bereiche hinweg absolviert', condition: '100 Lektionen abschließen' },
    it: { name: 'Enciclopedia Vivente', description: 'Hai padroneggiato 100 lezioni formative totali', condition: 'Completa 100 lezioni' },
    pt: { name: 'Enciclopédia Ambulante', description: 'Ultrapassou a marca histórica de 100 aulas concluídas', condition: 'Completar 100 aulas' },
    zh: { name: '行走的百科全书', description: '完成跨越 100 堂课的知识长征，成就数字领域的全能标杆', condition: '完成 100 门课' }
  },

  // 3. شارات الاستمرارية (Streaks)
  'streak-2-days': {
    ar: { name: 'بداية الاستمرارية', description: 'حافظت على يومين متتاليين من النشاط والتعلم', condition: 'يومان متتاليان من النشاط' },
    ary: { name: 'بداية الاستمرارية', description: 'يومين متابعين ديال النشاط وبداية العادة', condition: 'يومان متتاليان' },
    en: { name: 'Streak Starter', description: 'Active for 2 consecutive days of learning', condition: '2-day streak' },
    fr: { name: 'Début de Série', description: '2 jours consécutifs d’activité et d’apprentissage', condition: 'Série de 2 jours' },
    es: { name: 'Inicio de Racha', description: '2 días consecutivos de actividad y constancia', condition: 'Racha de 2 días' },
    de: { name: 'Strähnenstarter', description: '2 aufeinanderfolgende Tage aktiv gelernt', condition: '2-Tage-Strähne' },
    it: { name: 'Inizio Serie', description: '2 giorni consecutivi di attività e studio', condition: 'Serie di 2 giorni' },
    pt: { name: 'Início de Sequência', description: '2 dias consecutivos de foco e aprendizado', condition: 'Sequência de 2 dias' },
    zh: { name: '双日连晖', description: '初显习惯力量，连续 2 天保持在线学习活跃', condition: '连续 2 天活跃' }
  },
  'streak-14-days': {
    ar: { name: 'بطل الأسبوعين', description: '14 يوماً متتالياً من الانضباط وترسيخ عادات النجاح', condition: '14 يوماً متتالياً' },
    ary: { name: 'بطل الأسبوعين', description: '14 يوم متابعة ديال الانضباط بدون أي نهار راحة', condition: '14 يوماً متتالياً' },
    en: { name: 'Two Weeks Champion', description: 'Maintained 14 consecutive active learning days', condition: '14-day streak' },
    fr: { name: 'Champion des Deux Semaines', description: '14 jours consécutifs de rigueur et d’assiduité', condition: 'Série de 14 jours' },
    es: { name: 'Campeón de Dos Semanas', description: '14 días consecutivos consolidando tus hábitos', condition: 'Racha de 14 días' },
    de: { name: 'Zwei-Wochen-Champion', description: '14 Tage konsequente Lerndisziplin bewiesen', condition: '14-Tage-Strähne' },
    it: { name: 'Campione di Due Settimane', description: '14 giorni consecutivi di disciplina e costanza', condition: 'Serie di 14 giorni' },
    pt: { name: 'Campeão de Duas Semanas', description: '14 dias consecutivos de disciplina diária', condition: 'Sequência de 14 dias' },
    zh: { name: '半月如磐', description: '连续 14 天日日精进，把学习淬炼成不可撼动的习惯', condition: '连续 14 天活跃' }
  },
  'streak-30-days': {
    ar: { name: 'شهر من الانضباط', description: 'حافظت على 30 يوماً متتالياً من التعلم اليومي الراسخ', condition: '30 يوماً متتالياً' },
    ary: { name: 'شهر من الانضباط', description: 'شهر كامل متابع ديال التعلم وبناء المستقبل', condition: '30 يوماً متتالياً' },
    en: { name: 'Month of Discipline', description: 'Maintained an unbroken 30-day learning streak', condition: '30-day streak' },
    fr: { name: 'Mois de Discipline', description: '30 jours consécutifs d’apprentissage ininterrompu', condition: 'Série de 30 jours' },
    es: { name: 'Mes de Disciplina', description: '30 días seguidos de constancia inquebrantable', condition: 'Racha de 30 días' },
    de: { name: 'Monat der Disziplin', description: '30 Tage ununterbrochene Lerndisziplin erreicht', condition: '30-Tage-Strähne' },
    it: { name: 'Mese di Disciplina', description: '30 giorni consecutivi di impegno ininterrotto', condition: 'Serie di 30 giorni' },
    pt: { name: 'Mês de Disciplina', description: '30 dias consecutivos de dedicação diária sólida', condition: 'Sequência de 30 dias' },
    zh: { name: '整月自律', description: '整整 30 天无断档坚持，用惊人的自律书写成长弧线', condition: '连续 30 天活跃' }
  },
  'streak-100-days': {
    ar: { name: 'أسطورة الاستمرارية', description: '100 يوم متتالٍ من الالتزام الإعجازي وبناء المهارات', condition: '100 يوم متتالٍ' },
    ary: { name: 'أسطورة الاستمرارية', description: '100 يوم متابعة فـ التعلم — مستوى أسطوري حقيقي', condition: '100 يوم متتالٍ' },
    en: { name: 'Consistency Legend', description: 'Achieved an extraordinary 100-day active streak', condition: '100-day streak' },
    fr: { name: 'Légende de la Régularité', description: '100 jours consécutifs d’un engagement exceptionnel', condition: 'Série de 100 jours' },
    es: { name: 'Leyenda de la Constancia', description: '100 días consecutivos de compromiso legendario', condition: 'Racha de 100 días' },
    de: { name: 'Legende der Beständigkeit', description: '100 Tage ununterbrochener Lerneinsatz vollbracht', condition: '100-Tage-Strähne' },
    it: { name: 'Leggenda della Costanza', description: '100 giorni consecutivi di impegno straordinario', condition: 'Serie di 100 giorni' },
    pt: { name: 'Lenda da Constância', description: '100 dias consecutivos de disciplina lendária', condition: 'Sequência de 100 dias' },
    zh: { name: '百日传奇', description: '达成连续 100 天全勤打卡神迹，成为万人仰望的学习传奇', condition: '连续 100 天活跃' }
  },

  // 4. شارات التحديات (Challenges)
  'challenges-10-completed': {
    ar: { name: 'متحدي', description: 'أنجزت 10 تحديات تعليمية يومية وأسبوعية بنجاح', condition: 'إكمال 10 تحديات' },
    ary: { name: 'متحدي', description: 'كملتي 10 تحديات وبينتي على الكفاءة ديالك', condition: 'إكمال 10 تحديات' },
    en: { name: 'Determined Challenger', description: 'Completed 10 daily or weekly learning challenges', condition: 'Complete 10 challenges' },
    fr: { name: 'Challenger Déterminé', description: 'Vous avez accompli 10 défis d’apprentissage', condition: 'Terminer 10 défis' },
    es: { name: 'Desafiante Determinado', description: 'Completaste 10 desafíos prácticos con éxito', condition: 'Completar 10 desafíos' },
    de: { name: 'Entschlossener Herausforderer', description: '10 Lernherausforderungen erfolgreich gelöst', condition: '10 Herausforderungen' },
    it: { name: 'Sfidante Determinato', description: 'Hai completato 10 sfide formative con successo', condition: 'Completa 10 sfide' },
    pt: { name: 'Desafiante Determinado', description: 'Concluiu 10 desafios de aprendizagem', condition: 'Completar 10 desafios' },
    zh: { name: '破局先锋', description: '乘风破浪，累计攻克并完成 10 项日常与周期挑战', condition: '完成 10 个挑战' }
  },
  'challenges-25-completed': {
    ar: { name: 'بطل التحديات', description: 'اجتزت 25 تحدياً عملياً في مختلف مسارات المنصة', condition: 'إكمال 25 تحدياً' },
    ary: { name: 'بطل التحديات', description: 'كملتي 25 تحدي فـ مختلف المجالات', condition: 'إكمال 25 تحدياً' },
    en: { name: 'Challenges Champion', description: 'Conquered 25 practical challenges successfully', condition: 'Complete 25 challenges' },
    fr: { name: 'Champion des Défis', description: 'Vous avez triomphé de 25 défis pratiques', condition: 'Terminer 25 défis' },
    es: { name: 'Campeón de Desafíos', description: 'Superaste 25 desafíos prácticos con maestría', condition: 'Completar 25 desafíos' },
    de: { name: 'Meister der Aufgaben', description: '25 praktische Aufgaben und Challenges gemeistert', condition: '25 Herausforderungen' },
    it: { name: 'Campione delle Sfide', description: 'Hai superato 25 sfide con brillantezza', condition: 'Completa 25 sfide' },
    pt: { name: 'Campeão dos Desafios', description: 'Venceu 25 desafios práticos com excelência', condition: 'Completar 25 desafios' },
    zh: { name: '挑战王者', description: '百炼成钢，已成功战胜并圆满解决 25 项实战命题', condition: '完成 25 个挑战' }
  },
  'challenges-50-completed': {
    ar: { name: 'ملك التحديات', description: 'حققت إنجازاً ضخماً بإكمال 50 تحدياً تطبيقياً كاملاً', condition: 'إكمال 50 تحدياً' },
    ary: { name: 'ملك التحديات', description: 'كملتي 50 تحدي تطبيقي ووصلتي لـ قمة المهارة', condition: 'إكمال 50 تحدياً' },
    en: { name: 'King of Challenges', description: 'Achieved mastery by completing 50 challenges', condition: 'Complete 50 challenges' },
    fr: { name: 'Roi des Défis', description: '50 défis pratiques relevés avec brio', condition: 'Terminer 50 défis' },
    es: { name: 'Rey de los Desafíos', description: '50 desafíos prácticos superados con excelencia', condition: 'Completar 50 desafíos' },
    de: { name: 'König der Challenges', description: 'Großartige Leistung: 50 Challenges abgeschlossen', condition: '50 Herausforderungen' },
    it: { name: 'Re delle Sfide', description: '50 sfide formative portate a termine con maestria', condition: 'Completa 50 sfide' },
    pt: { name: 'Rei dos Desafios', description: 'Marca impressionante de 50 desafios concluídos', condition: 'Completar 50 desafios' },
    zh: { name: '无畏试炼官', description: '无可比拟的实操实力，圆满通关 50 个复杂实操挑战', condition: '完成 50 个挑战' }
  },

  // 5. شارات XP
  'xp-pro-1000': {
    ar: { name: 'محترف', description: 'تجاوزت حاجز 1,000 نقطة خبرة XP وأثبتّ جدارتك المهنية', condition: 'الوصول إلى 1,000 XP' },
    ary: { name: 'محترف', description: 'وصلتي لـ 1,000 نقطة XP وبينتي على احترافية حقيقية', condition: 'الوصول لـ 1,000 XP' },
    en: { name: 'Pro Achiever', description: 'Surpassed 1,000 total experience points', condition: 'Reach 1,000 XP' },
    fr: { name: 'Professionnel', description: 'Vous avez franchi le palier des 1 000 points XP', condition: 'Atteindre 1 000 XP' },
    es: { name: 'Profesional', description: 'Superaste la barrera de los 1.000 puntos XP', condition: 'Alcanzar 1.000 XP' },
    de: { name: 'Profi-Erreichte', description: 'Die 1.000 XP-Marke souverän überschritten', condition: '1.000 XP erreichen' },
    it: { name: 'Professionista', description: 'Hai superato la soglia dei 1.000 punti XP', condition: 'Raggiungi 1.000 XP' },
    pt: { name: 'Profissional', description: 'Ultrapassou a importante marca de 1.000 XP', condition: 'Alcançar 1.000 XP' },
    zh: { name: '千夫之勇', description: '实力进阶，经验值正式突破 1,000 XP 专业大关', condition: '达到 1,000 XP' }
  },
  'xp-expert-2500': {
    ar: { name: 'خبير', description: 'جمعت 2,500 نقطة خبرة XP لتصبح في مصاف نخبة المتعلمين', condition: 'الوصول إلى 2,500 XP' },
    ary: { name: 'خبير', description: 'جمعتي 2,500 نقطة XP وراك من نخبة المنصة', condition: 'الوصول لـ 2,500 XP' },
    en: { name: 'Elite Expert', description: 'Accumulated 2,500 total XP in RikouZone', condition: 'Reach 2,500 XP' },
    fr: { name: 'Expert d’Élite', description: '2 500 points XP accumulés parmi l’élite', condition: 'Atteindre 2 500 XP' },
    es: { name: 'Experto de Élite', description: 'Acumulaste 2.500 puntos XP entre los mejores', condition: 'Alcanzar 2.500 XP' },
    de: { name: 'Elite-Experte', description: '2.500 XP gesammelt und zur Spitzenklasse aufgestiegen', condition: '2.500 XP erreichen' },
    it: { name: 'Esperto d’Élite', description: 'Hai raggiunto 2.500 punti XP entrando nell’élite', condition: 'Raggiungi 2.500 XP' },
    pt: { name: 'Especialista de Elite', description: 'Acumulou 2.500 XP fazendo parte da elite', condition: 'Alcançar 2.500 XP' },
    zh: { name: '登峰大师', description: '斩获 2,500 XP 荣耀值，位列数字化先锋精英序列', condition: '达到 2,500 XP' }
  },
  'xp-legend-5000': {
    ar: { name: 'أسطورة RikouZone', description: 'حطمت حاجز 5,000 XP وبلغت قمة هرم المنجزين', condition: 'الوصول إلى 5,000 XP' },
    ary: { name: 'أسطورة RikouZone', description: 'وصلتي لـ 5,000 نقطة XP وراك أسطورة حقيقية', condition: 'الوصول لـ 5,000 XP' },
    en: { name: 'RikouZone Legend', description: 'Reached the summit of achievement with 5,000 XP', condition: 'Reach 5,000 XP' },
    fr: { name: 'Légende de RikouZone', description: 'Vous avez atteint le sommet ultime avec 5 000 XP', condition: 'Atteindre 5 000 XP' },
    es: { name: 'Leyenda de RikouZone', description: 'Alcanzaste la cima absoluta con 5.000 XP', condition: 'Alcanzar 5.000 XP' },
    de: { name: 'RikouZone-Legende', description: 'Die Spitze mit unglaublichen 5.000 XP erklommen', condition: '5.000 XP erreichen' },
    it: { name: 'Leggenda di RikouZone', description: 'Hai raggiunto la vetta suprema con 5.000 XP', condition: 'Raggiungi 5.000 XP' },
    pt: { name: 'Lenda do RikouZone', description: 'Atingiu o topo absoluto com impressionantes 5.000 XP', condition: 'Alcançar 5.000 XP' },
    zh: { name: 'RikouZone殿堂传奇', description: '傲视群雄突破 5,000 XP 终极天花板，荣登最高殿堂', condition: '达到 5,000 XP' }
  },

  // 6. شارات المسارات (Learning Paths)
  'paths-1-started': {
    ar: { name: 'مستكشف', description: 'بدأت رحلتك في أول مسار تعلّم عملي لاكتساب مهارات حقيقية', condition: 'بدء أول مسار تعلّم' },
    ary: { name: 'مستكشف', description: 'بديتي أول مسار تعليمي وبديتي المغامرة', condition: 'بدء أول مسار تعلّم' },
    en: { name: 'Track Explorer', description: 'Started your first comprehensive learning path', condition: 'Start 1 learning path' },
    fr: { name: 'Explorateur de Parcours', description: 'Vous avez entamé votre premier parcours d’apprentissage', condition: 'Commencer 1 parcours' },
    es: { name: 'Explorador de Rutas', description: 'Comenzaste tu primera ruta de aprendizaje práctica', condition: 'Iniciar 1 ruta de aprendizaje' },
    de: { name: 'Pfad-Entdecker', description: 'Ersten praktischen Lernpfad gestartet', condition: '1 Lernpfad starten' },
    it: { name: 'Esploratore di Percorsi', description: 'Hai iniziato il tuo primo percorso formativo pratico', condition: 'Inizia 1 percorso formativo' },
    pt: { name: 'Explorador de Trilhas', description: 'Iniciou sua primeira trilha completa de aprendizado', condition: 'Iniciar 1 trilha' },
    zh: { name: '拓荒探索者', description: '迈开实务学习步伐，正式开启首条系统化进阶路径', condition: '开始 1 个学习路径' }
  },
  'paths-1-completed': {
    ar: { name: 'على الطريق', description: 'أكملت أول مسار تعلّم بالكامل وأتقنت مهاراته الأساسية', condition: 'إكمال أول مسار' },
    ary: { name: 'على الطريق', description: 'كملتي أول مسار تعليمي كامل من البداية لـ النهاية', condition: 'إكمال أول مسار' },
    en: { name: 'On the Road', description: 'Successfully completed your first full learning path', condition: 'Complete 1 learning path' },
    fr: { name: 'En Route', description: 'Vous avez mené à terme votre premier parcours entier', condition: 'Terminer 1 parcours' },
    es: { name: 'En Marcha', description: 'Completaste con éxito tu primera ruta completa', condition: 'Completar 1 ruta' },
    de: { name: 'Auf dem Weg', description: 'Ersten vollständigen Lernpfad erfolgreich gemeistert', condition: '1 Lernpfad abschließen' },
    it: { name: 'Sulla Buona Strada', description: 'Hai completato il tuo primo intero percorso formativo', condition: 'Completa 1 percorso' },
    pt: { name: 'No Caminho', description: 'Concluiu com êxito sua primeira trilha de aprendizado', condition: 'Completar 1 trilha' },
    zh: { name: '通权达道', description: '首战告捷，完整学成并收官首条数字化业务实战路径', condition: '完成 1 个学习路径' }
  },
  'paths-3-completed': {
    ar: { name: 'متعدد المهارات', description: 'أتممت 3 مسارات كاملة لتجمع بين مهارات رقمية متكاملة', condition: 'إكمال 3 مسارات' },
    ary: { name: 'متعدد المهارات', description: 'كملتي 3 مسارات كاملة وجمعتي مهارات قوية', condition: 'إكمال 3 مسارات' },
    en: { name: 'Multi-Skilled', description: 'Completed 3 full learning paths across disciplines', condition: 'Complete 3 learning paths' },
    fr: { name: 'Polyvalent', description: 'Vous avez terminé 3 parcours complets et diversifiés', condition: 'Terminer 3 parcours' },
    es: { name: 'Multidisciplinar', description: 'Completaste 3 rutas completas ampliando tu visión', condition: 'Completar 3 rutas' },
    de: { name: 'Vielseitig Begabt', description: '3 vollständige Lernpfade disziplinübergreifend abgeschlossen', condition: '3 Lernpfade abschließen' },
    it: { name: 'Multicompetente', description: 'Hai completato 3 percorsi formativi integrati', condition: 'Completa 3 percorsi' },
    pt: { name: 'Multidisciplinar', description: 'Concluiu 3 trilhas completas com habilidades integradas', condition: 'Completar 3 trilhas' },
    zh: { name: '多维博采', description: '跨越界限，融会贯通完成 3 大全景业务学习路径', condition: '完成 3 个学习路径' }
  },
  'paths-5-completed': {
    ar: { name: 'متخصص', description: 'أنهيت 5 مسارات تعلّم شاملة وأصبحت محترفاً في مجالك', condition: 'إكمال 5 مسارات' },
    ary: { name: 'متخصص', description: 'كملتي 5 مسارات شاملة ووليتي متخصص بصح', condition: 'إكمال 5 مسارات' },
    en: { name: 'Specialist', description: 'Mastered 5 complete learning tracks in RikouZone', condition: 'Complete 5 learning paths' },
    fr: { name: 'Spécialiste', description: 'Vous maîtrisez désormais 5 parcours entiers', condition: 'Terminer 5 parcours' },
    es: { name: 'Especialista', description: 'Dominas 5 rutas completas con gran solidez', condition: 'Completar 5 rutas' },
    de: { name: 'Spezialist', description: '5 vollständige Lernpfade souverän gemeistert', condition: '5 Lernpfade abschließen' },
    it: { name: 'Specialista', description: 'Padroneggi 5 percorsi formativi approfonditi', condition: 'Completa 5 percorsi' },
    pt: { name: 'Especialista', description: 'Dominou 5 trilhas completas com profundo conhecimento', condition: 'Completar 5 trilhas' },
    zh: { name: '专精行家', description: '深度通关 5 大完整商业赛道，建立稳健的专业壁垒', condition: '完成 5 个学习路径' }
  },
  'paths-10-completed': {
    ar: { name: 'سيد المسارات', description: 'حققت إنجازاً مبهراً بإكمال 10 مسارات تعلّم مختلفة', condition: 'إكمال 10 مسارات' },
    ary: { name: 'سيد المسارات', description: 'كملتي 10 مسارات تعليمية فـ المنصة — إنجاز تاريخي', condition: 'إكمال 10 مسارات' },
    en: { name: 'Master of Tracks', description: 'Completed 10 full learning tracks across the platform', condition: 'Complete 10 learning paths' },
    fr: { name: 'Maître des Parcours', description: '10 parcours complets validés : un niveau magistral', condition: 'Terminer 10 parcours' },
    es: { name: 'Maestro de Rutas', description: '10 rutas completas finalizadas: nivel magistral', condition: 'Completar 10 rutas' },
    de: { name: 'Meister aller Pfade', description: 'Großartige Leistung: 10 komplette Lernpfade gemeistert', condition: '10 Lernpfade abschließen' },
    it: { name: 'Maestro dei Percorsi', description: 'Hai completato 10 percorsi formativi con maestria', condition: 'Completa 10 percorsi' },
    pt: { name: 'Mestre das Trilhas', description: 'Concluiu 10 trilhas completas: patamar magistral', condition: 'Completar 10 trilhas' },
    zh: { name: '十道宗师', description: '兼收并蓄通晓 10 条完整知识路径，成为无可争议的综合导师', condition: '完成 10 个学习路径' }
  },

  // 7. شارات الإنجازات الخاصة (Special Achievements)
  'quiz-perfect-score': {
    ar: { name: 'دقة عالية', description: 'أحرزت العلامة الكاملة في اختبار قصير دون أي خطأ', condition: 'نتيجة كاملة في اختبار' },
    ary: { name: 'دقة عالية', description: 'جبتي النقطة الكاملة فـ كويز بلا حتى غلط', condition: 'نتيجة كاملة في اختبار' },
    en: { name: 'High Precision', description: 'Achieved a 100% perfect score on an educational quiz', condition: 'Perfect score on a quiz' },
    fr: { name: 'Haute Précision', description: 'Score parfait de 100% obtenu à un quiz éducatif', condition: 'Score parfait à un quiz' },
    es: { name: 'Alta Precisión', description: 'Puntuación perfecta del 100% en un cuestionario', condition: 'Puntuación perfecta en quiz' },
    de: { name: 'Höchste Präzision', description: '100% fehlerfreie Punktzahl in einem Quiz erzielt', condition: 'Perfekte Quizpunktzahl' },
    it: { name: 'Alta Precisione', description: 'Punteggio perfetto del 100% ottenuto in un quiz', condition: 'Punteggio perfetto in un quiz' },
    pt: { name: 'Alta Precisão', description: 'Pontuação perfeita de 100% em um quiz educativo', condition: 'Nota 100% em um quiz' },
    zh: { name: '精益求精', description: '在小测验中一题不错，以 100% 满分答卷完美通关', condition: '小测验取得满分' }
  },
  'badges-collector-10': {
    ar: { name: 'جامع الشارات', description: 'جمعت 10 شارات تميز مختلفة لتثبت تنوع إنجازاتك', condition: 'الحصول على 10 شارات مختلفة' },
    ary: { name: 'جامع الشارات', description: 'جمعتي 10 شارات مختلفة وبينتي على تنوع الإنجازات', condition: 'الحصول على 10 شارات مختلفة' },
    en: { name: 'Badge Collector', description: 'Unlocked 10 distinct achievement badges', condition: 'Earn 10 different badges' },
    fr: { name: 'Collectionneur de Badges', description: '10 badges d’excellence différents débloqués', condition: 'Obtenir 10 badges différents' },
    es: { name: 'Coleccionista de Insignias', description: 'Desbloqueaste 10 insignias de logros distintas', condition: 'Obtener 10 insignias' },
    de: { name: 'Abzeichensammler', description: '10 unterschiedliche Leistungsabzeichen freigeschaltet', condition: '10 Abzeichen freischalten' },
    it: { name: 'Collezionista di Badge', description: 'Hai sbloccato 10 badge di eccellenza distinti', condition: 'Ottieni 10 badge diversi' },
    pt: { name: 'Colecionador de Emblemas', description: 'Desbloqueou 10 emblemas de conquistas diferentes', condition: 'Obter 10 emblemas' },
    zh: { name: '荣耀徽章收藏家', description: '在 RikouZone 累计解锁点亮 10 枚代表不同成就的勋章', condition: '获得 10 枚勋章' }
  }
};

/**
 * Returns localized name, description, and condition for any badge across all 9 languages
 */
export function getLocalizedBadge(badge: BadgeItem, language: Language): LocalizedBadgeData {
  const loc = BADGE_LOCALIZATIONS[badge.id]?.[language];
  if (loc) return loc;

  // Fallbacks
  if (language === 'ar' || language === 'ary') {
    return {
      name: badge.nameAr || badge.name,
      description: badge.descriptionAr || badge.description,
      condition: badge.requiredCondition
    };
  }

  return {
    name: badge.name,
    description: badge.description,
    condition: BADGE_LOCALIZATIONS[badge.id]?.en?.condition || badge.requiredCondition
  };
}
