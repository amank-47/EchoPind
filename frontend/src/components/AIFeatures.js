import React, { useState } from 'react';
import './AIFeatures.css';

const AIFeatures = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "🌱 Hi there! I'm your EcoPind AI Assistant. How can I help you make more sustainable choices today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activePlant, setActivePlant] = useState(null);

  const plantDatabase = [
    {
      id: 1,
      name: 'Tulsi (Holy Basil)',
      scientificName: 'Ocimum sanctum',
      icon: '🌿',
      difficulty: 'Easy',
      benefits: ['Air purification', 'Medicinal properties', 'Spiritual significance'],
      care: {
        water: 'Daily in summer, alternate days in winter',
        sunlight: '4-6 hours direct sunlight',
        soil: 'Well-draining potting mix',
        temperature: '20-30°C optimal'
      },
      seasons: ['Spring', 'Summer', 'Monsoon'],
      tips: 'Pinch flowers to encourage leaf growth. Use leaves for tea!'
    },
    {
      id: 2,
      name: 'Neem Tree',
      scientificName: 'Azadirachta indica',
      icon: '🌳',
      difficulty: 'Easy',
      benefits: ['Natural pesticide', 'Air purification', 'Medicinal uses'],
      care: {
        water: 'Water when soil feels dry',
        sunlight: 'Full sun to partial shade',
        soil: 'Sandy, well-draining soil',
        temperature: '15-35°C'
      },
      seasons: ['All year round'],
      tips: 'Very drought resistant once established. Great for beginners!'
    },
    {
      id: 3,
      name: 'Mint',
      scientificName: 'Mentha',
      icon: '🌱',
      difficulty: 'Easy',
      benefits: ['Culinary use', 'Natural fragrance', 'Insect repellent'],
      care: {
        water: 'Keep soil moist but not waterlogged',
        sunlight: 'Partial shade to full sun',
        soil: 'Rich, moist soil',
        temperature: '18-25°C'
      },
      seasons: ['Spring', 'Summer', 'Monsoon'],
      tips: 'Spreads quickly - use containers to control growth!'
    }
  ];

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simple AI response simulation
    const botResponse = {
      id: chatMessages.length + 2,
      type: 'bot',
      message: generateAIResponse(newMessage),
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages([...chatMessages, userMessage, botResponse]);
    setNewMessage('');
  };

  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('plant') || message.includes('grow')) {
      return "🌱 Great question about plants! I'd recommend starting with easy-to-grow plants like Tulsi or Mint. Check out our SohnaPind plantation guide for detailed care instructions!";
    } else if (message.includes('water') || message.includes('irrigation')) {
      return "💧 Water conservation is crucial! Try collecting rainwater, using drip irrigation, or watering early morning to reduce evaporation. Every drop counts!";
    } else if (message.includes('recycle') || message.includes('waste')) {
      return "♻️ Excellent! Remember the 3 R's: Reduce, Reuse, Recycle. Start by reducing plastic use, reusing containers, and properly sorting waste for recycling.";
    } else if (message.includes('energy') || message.includes('electric')) {
      return "⚡ Energy conservation tips: Use LED bulbs, unplug devices when not in use, and consider solar panels if possible. Small changes make a big difference!";
    } else {
      return "🤖 I'm here to help with all your environmental questions! Ask me about plants, recycling, energy conservation, or any eco-friendly tips you need.";
    }
  };

  return (
    <div className="ai-features">
      <div className="container">
        <div className="page-header">
          <h1>🤖 AI-Powered Learning</h1>
          <p>Get personalized guidance with our smart environmental assistants</p>
        </div>

        <div className="ai-features-grid">
          {/* SohnaPind Plantation Guide */}
          <section className="plantation-guide">
            <div className="section-header">
              <div className="feature-icon">🌱</div>
              <div>
                <h2>SohnaPind Plantation Guide</h2>
                <p>AI-powered plant recommendations for your local environment</p>
              </div>
            </div>

            <div className="plant-recommendations">
              <h3>🌿 Recommended Plants for You</h3>
              <div className="plants-grid grid grid-3">
                {plantDatabase.map(plant => (
                  <div 
                    key={plant.id} 
                    className={`plant-card card ${activePlant?.id === plant.id ? 'active' : ''}`}
                    onClick={() => setActivePlant(plant)}
                  >
                    <div className="plant-header">
                      <div className="plant-icon">{plant.icon}</div>
                      <span className={`difficulty-badge ${plant.difficulty.toLowerCase()}`}>
                        {plant.difficulty}
                      </span>
                    </div>
                    <h4>{plant.name}</h4>
                    <p className="scientific-name">{plant.scientificName}</p>
                    <div className="plant-benefits">
                      {plant.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="benefit-tag">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    <button className="btn btn-secondary btn-small">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Plant Detail Modal */}
            {activePlant && (
              <div className="plant-detail-overlay" onClick={() => setActivePlant(null)}>
                <div className="plant-detail-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>{activePlant.icon} {activePlant.name}</h3>
                    <button 
                      className="close-btn"
                      onClick={() => setActivePlant(null)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="modal-content">
                    <div className="plant-info-section">
                      <h4>🌱 Care Instructions</h4>
                      <div className="care-grid">
                        <div className="care-item">
                          <span className="care-icon">💧</span>
                          <div>
                            <strong>Watering:</strong>
                            <p>{activePlant.care.water}</p>
                          </div>
                        </div>
                        <div className="care-item">
                          <span className="care-icon">☀️</span>
                          <div>
                            <strong>Sunlight:</strong>
                            <p>{activePlant.care.sunlight}</p>
                          </div>
                        </div>
                        <div className="care-item">
                          <span className="care-icon">🌍</span>
                          <div>
                            <strong>Soil:</strong>
                            <p>{activePlant.care.soil}</p>
                          </div>
                        </div>
                        <div className="care-item">
                          <span className="care-icon">🌡️</span>
                          <div>
                            <strong>Temperature:</strong>
                            <p>{activePlant.care.temperature}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="plant-info-section">
                      <h4>✨ Benefits</h4>
                      <div className="benefits-list">
                        {activePlant.benefits.map((benefit, index) => (
                          <span key={index} className="benefit-tag-large">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="plant-info-section">
                      <h4>📅 Best Seasons</h4>
                      <div className="seasons-list">
                        {activePlant.seasons.map((season, index) => (
                          <span key={index} className="season-tag">
                            {season}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ai-tip">
                      <div className="tip-icon">💡</div>
                      <div>
                        <strong>AI Tip:</strong>
                        <p>{activePlant.tips}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* AI Chatbot */}
          <section className="ai-chatbot">
            <div className="section-header">
              <div className="feature-icon">💬</div>
              <div>
                <h2>EcoBot Assistant</h2>
                <p>24/7 AI support for all your environmental questions</p>
              </div>
            </div>

            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-avatar">
                      {message.type === 'user' ? '👤' : '🤖'}
                    </div>
                    <div className="message-content">
                      <p>{message.message}</p>
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask me anything about environmental sustainability..."
                  className="chat-input"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="send-btn">
                  📤
                </button>
              </div>

              <div className="quick-questions">
                <p>Quick questions:</p>
                <div className="quick-buttons">
                  <button 
                    className="quick-btn"
                    onClick={() => setNewMessage('How do I start composting?')}
                  >
                    🗂️ Composting
                  </button>
                  <button 
                    className="quick-btn"
                    onClick={() => setNewMessage('What plants are easy to grow?')}
                  >
                    🌱 Easy Plants
                  </button>
                  <button 
                    className="quick-btn"
                    onClick={() => setNewMessage('How can I save energy at home?')}
                  >
                    ⚡ Energy Tips
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* AI Features Overview */}
        <section className="ai-features-overview section bg-light-green">
          <div className="section-header text-center">
            <h2>🔮 Smart Environmental Intelligence</h2>
            <p>Discover how AI enhances your eco-learning journey</p>
          </div>

          <div className="features-grid grid grid-3">
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>Personalized Recommendations</h3>
              <p>AI analyzes your location, climate, and preferences to suggest the best plants and eco-practices for you.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Progress Tracking</h3>
              <p>Monitor your environmental impact with AI-powered insights and get suggestions for improvement.</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🔍</div>
              <h3>Instant Problem Solving</h3>
              <p>Get immediate help with plant diseases, recycling questions, and sustainability challenges.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIFeatures;