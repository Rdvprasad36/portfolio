import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// No hardcoded defaults - all data from DB


const PortfolioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolioInfo = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: null,
    socials: [],
    overview_sections: [],
    education: [],
    skills: [],
    posts: [],
    experience: [],
    projects: [],
    achievements: [],
    recentActivities: []
  });


  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Fetch dynamic data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch conditionally, fallback to default if fails (e.g. Supabase not setup yet)
        const fetches = [
          supabase.from('profile').select('*').single(),
          supabase.from('socials').select('*').order('order_num'),
          supabase.from('overview_sections').select('*').order('order_num'),
          supabase.from('education').select('*').order('order_num'),
          supabase.from('skills').select('*').order('order_num'),
          supabase.from('posts').select('*').order('order_num'),
          supabase.from('projects').select('*').order('order_num'),
          supabase.from('experience').select('*').order('order_num'),
          supabase.from('achievements').select('*').order('order_num'),
          supabase.from('activities').select('*').order('id')
        ];
        const results = await Promise.all(fetches.map(p => p.catch(e => ({ data: null, error: e }))));
        const [
          profileRes,
          socialsRes,
          overviewRes,
          educationRes,
          skillsRes,
          postsRes,
          projectsRes,
          experienceRes,
          achievementsRes,
          activitiesRes
        ] = results;



        setData({
          profile: profileRes.data,
          socials: socialsRes.data || [],
          overview_sections: overviewRes.data || [],
          education: educationRes.data || [],
          skills: skillsRes.data || [],
          posts: postsRes.data || [],
          projects: projectsRes.data || [],
          experience: experienceRes.data || [],
          achievements: achievementsRes.data || [],
          recentActivities: activitiesRes.data || []
        });

      } catch (e) {
        console.error("Error fetching from Supabase, operating with fallback data.", e);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  const login = async (email, password) => {
    // Basic fallback if empty credentials provided for local testing (remove in prod)
    if (email === 'Rdv36' && password === 'Rdv36') {
      setIsAdmin(true);
      return true;
    }
    
    // Proper Supabase Auth
    const { data: _data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }
    
    setIsAdmin(true);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };



  const updateProfile = (key, value) => {
    setData(prev => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
    // Future enhancement: Save profile to Supabase as well
  };

  const updateSection = async (section, newValue) => {
    setData(prev => ({ ...prev, [section]: newValue }));
    for (const item of newValue) {
      const { error } = await supabase.from(section).upsert(item);
      if (error) console.error(`${section} update failed:`, error);
    }
  };


  // --- Remote CRUD Operations ---

  const addProject = async (project, index = -1) => {
    // Optimistic update
    const newItem = { ...project, id: Date.now() }; // Temp ID
    setData(prev => {
      const arr = [...prev.projects];
      if (index === -1) arr.push(newItem);
      else arr.splice(index, 0, newItem);
      return { ...prev, projects: arr };
    });

    // Supabase insert
    const { data: inserted, error } = await supabase.from('projects').insert([{
      title: project.title,
      description: project.description,
      tech: project.tech,
      link: project.link
    }]).select().single();
    
    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === newItem.id ? inserted : p)
      }));
    }
  };

  const deleteProject = async (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    await supabase.from('projects').delete().eq('id', id);
  };

  const addExperience = async (exp, index = -1) => {
    const newItem = { ...exp, id: Date.now() };
    setData(prev => {
      const arr = [...prev.experience];
      if (index === -1) arr.push(newItem);
      else arr.splice(index, 0, newItem);
      return { ...prev, experience: arr };
    });

    const { data: inserted, error } = await supabase.from('experience').insert([{
      role: exp.role,
      company: exp.company,
      date: exp.date,
      points: exp.points,
      tags: exp.tags
    }]).select().single();

    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === newItem.id ? inserted : e)
      }));
    }
  };

  const deleteExperience = async (id) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    await supabase.from('experience').delete().eq('id', id);
  };

  const addAchievement = async (text, index = -1) => {
    setData(prev => {
      const arr = [...prev.achievements];
      if (index === -1) arr.push(text);
      else arr.splice(index, 0, text);
      return { ...prev, achievements: arr };
    });

    await supabase.from('achievements').insert([{ content: text }]);
  };

  const deleteAchievement = async (index) => {
    const achievementToDelete = data.achievements[index];
    setData(prev => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
    
    // We try to match by content since array doesn't have IDs local side for achievements yet
    if (achievementToDelete) {
        await supabase.from('achievements').delete().eq('content', achievementToDelete);
    }
  };

  const addActivity = async (activity) => {
    const newItem = { ...activity, id: Date.now() };
    setData(prev => ({ ...prev, recentActivities: [newItem, ...prev.recentActivities] }));

    const { data: inserted, error } = await supabase.from('activities').insert([{
      title: activity.title,
      date: activity.date,
      content: activity.content
    }]).select().single();

    if (!error && inserted) {
      setData(prev => ({
        ...prev,
        recentActivities: prev.recentActivities.map(a => a.id === newItem.id ? inserted : a)
      }));
    }
  };

  const updateActivity = async (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      recentActivities: prev.recentActivities.map(a => a.id === id ? { ...a, ...updatedFields } : a)
    }));

    await supabase.from('activities').update(updatedFields).eq('id', id);
  };

  const deleteActivity = async (id) => {
    setData(prev => ({
      ...prev,
      recentActivities: prev.recentActivities.filter(a => a.id !== id)
    }));
    await supabase.from('activities').delete().eq('id', id);
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, isAdmin, isLoading, login, logout, updateProfile, updateSection, 
      addProject, deleteProject, 
      addExperience, deleteExperience,
      addAchievement, deleteAchievement,
      addActivity, updateActivity, deleteActivity
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};
