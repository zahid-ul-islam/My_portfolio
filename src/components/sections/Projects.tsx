import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';
import { ExternalLink, MonitorPlay } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {profileData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="perspective-1000 h-[480px] group cursor-pointer"
            >
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                
                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 backface-hidden glass-card flex flex-col overflow-hidden border border-white/10 group-hover:border-accent/40 transition-colors">
                  {/* Image */}
                  <div className="h-56 bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden flex items-center justify-center shrink-0">
                    {project.image ? (
                      <img 
                        src={new URL(`../../assets/${project.image}`, import.meta.url).href} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <MonitorPlay className="w-16 h-16 text-white/20" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="p-6 flex flex-col grow justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.slice(0, 4).map((tech, tIndex) => (
                          <span 
                            key={tIndex} 
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-medium text-gray-300">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-2.5 bg-white/5 rounded-full hover:bg-accent hover:text-white text-gray-400 transition-colors border border-white/10" 
                          title="Live Preview"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                        </a>
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2.5 bg-white/5 rounded-full hover:bg-accent hover:text-white text-gray-400 transition-colors border border-white/10" 
                            title="Source Code"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <SiGithub size={18} />
                          </a>
                        )}
                      </div>
                      <div className="text-accent text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read More &rarr;
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-8 flex flex-col overflow-hidden border border-accent/40 bg-black/80 backdrop-blur-2xl">
                  <h3 className="text-2xl font-bold text-accent mb-4">Project Details</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-2">Overview</h4>
                    <p className="text-sm text-gray-300">{project.description}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Key Features</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      {project.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <span className="text-accent mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, tIndex) => (
                        <span 
                          key={tIndex} 
                          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
