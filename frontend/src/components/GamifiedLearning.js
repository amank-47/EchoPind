import React, { useState } from 'react';
import './GamifiedLearning.css';

const GamifiedLearning = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [quizProgress, setQuizProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const games = [
    {
      id: 1,
      title: "EcoQuiz Challenge",
      icon: "🧠",
      description: "Test your environmental knowledge with interactive quizzes",
      difficulty: "Easy",
      points: 50,
      type: "quiz"
    },
    {
      id: 2,
      title: "Recycling Sorter",
      icon: "♻️",
      description: "Sort waste items into correct recycling bins",
      difficulty: "Medium",
      points: 75,
      type: "sorting"
    },
    {
      id: 3,
      title: "Carbon Footprint Calculator",
      icon: "👣",
      description: "Calculate and reduce your daily carbon footprint",
      difficulty: "Medium",
      points: 100,
      type: "calculator"
    },
    {
      id: 4,
      title: "Ecosystem Builder",
      icon: "🌿",
      description: "Build balanced ecosystems by connecting food chains",
      difficulty: "Hard",
      points: 150,
      type: "builder"
    },
    {
      id: 5,
      title: "Climate Change Timeline",
      icon: "📈",
      description: "Arrange environmental events in chronological order",
      difficulty: "Medium",
      points: 90,
      type: "timeline"
    },
    {
      id: 6,
      title: "Renewable Energy Puzzle",
      icon: "⚡",
      description: "Connect renewable energy sources to power the eco-village",
      difficulty: "Hard",
      points: 120,
      type: "puzzle"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Weekly Green Challenge",
      description: "Plant 10 virtual trees this week",
      progress: 7,
      total: 10,
      reward: "🌳 Tree Planter Badge",
      daysLeft: 3
    },
    {
      id: 2,
      title: "Water Conservation Master",
      description: "Complete 5 water-saving activities",
      progress: 3,
      total: 5,
      reward: "💧 Water Guardian Badge",
      daysLeft: 5
    },
    {
      id: 3,
      title: "Eco-Knowledge Expert",
      description: "Answer 50 quiz questions correctly",
      progress: 42,
      total: 50,
      reward: "🏆 Knowledge Champion Badge",
      daysLeft: 7
    }
  ];

  const sampleQuestions = [
    {
      question: "Which of these is the most environmentally friendly way to travel short distances?",
      options: ["Car", "Walking/Cycling", "Motorcycle", "Bus"],
      correct: 1,
      explanation: "Walking and cycling produce no emissions and promote personal health!"
    },
    {
      question: "What percentage of Earth's water is fresh water suitable for drinking?",
      options: ["30%", "10%", "3%", "1%"],
      correct: 2,
      explanation: "Only about 3% of Earth's water is fresh water, making conservation crucial!"
    },
    {
      question: "Which renewable energy source is most abundant on Earth?",
      options: ["Wind", "Solar", "Hydroelectric", "Geothermal"],
      correct: 1,
      explanation: "The sun provides more energy in one hour than humans use in a year!"
    }
  ];

  const startQuiz = () => {
    setActiveGame('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setQuizProgress(0);
  };

  const answerQuestion = (selectedAnswer) => {
    const question = sampleQuestions[currentQuestion];
    if (selectedAnswer === question.correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuizProgress(((currentQuestion + 1) / sampleQuestions.length) * 100);
    } else {
      // Quiz completed
      setQuizProgress(100);
      setTimeout(() => {
        setActiveGame(null);
        alert(`Quiz completed! You scored ${score + (selectedAnswer === question.correct ? 1 : 0)}/${sampleQuestions.length}`);
      }, 1000);
    }
  };

  return (
    <div className="gamified-learning">
      <div className="container">
        <div className="page-header">
          <h1>🎮 Learn & Play</h1>
          <p>Master environmental concepts through fun, interactive games and challenges!</p>
        </div>

        {/* Progress Overview */}
        <section className="progress-section">
          <div className="progress-cards grid grid-3">
            <div className="progress-card">
              <div className="progress-icon">📊</div>
              <div className="progress-info">
                <h3>Learning Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '68%' }}></div>
                </div>
                <span className="progress-text">68% Complete</span>
              </div>
            </div>
            <div className="progress-card">
              <div className="progress-icon">⭐</div>
              <div className="progress-info">
                <h3>Total Points</h3>
                <div className="points-display">1,250</div>
                <span className="progress-text">Eco-Warrior Level</span>
              </div>
            </div>
            <div className="progress-card">
              <div className="progress-icon">🏆</div>
              <div className="progress-info">
                <h3>Badges Earned</h3>
                <div className="badges-preview">
                  <span className="mini-badge">🌱</span>
                  <span className="mini-badge">♻️</span>
                  <span className="mini-badge">💧</span>
                  <span className="mini-badge">+5</span>
                </div>
                <span className="progress-text">8 Total Badges</span>
              </div>
            </div>
          </div>
        </section>

        {/* Active Game Display */}
        {activeGame === 'quiz' && (
          <section className="active-game-section">
            <div className="quiz-container">
              <div className="quiz-header">
                <h2>🧠 EcoQuiz Challenge</h2>
                <div className="quiz-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${quizProgress}%` }}></div>
                  </div>
                  <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
                </div>
              </div>
              
              <div className="question-container">
                <h3>{sampleQuestions[currentQuestion].question}</h3>
                <div className="options-grid">
                  {sampleQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className="option-btn"
                      onClick={() => answerQuestion(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Games Grid */}
        <section className="games-section section">
          <div className="section-header">
            <h2>🎯 Interactive Games</h2>
            <p>Choose your environmental adventure!</p>
          </div>
          
          <div className="games-grid grid grid-3">
            {games.map(game => (
              <div key={game.id} className="game-card card">
                <div className="game-header">
                  <div className="game-icon">{game.icon}</div>
                  <div className="game-difficulty">
                    <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className="game-stats">
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <span>{game.points} points</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span>4.8/5 rating</span>
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => game.type === 'quiz' ? startQuiz() : alert(`${game.title} coming soon!`)}
                >
                  Play Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Challenges */}
        <section className="challenges-section section bg-light-green">
          <div className="section-header">
            <h2>🏆 Weekly Challenges</h2>
            <p>Complete challenges to earn special rewards!</p>
          </div>
          
          <div className="challenges-grid grid grid-2">
            {challenges.map(challenge => (
              <div key={challenge.id} className="challenge-card card">
                <div className="challenge-header">
                  <h3>{challenge.title}</h3>
                  <div className="days-left">
                    <span className="timer-icon">⏰</span>
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                </div>
                <p>{challenge.description}</p>
                <div className="challenge-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {challenge.progress}/{challenge.total} completed
                  </span>
                </div>
                <div className="challenge-reward">
                  <span className="reward-icon">🎁</span>
                  <span>Reward: {challenge.reward}</span>
                </div>
                <button className="btn btn-accent">Continue Challenge</button>
              </div>
            ))}
          </div>
        </section>

        {/* Study Materials */}
        <section className="study-materials section">
          <div className="section-header">
            <h2>📚 Study Materials</h2>
            <p>Deepen your knowledge with our curated learning resources</p>
          </div>
          
          <div className="materials-grid grid grid-4">
            <div className="material-card">
              <div className="material-icon">🌍</div>
              <h4>Climate Change Basics</h4>
              <span className="material-type">Interactive Guide</span>
            </div>
            <div className="material-card">
              <div className="material-icon">♻️</div>
              <h4>Recycling Handbook</h4>
              <span className="material-type">PDF Guide</span>
            </div>
            <div className="material-card">
              <div className="material-icon">🌱</div>
              <h4>Sustainable Living Tips</h4>
              <span className="material-type">Video Series</span>
            </div>
            <div className="material-card">
              <div className="material-icon">⚡</div>
              <h4>Renewable Energy Facts</h4>
              <span className="material-type">Infographic</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamifiedLearning;