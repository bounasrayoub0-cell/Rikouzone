import { videoEditingCurriculumPart1, VideoLesson } from './videoEditingCurriculumPart1';
import { videoEditingCurriculumPart2 } from './videoEditingCurriculumPart2';
import { videoEditingCurriculumPart3 } from './videoEditingCurriculumPart3';
import { videoEditingCurriculumPart4 } from './videoEditingCurriculumPart4';

export type { VideoLesson };

export const videoEditingCurriculum: VideoLesson[] = [
  ...videoEditingCurriculumPart1,
  ...videoEditingCurriculumPart2,
  ...videoEditingCurriculumPart3,
  ...videoEditingCurriculumPart4
];
