'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Menu } from 'lucide-react'
import { techStacks, projects, experiences } from '../data/portofolioData'

export default function PersonalWebsite() {
  const [selectedTechStacks, setSelectedTechStacks] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [expandedStates, setExpandedStates] = useState({});

  const toggleTechStack = (techStack) => {
    setSelectedTechStacks(prev => 
      prev.includes(techStack) 
        ? prev.filter(item => item !== techStack)
        : [...prev, techStack]
    )
  }

  const filteredProjects = selectedTechStacks.length > 0
    ? projects.filter(project => 
        selectedTechStacks.some(tech => project.techStack.includes(tech))
      )
    : projects

  const toggleExpand = (index) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.span
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CT
            </motion.span>
            <div className="hidden md:flex space-x-8">
              {["About", "Tech", "Experience", "Projects"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="hidden md:flex space-x-4">
              {[
                { Icon: Github, href: "https://github.com/christoffertan" },
                { Icon: Linkedin, href: "https://linkedin.com/in/christoffer-tan" },
                { Icon: Mail, href: "mailto:tanchristoffer@gmail.com" },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{
                    scale: 1.2,
                    rotate: 15,
                    y: -5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
            <motion.button
              className="md:hidden text-gray-400 hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {["About", "Tech", "Experience", "Projects"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl text-gray-300 hover:text-white mb-6"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        <section id="about" className="min-h-screen flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-48 h-48 mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src="/myself.jpg?height=300&width=300"
                alt="Christoffer Tan"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Christoffer Tan
            </h1>
            <h2 className="text-2xl text-gray-400 mb-6">Hi, Welcome!</h2>
            <p className="max-w-2xl mx-auto text-gray-300">
              I&apos;m a 3rd year Computer Science and Data Science student at the University of Toronto. I love building software and data projects, and I&apos;m passionate about web development, data science, and machine learning.
            </p>
          </motion.div>
        </section>

        <section id="tech" className="min-h-screen py-20">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Tech Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(techStacks).map(([category, techs], index) => (
              <motion.div
                key={category}
                className="bg-gray-900 rounded-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <button
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                        selectedTechStacks.includes(tech)
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-transparent border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                      } transition-all duration-300`}
                      onClick={() => toggleTechStack(tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className="min-h-screen py-20">
          <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((job, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-lg p-8 shadow-lg"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">{job.title}</h3>
                <p className="text-gray-400 mb-4">{job.company} | {job.period}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {job.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="min-h-screen py-20">
     <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
       My Projects
     </h2>
     <div className="mb-8 flex justify-center">
       <div className="bg-gray-800 p-1 rounded-full">
         {['all', 'software', 'data'].map((tab) => (
           <button
             key={tab}
             className={`rounded-full px-6 py-2 ${
               activeTab === tab ? 'bg-purple-500 text-white' : 'text-gray-300'
             } transition-all duration-300`}
             onClick={() => setActiveTab(tab)}
           >
             {tab.charAt(0).toUpperCase() + tab.slice(1)}
           </button>
         ))}
       </div>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       {filteredProjects
         .filter(p => activeTab === 'all' || p.category.toLowerCase().includes(activeTab))
         .map((project, index) => (
           <motion.div
             key={index}
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: index * 0.1 }}
           >
             <div className="bg-gray-900 border border-purple-500/20 hover:border-cyan-500 transition-all duration-300 overflow-hidden rounded-lg group">
               <div className="p-6">
                 <h3 className="text-2xl text-cyan-400 mb-2">{project.title}</h3>
                 <div className="mb-4">
                   <div className={`relative ${expandedStates[index] ? 'h-auto' : 'h-20 overflow-hidden'}`}>
                     <p className="text-gray-400">{project.description}</p>
                     {!expandedStates[index] && (
                       <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
                     )}
                   </div>
                   <button 
                     onClick={() => toggleExpand(index)}
                     className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                   >
                     {expandedStates[index] ? 'Show Less' : 'Read More'}
                   </button>
                 </div>
                 <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                   <Image
                     src={project.image}
                     alt={`${project.title} preview`}
                     layout="fill"
                     objectFit="cover"
                     className="transition-transform duration-300 group-hover:scale-110"
                   />
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {project.techStack.map((tech) => (
                     <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-md text-sm">
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>
               <div className="flex justify-between p-6 bg-gray-800">
                 {project.video && (
                   <button className="px-4 py-2 border border-cyan-500 text-cyan-400 rounded-md hover:bg-cyan-500 hover:text-white transition-all duration-300">
                     Documentation
                   </button>
                 )}
                 <a
                   href={project.github}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-300 flex items-center ml-auto"
                 >
                   <Github className="mr-2 h-4 w-4" /> GitHub
                 </a>
               </div>
             </div>
           </motion.div>
         ))}
     </div>
   </section>
      </main>
    </div>
  )
}
