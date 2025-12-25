import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';

const Question = ({ onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showWrongAnswerPopup, setShowWrongAnswerPopup] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Function to check if the selected option is correct
  const isAnswerCorrect = (selectedOption) => {
    if (question.correctAnswer === undefined) return true;
    const selectedIndex = question.options.findIndex(opt => opt === selectedOption);
    return selectedIndex === question.correctAnswer;
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Handle answer selection
  const handleAnswer = (option) => {
    // Only update selection if not showing error
    if (!showError) {
      setSelectedOption(option);
    }
  };
  
  // Reset error state when changing selection
  React.useEffect(() => {
    if (selectedOption) {
      setShowError(false);
    }
  }, [selectedOption]);

  // Reset states when question changes
  React.useEffect(() => {
    setSelectedOption('');
    setShowError(false);
  }, [currentQuestion]);

  const handleRetry = () => {
    setShowWrongAnswerPopup(false);
    setSelectedOption('');
    setShowError(false);
  };

  const handleNext = () => {
    const currentQuestionData = questions[currentQuestion];
    
    if (!selectedOption) {
      setShowError(true);
      setErrorMessage('Vui lòng chọn một đáp án!');
      triggerShake();
      return;
    }
    
    const selectedIndex = currentQuestionData.options.findIndex(opt => opt === selectedOption);
    const isCorrect = selectedIndex === currentQuestionData.correctAnswer;
    
    if (!isCorrect) {
      // Show wrong answer popup and reset to first question after a delay
      setShowWrongAnswerPopup(true);
      setTimeout(() => {
        setCurrentQuestion(0);
        setSelectedOption('');
        setShowWrongAnswerPopup(false);
      }, 1500);
      return;
    }
    
    // If we get here, answer is correct
    const updatedAnswers = {
      ...answers,
      [currentQuestionData.id]: selectedOption
    };
    
    if (isLastQuestion) {
      setSuccess(true);
      setShowFinishButton(true);
    } else {
      // Move to next question
      setCurrentQuestion(prev => {
        const nextQuestion = prev + 1;
        return nextQuestion < questions.length ? nextQuestion : prev;
      });
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'multiple': {
        // Split options into two columns
        const firstColumn = question.options.slice(0, 2);
        const secondColumn = question.options.slice(2, 4);
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-3">
              {firstColumn.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-[1.02] ${
                    selectedOption === option
                      ? 'bg-pink-50 border-pink-400 shadow-md -translate-y-0.5'
                      : 'border-pink-100 hover:border-pink-200 bg-white hover:bg-pink-50'
                  }`}
                  onClick={() => handleAnswer(option, index)}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-3">
              {secondColumn.map((option, index) => {
                const optionIndex = index + 2; // Because we're in the second column
                return (
                  <motion.div
                    key={optionIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedOption === option
                        ? 'bg-pink-100 border-pink-400'
                        : 'border-pink-100 hover:border-pink-200'
                    }`}
                    onClick={() => handleAnswer(option, optionIndex)}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{String.fromCharCode(67 + index)}.</span>
                      <span>{option}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      }
      case 'date':
        return (
          <input
            type="date"
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setShowError(false);
            }}
            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent"
          />
        );
      case 'select':
        return (
          <select
            value={selectedOption}
            onChange={(e) => {
              setSelectedOption(e.target.value);
              setShowError(false);
            }}
            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white"
          >
            <option value="">Chọn một lựa chọn...</option>
            {question.options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      case 'promise':
        return (
          <div className="w-full">
            <textarea
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setShowError(false);
              }}
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent min-h-[120px]"
              placeholder="Hãy viết lời hứa của em ở đây..."
            />
            <div className="mt-2 text-sm text-gray-500">
              {selectedOption.length}/500 ký tự
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate progress percentage
  const progress = (currentQuestion / questions.length) * 100;
  const nextProgress = ((currentQuestion + 1) / questions.length) * 100;

  // Decorative floating hearts
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0.3 + Math.random() * 0.4
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, Math.random() * 60 - 30],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );

  // Decorative corner elements
  const CornerDecorations = () => (
    <>
      <div className="fixed top-0 left-0 w-32 h-32 bg-pink-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 right-0 w-48 h-48 bg-rose-100 rounded-full opacity-20 translate-x-1/4 translate-y-1/4"></div>
      <div className="fixed bottom-0 left-0 w-40 h-40 bg-purple-100 rounded-full opacity-20 -translate-x-1/4 translate-y-1/4"></div>
      <div className="fixed top-1/2 right-0 w-24 h-24 bg-yellow-100 rounded-full opacity-20 translate-x-1/2"></div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      <CornerDecorations />
      
      {/* Cute confetti effect when answering last question correctly */}
      {showFinishButton && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: '110vh',
                rotate: Math.random() * 360,
                scale: 0.5 + Math.random(),
                x: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                ease: 'linear',
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {['🎉', '🎊', '💝', '💖', '✨', '🎈', '💌'][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </div>
      )}
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6 bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className="bg-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
          initial={{ width: `${progress}%` }}
          animate={{ width: `${nextProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center text-sm text-pink-500 mb-6">
        Câu {currentQuestion + 1} / {questions.length}
      </div>

      <motion.div 
        key={`question-${currentQuestion}`}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: shake ? [0, -10, 10, -10, 0] : 0,
          boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.1), 0 10px 10px -5px rgba(236, 72, 153, 0.04)'
        }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          x: { type: 'spring', stiffness: 1000, damping: 15 },
          opacity: { duration: 0.3 },
          y: { duration: 0.3 },
          scale: { type: 'spring', stiffness: 200, damping: 10 }
        }}
        className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-100 relative z-10"
      >
        {/* Decorative corner elements */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-pink-300 rounded-tl-xl"></div>
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-pink-300 rounded-tr-xl"></div>
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-pink-300 rounded-bl-xl"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-pink-300 rounded-br-xl"></div>
        <div className="text-center mb-8 relative">
          <motion.div 
            className="inline-block"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          >
            <span className="text-5xl">{question.emoji}</span>
          </motion.div>
          <h2 className="text-2xl font-bold text-pink-700 mt-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            {question.question}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200 mx-auto mt-4 rounded-full"></div>
          <div className="mt-3 text-pink-500 font-medium">
            <span className="bg-pink-100 px-3 py-1 rounded-full text-sm">
              Câu {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`question-content-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: 0.1,
                duration: 0.3 
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -20,
              transition: { duration: 0.2 }
            }}
            className="mb-6"
          >
            {success ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div 
                  className="text-5xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: 1,
                    repeatType: 'reverse'
                  }}
                >
                  BIngoo! 🎉
                </motion.div>
                <p className="text-pink-600 mb-6">Chuẩn bị mở thư thôi nào!</p>
              </motion.div>
            ) : (
              <>
                {renderInput()}
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start"
                  >
                    <span className="mr-2">❌</span>
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center">
          <motion.button
            onClick={handleNext}
            disabled={!selectedOption && question.type !== 'promise'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-3 px-8 rounded-full font-semibold text-white shadow-lg transition-all ${
              selectedOption || question.type === 'promise'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isLastQuestion ? 'Xem Kết Quả 💌' : 'Tiếp Theo ➡️'}
          </motion.button>
        </div>
        
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-pink-500 h-2.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          {currentQuestion + 1} / {questions.length}
        </p>

        {/* Finish Button (for last question) */}
        {showFinishButton && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chúc mừng!</h3>
              <p className="text-gray-600 mb-6">Bạn đã trả lời đúng tất cả câu hỏi!</p>
              <button
                onClick={() => onFinish(answers)}
                className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-full transition-all transform hover:scale-105"
              >
                Mở thư 💌
              </button>
            </motion.div>
          </div>
        )}

        {/* Wrong Answer Popup */}
        {showWrongAnswerPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl"
            >
              <div className="text-center">
                <div className="text-5xl mb-4">❌</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ôi không!</h3>
                <p className="text-gray-600 mb-6">{question.retryMessage}</p>
                <button
                  onClick={handleRetry}
                  className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                >
                  Thử lại
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Question;
