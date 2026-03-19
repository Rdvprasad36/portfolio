import React, { createContext, useContext, useState, useEffect } from 'react';

// Default data representing the current state of the portfolio
const defaultData = {
  profile: {
    name: "Durga Venkata Prasad Rapeti",
    role: "AI & Data Science Student @ JNTUK | Full Stack Developer",
    phone: "+91 73826 12327",
    email: "rdvprasad36@gmail.com",
    website: "rdvprasad36.dev",
    location: "Visakhapatnam, Andhra Pradesh",
    image: "/profile.jpg",
    summary: "AI & Data Science undergraduate (CGPA 9.38/10) with hands-on experience in machine learning, full-stack development, and AI applications. Built multiple hackathon projects including assistive technologies and productivity platforms. Experienced with Python, Next.js, and NLP-based systems, and passionate about building scalable AI solutions and real-world applications."
  },
  recentActivities: [
    {
      id: 1,
      title: 'Excited to announce my new internship!',
      date: 'August 2025',
      content: 'Just started my journey as an AI/ML Intern at InternPro. Looking forward to building some amazing NLP-driven chat applications! 🚀 #AI #MachineLearning #Internship'
    },
    {
      id: 2,
      title: 'Successfully concluded Yuvatarang 2K26!',
      date: 'April 2026',
      content: 'Had an amazing time leading the planning and execution of our flagship event at VIIT. Huge shoutout to my incredible team for managing 500+ participants! 🎯 #Leadership #VIIT'
    },
    {
      id: 3,
      title: 'Finished my latest project: StudyXpert',
      date: 'December 2025',
      content: 'Thrilled to share that we just launched StudyXpert, a full-stack learning assistant platform built with Next.js and Node.js. Check it out! 💻 #WebDev #Nextjs'
    }
  ],
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/durga-venkata-prasad-rapeti-b154022b7', icon: '🔗' },
    { name: 'GitHub', url: 'https://github.com/Rdvprasad36', icon: '💻' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Rdv36', icon: '⚡' },
    { name: 'CodeChef', url: 'https://codechef.com/users/rdvprasad36', icon: '👨‍🍳' }
  ],
  education: [
    {
      id: 1,
      institution: "Vignan's Institute of Information Technology (VIIT), Duvvada",
      degree: "Bachelor of Technology in Artificial Intelligence and Data Science (Pursuing) | CGPA: 9.38/10.0",
      date: "Sep 2023 - Present",
      coursework: "Data Structures and Algorithms • Operating Systems and Networks • Database Management Systems • Software Engineering • AI • Machine Learning • Data science • Computer Networks"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Club Manager",
      company: "Student Activity Council (SAC) | VIIT",
      date: "Sep 2025 - Present",
      points: [
        "Lead planning and execution of student activities and flagship events such as “Yuvatarang 2K26,” managing sports and co-curricular events end-to-end, including scheduling, registrations, logistics, and on-ground coordination.",
        "Initiated and led community-focused green initiatives by guiding student project teams to nearby villages for awareness drives and sustainability projects, mobilizing students to practice social responsibility beyond campus."
      ],
      tags: ["Leadership", "Event Management", "Coordination"]
    },
    {
      id: 2,
      role: "AI/ML Intern",
      company: "InternPro",
      date: "Jul 2025 - Aug 2025",
      points: [
        "Built NLP-based AI interview chatbot that simulated technical interviews and automated candidate screening.",
        "Designed and implemented ML and NLP-driven interview simulation features, enabling intelligent question generation and response analysis for more effective candidate assessment."
      ],
      tags: ["AI", "Machine Learning", "NLP", "Python"]
    },
    {
      id: 3,
      role: "Web Development Intern",
      company: "VaultofCodes (Remote)",
      date: "Jun 2025 - Jul 2025",
      points: [
        "Completed a one-month web development internship with a primary focus on front-end development using HTML, CSS, and JavaScript.",
        "Delivered 5 hands-on implementation tasks, translating design requirements into responsive and interactive user interfaces."
      ],
      tags: ["Web Development", "HTML/CSS", "JavaScript"]
    },
    {
      id: 4,
      role: "Machine Learning Intern",
      company: "Google for Developers – EduSkills (Virtual)",
      date: "Jan 2025 - Mar 2025",
      points: [
        "Completed a 10-week AI-ML virtual internship focused on core and applied machine learning.",
        "Explored integrating AI with full stack development to build real-world applications."
      ],
      tags: ["Machine Learning", "Full Stack Integration", "AI"]
    }
  ],
  skillsDetailed: {
    "Programming Languages": ["Python", "C", "C++", "Java", "Javascript"],
    "Machine Learning & AI": ["Machine Learning", "Deep Learning", "Natural Language Processing (NLP)", "Data Analysis", "Model Training", "Model Deployment"],
    "Frameworks & Libraries": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    "Web Development": ["Next.js", "Node.js", "Express.js", "REST API Development", "HTML5", "CSS3"],
    "Cloud & Databases": ["Google Cloud Platform (GCP)", "Supabase", "SQL", "NoSQL", "Database Management Systems (DBMS)"],
    "Tools & DevOps": ["Git", "GitHub", "Docker", "Jupyter Notebook", "VS Code"],
    "AI & Automation Tools": ["LangChain", "n8n", "AI Workflow Automation"],
    "Platforms & Deployment": ["Vercel", "Netlify"],
    "Currently Exploring": ["Agentic AI", "Quantum Computing"]
  },
  projects: [
    {
      id: 1,
      title: "StudyXpert",
      description: "A full-stack learning assistant platform that helps students organize notes, track progress, and access resources from a unified dashboard. Implemented REST APIs and modular components.",
      tech: ["TypeScript", "Next.js", "Node.js", "Vercel"],
      link: "#"
    },
    {
      id: 2,
      title: "BusBuddy",
      description: "A bus-tracking and information platform to help students monitor routes, timings, and availability in real time. Implemented a clean component-based front-end architecture.",
      tech: ["TypeScript", "React", "Webapp"],
      link: "#"
    },
    {
      id: 3,
      title: "BlindGo",
      description: "Assistive system for the visually impaired using smart glasses with real-time audio navigation.",
      tech: ["AI", "Hardware Integration", "Audio Navigation"],
      link: "#"
    },
    {
      id: 4,
      title: "AAA",
      description: "Child-friendly gamified learning and AI-powered storytelling platform.",
      tech: ["AI", "Gamification", "Storytelling"],
      link: "#"
    },
    {
      id: 5,
      title: "Verdex",
      description: "A tool to understand the energy consumption and environmental impact of AI models.",
      tech: ["Green AI", "Analytics", "Optimization"],
      link: "#"
    }
  ],
  achievements: [
    "CodeChef Rating: 1200 | Solved 250+ programming problems",
    "Participated in 30+ competitive programming contests",
    "Top 3 – Quantum Valley Hackathon 2025 (Internal Round)",
    "National Finalist – HackVyuha 2025",
    "Top 10 – Smart Innovation Hackathon 2025, Top 4 - SusHacks’25 VIIT",
    "Winner – Smart India Hackathon 2024 (Internal Round)"
  ]
};

