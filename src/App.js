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
      { title: "Spatial Audio", description: "Directional, 3D sound." },
      { title: "Neuro-driven Content", description: "Uses EEG headbands to adapt content based on brain activity." },
      { title: "Haptic Feedback", description: "Gloves, suits or surfaces that simulate touch." },
      { title: "Volumetric Capture", description: "3D renderings of people or places." },
      { title: "Emotion Sensing Interfaces", description: "Wearables or cameras that read facial expressions, heart rate or other signals." },
      { title: "Cross-Reality", description: "Platforms that connect users across physical and virtual worlds" },
      { title: "Avatars", description: "Digital identities with viewing histories, social badges, tokens." },
      { title: "Geofencing", description: "Experiences based on physical location." },
      { title: "HMDs", description: "Head mounted devices like Apple Vision Pro, Meta Quest." }
    
    ];
    const policies = [
      { title: "Crowdfunding", description: "Collective funding pots managed by communities." },
      { title: "Micro-Patronage", description: "Pay small amounts for individual access, small donations." },
      { title: "Human-AI Scoring", description: "Credentialing rewards based on skillful AI augmentation over automation." },
      { title: "Tokenization", description: "Digital ownership models for assets, spaces, or engagement." },
      { title: "Carbon Credits", description: "Funding for work that contributes to ecological causes." },
      { title: "Participatory Budgeting", description: "Citizens vote on how to allocate public funding." },
      { title: "Digital Venue Accreditation", description: "Recognizing online or hybrid spaces as official venues." },
      { title: "Acceptable Use", description: "Certification for ethical use, attribution and IP." },
      { title: "AI Screening", description: "Vetting based on novelty and quality." },
      { title: "Royalties Engine", description: "Automated / fractional payment systems." },
      { title: "Co-op Ownership", description: "Co-ownership of physical spaces." },
      { title: "IP Revenue Sharing", description: "Owners and patrons share equity." },
      { title: "Subscriptions", description: "Hospitality memberships ties to brands or financial services." },
      { title: "GenAI Royalties", description: "Compensation for work used to train models." }
    ];
    const combined = [...technologies, ...policies].map(item => {
      const key = Object.keys(techPolicyEmojis).find(k => item.title.includes(k));
      return { ...item, icon: techPolicyEmojis[key] || "🛠️" };
    }).sort(() => 0.5 - Math.random()).slice(0, 3);
    setTechPolicyOptions(combined);
  };

  const drawPowerUp = () => {
    const powerUps = [
      { title: "Museum as a Hub", description: "Rethinking public engagement spaces." },
      { title: "Smart Cities + Public Art", description: "Art as a bridge between tech, sustainability + communities." },
      { title: "Healing", description: "Trauma-informed arts, memorials as spaces." },
      { title: "Creative Rebellion", description: "Arts to address contemporary challenges." },
      { title: "Rural Renaissance", description: "Rural arts organizations as community hubs." },
      { title: "Arts Curriculum Initiatives", description: "Empowering curriculum through arts." },
      { title: "Novel Partnerships", description: "Transactional or cooperatives with non-arts organizations." },
      { title: "Scale", description: "Apply a local, regional, country or global perspective." },
      { title: "Research Lab", description: "Arts + placemaking + community." },
      { title: "Dartmoore State of Mind", description: "Connection + creativity through arts." },
      { title: "Data Science", description: "Decision making through data." },
      { title: "ABCE", description: "Arts-based community engagement." },
      { title: "Preservation", description: "Restoring and protecting spaces for future generations." },
      { title: "University Art Districts", description: "Creative + knowledge economies." },
      { title: "Interplay", description: "Unlocking the wisdom of the body." },
      { title: "Going Solo", description: "Novel experiences as a one-person program." }
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
      borderRadius: '8px',
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
          <h2>Let's get started! First, select a huge problem.</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1rem',
            justifyItems: 'center',
            justifyContent: 'center',
            maxWidth: '1000px',
            margin: '0 auto'
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

    {timeLimit && (
      <div style={{
        border: '1px dashed #7df9ff',
        padding: '1rem',
        borderRadius: '12px',
        backgroundColor: '#1a1a40',
        maxWidth: '300px',
        margin: '1rem auto'
      }}>
        ⏱️ You selected <strong>{timeLimit} minutes</strong>
      </div>
    )}

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
          <h3 style={{ color: theme.accent }}>AAAE Power-Up:</h3>
          <p><strong>{powerUp.title}</strong></p>
          <p>{powerUp.description}</p>
          <button onClick={drawPowerUp} style={buttonStyle}>Try Another</button>
        </div>
      )}
    </div>
    <button onClick={resetGame} style={buttonStyle}>Start Over</button>
  </div>
)}

</div>
);
}

