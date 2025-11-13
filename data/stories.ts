export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type StoryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  duration?: number; // seconds for image; for video we use video duration
  timestamp: string; // ISO timestamp
};

export type Story = {
  id: string;
  user: User;
  items: StoryItem[];
  viewers: string[]; // user ids who viewed (initial)
};

// Hardcoded users
export const users: User[] = [
  { id: 'u1', name: 'Asha Rao', avatar: 'https://i.pravatar.cc/80?img=10' },
  { id: 'u2', name: 'Rohan Mehta', avatar: 'https://i.pravatar.cc/80?img=20' },
  { id: 'u3', name: 'Maya Singh', avatar: 'https://i.pravatar.cc/80?img=30' },
  { id: 'me', name: 'You (Session User)', avatar: 'https://i.pravatar.cc/80?img=8' }
];

// Example stories
export const stories: Story[] = [
  {
    id: 's1',
    user: users[0],
    items: [
      {
        id: 's1-1',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?w=1200&q=80&auto=format&fit=crop',
        duration: 5,
        timestamp: new Date().toISOString()
      },
      {
        id: 's1-2',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80&auto=format&fit=crop',
        duration: 5,
        timestamp: new Date().toISOString()
      }
    ],
    viewers: ['u2']
  },
  {
    id: 's2',
    user: users[1],
    items: [
      {
        id: 's2-1',
        type: 'image',
        src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80&auto=format&fit=crop',
        duration: 5,
        timestamp: new Date().toISOString()
      }
    ],
    viewers: []
  },
  {
    id: 's3',
    user: users[2],
    items: [
      {
        id: 's3-1',
        type: 'image',
        src: 'https://picsum.photos/1200/900',
        duration: 5,
        timestamp: new Date().toISOString()
      },
      {
        id: 's3-2',
        type: 'image',
        src: 'https://picsum.photos/1200/901',
        duration: 5,
        timestamp: new Date().toISOString()
      },
      {
        id: 's3-3',
        type: 'image',
        src: 'https://picsum.photos/1200/902',
        duration: 5,
        timestamp: new Date().toISOString()
      }
    ],
    viewers: ['u1', 'u2']
  }
];
