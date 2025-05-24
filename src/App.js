import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function MoonshotGame() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const problems = [
    { title: "POLICY", description: "Adversarial government policies endanger arts programming, diversity", icon: "🧾" },
    { title: "SPACES", description: "Arts graduates struggle to get people into physical spaces", icon: "🏛️" },
    { title: "FUNDING", description: "Future grads need to navigate federal + traditional funding declines", icon: "💸" },
    { title: "TECHNOLOGY", description: "Rapid tech evolution = unanticipated consequences for arts graduates", icon: "🧠" }
  ];

  const techPolicyEmojis = {
    "Audio": "🎧", "Content": "🧠", "Feedback": "✋", "Capture": "📸", "Interfaces": "🎭", "Reality": "🌐",
    "Avatars": "👤", "Geofencing": "📍", "Crowdfunding": "💰", "Patronage": "🙌", "Scoring": "🏆",
    "Tokenization": "🔗", "Carbon": "🌿", "Budgeting": "🗳️", "Accreditation": "🎓"
  };

  const [screen, setScreen] = useState(1);
  const [problem, setProblem] = useState(null);
  const [techPolicyOptions, setTechPolicyOptions] = useState([]);
  const [selectedTechPolicies, setSelectedTechPolicies] = useState([]);
  const [powerUp, setPowerUp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeLimit, setTimeLimit] = useState(null);

  const drawNewOptions = () => {
    const technologies = [
      { title: "Spatial Audio", description: "Directional, 3D sound to enhance immersive experiences." },
      { title: "Neuro-driven Content", description: "Uses EEG headbands to adapt content based on brain activity." },
      { title: "Haptic Feedback", description: "Wearables that simulate touch to deepen virtual interactions." },
      { title: "Volumetric Capture", description: "3D recordings of people/places to recreate scenes in VR/AR." },
      { title: "Emotion Sensing Interfaces", description: "Interfaces that respond to emotional inputs from users." },
      { title: "Cross-Reality", description: "Blends virtual and real-world environments for seamless interaction." },
      { title: "Avatars", description: "Digital identities with custom expressions, data, and social traits." },
      { title: "Geofencing", description: "Location-aware experiences that change based on user presence." }
    ];
    const policies = [
      { title: "Crowdfunding", description: "Platforms where communities collectively fund creative projects." },
      { title: "Micro-Patronage", description: "Small recurring donations that sustain individual creators." },
      { title: "Human-AI Scoring", description: "Assessment systems that reward effective human-AI collaboration." },
      { title: "Tokenization", description: "Digital ownership models for assets, spaces, or engagement." },
      { title: "Carbon Credits", description: "Funding models that support ecologically positive art projects." },
      { title: "Participatory Budgeting", description: "Citizens help decide how public funds are allocated to the arts." },
      { title: "Digital Venue Accreditation", description: "Recognition for hybrid or fully online cultural spaces." }
    ];
    const combined = [...technologies, ...policies].map(item => {
      const key = Object.keys(techPolicyEmojis).find(k => item.title.includes(k));
      return { ...item, icon: techPolicyEmojis[key] || "🛠️" };
    }).sort(() => 0.5 - Math.random()).slice(0, 3);
    setTechPolicyOptions(combined);
  };

  const drawPowerUp = () => {
    const powerUps = [
      { title: "Museum as a Hub", description: "Reimagine museums as lively community gathering and ideation spaces." },
      { title: "Smart Cities + Public Art", description: "Use art to connect tech innovation, sustainability, and citizens." },
      { title: "Healing through Art", description: "Tap into art’s power to help communities process trauma and grow." },
      { title: "Creative Rebellion", description: "Use radical art practices to challenge status quos and reimagine norms." },
      { title: "Rural Renaissance", description: "Empower rural communities as vital cultural innovation centers." },
      { title: "Arts Curriculum Initiatives", description: "Integrate arts across education to build expressive, creative citizens." },
      { title: "Novel Partnerships", description: "Team up with unlikely allies — like hospitals, farms, or transit hubs." }
    ];
    setPowerUp(powerUps[Math.floor(Math.random() * powerUps.length)]);
  };

  const startTimer = () => {
    setTimeLeft(timeLimit * 60);
    setScreen(4);
  };

  const resetGame = () => {
    setScreen(1);
    setProblem(null);
    setTechPolicyOptions([]);
    setSelectedTechPolicies([]);
    setPowerUp(null);
    setTimeLeft(0);
    setTimeLimit(null);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const renderCard = (item) => (
    <div style={{
      marginBottom: '1rem',
      border: `1px solid ${theme.borderColor}`,
      borderRadius: '12px',
      padding: '1rem',
      backgroundColor: theme.cardBackground,
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      <div style={{ fontSize: '2rem' }}>{item.icon || '📘'}</div>
      <strong>{item.title}</strong>
      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.description}</p>
    </div>
  );

  const buttonStyle = {
    backgroundColor: theme.buttonBackground,
    color: theme.buttonColor,
    padding: '0.5rem 1rem',
    border: '2px solid currentColor',
    margin: '0.5rem',
    cursor: 'pointer',
    fontFamily: 'inherit'
  };

  return (
    <div style={{
      padding: '2rem',
      fontFamily: theme.fontFamily || 'Arial, sans-serif',
      background: theme.background,
      color: theme.color,
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ color: theme.accent || '#00ffe7' }}>🚀 AAAE 2025 Moonshots!</h1>

      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle Theme
      </button>

      {screen === 1 && (
        <div>
          <h2>Let's get started! First, select a huge problem</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
            justifyItems: 'center'
          }}>
            {problems.map((p, idx) => {
              const isSelected = problem?.title === p.title;
              return (
                <button key={idx} onClick={() => setProblem(p)} style={{
                  ...buttonStyle,
                  width: '100%',
                  maxWidth: '250px',
                  backgroundColor: isSelected ? theme.accent : theme.cardBackground,
                  color: isSelected ? '#000' : theme.color,
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem' }}>{p.icon}</div>
                  <strong>{p.title}</strong>
                  <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{p.description}</div>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <button disabled={!problem} onClick={() => setScreen(2)} style={buttonStyle}>
              Next
            </button>
          </div>
        </div>
      )}

      {screen === 2 && (
        <div>
          <h2>Choose a time limit</h2>
          {problem && renderCard(problem)}
          {[10, 20, 30].map(min => (
            <button key={min} onClick={() => { setTimeLimit(min); setScreen(3); }} style={buttonStyle}>
              {min} minutes
            </button>
          ))}
          <div>
            <button onClick={() => setScreen(1)} style={buttonStyle}>Back</button>
          </div>
        </div>
      )}

      {screen === 3 && (
        <div>
          <h2>Select one or more Technology/Policy cards</h2>
          {problem && renderCard(problem)}
          <div>
            {techPolicyOptions.length === 0 && drawNewOptions()}
            {techPolicyOptions.map((item, idx) => {
              const isSelected = selectedTechPolicies.some(p => p.title === item.title);
              return (
                <button key={idx} onClick={() => {
                  if (isSelected) {
                    setSelectedTechPolicies(selectedTechPolicies.filter(p => p.title !== item.title));
                  } else {
                    setSelectedTechPolicies([...selectedTechPolicies, item]);
                  }
                }} style={{
                  ...buttonStyle,
                  width: '250px',
                  textAlign: 'left',
                  backgroundColor: isSelected ? theme.accent : theme.cardBackground,
                  color: isSelected ? '#000' : theme.color,
                  borderRadius: '12px'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.description}</div>
                </button>
              );
            })}
          </div>
          <div>
            <button onClick={drawNewOptions} style={buttonStyle}>Reshuffle</button>
            <button disabled={selectedTechPolicies.length === 0} onClick={startTimer} style={buttonStyle}>Start Game</button>
          </div>
          <div>
            <button onClick={() => setScreen(2)} style={buttonStyle}>Back</button>
          </div>
        </div>
      )}

      {screen === 4 && (
        <div>
          <h2>🚀 Your Moonshot Challenge</h2>
          {problem && renderCard(problem)}
          {selectedTechPolicies.map((card, idx) => (
            <div key={idx}>{renderCard(card)}</div>
          ))}
          {timeLeft > 0 && (
            <div style={{ fontSize: '1.5rem', marginTop: '1rem', color: theme.accent }}>
              ⏱ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
          <div style={{ marginTop: '2rem' }}>
            {!powerUp ? (
              <button onClick={drawPowerUp} style={buttonStyle}>Need a Power-Up?</button>
            ) : (
              <div style={{
                marginTop: '1rem',
                textAlign: 'left',
                maxWidth: '400px',
                margin: '1rem auto',
                border: `1px solid ${theme.borderColor}`,
                borderRadius: '12px',
                padding: '1rem',
                backgroundColor: theme.cardBackground
              }}>
                <h3 style={{ color: theme.accent }}>Power-Up:</h3>
                <p><strong>{powerUp.title}</strong></p>
                <p>{powerUp.description}</p>
                <button onClick={drawPowerUp} style={buttonStyle}>Try Another</button>
              </div>
            )}
          </div>
          <button onClick={resetGame} style={buttonStyle}>Reset Game</button>
        </div>
      )}
    </div>
  );
}
