export type KidsVideoStatus =
  | 'queued'
  | 'generating_script'
  | 'generating_audio'
  | 'rendering_video'
  | 'completed'
  | 'failed'
  | 'youtube_uploaded'
  | 'blog_published';

export interface KidsVideoScene {
  sceneNumber: number;
  title: string;
  visualType: 'letter_intro' | 'object_bounce' | 'phonics_combo' | 'celebration';
  duration: number;
  narrationText: string;
  displayWord: string;
  displayUrdu?: string;
  subtitles: string;
}

export interface KidsVideoScript {
  hook: string;
  body: string;
  phonics: string;
  outro: string;
}

export interface KidsVideoItem {
  contentId: string;
  category: string;
  topic: string;
  title?: string;
  shortUrdu?: string;
  urduTitle?: string;
  urduMeaning?: string;
  topicSlug: string;
  targetAge: string;
  language: 'en' | 'ur' | 'bilingual';
  durationSeconds: number;
  script: KidsVideoScript;
  voiceText: string;
  scenes: KidsVideoScene[];
  status: KidsVideoStatus;
  videoUrl: string;
  audioUrl: string;
  thumbnailUrl: string;
  creationDate: string;
  completedAt?: string;
  youtubeStatus: 'draft' | 'queued' | 'uploaded';
  youtubeVideoId?: string | null;
  youtubeUrl?: string | null;
  blogStatus: 'draft' | 'queued' | 'published';
  blogPostId?: string | null;
  blogUrl?: string | null;
  errorMessage?: string | null;
  retryCount: number;
}
