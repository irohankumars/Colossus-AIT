import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  details: string;
  registrationUrl: string;
  galleryUrl: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "TECH INAUGURATION",
    category: "Club Launch",
    date: "March 2026",
    description: "Official launch of Colossus Tech Club",
    details:
      "The official inauguration introducing the club vision, core team, roadmap, and upcoming technical initiatives.",
    registrationUrl: "#",
    galleryUrl: "#",
  },
  {
    id: 2,
    title: "FULL STACK WORKSHOP",
    category: "Web Development",
    date: "April 2026",
    description: "Hands-on real-world dev session",
    details:
      "A practical full-stack development workshop covering architecture, deployment, Git workflows, and collaborative coding.",
    registrationUrl: "#",
    galleryUrl: "#",
  },
  {
    id: 3,
    title: "AI INDUSTRY SESSION",
    category: "Artificial Intelligence",
    date: "May 2026",
    description: "Industry expert technical talk",
    details:
      "An expert-led session explaining how AI systems are built, deployed, and integrated into production software environments.",
    registrationUrl: "#",
    galleryUrl: "#",
  }
];

const EventsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      id="events"
      className="min-h-screen py-5 px-6 md:px-12 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Label */}
  <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={isInView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="mb-10"
>
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
  >
    Events
  </motion.h2>
</motion.div>


        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedEvent(event)}
              className="group relative cursor-pointer"
            >
              <motion.div
                className={`relative aspect-[4/5] border bg-card overflow-hidden transition-all duration-500 ${
                  hoveredId === event.id
                    ? 'border-foreground shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                    : 'border-border'
                }`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-between">

                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {event.date}
                    </span>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: hoveredId === event.id ? 1 : 0,
                        scale: hoveredId === event.id ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                  {/* Bottom */}
                  <div>
                    <span className="text-xs tracking-widest text-muted-foreground block mb-2">
                      {event.category}
                    </span>

                    <h3
                      className={`font-display text-2xl md:text-3xl tracking-tight transition-all duration-300 ${
                        hoveredId === event.id ? 'font-bold' : 'font-medium'
                      }`}
                    >
                      {event.title}
                    </h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredId === event.id ? 1 : 0,
                        y: hoveredId === event.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-sm text-muted-foreground font-body"
                    >
                      {event.description}
                    </motion.p>
                  </div>
                </div>

                {/* Border Animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-foreground pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === event.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Event Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-[2px]"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-2xl w-full bg-card border border-border p-12"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
                >
                  <X size={24} strokeWidth={1} />
                </button>

                <span className="text-xs tracking-widest text-muted-foreground block mb-2">
                  {selectedEvent.category} — {selectedEvent.date}
                </span>

                <h2 className="font-display text-4xl md:text-5xl tracking-tight font-bold mb-8">
                  {selectedEvent.title}
                </h2>

                <p className="text-foreground/80 font-body leading-relaxed mb-10">
                  {selectedEvent.details}
                </p>

                <div className="flex items-center gap-8">
                  <a
                    href={selectedEvent.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm tracking-widest font-body hover:opacity-70 transition-opacity"
                  >
                    <ExternalLink size={16} />
                    REGISTER
                  </a>

                  <a
                    href={selectedEvent.galleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm tracking-widest font-body hover:opacity-70 transition-opacity"
                  >
                    <ImageIcon size={16} />
                    GALLERY
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default EventsSection;
