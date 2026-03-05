import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../constants';
import { Photo } from '../types';
import { db, collection, query, orderBy, onSnapshot } from '../firebase';

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'photos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPhotos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(newPhotos);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error in Gallery:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 px-6 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8">The Gallery</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all font-sans text-sm tracking-widest uppercase ${
                activeCategory === 'all' ? 'bg-wedding-olive text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full transition-all font-sans text-sm tracking-widest uppercase ${
                  activeCategory === cat.id ? 'bg-wedding-olive text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24 text-stone-400 font-serif italic">Loading memories...</div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-24 text-stone-400 font-serif italic">No photos in this category yet.</div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {photo.caption && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-serif italic text-xl">{photo.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

