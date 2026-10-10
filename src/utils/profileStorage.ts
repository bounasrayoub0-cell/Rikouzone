export interface UserProfile {
  displayName: string;
  username: string;
  bio: string;
  roleTitle: string;
  avatarUrl: string;
  avatarType: 'preset' | 'custom';
  selectedPresetId: string;
  joinedDate: string;
}

export const PROFILE_STORAGE_KEY = 'rikouzone_user_profile';

export const AVATAR_PRESETS = [
  {
    id: 'preset-rz-badge',
    title: 'RikouZone Pro',
    url: '/file_00000000b1d881f496a6612e6eef85ce.png',
    fallback: '/assets/rz-hero-badge.png'
  },
  {
    id: 'preset-ai-specialist',
    title: 'Rikou AI Expert',
    url: '/file_00000000790481f48f32726a32633267.png',
    fallback: '/assets/rikou-ai-avatar.png'
  },
  {
    id: 'preset-creator-amber',
    title: 'Content Creator',
    url: '/file_00000000833881f4b8703f44bcd07500.png',
    fallback: '/file_00000000b1d881f496a6612e6eef85ce.png'
  },
  {
    id: 'preset-digital-builder',
    title: 'Digital Builder',
    url: '/file_00000000ba9481f49ba7703f6ec726c4.png',
    fallback: '/file_00000000b1d881f496a6612e6eef85ce.png'
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  displayName: 'صانع محتوى Rikou',
  username: '@rikou_creator',
  bio: 'أتعلم المهارات الرقمية وصناعة المحتوى وتطوير الأعمال أسبوعياً مع RikouZone.',
  roleTitle: 'صانع محتوى ومستثمر مهارات',
  avatarUrl: '/file_00000000b1d881f496a6612e6eef85ce.png',
  avatarType: 'preset',
  selectedPresetId: 'preset-rz-badge',
  joinedDate: '2026'
};

export function getStoredUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        displayName: parsed.displayName?.trim() || DEFAULT_USER_PROFILE.displayName,
        username: parsed.username?.trim() || DEFAULT_USER_PROFILE.username,
        bio: typeof parsed.bio === 'string' ? parsed.bio : DEFAULT_USER_PROFILE.bio,
        roleTitle: parsed.roleTitle?.trim() || DEFAULT_USER_PROFILE.roleTitle,
        avatarUrl: parsed.avatarUrl || DEFAULT_USER_PROFILE.avatarUrl,
        avatarType: parsed.avatarType === 'custom' ? 'custom' : 'preset',
        selectedPresetId: parsed.selectedPresetId || DEFAULT_USER_PROFILE.selectedPresetId,
        joinedDate: parsed.joinedDate || DEFAULT_USER_PROFILE.joinedDate
      };
    }
  } catch (e) {
    console.warn('Failed to parse user profile from localStorage:', e);
  }
  return { ...DEFAULT_USER_PROFILE };
}

export function saveStoredUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save user profile to localStorage:', e);
  }
}

/**
 * Calculates profile completion percentage based on filled data
 */
export function calculateProfileCompletion(
  profile: UserProfile, 
  stats: { savedCount: number; completedCount: number }
): {
  percentage: number;
  completedTasks: { id: string; label: string; done: boolean }[];
} {
  const tasks = [
    {
      id: 'name',
      label: 'تحديد الاسم الظاهر',
      done: Boolean(profile.displayName && profile.displayName.trim().length > 0)
    },
    {
      id: 'username',
      label: 'اختيار اسم المستخدم (@)',
      done: Boolean(profile.username && profile.username.trim().length > 1)
    },
    {
      id: 'avatar',
      label: 'تخصيص الصورة الرمزية',
      done: Boolean(profile.avatarUrl && profile.avatarUrl.length > 0)
    },
    {
      id: 'bio',
      label: 'كتابة نبذة أو هدف تعليمي',
      done: Boolean(profile.bio && profile.bio.trim().length > 5)
    },
    {
      id: 'action',
      label: 'حفظ مسار أو إنجاز تحدٍّ',
      done: stats.savedCount > 0 || stats.completedCount > 0
    }
  ];

  const doneCount = tasks.filter(t => t.done).length;
  const percentage = Math.round((doneCount / tasks.length) * 100);

  return {
    percentage,
    completedTasks: tasks
  };
}

/**
 * Resizes and compresses an uploaded image file so it safely fits within localStorage
 */
export function processUploadedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('الملف المختار ليس صورة صالحة'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('فشل قراءة ملف الصورة'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('فشل تحميل الصورة المحددة'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 320; // 320x320 is ideal for high-DPI avatar while keeping base64 < 40KB
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } catch {
          resolve(reader.result as string);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
