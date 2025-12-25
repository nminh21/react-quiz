import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveLetter } from '../data/questions';

const Result = ({ onFinish }) => {
  useEffect(() => {
    // Add confetti effect when component mounts
    const addConfetti = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        const animation = confetti.animate(
          [
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
          ],
          {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.1, 0.2, 0.3, 1)',
            delay: Math.random() * 2000
          }
        );
        
        animation.onfinish = () => confetti.remove();
        document.body.appendChild(confetti);
      }
    };
    
    addConfetti();
    const interval = setInterval(addConfetti, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        className="relative w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Envelope */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-2xl transform -rotate-3"
          initial={{ rotate: -5, y: 50, opacity: 0 }}
          animate={{ rotate: -3, y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
        
        {/* Letter */}
        <motion.div 
          className="relative bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-pink-100 z-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-pink-300 text-4xl">💝</div>
          <div className="absolute bottom-4 left-4 text-pink-200 text-3xl">✨</div>
          
          {/* Letter content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
              {loveLetter.title}
            </h2>
            
            <div className="prose prose-pink max-w-none text-gray-700 text-lg leading-relaxed">
              {loveLetter.content.split('\n\n').map((paragraph, index) => (
                <motion.p 
                  key={index} 
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + (index * 0.2), duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            <motion.div
              className="mt-10 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              <motion.button
                onClick={onFinish}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Gửi Yêu Thương 💌
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="text-center mt-8 text-pink-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <p>Chạm vào trái tim để gửi yêu thương đến người ấy ❤️</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Result;
