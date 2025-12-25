import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cute rabbit SVG component
const Rabbit = ({ position = 'left' }) => (
  <motion.div 
    className={`absolute ${position === 'left' ? 'left-0' : 'right-0'} bottom-0 w-32 h-40 z-0`}
    initial={{ y: 20, opacity: 0 }}
    animate={{ 
      y: 0, 
      opacity: 1,
      transition: { 
        y: { duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' } 
      } 
    }}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Body */}
      <circle cx="100" cy="120" r="50" fill="white" stroke="#f3a4b5" strokeWidth="2" />
      
      {/* Head */}
      <circle cx="100" cy="80" r="40" fill="white" stroke="#f3a4b5" strokeWidth="2" />
      
      {/* Ears */}
      <path d="M70 40 Q85 15 100 30 Q115 15 130 40 L120 60 Q100 50 80 60 Z" fill="white" stroke="#f3a4b5" strokeWidth="2" />
      
      {/* Eyes */}
      <circle cx="85" cy="75" r="5" fill="#333" />
      <circle cx="115" cy="75" r="5" fill="#333" />
      
      {/* Nose */}
      <circle cx="100" cy="90" r="3" fill="pink" />
      
      {/* Mouth */}
      <path d="M95 100 Q100 110 105 100" fill="none" stroke="pink" strokeWidth="2" strokeLinecap="round" />
      
      {/* Cheeks */}
      <circle cx="75" cy="85" r="8" fill="#ffd6e0" />
      <circle cx="125" cy="85" r="8" fill="#ffd6e0" />
    </svg>
  </motion.div>
);

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    if (name !== 'MTranggg' || password !== 'yeunminh21') {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      return;
    }
    onLogin({ name });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 p-4 overflow-hidden">
      {/* Decorative rabbits */}
      <Rabbit position="left" />
      <Rabbit position="right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-rose-100 rounded-full opacity-30"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-pink-600 mb-2">Chào mừng bạn!</h1>
            <p className="text-gray-600">Đăng nhập để bắt đầu trò chơi</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all mb-4"
                placeholder="Nhập tên đăng nhập"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Nhập mật khẩu"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Bắt đầu trò chơi
            </motion.button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Nhập tên đăng nhập và mật khẩu để tiếp tục</p>
          </div>
        </div>
      </motion.div>
      
      {/* Snowflakes animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: '110vh',
              x: `${(Math.random() - 0.5) * 100}px`,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            ❄️
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Login;
