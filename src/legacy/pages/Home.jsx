import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Rocket, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <Globe size={32} className="text-blue-400 animate-pulse" />,
      title: "Enterprise Architecture",
      desc: "Architecting end-to-end scalable backend systems and dynamic frontend applications utilizing the MERN stack."
    },
    {
      icon: <Cpu size={32} className="text-purple-400 animate-pulse" />,
      title: "High-Performance UIs",
      desc: "Engineering lightning-fast, reactive, and accessible user interfaces powered by standard modern React patterns."
    },
    {
      icon: <Code2 size={32} className="text-primary" />,
      title: "Clean Code",
      desc: "Well-structured, documented, and professional codebases following industry standards."
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Services/Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Software Engineering</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Architecting robust, scalable, and high-performance digital ecosystems.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 group overflow-hidden"
              >
                {/* Hover Gradient Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Premium Icon Container */}
                <div className="relative mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-primary/20 group-hover:bg-primary/10 transition-all duration-500 before:absolute before:inset-0 before:bg-primary/20 before:blur-xl before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:rounded-full">
                  <div className="relative z-10 scale-90 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                  {feature.desc}
                </p>
                
                {/* Bottom Highlight Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:row items-end justify-between mb-16 gap-6">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works</h2>
              <p className="text-gray-400 max-w-xl">An exclusive showcase of industry-grade engineered solutions demonstrating advanced MERN stack capabilities.</p>
            </div>
            <Link to="/projects" className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              View All Projects <ArrowUpRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img 
                src="/elearning_mockup_1775925031066.png" 
                alt="E-Learning System"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Full-Stack System</span>
                <h3 className="text-2xl font-bold mb-2">E-Learning Platform</h3>
                <p className="text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Comprehensive system for student enrollment, video management, and certification.
                </p>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img 
                src="/airline_booking_ui_1775925066474.png" 
                alt="Airline Reservation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Web Application</span>
                <h3 className="text-2xl font-bold mb-2">Airline Reservation System</h3>
                <p className="text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Advanced booking and management system with user accounts and ticket generation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20 group">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0 bg-black">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000" 
                alt="Abstract Background" 
                className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale group-hover:opacity-20 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-bg-primary/90" />
            </div>
            
            <div className="absolute top-0 right-0 p-12 text-white/20 z-0 drop-shadow-2xl">
              <Rocket size={120} />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 relative z-10 tracking-tight">Initiate A Project</h2>
            <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto relative z-10">
              Seeking an enterprise-grade solution? Let's engineer a high-performance system that scales your business to the next level.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white text-primary px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 relative z-10 shadow-xl"
            >
              Consult Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
