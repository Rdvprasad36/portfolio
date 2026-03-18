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
    summary: "Passionate and detail-oriented computer science student seeking to leverage rigorous academic background, problem-solving skills, and software development experiences to build impactful technology solutions and engage in challenging technical roles."
  },
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/durga-venkata-prasad-rapeti-b154022b7', icon: '🔗' },
    { name: 'GitHub', url: 'https://github.com/Rdvprasad36', icon: '💻' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/Rdv36', icon: '⚡' },
    { name: 'CodeChef', url: 'https://codechef.com/users/rdvprasad36', icon: '👨‍🍳' }
  ],
  skillHighlights: [
    { id: 1, title: "🤖 AI & Data Science", desc: "Specializing in building scalable AI solutions, machine learning models, and real-world data applications." },
    { id: 2, title: "💻 FullStack Development", desc: "Strong foundation in web development, creating intuitive, user-friendly and scalable web applications." }
  ],
  experience: [
    {
      id: 1,
      role: "Software Intern",
      company: "Virtual Labs (Gachibowli, Telangana)",
      date: "January 2024 - April 2024",
      points: [
        "Ensuring website functionality and user experience optimization",
        "Managing content updates and technical maintenance"
      ],
      tags: ["Web Development", "Server", "Full-Stack Development", "Technical Support"]
    },
    {
      id: 2,
      role: "Tech Team Member",
      company: "Club Council, IIIT Hyderabad",
      date: "August 2023 - Present",
      points: [
        "Maintaining clubs websites and servers for various student organizations",
        "Adding new features to improve user engagement and experience"
      ],
      tags: ["Web Development", "Next.js", "Tailwind CSS", "FastApi"]
    }
  ],
  skillsDetailed: {
    "Programming Languages": ["C", "C++", "JavaScript", "Python", "PHP", "TypeScript"],
    "Frontend Development": ["HTML", "React", "Tailwind", "Next.js", "Bootstrap", "Vue.js"],
    "Backend Development": ["FastAPI", "Flask", "Node.js"]
  },
  projects: [
    {
      id: 1,
      title: "Among Us Portfolio",
      description: "A themed portfolio site with CMS capabilities and page routing.",
      tech: ["React", "Framer Motion", "Context API"],
      link: "https://rdvprasad36.dev"
    },
    {
      id: 2,
      title: "AI Chatbot",
      description: "A machine learning based chatbot for student assistance.",
      tech: ["Python", "FastAPI", "NLP"],
      link: "#"
    }
  ],
  achievements: [
    "Google Cloud Skill Badge - AI Fundamentals",
    "LeetCode 500+ Problems Solved",
    "Top 10 in College Hackathon"
  ]
};

const PortfolioContext = createContext();

export const usePortfolioInfo = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolioData');
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
    localStorage.setItem('portfolioData', JSON.stringify({ ...data, theme }));
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

  const addProject = (project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, { ...project, id: Date.now() }] }));
  };

  const deleteProject = (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addAchievement = (text) => {
    setData(prev => ({ ...prev, achievements: [...prev.achievements, text] }));
  };

  const deleteAchievement = (index) => {
    setData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, isAdmin, login, logout, updateProfile, updateSection, 
      theme, toggleTheme, addProject, deleteProject, addAchievement, deleteAchievement 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
