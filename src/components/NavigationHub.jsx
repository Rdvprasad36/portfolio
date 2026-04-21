import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioInfo } from '../context/PortfolioContext';

export default function NavigationHub() {
  const { data, isLoading } = usePortfolioInfo();
  const profile = data?.profile || {};
  const overview_sections = data?.overview_sections || [];
// const recentActivities = data?.recentActivities || [];

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#1a1a1a',
        color: '#fff'
      }}>
        Loading portfolio data...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#1a1a1a',
      padding: '20px',
      color: '#fff',
      gap: '20px'
    }}>
      {/* Profile */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px'
      }}>
        <img 
          src={profile.image_url || "/profile.jpg"} 
          alt="Profile"
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '5px solid #ccc'
          }} 
        />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 5px 0', color: '#ccc' }}>{profile.name || 'RDV'}</h1>
          <p style={{ fontSize: '18px', margin: 0, color: '#aaa' }}>{profile.role || 'Developer'}</p>
        </div>
      </div>

      {/* Contacts */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontSize: '14px'
      }}>
        {profile.phone && <div>📞 {profile.phone}</div>}
        {profile.email && <div>📧 {profile.email}</div>}
      </div>

      {/* Overview Sections */}
      {overview_sections.length > 0 && (
        <div style={{ maxWidth: '600px', textAlign: 'center' }}>
          {overview_sections.map((section, i) => (
            <p key={i} style={{ margin: '10px 0', color: '#ddd' }}>
              {section.content}
            </p>
          ))}
        </div>
      )}

      {/* Nav Buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center',
        maxWidth: '600px'
      }}>
        <Link to="/skills" style={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #555'
        }}>
          Skills
        </Link>
        <Link to="/projects" style={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #555'
        }}>
          Projects
        </Link>
        <Link to="/experience" style={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #555'
        }}>
          Experience
        </Link>
        <Link to="/achievements" style={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #555'
        }}>
          Achievements
        </Link>
        <Link to="/contact" style={{
          padding: '12px 24px',
          background: '#333',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '8px',
          border: '2px solid #555'
        }}>
          Contact
        </Link>
      </div>

      {/* Exit Button */}
      <Link 
        to="/"
        style={{
          padding: '12px 24px',
          background: '#ff4444',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '25px',
          fontWeight: 'bold'
        }}
      >
        × Home
      </Link>
    </div>
  );
}
