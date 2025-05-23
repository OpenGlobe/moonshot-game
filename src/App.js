import React, { useState, useEffect } from 'react';

export default function MoonshotGame() {
  const problems = [
    { title: "POLICY", description: "Adversarial government policies endanger arts programming, diversity", icon: "🧾" },
    { title: "SPACES", description: "Arts graduates struggle to get people into physical spaces", icon: "🏛️" },
    { title: "FUNDING", description: "Future grads need to navigate federal + traditional funding declines", icon: "💸" },
    { title: "TECHNOLOGY", description: "Rapid tech evolution = unanticipated consequences for arts graduates", icon: "🧠" }
  ];

  const techPolicyEmojis = {
    "Audio": "🎧",
    "Content": "🧠",
    "Feedback": "✋",
    "Capture": "📸",
    "Interfaces": "🎭",
    "Reality": "🌐",
    "Avatars": "👤",
    "Geofencing": "📍",
    "Crowdfunding": "💰",
    "Patronage": "🙌",
    "Scoring": "🏆",
    "Tokenization": "🔗",
    "Carbon": "🌿",
    "Budgeting": "🗳️",
    "Accreditation": "🎓"
  };

  const [screen, setScreen] = useState(1);
  const [problem, setProblem] = useState(null);
  const [techPolicyOptions, setTechPolicyOptions] = useState([]);
  const [selectedTechPolicy, setSelectedTechPolicy] = useState(null);
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

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const renderCard = (item) => (
    <div style={{ marginBottom: '1rem', border: '1px solid #7df9ff', borderRadius: '12px', padding: '1rem', backgroundColor: '#1a1a40', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ fontSize: '2rem' }}>{item.icon || '📘'}</div>
      <strong>{item.title}</strong>
      <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.description}</p>
    </div>
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', background: 'url("https://www.transparenttextures.com/patterns/stardust.png") #0b0c2a', color: '#e0e0ff', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#00ffe7', textShadow: '0 0 5px #00ffe7' }}>🚀 Moonshot Game</h1>
      {/* The rest of your screen rendering logic follows here... */}
    </div>
  );
}
