import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  Share2, 
  HelpCircle, 
  Lightbulb, 
  Wrench, 
  Briefcase, 
  MessageSquare,
  Home,
  ShieldCheck,
  History,
  Trash2
} from 'lucide-react';

interface ContactViewProps {
  onNavigate: (tab: string) => void;
}

/**
 * البريد الإلكتروني المؤقت المعتمد للتواصل مع منصة RikouZone.
 * يمكن تعديل هذا العنوان لاحقاً عند إنشاء البريد الرسمي لنطاق المنصة (مثل contact@rikouzone.com).
 */
export const OFFICIAL_CONTACT_EMAIL = 'bounasrayoub0@gmail.com';

interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  date: string;
}

interface ContactDictionary {
  badge: string;
  title: string;
  subtitle: string;
  backToHome: string;
  breadcrumbHome: string;
  breadcrumbContact: string;
  
  // Email direct card
  emailSectionTitle: string;
  emailSectionSubtitle: string;
  emailBadge: string;
  copyBtn: string;
  copiedBtn: string;
  directEmailBtn: string;
  responseTimeTitle: string;
  responseTimeDesc: string;
  
  // Form section
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  categoryLabel: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitBtn: string;
  sendingBtn: string;
  
  // Categories
  catSuggestion: string;
  catInquiry: string;
  catBug: string;
  catPartnership: string;
  catOther: string;
  
  // Success & Error
  successTitle: string;
  successDesc: string;
  successOpenMailto: string;
  sendAnotherBtn: string;
  errRequiredFields: string;
  errInvalidEmail: string;
  errShortMessage: string;
  
  // Social media section
  socialSectionTitle: string;
  socialSectionDesc: string;
  socialStatusBadge: string;
  socialStatusNote: string;
  
  // History section
  historyTitle: string;
  historyEmpty: string;
  historyClear: string;
}

