import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  details: string;
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
  id: 1,
  title: "PROJECT ONE",
  category: "Web Development",
  year: "2026",
  description: "A modern full-stack web application",
  details: "A scalable full-stack web application built with modern frameworks, featuring authentication, dynamic routing, and responsive UI.",
  liveUrl: "#",
  githubUrl: "#",
},
{
  id: 2,
  title: "PROJECT TWO",
  category: "AI / Web Development",
  year: "2025",
  description: "An AI-powered productivity platform",
  details: "An AI-driven platform that optimizes workflows, provides smart recommendations, and enhances user efficiency using intelligent automation.",
  liveUrl: "#",
  githubUrl: "#",
},
{
  id: 3,
  title: "PROJECT THREE",
  category: "Game Development",
  year: "2025",
  description: "A real-time multiplayer browser game",
  details: "A real-time multiplayer browser game built with interactive mechanics, synchronized state management, and immersive UI design.",
  liveUrl: "#",
  githubUrl: "#",
},
{
  id: 4,
  title: "PROJECT FOUR",
  category: "Mobile App",
  year: "2024",
  description: "A cross-platform mobile application",
  details: "A cross-platform mobile application focused on seamless user experience, real-time updates, and cloud-based data storage.",
  liveUrl: "#",
  githubUrl: "#",
},
{
  id: 5,
  title: "PROJECT FIVE",
  category: "Data Visualization",
  year: "2024",
  description: "An interactive analytics dashboard",
  details: "An interactive analytics dashboard with real-time data visualization, filtering capabilities, and performance-optimized rendering.",
  liveUrl: "#",
  githubUrl: "#",
},
{
  id: 6,
  title: "PROJECT SIX",
  category: "Full Stack Development",
  year: "2023",
  description: "A scalable SaaS-style web platform",
  details: "A scalable SaaS-style web platform featuring secure authentication, role-based access control, and modular architecture.",
  liveUrl: "#",
  githubUrl: "#",
}

];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="min-h-screen py-10 px-6 md:px-12 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground font-body">
            002 / PROJECTS
          </span>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer"
            >
              <motion.div
                className={`relative aspect-[4/5] border bg-card overflow-hidden transition-all duration-500 ${
                  hoveredId === project.id ? 'border-foreground shadow-[0_0_20px_rgba(255,255,255,0.06)]' : 'border-border'
                }`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Grain Overlay on Card */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${
                  hoveredId === project.id ? 'opacity-100' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex justify-between items-start">
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {project.year}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ 
                        opacity: hoveredId === project.id ? 1 : 0,
                        scale: hoveredId === project.id ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={20} strokeWidth={hoveredId === project.id ? 2.5 : 1.5} className="transition-all duration-300" />
                    </motion.div>
                  </div>

                  {/* Bottom */}
                  <div>
                    <span className="text-xs tracking-widest text-muted-foreground block mb-2">
                      {project.category}
                    </span>
                    <h3 className={`font-display text-2xl md:text-3xl tracking-tight transition-all duration-300 ${
                      hoveredId === project.id ? 'font-bold' : 'font-medium'
                    }`}>
                      {project.title}
                    </h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: hoveredId === project.id ? 1 : 0,
                        y: hoveredId === project.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-sm text-muted-foreground font-body"
                    >
                      {project.description}
                    </motion.p>
                  </div>
                </div>

                {/* Border Animation */}
                <motion.div
                  className="absolute inset-0 border-2 border-foreground pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-[2px]"
              onClick={() => setSelectedProject(null)}
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
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 hover:opacity-60 transition-opacity"
                >
                  <X size={24} strokeWidth={1} />
                </button>

                <span className="text-xs tracking-widest text-muted-foreground block mb-2">
                  {selectedProject.category} — {selectedProject.year}
                </span>
                <h2 className="font-display text-4xl md:text-5xl tracking-tight font-bold mb-8">
                  {selectedProject.title}
                </h2>
                <p className="text-foreground/80 font-body leading-relaxed mb-10">
                  {selectedProject.details}
                </p>
                <div className="flex items-center gap-8">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm tracking-widest font-body group relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    <ExternalLink size={16} />
                    LIVE
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm tracking-widest font-body group relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                  >
                    <Github size={16} />
                    GITHUB
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

export default ProjectsSection;
