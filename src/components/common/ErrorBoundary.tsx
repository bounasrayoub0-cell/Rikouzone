import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let lang = 'ar';
      try {
        lang = localStorage.getItem('rikouzone_language') || 'ar';
      } catch {}
      const isRTL = lang === 'ar' || lang === 'ary';

      const errorTexts: Record<string, { title: string; desc: string; btn: string }> = {
        ary: {
          title: 'وقع خطأ غير متوقع',
          desc: 'سمح لينا، واجهت المنصة مشكلة تقنية بسيطة. تقدر تعاود تشارجي الصفحة وترجع تكمل التعلم دابا.',
          btn: 'عاود شارجا المنصة'
        },
        ar: {
          title: 'حدث خطأ غير متوقع',
          desc: 'نعتذر، واجه التطبيق مشكلة تقنية بسيطة. يمكنك إعادة تحميل الصفحة للعودة فوراً لمتابعة التعلم والأدوات.',
          btn: 'إعادة تشغيل المنصة'
        },
        fr: {
          title: 'Une erreur inattendue est survenue',
          desc: 'Désolé, un problème technique mineur est survenu. Veuillez recharger la page pour continuer.',
          btn: 'Recharger la plateforme'
        },
        es: {
          title: 'Ocurrió un error inesperado',
          desc: 'Lo sentimos, ocurrió un problema técnico menor. Por favor recarga la página para continuar.',
          btn: 'Reiniciar la plataforma'
        },
        de: {
          title: 'Ein unerwarteter Fehler ist aufgetreten',
          desc: 'Entschuldigung, es ist ein technisches Problem aufgetreten. Bitte laden Sie die Seite neu.',
          btn: 'Plattform neu starten'
        },
        it: {
          title: 'Si è verificato un errore imprevisto',
          desc: 'Ci scusiamo, si è verificato un problema tecnico. Ricarica la pagina per continuare.',
          btn: 'Riavvia la piattaforma'
        },
        pt: {
          title: 'Ocorreu um erro inesperado',
          desc: 'Desculpe, ocorreu um pequeno problema técnico. Recarregue a página para continuar.',
          btn: 'Reiniciar plataforma'
        },
        zh: {
          title: '发生意外错误',
          desc: '抱歉，系统遇到了一个技术问题。请重新加载页面以继续使用。',
          btn: '重新加载平台'
        },
        en: {
          title: 'An unexpected error occurred',
          desc: 'Sorry, a minor technical issue occurred. Please reload the page to continue learning.',
          btn: 'Reload Platform'
        }
      };

      const t = errorTexts[lang] || errorTexts.en;

      return (
        <div className="min-h-screen bg-[#060608] flex items-center justify-center p-6 text-zinc-100" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="max-w-md w-full rounded-3xl border border-red-500/20 bg-zinc-950/90 p-8 text-center backdrop-blur-xl shadow-2xl">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-black text-white mb-3">{t.title}</h2>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              {t.desc}
            </p>

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.btn}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
