import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaCode,
  FaGithub,
  FaLinkedin,
  FaFileDownload,
} from "react-icons/fa";

const ChatbotContainer = styled.div`
  position: fixed;
  top: 6rem; /* Position below header */
  right: 2rem;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 5rem;
    right: 1rem;
  }
`;

const ChatbotButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  top: 70px; /* Position below the chat button */
  right: 0;
  width: 330px;
  max-height: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(10px)"};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s ease;

  @media (max-width: 768px) {
    width: calc(100vw - 2rem);
    right: 0;
    max-height: 60vh;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  min-height: 300px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

const Message = styled.div`
  max-width: 85%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
  background: ${(props) =>
    props.$isUser
      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      : "white"};
  color: ${(props) => (props.$isUser ? "white" : "#1f2937")};
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  border: ${(props) => (!props.$isUser ? "1px solid #e5e7eb" : "none")};
  font-size: 0.9rem;
  box-shadow: ${(props) =>
    !props.$isUser
      ? "0 2px 4px rgba(0,0,0,0.05)"
      : "0 2px 4px rgba(0,0,0,0.1)"};
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuickActionButton = styled.button`
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  outline: none;
  background: #f9fafb;
  color: #1f2937;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I'm your AI portfolio assistant. I can help visitors learn about Fikre's skills, projects, and experience. What would you like to know?",
      isUser: false,
      quickActions: [
        {
          label: "View Projects",
          action: () => handleQuickAction("projects"),
          icon: <FaCode />,
        },
        {
          label: "Skills & Tech",
          action: () => handleQuickAction("skills"),
          icon: <FaCode />,
        },
        {
          label: "Contact Info",
          action: () => handleQuickAction("contact"),
          icon: <FaLinkedin />,
        },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Project-related queries
    if (message.includes("project") || message.includes("portfolio")) {
      return {
        text: "I've built several modern web applications using React, TypeScript, and various libraries. Here are some highlights:\n\n• **AI Ethiopian Tour + Cultural Concierge App** - React, TypeScript \n• **AI Healthcare & Medical Appointment System** - Next.js, Tailwind CSS, Firebase\n• **AI Shelter Operations & Case Management System** - React, \n\nWant to see the code? Check out my GitHub!",
        isUser: false,
        quickActions: [
          {
            label: "Open GitHub",
            action: () => window.open("https://github.com/Fikre-M", "_blank"),
            icon: <FaGithub />,
          },
          {
            label: "View Live Demos",
            action: () => handleQuickAction("demos"),
            icon: <FaCode />,
          },
        ],
      };
    }

    // Skills queries
    if (
      message.includes("skill") ||
      message.includes("tech") ||
      message.includes("stack")
    ) {
      return {
        text: "🛠️ **Core Skills:**\n• React.js / Next.js\n• TypeScript / JavaScript (ES6+)\n• HTML5 / CSS3 / SASS\n• REST APIs \n• Git / GitHub\n• Node.js / Express\n• MongoDB / PostgreSQL\n• Basic AWS\nInterested in any specific technology? \n\n**Currently Learning:**\n • Docker \n • Agile/Scrum methodology",
        isUser: false,
        quickActions: [
          {
            label: "React Experience",
            action: () => handleQuickAction("react"),
            icon: <FaCode />,
          },
        ],
      };
    }

    // Contact queries
    if (
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("hire")
    ) {
      return {
        text: "📫 You can reach me through:\n\n• **Email:** fikreddu@gmail.com\n• **LinkedIn:** linkedin.com/in/fikremariam-k-28916062\n• **GitHub:** github.com/Fikre-M\n\nI'm open to junior developer roles, internships, or freelance projects!",
        isUser: false,
        quickActions: [
          {
            label: "Open LinkedIn",
            action: () =>
              window.open(
                "https://www.linkedin.com/in/fikremariam-k-28916062/",
                "_blank",
              ),
            icon: <FaLinkedin />,
          },
          {
            label: "Download Resume",
            action: () => {
              const link = document.createElement("a");
              link.href = "/resume/Kassa_Resume.pdf";
              link.download = "kassa_Resume.pdf"; 
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            },
            icon: <FaFileDownload />,
          },
        ],
      };
    }

    // Experience queries
    if (message.includes("experience") || message.includes("work")) {
      return {
        text: "💼 **Professional Experience:**\n\n**Frontend Developer Intern** @ TechCompany (2023)\n• Built responsive UI components with React & JavaScript/TypeScript\n• Improved app performance by 30% using code splitting\n• Collaborated using Git/Github methodology\n\n**Personal Projects:**\n• 2+ full-stack applications deployed\n• Active open-source contributor\n• Continuous learning through courses & tutorials",
        isUser: false,
      };
    }

    // React specific queries
    if (message.includes("react")) {
      return {
        text: "⚛️ **React Experience:**\n\n• **2+ years** building applications with React\n• Experience with hooks, context API, and custom hooks\n• Proficient in state management\n• Experience with Next.js & Express.js\n• Component library design with styled-components/Tailwind\n• Performance optimization (memoization, code splitting)\n• Testing with Jest and React Testing Library",
        isUser: false,
      };
    }

    // Demos queries
    if (message.includes("demo") || message.includes("live")) {
      return {
        text: "🚀 **Live Project Demos:**\n\n1. **AI Ethiopian Tour + Cultural Concierge App** - Full-stack web, AI recommendations and seamless travel planning.\n2. **AI Healthcare & Medical Appointment System** - MERN AI-powered healthcare system app\n3. **AI Shelter Operations & Case Management System** - React Frontend, AI analytics, data viz app\n4. **Portfolio Site** - this website built with React!\n\nAll projects are deployed on Vercel/Netlify with source code on GitHub.",
        isUser: false,
        quickActions: [
          {
            label: "View GitHub",
            action: () => window.open("https://github.com/Fikre-M", "_blank"),
            icon: <FaGithub />,
          },
        ],
      };
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! As a junior developer focused on React and TypeScript, I'm always eager to learn new technologies and take on challenging projects.",
      "Great question! I specialize in building responsive, accessible web applications with clean code and modern best practices.",
      "I'm passionate about creating user-friendly interfaces and solving real-world problems with code. Want to know more about my technical approach?",
      "I believe in writing maintainable code with proper documentation and testing. My goal is to grow into a full-stack developer role.",
      "Let me know if you'd like to discuss specific projects, technologies, or development methodologies I use!",
      "You're very welcome,\n See you soon!!",
    ];

    return {
      text: defaultResponses[
        Math.floor(Math.random() * defaultResponses.length)
      ],
      isUser: false,
      quickActions: [
        {
          label: "View Projects",
          action: () => handleQuickAction("projects"),
          icon: <FaCode />,
        },
        {
          label: "Contact Info",
          action: () => handleQuickAction("contact"),
          icon: <FaLinkedin />,
        },
      ],
    };
  };

  const handleQuickAction = (action) => {
    const message = `Tell me about ${action}`;
    const syntheticEvent = { preventDefault: () => {} };
    handleSendMessage(syntheticEvent, message);
  };

  const handleSendMessage = (e, customMessage) => {
    e.preventDefault();
    const messageText = customMessage || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = { text: messageText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    if (!customMessage) {
      setInputValue("");
    }

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <ChatbotContainer>
      <ChatWindow $isOpen={isOpen}>
        <ChatHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaRobot /> Portfolio Assistant
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "1.1rem",
              padding: "0.25rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaTimes />
          </button>
        </ChatHeader>
        <ChatMessages>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <Message $isUser={message.isUser}>
                {message.text.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Message>
              {message.quickActions && !message.isUser && (
                <QuickActions>
                  {message.quickActions.map((action, idx) => (
                    <QuickActionButton key={idx} onClick={action.action}>
                      {action.icon}
                      {action.label}
                    </QuickActionButton>
                  ))}
                </QuickActions>
              )}
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessages>
        <form onSubmit={handleSendMessage}>
          <InputContainer>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about projects, skills, or experience..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSendMessage(e);
                }
              }}
            />
            <SendButton
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </SendButton>
          </InputContainer>
        </form>
      </ChatWindow>
      <ChatbotButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </ChatbotButton>
    </ChatbotContainer>
  );
};

export default Chatbot;
