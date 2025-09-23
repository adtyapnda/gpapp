import React, { useState, useEffect } from 'react';
import { Camera, Trophy, Leaf, QrCode, Gift, Users, History, User, ChevronRight, Star, Award, Recycle, Coffee, BookOpen, Ticket, ArrowLeft, Check, X } from 'lucide-react';

const GreenPointsApp = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userPoints, setUserPoints] = useState(245);
  const [showConfetti, setShowConfetti] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [scanningQR, setScanningQR] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRedemptionQR, setShowRedemptionQR] = useState(false);
  const [activeTab, setActiveTab] = useState('individual');

  const rewards = [
    { id: 1, name: 'Canteen 20% Off', category: 'food', points: 50, icon: Coffee, color: 'bg-orange-100 text-orange-600' },
    { id: 2, name: 'Free Notebook', category: 'stationery', points: 80, icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'VIP Event Entry', category: 'events', points: 150, icon: Ticket, color: 'bg-purple-100 text-purple-600' },
    { id: 4, name: 'Pizza Combo', category: 'food', points: 120, icon: Coffee, color: 'bg-red-100 text-red-600' },
    { id: 5, name: 'Eco Bag', category: 'stationery', points: 60, icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { id: 6, name: 'Concert Pass', category: 'events', points: 200, icon: Ticket, color: 'bg-indigo-100 text-indigo-600' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 1250, dept: 'Computer Science', badge: 'Zero-Waste Hero' },
    { rank: 2, name: 'Alex Kumar', points: 1180, dept: 'Mechanical Eng', badge: 'Plastic Smasher' },
    { rank: 3, name: 'Maya Patel', points: 950, dept: 'Environmental Sci', badge: 'Eco Champion' },
    { rank: 4, name: 'You', points: userPoints, dept: 'Computer Science', badge: 'Green Rookie' },
    { rank: 5, name: 'John Smith', points: 220, dept: 'Business Admin', badge: 'Green Rookie' }
  ];

  const teamLeaderboard = [
    { rank: 1, name: 'Computer Science', points: 12500, members: 45 },
    { rank: 2, name: 'Mechanical Engineering', points: 11200, members: 38 },
    { rank: 3, name: 'Environmental Science', points: 9800, members: 28 }
  ];

  const badges = [
    { name: 'Green Rookie', desc: 'Started your eco journey', unlocked: true, icon: '🌱' },
    { name: 'Plastic Smasher', desc: 'Recycled 50+ plastic items', unlocked: false, icon: '♻️' },
    { name: 'Eco Champion', desc: 'Reach 500 GreenPoints', unlocked: false, icon: '🏆' },
    { name: 'Zero-Waste Hero', desc: 'Recycled for 30 days straight', unlocked: false, icon: '⭐' }
  ];

  const recyclingHistory = [
    { date: '2025-09-23', type: 'Plastic Bottle', points: 10, bin: 'BIN-CLG-2025-001' },
    { date: '2025-09-22', type: 'Paper Cup', points: 5, bin: 'BIN-CLG-2025-003' },
    { date: '2025-09-21', type: 'Aluminum Can', points: 15, bin: 'BIN-CLG-2025-002' },
    { date: '2025-09-20', type: 'Plastic Bottle', points: 10, bin: 'BIN-CLG-2025-001' }
  ];

  const handleScanQR = () => {
    setScanningQR(true);
    setTimeout(() => {
      setScanningQR(false);
      setShowConfetti(true);
      setUserPoints(prev => prev + 10);
      setTimeout(() => setShowConfetti(false), 3000);
      setCurrentScreen('home');
    }, 2000);
  };

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedemptionQR(true);
      setUserPoints(prev => prev - reward.points);
      setTimeout(() => {
        setShowRedemptionQR(false);
        setSelectedReward(null);
      }, 10000);
    }
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col justify-center p-6">
      <div className="text-center mb-8">
        <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">GreenPoints</h1>
        <p className="text-gray-600">Turn waste into rewards</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 transition-colors"
        >
          Sign in with College Email
        </button>
        <button
          onClick={() => setCurrentScreen('onboarding')}
          className="w-full border-2 border-green-600 text-green-600 py-4 rounded-2xl font-semibold text-lg hover:bg-green-50 transition-colors"
        >
          Guest/Event Pass
        </button>
      </div>
    </div>
  );

  const OnboardingScreen = () => {
    const slides = [
      {
        icon: QrCode,
        title: "Scan bin QR → Drop waste → Earn points",
        desc: "Find any GreenPoints bin, scan the QR code, and dispose your recyclable waste responsibly."
      },
      {
        icon: Gift,
        title: "Redeem instantly in canteen & stores",
        desc: "Use your earned points for food discounts, stationery, and exclusive event perks."
      },
      {
        icon: Trophy,
        title: "Climb the leaderboard & win badges",
        desc: "Compete with friends, unlock achievements, and become the ultimate eco champion!"
      }
    ];

    const currentSlide = slides[onboardingStep];
    const Icon = currentSlide.icon;

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Icon className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentSlide.title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{currentSlide.desc}</p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-center space-x-2 mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === onboardingStep ? 'bg-green-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-4">
            {onboardingStep > 0 && (
              <button
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (onboardingStep < slides.length - 1) {
                  setOnboardingStep(onboardingStep + 1);
                } else {
                  setCurrentScreen('home');
                }
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold"
            >
              {onboardingStep < slides.length - 1 ? 'Next' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-white text-2xl font-bold">Good Morning!</h1>
            <p className="text-green-100">Ready to go green today?</p>
          </div>
          <button
            onClick={() => setCurrentScreen('profile')}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">GreenPoints Balance</span>
            <span className="text-white text-2xl font-bold">{userPoints}</span>
          </div>
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white rounded-full h-2" 
              style={{width: `${Math.min((userPoints / 500) * 100, 100)}%`}}
            ></div>
          </div>
          <p className="text-green-100 text-sm">{500 - userPoints} pts to Eco Champion badge</p>
        </div>
      </div>
      
      <div className="p-6 -mt-6">
        <button
          onClick={() => setCurrentScreen('scan')}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg mb-6 flex items-center justify-center space-x-2 shadow-lg"
        >
          <Camera className="w-6 h-6" />
          <span>📷 Scan Bin QR</span>
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('rewards')}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
          >
            <Gift className="w-8 h-8 text-orange-500" />
            <span className="font-semibold text-gray-800">Rewards Store</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('leaderboard')}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2"
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="font-semibold text-gray-800">Leaderboard</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('history')}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center space-y-2 col-span-2"
          >
            <History className="w-8 h-8 text-blue-500" />
            <span className="font-semibold text-gray-800">My Recycling History</span>
          </button>
        </div>
      </div>
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-green-600 text-white p-8 rounded-2xl shadow-2xl text-center animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">✅ 10 GreenPoints earned!</h3>
            <p className="text-green-100">Great job recycling!</p>
          </div>
        </div>
      )}
    </div>
  );

  const ScanScreen = () => (
    <div className="min-h-screen bg-black relative">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => setCurrentScreen('home')}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>
      
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-64 h-64 border-4 border-white rounded-3xl relative overflow-hidden">
            <div className="absolute inset-4 border-2 border-green-400 rounded-2xl"></div>
            {scanningQR && (
              <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-400 rounded-full animate-spin border-t-transparent"></div>
              </div>
            )}
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleScanQR}
              disabled={scanningQR}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <Camera className="w-8 h-8 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-center">
          <p className="text-white text-lg mb-2">Position QR code inside the frame</p>
          <p className="text-gray-300">Each bin has a unique time-bound QR code</p>
        </div>
      </div>
    </div>
  );

  const RewardsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-6 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Rewards Store</h1>
        </div>
        <div className="bg-green-100 p-3 rounded-xl">
          <p className="text-green-800 font-semibold">Your Balance: {userPoints} GreenPoints</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {rewards.map((reward) => {
            const Icon = reward.icon;
            const canAfford = userPoints >= reward.points;
            
            return (
              <div key={reward.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${reward.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{reward.name}</h3>
                      <p className="text-green-600 font-bold">{reward.points} pts</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      canAfford
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {showRedemptionQR && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">Redemption QR Code</h3>
            <div className="w-48 h-48 mx-auto bg-gray-900 rounded-xl mb-4 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-white" />
            </div>
            <p className="text-gray-600 mb-2">Show this to the vendor</p>
            <p className="text-sm text-red-500 font-semibold">Expires in 5 minutes</p>
            <p className="text-lg font-bold mt-2">{selectedReward.name}</p>
            <button
              onClick={() => {
                setShowRedemptionQR(false);
                setSelectedReward(null);
              }}
              className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const LeaderboardScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-6 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('individual')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'individual'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'team'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Teams
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'individual' ? (
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div key={index} className={`bg-white rounded-xl p-4 shadow-sm border ${
                user.name === 'You' ? 'border-green-500 bg-green-50' : 'border-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${user.name === 'You' ? 'text-green-800' : 'text-gray-800'}`}>
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500">{user.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{user.points} pts</p>
                    <p className="text-xs text-gray-500">{user.badge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {teamLeaderboard.map((team, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {team.rank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{team.name}</h3>
                      <p className="text-sm text-gray-500">{team.members} members</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">{team.points.toLocaleString()} pts</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-blue-800 text-sm font-semibold text-center">
            🏆 Weekly reset in 3 days - Keep climbing!
          </p>
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen('home')}
            className="p-2 -ml-2 rounded-full hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Profile & History</h1>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-bold">You</h2>
            <p className="text-green-100">Computer Science</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <Recycle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">12 kg</p>
            <p className="text-sm text-gray-500">Waste Recycled</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">3</p>
            <p className="text-sm text-gray-500">Trees Saved</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Your Badges</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <div key={index} className={`p-3 rounded-lg border ${
                badge.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-2xl mb-1">{badge.icon}</div>
                <h4 className={`font-semibold text-sm ${badge.unlocked ? 'text-green-800' : 'text-gray-400'}`}>
                  {badge.name}
                </h4>
                <p className={`text-xs ${badge.unlocked ? 'text-green-600' : 'text-gray-400'}`}>
                  {badge.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setCurrentScreen('history')}
          className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <History className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-gray-800">View Full History</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );

  const HistoryScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-6 border-b">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentScreen('profile')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Recycling History</h1>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {recyclingHistory.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.type}</h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <p className="text-xs text-gray-400">Bin: {item.bin}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">+{item.points} pts</p>
                  <Check className="w-5 h-5 text-green-500 ml-auto mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
          <p className="text-green-800 font-semibold">🌱 Your recycling = 3 trees saved!</p>
          <p className="text-green-600 text-sm mt-1">Keep up the great work!</p>
        </div>
      </div>
    </div>
  );

  const screens = {
    login: LoginScreen,
    onboarding: OnboardingScreen,
    home: HomeScreen,
    scan: ScanScreen,
    rewards: RewardsScreen,
    leaderboard: LeaderboardScreen,
    profile: ProfileScreen,
    history: HistoryScreen
  };

  const CurrentScreen = screens[currentScreen];

  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl min-h-screen font-sans">
      <CurrentScreen />
    </div>
  );
};

export default GreenPointsApp;