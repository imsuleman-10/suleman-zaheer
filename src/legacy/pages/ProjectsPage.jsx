import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Layers, Code2 } from 'lucide-react';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: "E-Learning System",
      category: "Full-Stack",
      tech: ["HTML", "CSS", "JS", "PHP", "MySQL"],
      desc: "A full system for student enrollment, video links, quizzes, and certificate generation.",
      image: "/elearning_mockup_1775925031066.png",
      link: "#",
      github: "https://github.com/imsuleman-10/sam_college"
    },
    {
      title: "Airline Reservation",
      category: "PHP",
      tech: ["PHP", "MySQL", "Bootstrap"],
      desc: "Booking and managing flight reservations, including user accounts and ticket generation.",
      image: "/airline_booking_ui_1775925066474.png",
      link: "#",
      github: "#"
    },
    {
      title: "Neon Portfolio",
      category: "Frontend",
      tech: ["HTML", "CSS", "JavaScript"],
      desc: "My professional portfolio website designed with Neon Glassmorphism.",
      image: "/neon_portfolio_preview_1775925082987.png",
      link: "#",
      github: "#"
    },
    {
      title: "CGPA Calculator",
      category: "C++",
      tech: ["C++"],
      desc: "A client-side tool to calculate Cumulative Grade Point Average based on course data.",
      image: "/cgpa_calculator_app_1775925552108.png",
      link: "#",
      github: "#"
    },
    {
      title: "Pharmacy Management",
      category: "Full-Stack",
      tech: ["HTML", "CSS", "Node.js"],
      desc: "Automates inventory and patient data for efficient pharmacy workflow.",
      image: "/pharmacy_management_system_1775925936332.png",
      link: "#",
      github: "#"
    }
  ];

  const categories = ['All', 'Full-Stack', 'Frontend', 'PHP', 'C++'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-extrabold mb-6"
          >
            Creative <span className="text-primary">Portfolio</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Exploring the intersection of design and technology through a variety of web and software projects.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={project.github} className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.link} className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                        <Code2 size={10} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
