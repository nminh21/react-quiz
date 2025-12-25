import React from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ userName, onStart }) => {
  return (
    <motion.div 
      className="text-center p-8 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
        <div className="mb-6">
          <motion.div 
            className="text-5xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            💝
          </motion.div>
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Welcome búnnn {userName || 'bạn'}!
          </h1>
          <h2 className="text-2xl font-semibold text-pink-500 mb-6">Ai thông minh hơn NMinhh</h2>
          
          <p className="text-gray-600 mb-8">
            Kẹo trả lời cẩn thận nhaa 💕
          </p>
          
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Bắt Đầu Ngay ❤️
          </motion.button>
          
          <div className="mt-6 text-sm text-pink-400">
            <p>Câu hỏi dễ thôiii</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-400">
        <p>❤️ Sẵn sàng chưaa ❤️</p>
      </div>
    </motion.div>
  );
};

export default Welcome;
