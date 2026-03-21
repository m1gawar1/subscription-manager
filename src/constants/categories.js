export const CATEGORIES = [
  { id: 'video', name: '動画配信', icon: '🎬', color: '#E50914' },
  { id: 'music', name: '音楽', icon: '🎵', color: '#1DB954' },
  { id: 'game', name: 'ゲーム', icon: '🎮', color: '#0055ff' },
  { id: 'reading', name: '読書・学習', icon: '📚', color: '#8855bb' },
  { id: 'cloud', name: 'クラウド', icon: '☁️', color: '#4A90E2' },
  { id: 'work', name: '仕事・クリエイティブ', icon: '💼', color: '#FF9500' },
  { id: 'ai', name: 'AI・テック', icon: '🤖', color: '#10a37f' },
  { id: 'shopping', name: 'ショッピング', icon: '🛍️', color: '#FF6B35' },
  { id: 'other', name: 'その他', icon: '📦', color: '#8E8E93' }
];

export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
};