const PortfolioContext = createContext();

export const usePortfolioInfo = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData_v2');
    if (saved) {
      try {
        return { ...defaultData, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
    return defaultData;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(data.theme || 'dark');

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem('portfolioData_v2', JSON.stringify({ ...data, theme }));
    document.documentElement.setAttribute('data-theme', theme);
  }, [data, theme]);

  const login = (user, pass) => {
    if (user === 'Rdv36' && pass === 'Rdv36') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const updateProfile = (key, value) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
  };

  const updateSection = (section, newValue) => {
    setData(prev => ({ ...prev, [section]: newValue }));
  };

  // Insertion Logic
  const insertItem = (arrayName, item, index = -1) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      const newItem = { ...item, id: item.id || Date.now() };
      
      if (index === -1 || index >= newArray.length) {
        newArray.push(newItem);
      } else if (index === 0) {
        newArray.unshift(newItem);
      } else {
        newArray.splice(index, 0, newItem);
      }
      return { ...prev, [arrayName]: newArray };
    });
  };

  const deleteItem = (arrayName, id) => {
    setData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName] || []).filter(item => item.id !== id)
    }));
  };

  const addProject = (project, index = -1) => insertItem('projects', project, index);
  const deleteProject = (id) => deleteItem('projects', id);

  const addExperience = (experience, index = -1) => insertItem('experience', experience, index);
  const deleteExperience = (id) => deleteItem('experience', id);

  const addAchievement = (text, index = -1) => {
    setData(prev => {
      const newArr = [...prev.achievements];
      if (index === -1 || index >= newArr.length) newArr.push(text);
      else if (index === 0) newArr.unshift(text);
      else newArr.splice(index, 0, text);
      return { ...prev, achievements: newArr };
    });
  };

  const deleteAchievement = (index) => {
    setData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };

  const addActivity = (activity) => insertItem('recentActivities', activity);
  const updateActivity = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      recentActivities: prev.recentActivities.map(a => a.id === id ? { ...a, ...updatedFields } : a)
    }));
  };
  const deleteActivity = (id) => deleteItem('recentActivities', id);

  return (
    <PortfolioContext.Provider value={{ 
      data, isAdmin, login, logout, updateProfile, updateSection, 
      theme, toggleTheme, 
      addProject, deleteProject, 
      addExperience, deleteExperience,
      addAchievement, deleteAchievement,
      addActivity, updateActivity, deleteActivity
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
