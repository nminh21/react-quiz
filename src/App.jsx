import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Question from "./pages/Question";
import Result from "./pages/Result";

function App() {
  const [step, setStep] = useState("login");
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showHearts, setShowHearts] = useState(false);

  // Add floating hearts effect
  useEffect(() => {
    if (step === 'result') {
      setShowHearts(true);
      const timer = setTimeout(() => setShowHearts(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleQuestionComplete = (answers) => {
    setAnswers(answers);
    setStep("result");
  };

  const handleRestart = () => {
    setStep("login");
    setUser(null);
    setAnswers({});
  };

  // Floating hearts component
  const FloatingHearts = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400 text-2xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 1, 0],
            x: (Math.random() - 0.5) * 100 + (Math.random() * window.innerWidth / 2)
          }}
          transition={{
            duration: Math.random() * 3 + 5,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            delay: Math.random() * 5
          }}
        >
          {['❤️', '💖', '💝', '💘', '💓', '💗', '💕', '💞', '💟'][Math.floor(Math.random() * 9)]}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <div className="relative z-10 w-full max-w-lg">
          {step === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Login onLogin={(userData) => {
                setUser(userData);
                setStep("welcome");
              }} />
            </motion.div>
          )}
          {step === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Welcome onStart={() => setStep("question")} />
            </motion.div>
          )}
          {step === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Question
                userName={user?.name}
                onFinish={handleQuestionComplete}
                onBack={() => setStep("welcome")}
              />
            </motion.div>
          )}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Result
                userName={user?.name}
                userEmail={user?.email}
                answers={answers}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </div>
      </AnimatePresence>

      {/* Floating hearts effect */}
      {showHearts && <FloatingHearts />}

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;
