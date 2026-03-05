import { useState } from 'react';
import { motion } from 'motion/react';
import { db, collection, addDoc } from '../firebase';

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    dietary: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'rsvps'), {
        ...formData,
        createdAt: Date.now(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-24 px-6 text-center bg-wedding-olive text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl font-serif italic mb-4">Thank You!</h2>
          <p className="text-lg opacity-80">We've received your RSVP. Can't wait to see you!</p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 bg-stone-100">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif italic mb-8">Will You Join Us?</h2>
        <p className="text-stone-500 mb-12 font-sans tracking-widest uppercase text-sm">Please RSVP by May 1st, 2025</p>

        <form onSubmit={handleSubmit} className="card p-10 space-y-8 text-left">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-wedding-olive transition-all outline-none font-serif text-lg"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-wedding-olive transition-all outline-none font-serif text-lg"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Attendance</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="yes" 
                  checked={formData.attendance === 'yes'}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-5 h-5 accent-wedding-olive" 
                />
                <span className="font-serif text-lg group-hover:text-wedding-olive transition-colors">Joyfully Accept</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="no" 
                  checked={formData.attendance === 'no'}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-5 h-5 accent-wedding-olive" 
                />
                <span className="font-serif text-lg group-hover:text-wedding-olive transition-colors">Regretfully Decline</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 mb-2">Dietary Requirements (Optional)</label>
            <textarea
              rows={2}
              value={formData.dietary}
              onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
              className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-wedding-olive transition-all outline-none font-serif text-lg resize-none"
              placeholder="Any allergies or preferences?"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-wedding-olive text-white rounded-xl py-4 font-sans font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </section>
  );
}