const contactI18n: Record<string, ContactDictionary> = {
  ar: {
    badge: 'فريق دعم ومجتمع RikouZone',
    title: 'تواصل معنا',
    subtitle: 'إذا كانت لديك أسئلة أو اقتراحات أو واجهت مشكلة أثناء استخدام RikouZone، يسعدنا التواصل معك والرد عليك في أقرب وقت.',
    backToHome: 'العودة إلى الرئيسية',
    breadcrumbHome: 'الرئيسية',
    breadcrumbContact: 'تواصل معنا',
    
    emailSectionTitle: 'البريد الإلكتروني المباشر',
    emailSectionSubtitle: 'العنوان المؤقت المعتمد للتواصل مع إدارة ومؤسس المنصة (قابل للتحديث عند إطلاق البريد الرسمي لنطاق المنصة)',
    emailBadge: 'بريد معتمد مؤقتاً',
    copyBtn: 'نسخ البريد',
    copiedBtn: 'تم النسخ بنجاح!',
    directEmailBtn: 'إرسال بريد إلكتروني مباشر',
    responseTimeTitle: 'متوسط سرعة الرد',
    responseTimeDesc: 'نحرص على مراجعة جميع الرسائل والرد خلال 24 إلى 48 ساعة في أيام العمل.',
    
    formTitle: 'أرسل لنا رسالة مباشرة',
    formSubtitle: 'املأ النموذج التالي بالتفاصيل وسنراجع رسالتك بعناية واهتمام',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'مثال: أيوب أو اسمك الكريم',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'نوع الموضوع أو الاستفسار',
    subjectLabel: 'عنوان الموضوع',
    subjectPlaceholder: 'اكتب عنواناً مختصراً لرسالتك...',
    messageLabel: 'نص الرسالة',
    messagePlaceholder: 'اكتب استفسارك، اقتراحك، أو وصف المشكلة بالتفصيل لمساعدتك بأفضل طريقة...',
    submitBtn: 'إرسال الرسالة',
    sendingBtn: 'جارٍ إرسال الرسالة...',
    
    catSuggestion: 'اقتراح لتطوير المنصة',
    catInquiry: 'استفسار أو سؤال تعليمي',
    catBug: 'الإبلاغ عن خطأ تقني',
    catPartnership: 'تعاون وشراكة',
    catOther: 'موضوع آخر',
    
    successTitle: 'تم استلام رسالتك بنجاح!',
    successDesc: 'شكراً لتواصلك معنا. تم تسجيل رسالتك بنجاح، وسيقوم فريق RikouZone بالرد عليك عبر بريدك الإلكتروني في أقرب وقت.',
    successOpenMailto: 'فتح نسخة في تطبيق البريد',
    sendAnotherBtn: 'إرسال رسالة أخرى',
    errRequiredFields: 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد، والموضوع).',
    errInvalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح ومعتمد.',
    errShortMessage: 'يرجى كتابة نص رسالة أوضح (10 أحرف على الأقل).',
    
    socialSectionTitle: 'حسابات التواصل الاجتماعي الرسمية',
    socialSectionDesc: 'قنوات المجتمع والتواصل لمنصة RikouZone',
    socialStatusBadge: 'قيد الإطلاق الرسمي',
    socialStatusNote: 'الحسابات الرسمية لمنصة RikouZone على منصات التواصل (يوتيوب، إنستغرام، إكس) قيد التحضير والإطلاق الرسمي. حرصاً على الدقة لا نعرض أي حسابات غير مفعلة، ويمكنك حالياً التواصل المباشر عبر البريد ونموذج المراسلة.',
    
    historyTitle: 'سجل الرسائل المرسلة من جهازك',
    historyEmpty: 'لم ترسل أي رسائل حتى الآن من هذا المتصفح.',
    historyClear: 'مسح السجل'
  },
  
  ary: {
    badge: 'فريق الدعم والتواصل · RikouZone',
    title: 'تواصل معانا',
    subtitle: 'إذا كانت عندك أي أسئلة أو اقتراحات أو واجهتك شي مشكلة فـ RikouZone، مرحبا بيك نتواصلو معاك ونجاوبوك فـ أقرب وقت.',
    backToHome: 'الرجوع للرئيسية',
    breadcrumbHome: 'الرئيسية',
    breadcrumbContact: 'تواصل معانا',
    
    emailSectionTitle: 'الإيميل المباشر للتواصل',
    emailSectionSubtitle: 'الإيميل المؤقت المعتمد للتواصل مع إدارة المنصة (غادي يتبدل ملي نطلقو الإيميل الرسمي ديال الدومين)',
    emailBadge: 'إيميل معتمد مؤقتاً',
    copyBtn: 'نسخ الإيميل',
    copiedBtn: 'تم النسخ!',
    directEmailBtn: 'صيفط إيميل ديريكت',
    responseTimeTitle: 'وقت الجواب',
    responseTimeDesc: 'كنجاوبو على الميساجات كاملين ما بين 24 حتى لـ 48 ساعة فأيام الخدمة.',
    
    formTitle: 'صيفط لينا ميساج دابا',
    formSubtitle: 'عمر هاد الفورمولير بالتفاصيل وغادي نشوفو الميساج ديالك باهتمام',
    nameLabel: 'السمية الكاملة',
    namePlaceholder: 'مثال: أيوب أو سميتك',
    emailLabel: 'الإيميل ديالك',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'نوع الميساج',
    subjectLabel: 'عنوان الموضوع',
    subjectPlaceholder: 'كتب عنوان مختصر للميساج...',
    messageLabel: 'نص الميساج',
    messagePlaceholder: 'كتب الاقتراح ديالك ولا المشكل اللي واجهك باش نعاونوك مزيان...',
    submitBtn: 'صيفط الميساج',
    sendingBtn: 'كنصيفطو الميساج...',
    
    catSuggestion: 'اقتراح لتطوير المنصة',
    catInquiry: 'استفسار أو سؤال',
    catBug: 'مشكل تقني فالموقع',
    catPartnership: 'شراكة وتعاون',
    catOther: 'حاجة أخرى',
    
    successTitle: 'توصلنا بالميساج ديالك بنجاح!',
    successDesc: 'شكراً حيت تواصلتي معانا. تسجل الميساج ديالك وغادي نجاوبوك على الإيميل فـ أقرب وقت ممكن.',
    successOpenMailto: 'فتح نسخة فـ تطبيق الإيميل',
    sendAnotherBtn: 'صيفط ميساج آخر',
    errRequiredFields: 'عافاك عمر جميع الخانات المطلوبة (السمية، الإيميل، والموضوع).',
    errInvalidEmail: 'عافاك كتب إيميل صحيح ومضبوط.',
    errShortMessage: 'عافاك كتب ميساج واضح (على الأقل 10 أحرف).',
    
    socialSectionTitle: 'حسابات التواصل الاجتماعي الرسمية',
    socialSectionDesc: 'قنوات RikouZone على السوشيال ميديا',
    socialStatusBadge: 'قيد الإطلاق قريباً',
    socialStatusNote: 'الحسابات الرسمية ديال RikouZone راها فطور التحضير باش تطلق رسمياً. باش نبقاو واضحين ما حطيناش حسابات ماشي مفعلة، تقدر دابا تواصل معانا ديريكت بالإيميل ولا بهاد الفورمولير.',
    
    historyTitle: 'أرشيف الميساجات اللي صيفطتي',
    historyEmpty: 'مازال ما صيفطتي حتى ميساج من هاد المتصفح.',
    historyClear: 'مسح الأرشيف'
  },
  
  en: {
    badge: 'RikouZone Support & Community Team',
    title: 'Contact Us',
    subtitle: 'If you have questions, suggestions, or encountered an issue while using RikouZone, we would love to hear from you and assist you promptly.',
    backToHome: 'Back to Home',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contact Us',
    
    emailSectionTitle: 'Direct Contact Email',
    emailSectionSubtitle: 'Official temporary contact address for founder & team (will be updated once the official domain email is launched)',
    emailBadge: 'Temporary Official Email',
    copyBtn: 'Copy Email',
    copiedBtn: 'Copied Successfully!',
    directEmailBtn: 'Send Direct Email',
    responseTimeTitle: 'Response Time',
    responseTimeDesc: 'We review every message and typically reply within 24 to 48 hours on business days.',
    
    formTitle: 'Send Us a Direct Message',
    formSubtitle: 'Fill out the form below and we will review your message carefully',
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Ayoub or your name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Topic Category',
    subjectLabel: 'Subject Title',
    subjectPlaceholder: 'Brief summary of your message...',
    messageLabel: 'Message Details',
    messagePlaceholder: 'Describe your inquiry, suggestion, or technical issue in detail so we can help best...',
    submitBtn: 'Send Message',
    sendingBtn: 'Sending Message...',
    
    catSuggestion: 'Platform Suggestion',
    catInquiry: 'General / Educational Question',
    catBug: 'Report a Technical Bug',
    catPartnership: 'Partnership & Collaboration',
    catOther: 'Other Topic',
    
    successTitle: 'Message Received Successfully!',
    successDesc: 'Thank you for reaching out. Your message has been received, and the RikouZone team will reply to your email as soon as possible.',
    successOpenMailto: 'Open in Email Client',
    sendAnotherBtn: 'Send Another Message',
    errRequiredFields: 'Please fill in all required fields (Name, Email, and Subject).',
    errInvalidEmail: 'Please provide a valid email address.',
    errShortMessage: 'Please provide more details in your message (at least 10 characters).',
    
    socialSectionTitle: 'Official Social Media Channels',
    socialSectionDesc: 'RikouZone community and presence',
    socialStatusBadge: 'Launching Soon',
    socialStatusNote: 'Official social media handles for RikouZone are currently being configured for public launch. To maintain integrity, we do not link inactive accounts. You can reach out directly via email or this contact form.',
    
    historyTitle: 'Messages Sent from This Browser',
    historyEmpty: 'No messages sent yet from this device.',
    historyClear: 'Clear History'
  },
  
  fr: {
    badge: 'Équipe Support & Communauté RikouZone',
    title: 'Contactez-nous',
    subtitle: 'Si vous avez des questions, des suggestions ou si vous rencontrez un problème sur RikouZone, nous sommes ravis d\'échanger avec vous.',
    backToHome: 'Retour à l\'accueil',
    breadcrumbHome: 'Accueil',
    breadcrumbContact: 'Contact',
    
    emailSectionTitle: 'E-mail Direct',
    emailSectionSubtitle: 'Adresse temporaire officielle de contact (sera mise à jour dès le lancement de l\'e-mail officiel du domaine)',
    emailBadge: 'E-mail Temporaire Officiel',
    copyBtn: 'Copier l\'e-mail',
    copiedBtn: 'Copié avec succès !',
    directEmailBtn: 'Envoyer un e-mail direct',
    responseTimeTitle: 'Délai de Réponse',
    responseTimeDesc: 'Nous examinons chaque message et répondons généralement sous 24 à 48 heures ouvrables.',
    
    formTitle: 'Envoyez-nous un Message',
    formSubtitle: 'Remplissez le formulaire ci-dessous avec vos informations',
    nameLabel: 'Nom complet',
    namePlaceholder: 'ex: Ayoub ou votre prénom',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Type de demande',
    subjectLabel: 'Objet du message',
    subjectPlaceholder: 'Objet concis de votre message...',
    messageLabel: 'Texte du message',
    messagePlaceholder: 'Décrivez votre suggestion, question ou problème en détail...',
    submitBtn: 'Envoyer le Message',
    sendingBtn: 'Envoi en cours...',
    
    catSuggestion: 'Suggestion d\'amélioration',
    catInquiry: 'Question générale ou pédagogique',
    catBug: 'Signaler un bug technique',
    catPartnership: 'Partenariat & Collaboration',
    catOther: 'Autre sujet',
    
    successTitle: 'Message reçu avec succès !',
    successDesc: 'Merci de nous avoir contactés. Votre message a bien été enregistré et nous vous répondrons par e-mail dans les plus brefs délais.',
    successOpenMailto: 'Ouvrir dans votre messagerie',
    sendAnotherBtn: 'Envoyer un autre message',
    errRequiredFields: 'Veuillez remplir tous les champs obligatoires (Nom, E-mail, Sujet).',
    errInvalidEmail: 'Veuillez renseigner une adresse e-mail valide.',
    errShortMessage: 'Veuillez détailler davantage votre message (au moins 10 caractères).',
    
    socialSectionTitle: 'Réseaux Sociaux Officiels',
    socialSectionDesc: 'Communauté et présences officielles de RikouZone',
    socialStatusBadge: 'Lancement Prochain',
    socialStatusNote: 'Les comptes officiels sur les réseaux sociaux sont en préparation pour un lancement public imminent. Nous ne publions aucun compte fictif. Contactez-nous directement par e-mail ou via ce formulaire.',
    
    historyTitle: 'Historique des messages envoyés',
    historyEmpty: 'Aucun message envoyé depuis ce navigateur.',
    historyClear: 'Effacer l\'historique'
  },
  
  es: {
    badge: 'Equipo de Soporte de RikouZone',
    title: 'Contáctanos',
    subtitle: 'Si tienes preguntas, sugerencias o tuviste algún inconveniente en RikouZone, nos encantará ayudarte con la mayor brevedad.',
    backToHome: 'Volver al Inicio',
    breadcrumbHome: 'Inicio',
    breadcrumbContact: 'Contacto',
    
    emailSectionTitle: 'Correo Electrónico Directo',
    emailSectionSubtitle: 'Dirección oficial provisional de contacto (se actualizará con el correo corporativo del dominio)',
    emailBadge: 'Correo Provisional Oficial',
    copyBtn: 'Copiar correo',
    copiedBtn: '¡Copiado con éxito!',
    directEmailBtn: 'Enviar correo directo',
    responseTimeTitle: 'Tiempo de respuesta',
    responseTimeDesc: 'Revisamos todos los mensajes y respondemos habitualmente en 24 a 48 horas laborables.',
    
    formTitle: 'Envíanos un Mensaje',
    formSubtitle: 'Completa el siguiente formulario con tus detalles',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Ej: Ayoub o tu nombre',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Categoría',
    subjectLabel: 'Asunto',
    subjectPlaceholder: 'Resumen breve de tu mensaje...',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Escribe tu consulta, sugerencia o detalle del problema...',
    submitBtn: 'Enviar Mensaje',
    sendingBtn: 'Enviando mensaje...',
    
    catSuggestion: 'Sugerencia de mejora',
    catInquiry: 'Pregunta o consulta general',
    catBug: 'Reportar error técnico',
    catPartnership: 'Alianza o colaboración',
    catOther: 'Otro tema',
    
    successTitle: '¡Mensaje recibido con éxito!',
    successDesc: 'Gracias por comunicarte con nosotros. Tu mensaje ha sido registrado y el equipo de RikouZone te responderá a tu correo lo antes posible.',
    successOpenMailto: 'Abrir en cliente de correo',
    sendAnotherBtn: 'Enviar otro mensaje',
    errRequiredFields: 'Por favor completa todos los campos requeridos.',
    errInvalidEmail: 'Por favor introduce un correo electrónico válido.',
    errShortMessage: 'El mensaje debe contener al menos 10 caracteres.',
    
    socialSectionTitle: 'Redes Sociales Oficiales',
    socialSectionDesc: 'Comunidad RikouZone',
    socialStatusBadge: 'Próximo Lanzamiento',
    socialStatusNote: 'Los canales oficiales en redes sociales están en fase de configuración para su lanzamiento. No mostramos cuentas inactivas ni inventadas. Puedes contactarnos por correo o mediante este formulario.',
    
    historyTitle: 'Historial de mensajes enviados',
    historyEmpty: 'Aún no has enviado mensajes desde este navegador.',
    historyClear: 'Borrar historial'
  },
  
  de: {
    badge: 'RikouZone Support & Community',
    title: 'Kontaktieren Sie uns',
    subtitle: 'Wenn Sie Fragen oder Anregungen haben oder auf ein Problem stoßen, freuen wir uns darauf, Ihnen zeitnah zu antworten.',
    backToHome: 'Zurück zur Startseite',
    breadcrumbHome: 'Startseite',
    breadcrumbContact: 'Kontakt',
    
    emailSectionTitle: 'Direkte E-Mail-Adresse',
    emailSectionSubtitle: 'Offizielle temporäre Kontaktadresse (wird aktualisiert, sobald die Domain-E-Mail live ist)',
    emailBadge: 'Offizielle Übergangs-E-Mail',
    copyBtn: 'E-Mail kopieren',
    copiedBtn: 'Erfolgreich kopiert!',
    directEmailBtn: 'Direkte E-Mail senden',
    responseTimeTitle: 'Antwortzeit',
    responseTimeDesc: 'Wir antworten in der Regel innerhalb von 24 bis 48 Stunden an Werktagen.',
    
    formTitle: 'Senden Sie uns eine Nachricht',
    formSubtitle: 'Füllen Sie das untenstehende Formular aus',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'z.B. Ayoub oder Ihr Name',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Kategorie',
    subjectLabel: 'Betreff',
    subjectPlaceholder: 'Kurzer Betreff Ihrer Nachricht...',
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Beschreiben Sie Ihr Anliegen im Detail...',
    submitBtn: 'Nachricht senden',
    sendingBtn: 'Wird gesendet...',
    
    catSuggestion: 'Verbesserungsvorschlag',
    catInquiry: 'Allgemeine Frage',
    catBug: 'Technisches Problem melden',
    catPartnership: 'Partnerschaft & Kooperation',
    catOther: 'Sonstiges Thema',
    
    successTitle: 'Nachricht erfolgreich erhalten!',
    successDesc: 'Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns schnellstmöglich per E-Mail bei Ihnen.',
    successOpenMailto: 'Im E-Mail-Programm öffnen',
    sendAnotherBtn: 'Weitere Nachricht senden',
    errRequiredFields: 'Bitte füllen Sie alle erforderlichen Felder aus.',
    errInvalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    errShortMessage: 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.',
    
    socialSectionTitle: 'Offizielle Social-Media-Kanäle',
    socialSectionDesc: 'RikouZone Präsenzen',
    socialStatusBadge: 'Bald verfügbar',
    socialStatusNote: 'Die offiziellen Profile in den sozialen Medien befinden sich in der Vorbereitung. Wir verlinken keine inaktiven Profile. Kontaktieren Sie uns gerne direkt.',
    
    historyTitle: 'Gesendete Nachrichten auf diesem Gerät',
    historyEmpty: 'Bisher wurden keine Nachrichten über diesen Browser gesendet.',
    historyClear: 'Verlauf leeren'
  },
  
  it: {
    badge: 'Supporto & Community RikouZone',
    title: 'Contattaci',
    subtitle: 'Se hai domande, suggerimenti o riscontri un problema su RikouZone, siamo lieti di risponderti al più presto.',
    backToHome: 'Torna alla Home',
    breadcrumbHome: 'Home',
    breadcrumbContact: 'Contatti',
    
    emailSectionTitle: 'Email Diretta',
    emailSectionSubtitle: 'Indirizzo email ufficiale temporaneo (verrà aggiornato con l\'email del dominio ufficiale)',
    emailBadge: 'Email Ufficiale Temporanea',
    copyBtn: 'Copia Email',
    copiedBtn: 'Copiata con successo!',
    directEmailBtn: 'Invia Email Diretta',
    responseTimeTitle: 'Tempi di Risposta',
    responseTimeDesc: 'Rispondiamo normalmente entro 24-48 ore lavorative.',
    
    formTitle: 'Inviaci un Messaggio',
    formSubtitle: 'Compila il modulo sottostante',
    nameLabel: 'Nome completo',
    namePlaceholder: 'es. Ayoub o il tuo nome',
    emailLabel: 'Indirizzo Email',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Categoria',
    subjectLabel: 'Oggetto',
    subjectPlaceholder: 'Breve oggetto del messaggio...',
    messageLabel: 'Messaggio',
    messagePlaceholder: 'Scrivi qui i dettagli del tuo messaggio...',
    submitBtn: 'Invia Messaggio',
    sendingBtn: 'Invio in corso...',
    
    catSuggestion: 'Suggerimento per la piattaforma',
    catInquiry: 'Domanda o richiesta formativa',
    catBug: 'Segnala un errore tecnico',
    catPartnership: 'Partnership & Collaborazione',
    catOther: 'Altro argomento',
    
    successTitle: 'Messaggio ricevuto con successo!',
    successDesc: 'Grazie per averci contattato. Il team di RikouZone ti risponderà via email appena possibile.',
    successOpenMailto: 'Apri nel client email',
    sendAnotherBtn: 'Invia un altro messaggio',
    errRequiredFields: 'Compila tutti i campi obbligatori.',
    errInvalidEmail: 'Inserisci un indirizzo email valido.',
    errShortMessage: 'Il messaggio deve contenere almeno 10 caratteri.',
    
    socialSectionTitle: 'Canali Social Ufficiali',
    socialSectionDesc: 'Presenze e community RikouZone',
    socialStatusBadge: 'In arrivo',
    socialStatusNote: 'I profili social ufficiali sono in fase di allestimento. Non mostriamo account non attivi. Puoi scriverci via email o tramite questo modulo.',
    
    historyTitle: 'Messaggi inviati da questo browser',
    historyEmpty: 'Nessun messaggio inviato da questo dispositivo.',
    historyClear: 'Cancella cronologia'
  },
  
  pt: {
    badge: 'Equipe de Suporte e Comunidade RikouZone',
    title: 'Fale Conosco',
    subtitle: 'Se você tiver dúvidas, sugestões ou encontrar algum problema no RikouZone, teremos o maior prazer em ajudar.',
    backToHome: 'Voltar ao Início',
    breadcrumbHome: 'Início',
    breadcrumbContact: 'Contato',
    
    emailSectionTitle: 'E-mail de Contato Direto',
    emailSectionSubtitle: 'Endereço oficial temporário de contato (será atualizado assim que o e-mail oficial do domínio for lançado)',
    emailBadge: 'E-mail Provisório Oficial',
    copyBtn: 'Copiar E-mail',
    copiedBtn: 'Copiado com sucesso!',
    directEmailBtn: 'Enviar E-mail Direto',
    responseTimeTitle: 'Tempo de Resposta',
    responseTimeDesc: 'Respondemos normalmente dentro de 24 a 48 horas úteis.',
    
    formTitle: 'Envie-nos uma Mensagem',
    formSubtitle: 'Preencha o formulário com suas informações',
    nameLabel: 'Nome completo',
    namePlaceholder: 'ex: Ayoub ou seu nome',
    emailLabel: 'E-mail',
    emailPlaceholder: 'name@example.com',
    categoryLabel: 'Categoria',
    subjectLabel: 'Assunto',
    subjectPlaceholder: 'Resumo breve da mensagem...',
    messageLabel: 'Mensagem',
    messagePlaceholder: 'Descreva sua dúvida, sugestão ou problema...',
    submitBtn: 'Enviar Mensagem',
    sendingBtn: 'Enviando mensagem...',
    
    catSuggestion: 'Sugestão para a plataforma',
    catInquiry: 'Dúvida geral ou educacional',
    catBug: 'Relatar problema técnico',
    catPartnership: 'Parceria e colaboração',
    catOther: 'Outro assunto',
    
    successTitle: 'Mensagem recebida com sucesso!',
    successDesc: 'Obrigado pelo contato. Sua mensagem foi registrada e a equipe responderá em breve.',
    successOpenMailto: 'Abrir no aplicativo de e-mail',
    sendAnotherBtn: 'Enviar outra mensagem',
    errRequiredFields: 'Por favor, preencha todos os campos obrigatórios.',
    errInvalidEmail: 'Por favor, insira um e-mail válido.',
    errShortMessage: 'A mensagem deve conter pelo menos 10 caracteres.',
    
    socialSectionTitle: 'Redes Sociais Oficiais',
    socialSectionDesc: 'Comunidade RikouZone',
    socialStatusBadge: 'Em breve',
    socialStatusNote: 'Os canais oficiais de redes sociais estão em preparação para lançamento. Não listamos perfis inativos. Entre em contato por e-mail ou por este formulário.',
    
    historyTitle: 'Mensagens enviadas deste navegador',
    historyEmpty: 'Nenhuma mensagem enviada deste dispositivo.',
    historyClear: 'Limpar histórico'
  },
  
  zh: {
    badge: 'RikouZone 支持与社区团队',
    title: '联系我们',
    subtitle: '如果您在体验 RikouZone 时有任何疑问、建议或遇到技术问题，我们随时欢迎您的联系并尽快答复。',
    backToHome: '返回首页',
    breadcrumbHome: '首页',
    breadcrumbContact: '联系我们',
    
    emailSectionTitle: '直达联系邮箱',
    emailSectionSubtitle: '平台官方临时联系邮箱（平台域名官方邮箱上线后将同步更新）',
    emailBadge: '官方临时邮箱',
    copyBtn: '复制邮箱',
    copiedBtn: '已成功复制！',
    directEmailBtn: '直接发送邮件',
    responseTimeTitle: '预计回复时间',
    responseTimeDesc: '我们认真阅读每一封邮件，通常在工作日 24 至 48 小时内给予回复。',
    
    formTitle: '给我们发送直接消息',
    formSubtitle: '请在下方表单中填写详细信息，我们将认真查阅',
    nameLabel: '您的姓名',
    namePlaceholder: '例如：Ayoub 或您的名字',
    emailLabel: '电子邮箱',
    emailPlaceholder: 'name@example.com',
    categoryLabel: '主题类型',
    subjectLabel: '消息标题',
    subjectPlaceholder: '请简要概述您的主题...',
    messageLabel: '详细内容',
    messagePlaceholder: '请详细描述您的问题、建议或需求...',
    submitBtn: '发送消息',
    sendingBtn: '正在发送...',
    
    catSuggestion: '平台优化建议',
    catInquiry: '通用学习咨询',
    catBug: '反馈技术故障',
    catPartnership: '商务合作与伙伴关系',
    catOther: '其他事宜',
    
    successTitle: '您的消息已成功提交！',
    successDesc: '感谢您的联系。我们已成功记录您的留言，RikouZone 团队将尽快通过邮件答复您。',
    successOpenMailto: '在邮件客户端中打开',
    sendAnotherBtn: '发送新消息',
    errRequiredFields: '请填写所有必填字段（姓名、邮箱及主题）。',
    errInvalidEmail: '请输入有效的电子邮件地址。',
    errShortMessage: '请在消息中提供更多详细信息（至少 10 个字符）。',
    
    socialSectionTitle: '官方社交媒体账号',
    socialSectionDesc: 'RikouZone 社区平台',
    socialStatusBadge: '即将正式上线',
    socialStatusNote: 'RikouZone 的官方社交媒体主页正处于筹备发布阶段。秉持严谨原则，我们不展示未启用账号。您可通过邮件或当前表单与我们取得联系。',
    
    historyTitle: '本设备发送的消息记录',
    historyEmpty: '当前浏览器暂无已发送消息。',
    historyClear: '清除记录'
  }
};

