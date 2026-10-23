"use client";
import React, { useState } from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsClient({ projects, categories }) {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col animate-in fade-in zoom-in duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="GitHub Repository">
                      <Github size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-primary/10 text-primary text-[10px] sm:text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <div className="flex sm:hidden items-center gap-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-full" aria-label="GitHub Repository">
                        <Github size={14} />
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-full" aria-label="Live Demo">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors text-white">{project.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4 border-t border-white/5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded uppercase flex items-center gap-1">
                      <Code2 size={10} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
