import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, MapPin, Calendar, Mail } from 'lucide-react';
import profilePic from '../assets/suleman-zaheer-software-engineer.jpg';

const AboutPage = () => {
  const education = [
    {
      degree: "B.S. in Computer Science",
      school: "University of Engineering and Technology, Lahore",
      period: "2024 - Present",
      desc: "Specializing in Software Engineering principles, Advanced Data Structures, Algorithms, and System Architecture."
    },
    {
      degree: "Advanced Web Applications Diploma",
      school: "Yashfeen College of Computing",
      period: "Completed",
      desc: "Comprehensive focus on backend infrastructure, relational database schema design, and server-side rendering."
    },
    {
      degree: "Intermediate in Computer Science (ICS)",
      school: "Government Islamia College Civil Lines",
      period: "Completed",
      desc: "Strong foundation in applied mathematics, logic, and early computer science fundamentals."
    }
  ];

  const skills = [
    { category: "Frontend Engineering", items: ["React.js", "TypeScript / ES6+", "Tailwind CSS v4", "Framer Motion", "Vite Ecosystem"] },
    { category: "Backend Architecture", items: ["Node.js", "Express API", "RESTful Services", "PHP", "Laravel Framework"] },
    { category: "Database & Cloud", items: ["MongoDB / Mongoose", "MySQL / SQL", "Firebase Platform", "Cloud Storage"] },
    { category: "DevOps & Tooling", items: ["Git Workflow", "GitHub Actions", "Vercel Deployment", "NPM / Yarn", "Postman / API Testing"] }
  ];

  const certifications = [
    { title: "Python Specialization for Data Analysis", issuer: "Coursera & Scrimba" },
    { title: "Cybersecurity Fundamentals & Threat Mitigation", issuer: "University of Maryland" },
    { title: "Advanced Problem Solving Strategies", issuer: "Stanford University (Online Module)" }
  ];

  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold uppercase tracking-[0.3em] text-sm mb-4"
            >
              The Developer Behind The Code
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-8xl font-display font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter"
            >
              Building <span className="text-gray-600">Digital</span> <br />
              <span className="text-primary">Experiences.</span>
            </motion.h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <MapPin size={14} className="text-primary" /> Lahore, PK
              </span>
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <Briefcase size={14} className="text-primary" /> MERN Developer
              </span>
              <span className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                <Calendar size={14} className="text-primary" /> 4th Semester (UET)
              </span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative order-1 lg:order-2"
          >
            {/* Decent, Modern & Professional Frame */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 group mx-auto">
              {/* Outer Glow Layer */}
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/40 transition-all duration-700" />
              
              {/* The "Golden Edge" Beam Animation */}
              <div className="absolute inset-[-4px] rounded-[3.5rem] overflow-hidden">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_30%,#0ea5e9_50%,transparent_70%)] animate-[spin_5s_linear_infinite]" />
              </div>

              {/* Glass Inner Frame */}
              <div className="absolute inset-[2px] bg-[#030712] rounded-[3.3rem] z-10" />

              {/* Image with subtle glass overlay */}
              <div className="relative w-full h-full rounded-[3.3rem] overflow-hidden z-20 border border-white/10 flex items-center justify-center">
                <img 
                  src={profilePic} 
                  alt="Suleman Zaheer" 
                  className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0" 
                />
                
                {/* Modern Lens Flare / Shine Effect */}
                <div className="absolute inset-x-0 h-1/2 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-[-100%] left-[-100%] w-[50%] h-[300%] bg-white/10 rotate-[35deg] group-hover:left-[150%] transition-all duration-1000 pointer-events-none" />
              </div>

              {/* Minimalist Accents */}
              <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-primary/50 rounded-tr-3xl z-30" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-primary/50 rounded-bl-3xl z-30" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none text-gray-400 mb-16 space-y-6">
              <p className="leading-relaxed">
                I am <span className="text-white font-bold">Suleman Zaheer</span>, a dedicated Full-Stack Software Engineer specializing in the MERN architecture. Currently advancing my academic foundation in Computer Science at <span className="text-primary font-bold">UET Lahore</span>, I combine theoretical expertise with rigorous practical implementation to engineer highly scalable, enterprise-grade web applications.
              </p>
              <p className="leading-relaxed">
                My technological journey evolved from foundational paradigms in C++ and PHP toward mastering modern, asynchronous JavaScript ecosystems. I excel in architecting robust backend APIs while equally prioritizing seamless, performant, and hyper-responsive frontend user experiences. My professional mandate is to close the gap between complex algorithmic logic and elegant, user-centric interface design.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">01</span>
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((group, index) => (
                    <div key={index} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-colors group">
                      <h4 className="text-white font-bold mb-6 flex items-center justify-between">
                        {group.category}
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">02</span>
                  Education Timeline
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-2/3 bg-primary transition-all duration-500 rounded-r-full" />
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                          <p className="text-primary font-bold text-sm tracking-wide">{edu.school}</p>
                        </div>
                        <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase text-gray-500 border border-white/5 h-fit">{edu.period}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-white/5">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-8 shadow-2xl shadow-primary/20">
                <GraduationCap size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-6">Certifications</h4>
              <div className="space-y-6">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 transition-transform group-hover:scale-125"><Award size={20} className="text-primary" /></div>
                    <div>
                      <p className="text-white font-bold leading-tight mb-1">{cert.title}</p>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 text-center group">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-full h-full bg-black border border-white/10 rounded-full flex items-center justify-center text-primary">
                  <Mail size={32} />
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4">Let's Work Together</h4>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Currently available for strategic MERN stack roles, remote enterprise internships, and high-impact freelance architecture projects.
              </p>
              <a 
                href="mailto:samstacktechs@gmail.com" 
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                Send a Message
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