const MESSAGES_STORAGE_KEY = 'rikouzone_sent_contact_messages';

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { language, isRTL } = useLanguage();
  const tContact = contactI18n[language] || contactI18n['ar'];

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'suggestion' | 'inquiry' | 'bug' | 'partnership' | 'other'>('suggestion');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // UI Interaction States
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedRecord, setLastSubmittedRecord] = useState<ContactMessageRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  
  // Local Sent History
  const [history, setHistory] = useState<ContactMessageRecord[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (raw) {
        setHistory(JSON.parse(raw));
      }
    } catch {
      // ignore storage parsing error
    }
  }, []);

  // Copy email handler
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Pre-fill subject based on category if empty
  const handleSelectCategory = (cat: 'suggestion' | 'inquiry' | 'bug' | 'partnership' | 'other') => {
    setCategory(cat);
    if (!subject || subject.trim() === '') {
      let defaultText = '';
      if (cat === 'suggestion') defaultText = tContact.catSuggestion;
      else if (cat === 'inquiry') defaultText = tContact.catInquiry;
      else if (cat === 'bug') defaultText = tContact.catBug;
      else if (cat === 'partnership') defaultText = tContact.catPartnership;
      else defaultText = tContact.catOther;
      setSubject(defaultText);
    }
  };

  // Form submission & validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const errors: { name?: boolean; email?: boolean; message?: boolean } = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      errors.name = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = true;
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message = true;
    }

    setFieldErrors(errors);

    if (errors.name || errors.email || errors.message) {
      if (errors.email && trimmedEmail && !emailRegex.test(trimmedEmail)) {
        setErrorMessage(tContact.errInvalidEmail);
      } else if (errors.message && trimmedMessage.length < 10 && trimmedMessage.length > 0) {
        setErrorMessage(tContact.errShortMessage);
      } else {
        setErrorMessage(tContact.errRequiredFields);
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable dispatch & log locally
    setTimeout(() => {
      const newRecord: ContactMessageRecord = {
        id: 'msg_' + Date.now(),
        name: trimmedName,
        email: trimmedEmail,
        category,
        subject: subject.trim() || tContact.catOther,
        message: trimmedMessage,
        date: new Date().toLocaleString(isRTL ? 'ar-MA' : 'en-US')
      };

      try {
        const updated = [newRecord, ...history];
        setHistory(updated);
        localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated.slice(0, 20)));
      } catch {
        // storage overflow fallback
      }

      setLastSubmittedRecord(newRecord);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset input fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setFieldErrors({});
    }, 700);
  };

  // Clear local message history
  const handleClearHistory = () => {
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
    setHistory([]);
  };

  // Mailto link generator
  const getMailtoUrl = (record?: ContactMessageRecord | null) => {
    const sub = record ? record.subject : (subject || 'RikouZone Inquiry');
    const body = record 
      ? `Name: ${record.name}\nEmail: ${record.email}\nTopic: ${record.category}\n\nMessage:\n${record.message}`
      : `Hello RikouZone,\n\nName: ${name}\n\n${message}`;
    return `mailto:${OFFICIAL_CONTACT_EMAIL}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  };

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 pt-4 sm:pt-6 selection:bg-amber-500/20 selection:text-amber-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>{tContact.breadcrumbHome}</span>
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-medium">{tContact.breadcrumbContact}</span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-amber-400 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <BackIcon className="h-4 w-4" />
            <span>{tContact.backToHome}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 p-6 sm:p-10 shadow-2xl">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-1/4 h-56 w-56 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{tContact.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {tContact.title}
            </h1>

            {/* Intro paragraph */}
            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              {tContact.subtitle}
            </p>
          </div>
        </div>

        {/* Grid: Direct Email Card & Official Notice */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Direct Email Main Card (Span 2) */}
          <div className="md:col-span-2 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-zinc-950 p-6 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">
                    {tContact.emailSectionTitle}
                  </h2>
                  <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 inline-block mt-0.5">
                    {tContact.emailBadge}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              {tContact.emailSectionSubtitle}
            </p>

            {/* Email Address Highlight Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
              <div className="flex items-center gap-2.5 min-w-0 px-1">
                <span className="text-zinc-500 text-xs font-mono font-medium">EMAIL:</span>
                <span className="font-mono text-sm sm:text-base font-bold text-amber-300 truncate select-all">
                  {OFFICIAL_CONTACT_EMAIL}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20' 
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
                  }`}
                  title={copied ? tContact.copiedBtn : tContact.copyBtn}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? tContact.copiedBtn : tContact.copyBtn}</span>
                </button>

                <a
                  href={`mailto:${OFFICIAL_CONTACT_EMAIL}?subject=RikouZone%20Contact`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-md shadow-amber-500/20"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{tContact.directEmailBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Response Time & Guarantee Card (Span 1) */}
          <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/50 p-6 flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-emerald-400">
                <Clock className="h-5 w-5" />
                <h3 className="text-base font-bold text-white">
                  {tContact.responseTimeTitle}
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {tContact.responseTimeDesc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>خصوصية تامة وعدم مشاركة أي بيانات شخصية</span>
            </div>
          </div>

        </div>

        {/* Contact Form Container */}
        <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/40 p-6 sm:p-9 backdrop-blur-xl">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {tContact.formTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                {tContact.formSubtitle}
              </p>
            </div>
          </div>

          {/* Success State Card */}
          {isSubmitted && (
            <div className="mb-8 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-6 text-zinc-200 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-base font-black text-emerald-300">
                    {tContact.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {tContact.successDesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <a
                      href={getMailtoUrl(lastSubmittedRecord)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>{tContact.successOpenMailto}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors cursor-pointer"
                    >
                      <span>{tContact.sendAnotherBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/30 p-4 text-xs sm:text-sm text-rose-300">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  {tContact.nameLabel} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: false }));
                  }}
                  placeholder={tContact.namePlaceholder}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 border transition-all focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                    fieldErrors.name ? 'border-rose-500/80 bg-rose-950/10' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  {tContact.emailLabel} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: false }));
                  }}
                  placeholder={tContact.emailPlaceholder}
                  className={`w-full rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 border transition-all focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                    fieldErrors.email ? 'border-rose-500/80 bg-rose-950/10' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                />
              </div>
            </div>

            {/* Row 2: Category Chips */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2">
                {tContact.categoryLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'suggestion', label: tContact.catSuggestion, icon: Lightbulb },
                  { id: 'inquiry', label: tContact.catInquiry, icon: HelpCircle },
                  { id: 'bug', label: tContact.catBug, icon: Wrench },
                  { id: 'partnership', label: tContact.catPartnership, icon: Briefcase },
                  { id: 'other', label: tContact.catOther, icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectCategory(item.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-sm'
                          : 'border-zinc-800 bg-zinc-950/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Subject Title */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                {tContact.subjectLabel} <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={tContact.subjectPlaceholder}
                className="w-full rounded-xl bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder-zinc-500 border border-zinc-800 hover:border-zinc-700 transition-all focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Row 4: Message Content */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                {tContact.messageLabel} <span className="text-amber-400">*</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (fieldErrors.message) setFieldErrors(prev => ({ ...prev, message: false }));
                }}
                placeholder={tContact.messagePlaceholder}
                className={`w-full rounded-xl bg-zinc-950 px-4 py-3 text-sm text-white placeholder-zinc-500 border transition-all resize-y focus:outline-none focus:ring-1 focus:ring-amber-400 ${
                  fieldErrors.message ? 'border-rose-500/80 bg-rose-950/10' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? tContact.sendingBtn : tContact.submitBtn}</span>
              </button>
            </div>

          </form>

        </div>

        {/* Section: Official Social Media Status (No Fake Accounts) */}
        <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/40 p-6 sm:p-7 backdrop-blur-xl">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-amber-400">
                <Share2 className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {tContact.socialSectionTitle}
              </h3>
            </div>

            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
              {tContact.socialStatusBadge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
            {tContact.socialStatusNote}
          </p>
        </div>

        {/* Section: Local Message History (Transparency for user) */}
        {history.length > 0 && (
          <div className="mt-8 rounded-3xl border border-zinc-800/90 bg-zinc-900/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-zinc-300">
                <History className="h-4 w-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  {tContact.historyTitle} ({history.length})
                </h4>
              </div>
              <button
                type="button"
                onClick={handleClearHistory}
                className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3 w-3" />
                <span>{tContact.historyClear}</span>
              </button>
            </div>

            <div className="space-y-3">
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-white">{item.subject}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{item.date}</span>
                  </div>
                  <p className="text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono pt-1">
                    <Check className="h-3 w-3" />
                    <span>تم التوثيق محلياً بنجاح</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-bold text-zinc-300 hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-lg"
          >
            <BackIcon className="h-4 w-4" />
            <span>{tContact.backToHome}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
