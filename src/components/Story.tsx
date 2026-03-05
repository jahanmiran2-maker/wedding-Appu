import { motion } from 'motion/react';
import Markdown from 'react-markdown';

const STORY = `
### How We Met
It was a rainy afternoon in Dhaka when our paths first crossed. Suborna was lost in a book at a small cafe, and Ridoy, being his usual curious self, couldn't help but ask about the story she was reading.

### The Proposal
Three years later, under a starlit sky in Sylhet, Ridoy asked the question that would change their lives forever. With a ring and a promise, they began their journey towards "forever".

### The Big Day
Surrounded by family, friends, and a lot of laughter, we celebrated our union. It wasn't just a wedding; it was the beginning of our greatest adventure.
`;

export default function Story() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif italic mb-4">Our Story</h2>
        <div className="w-24 h-px bg-wedding-gold mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://picsum.photos/seed/couple-story/800/1200"
            alt="Our Story"
            className="pill-image shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wedding-olive/10 rounded-full -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="prose prose-stone prose-lg font-serif"
        >
          <div className="markdown-body">
            <Markdown>{STORY}</Markdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
