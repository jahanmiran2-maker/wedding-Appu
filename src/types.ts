export interface Photo {
  id: string;
  url: string;
  caption: string;
  category: 'pre-wedding' | 'wedding' | 'reception' | 'honeymoon';
  createdAt: number;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

export interface StorySection {
  title: string;
  content: string;
  imageUrl?: string;
}
