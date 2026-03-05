/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Guestbook from './components/Guestbook';
import RSVP from './components/RSVP';
import { motion } from 'motion/react';
import { auth, onAuthStateChanged, loginWithGoogle, logout, User, db, collection, addDoc } from './firebase';
import { LogIn, LogOut, Heart, Database } from 'lucide-react';

const ADMIN_EMAIL = "jahanmiran2@gmail.com";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  const seedData = async () => {
    if (!isAdmin || isSeeding) return;
    setIsSeeding(true);
    try {
      const photos = [
        { url: 'https://picsum.photos/seed/pre1/800/600', caption: 'The first look', category: 'pre-wedding', createdAt: Date.now() },
        { url: 'https://picsum.photos/seed/wed1/800/600', caption: 'Vows', category: 'wedding', createdAt: Date.now() },
        { url: 'https://picsum.photos/seed/rec1/800/600', caption: 'The first dance', category: 'reception', createdAt: Date.now() },
        { url: 'https://picsum.photos/seed/hon1/800/600', caption: 'Beach vibes', category: 'honeymoon', createdAt: Date.now() },
      ];
      for (const photo of photos) {
        await addDoc(collection(db, 'photos'), photo);
      }
      alert('Gallery seeded successfully!');
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-wedding-cream">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart className="w-12 h-12 text-wedding-gold fill-wedding-gold" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen selection:bg-wedding-gold selection:text-white"
    >
      {/* Auth Bar */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {isAdmin && (
          <button
            onClick={seedData}
            disabled={isSeeding}
            className="flex items-center gap-2 bg-wedding-gold text-white px-4 py-2 rounded-full shadow-sm hover:bg-yellow-600 transition-all font-sans font-bold text-xs tracking-widest uppercase disabled:opacity-50"
          >
            <Database className="w-3 h-3" />
            {isSeeding ? 'Seeding...' : 'Seed Gallery'}
          </button>
        )}
        {user ? (
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-2 pl-4 rounded-full shadow-sm border border-stone-100">
            <span className="text-sm font-sans font-semibold text-stone-600">Hi, {user.displayName?.split(' ')[0]}</span>
            <button
              onClick={logout}
              className="p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors text-stone-500"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-2 bg-wedding-olive text-white px-6 py-3 rounded-full shadow-lg hover:bg-stone-800 transition-all font-sans font-bold text-sm tracking-widest uppercase"
          >
            <LogIn className="w-4 h-4" />
            Sign in to view album
          </button>
        )}
      </div>

      {!user ? (
        <div className="h-screen flex flex-col items-center justify-center bg-wedding-cream px-6 text-center">
          <Heart className="w-16 h-16 text-wedding-gold mb-8" />
          <h1 className="text-5xl font-serif italic mb-4 text-stone-900">Suborna & Ridoy</h1>
          <p className="text-stone-500 max-w-md mb-8 font-serif italic text-xl">
            Please sign in with your Google account to view our wedding memories and leave a message.
          </p>
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-3 bg-wedding-olive text-white px-8 py-4 rounded-full shadow-xl hover:bg-stone-800 transition-all font-sans font-bold tracking-[0.2em] uppercase"
          >
            <LogIn className="w-5 h-5" />
            Enter Album
          </button>
        </div>
      ) : (
        <>
          <Hero />
          <Story />
          <Gallery />
          <Guestbook />
          <RSVP />
          
          <footer className="py-12 text-center border-t border-stone-200">
            <p className="font-serif italic text-stone-400">
              Made with love for Suborna & Ridoy
            </p>
          </footer>
        </>
      )}
    </motion.div>
  );
}




