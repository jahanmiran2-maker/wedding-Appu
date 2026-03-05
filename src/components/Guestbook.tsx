import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Send } from 'lucide-react';
import { GuestbookEntry } from '../types';
import { db, collection, addDoc, query, orderBy, onSnapshot } from '../firebase';

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestbookEntry[];
      setEntries(newEntries);
    }, (error) => {
      console.error("Firestore Error in Guestbook:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name,
        message,
        createdAt: Date.now(),
      });
      setName('');
      setMessage('');
    } catch (error) {
      console.error("Error adding guestbook entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <Heart className="w-12 h-12 text-wedding-gold mx-auto mb-4" />
        <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Guestbook</h2>
        <p className="text-stone-500 font-sans tracking-widest uppercase text-sm">Leave a message for the couple</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            <div>
              <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-wedding-olive transition-all outline-none font-serif text-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Your Message</label>
              <textarea
                value={message}
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-wedding-olive transition-all outline-none font-serif text-lg resize-none"
                placeholder="Write something sweet..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-wedding-olive text-white rounded-xl py-4 font-sans font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-stone-400 italic font-serif">
              No messages yet. Be the first to leave one!
            </div>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 border-l-4 border-wedding-gold"
              >
                <p className="text-stone-800 font-serif text-xl italic mb-3">"{entry.message}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-sans font-bold text-sm uppercase tracking-wider text-wedding-olive">{entry.name}</span>
                  <span className="text-stone-400 text-xs font-sans">{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

