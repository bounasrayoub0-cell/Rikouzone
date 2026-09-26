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
      return (
        <div className="min-h-screen bg-[#060608] flex items-center justify-center p-6 text-zinc-100" dir="rtl">
          <div className="max-w-md w-full rounded-3xl border border-red-500/20 bg-zinc-950/90 p-8 text-center backdrop-blur-xl shadow-2xl">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-black text-white mb-3">حدث خطأ غير متوقع</h2>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              نعتذر، واجه التطبيق مشكلة تقنية بسيطة. يمكنك إعادة تحميل الصفحة للعودة فوراً لمتابعة التعلم والأدوات.
            </p>

            <button
              onClick={this.handleReset}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة تشغيل المنصة</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
