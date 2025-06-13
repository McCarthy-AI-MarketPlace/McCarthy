import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  FaAngleDown,
  FaMicrophone,
  FaPaperclip,
  FaImage,
  FaVideo,
  FaFileUpload,
  FaTimesCircle,
  FaSpinner,
  FaEllipsisH,
} from 'react-icons/fa';

// Define colors and styles as JavaScript objects
const COLORS = {
  darkBackground: '#343541',
  chatBubbleUserBg: '#40414f',
  chatBubbleAiBg: '#202123',
  textColor: '#ececf1',
  mutedTextColor: '#8e8ea0',
  inputBg: '#40414f',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  fileTagBg: '#2e2f32',
  fileTagBorder: 'rgba(255, 255, 255, 0.15)',
};

const styles = {
  aiChatPage: {
    backgroundColor: COLORS.darkBackground,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: COLORS.textColor,
    fontFamily: 'Inter, sans-serif',
  },
  chatHeader: {
    width: '100%',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.darkBackground,
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  brandInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  brandName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  dropdownIcon: {
    marginLeft: '0.5rem',
    cursor: 'pointer',
    color: COLORS.mutedTextColor,
  },
  profileTag: {
    padding: '0.4rem 0.8rem',
    borderRadius: '1rem',
    backgroundColor: '#202123',
    fontSize: '0.85rem',
    color: COLORS.mutedTextColor,
    fontWeight: 500,
  },
  chatBody: {
    flexGrow: 1,
    width: '100%',
    maxWidth: '800px',
    padding: 'calc(1rem + 60px) 1.5rem 120px 1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth',
  },
  welcomeMessageContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: '5rem',
  },
  welcomeHeading: {
    fontSize: '2.5rem',
    fontWeight: '600',
    background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  chatMessage: {
    display: 'flex',
    marginBottom: '1rem',
  },
  chatBubbleBase: {
    maxWidth: '75%',
    padding: '0.75rem 1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    wordBreak: 'break-word',
  },
  chatBubbleUser: {
    borderRadius: '0.75rem 0.75rem 0.25rem 0.75rem',
    backgroundColor: COLORS.chatBubbleUserBg,
  },
  chatBubbleAi: {
    borderRadius: '0.75rem 0.75rem 0.75rem 0.25rem',
    backgroundColor: COLORS.chatBubbleAiBg,
  },
  chatBubbleParagraph: {
    margin: 0,
  },
  attachedFilesInChat: {
    marginTop: '0.5rem',
    fontSize: '0.8rem',
    color: COLORS.mutedTextColor,
  },
  attachedFileItem: {
    display: 'block',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  attachedFileItemIcon: {
    marginRight: '5px',
    verticalAlign: 'middle',
  },
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
  },
  chatInputArea: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    backgroundColor: COLORS.darkBackground,
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  attachedFilesPreview: {
    width: 'clamp(500px, 70%, 768px)',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    backgroundColor: COLORS.inputBg,
    border: `1px solid ${COLORS.inputBorder}`,
  },
  fileTag: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.3rem 0.6rem',
    backgroundColor: COLORS.fileTagBg,
    borderRadius: '0.5rem',
    border: `1px solid ${COLORS.fileTagBorder}`,
    color: COLORS.textColor,
    fontSize: '0.8rem',
  },
  fileName: {
    maxWidth: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  removeFileIcon: {
    marginLeft: '0.5rem',
    cursor: 'pointer',
    color: COLORS.mutedTextColor,
  },
  inputBar: {
    width: 'clamp(500px, 70%, 768px)',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    border: `1px solid ${COLORS.inputBorder}`,
  },
  attachIcon: {
    color: COLORS.mutedTextColor,
    cursor: 'pointer',
    marginRight: '0.75rem',
  },
  chatInput: {
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: COLORS.textColor,
    fontSize: '1rem',
    padding: '0.5rem 0',
    caretColor: COLORS.mutedTextColor,
  },
  sendButton: {
    cursor: 'pointer',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1rem',
    border: 'none',
    color: COLORS.mutedTextColor,
    transition: 'background-color 0.2s ease',
  },
  sendButtonHover: { // Note: Can't apply :hover directly inline
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
};

export default function AiChat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  // State for responsive adjustments (simplified example)
  const [isMobile, setIsMobile] = useState(false);

  const chatBodyRef = useRef(null);
  const fileInputRef = useRef(null);

  // Function to update isMobile state
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial check
    handleResize();
    // Event listener for window resize
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const scrollToBottom = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, scrollToBottom]);

  const handleSend = useCallback(() => {
    if (message.trim() === '' && attachedFiles.length === 0) return;

    setLoading(true);
    const userMessage = { sender: 'user', text: message, files: [...attachedFiles] };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setAttachedFiles([]);

    setTimeout(() => {
      const aiResponseText = attachedFiles.length > 0
        ? "I've received your message and the attached files. How can I assist you with these?"
        : "Hello! I am your AI assistant. How can I help you today?";
      const aiResponse = { sender: 'ai', text: aiResponseText, files: [] };
      setChatHistory((prev) => [...prev, aiResponse]);
      setLoading(false);
      scrollToBottom();
    }, 1000);
  }, [message, attachedFiles, scrollToBottom]);

  const handleFileChange = useCallback((event) => {
    const files = Array.from(event.target.files);
    setAttachedFiles((prev) => [...prev, ...files]);
    event.target.value = '';
  }, []);

  const handleRemoveFile = useCallback((index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const triggerFileInput = useCallback((accept) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      fileInputRef.current.click();
    }
  }, []);

  const getResponsiveStyle = useCallback((desktopStyle, mobileStyle) => {
    return isMobile ? { ...desktopStyle, ...mobileStyle } : desktopStyle;
  }, [isMobile]);

  // Memoize chat message rendering
  const renderedChatHistory = useMemo(() => (
    chatHistory.map((msg, index) => (
      <div
        key={index}
        style={getResponsiveStyle(
          { ...styles.chatMessage, justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' },
          { justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' } // mobile style would be the same here
        )}
      >
        <div
          style={{
            ...styles.chatBubbleBase,
            ...(msg.sender === 'user' ? styles.chatBubbleUser : styles.chatBubbleAi),
            // Responsive adjustments for chat bubble width
            maxWidth: isMobile ? '90%' : '75%',
            padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem'
          }}
        >
          <p style={styles.chatBubbleParagraph}>{msg.text}</p>
          {msg.files?.length > 0 && (
            <div style={styles.attachedFilesInChat}>
              <strong style={{ fontWeight: 'bold' }}>Attached: </strong>
              {msg.files.map((file, i) => (
                <span key={i} style={styles.attachedFileItem}>
                  {file.type.startsWith('image/') && <FaImage style={styles.attachedFileItemIcon} aria-label="Image file" />}
                  {file.type.startsWith('video/') && <FaVideo style={styles.attachedFileItemIcon} aria-label="Video file" />}
                  {!file.type.startsWith('image/') && !file.type.startsWith('video/') && <FaFileUpload style={styles.attachedFileItemIcon} aria-label="Generic file" />}
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))
  ), [chatHistory, isMobile, getResponsiveStyle]);


  return (
    <div style={styles.aiChatPage}>
      {/* Header */}
      <header style={getResponsiveStyle(
        styles.chatHeader,
        { padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem' }
      )}>
        <div style={styles.brandInfo}>
          <h1 style={getResponsiveStyle(
            styles.brandName,
            { fontSize: isMobile ? '1rem' : '1.2rem' }
          )}>McCarthy</h1>
          <FaAngleDown style={styles.dropdownIcon} aria-label="Dropdown menu for McCarthy" />
        </div>
        <span style={getResponsiveStyle(
          styles.profileTag,
          { fontSize: isMobile ? '0.75rem' : '0.85rem', padding: isMobile ? '0.3rem 0.6rem' : '0.4rem 0.8rem' }
        )}>Profile</span>
      </header>

      {/* Chat Body */}
      <main ref={chatBodyRef} style={getResponsiveStyle(
        styles.chatBody,
        { padding: isMobile ? 'calc(0.8rem + 50px) 1rem 100px 1rem' : 'calc(1rem + 60px) 1.5rem 120px 1.5rem' }
      )}>
        {chatHistory.length === 0 ? (
          <div style={styles.welcomeMessageContainer}>
            <h2 style={getResponsiveStyle(
              styles.welcomeHeading,
              { fontSize: isMobile ? '2rem' : '2.5rem' }
            )}>Hey User,</h2>
          </div>
        ) : (
          renderedChatHistory
        )}
        {loading && (
          <div style={styles.loadingIndicator}>
            <FaSpinner className="spinner" size={20} color={COLORS.mutedTextColor} aria-label="Loading" />
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer style={getResponsiveStyle(
        styles.chatInputArea,
        { padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem' }
      )}>
        {attachedFiles.length > 0 && (
          <div style={getResponsiveStyle(
            styles.attachedFilesPreview,
            { width: '100%', maxWidth: 'none' }
          )} aria-live="polite" aria-atomic="true">
            {attachedFiles.map((file, index) => (
              <div key={index} style={getResponsiveStyle(
                styles.fileTag,
                { fontSize: isMobile ? '0.7rem' : '0.8rem', padding: isMobile ? '0.2rem 0.5rem' : '0.3rem 0.6rem' }
              )}>
                {file.type.startsWith('image/') && <FaImage style={styles.attachedFileItemIcon} aria-label="Attached image" />}
                {file.type.startsWith('video/') && <FaVideo style={styles.attachedFileItemIcon} aria-label="Attached video" />}
                {!file.type.startsWith('image/') && !file.type.startsWith('video/') && <FaFileUpload style={styles.attachedFileItemIcon} aria-label="Attached file" />}
                <span style={getResponsiveStyle(
                  styles.fileName,
                  { maxWidth: isMobile ? '80px' : '100px' }
                )}>{file.name}</span>
                <FaTimesCircle
                  size={12}
                  style={styles.removeFileIcon}
                  onClick={() => handleRemoveFile(index)}
                  aria-label={`Remove ${file.name}`}
                />
              </div>
            ))}
          </div>
        )}

        <div style={getResponsiveStyle(
          styles.inputBar,
          { width: '100%', maxWidth: 'none' }
        )}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // Hidden input, triggered by icon
            multiple
            aria-label="File upload input"
          />

          <FaPaperclip
            style={getResponsiveStyle(
              styles.attachIcon,
              { marginRight: isMobile ? '0.5rem' : '0.75rem', fontSize: isMobile ? '0.9rem' : '1rem' }
            )}
            onClick={() => triggerFileInput('*/*')}
            aria-label="Attach file"
          />

          <input
            type="text"
            placeholder="Ask anything"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={getResponsiveStyle(
              styles.chatInput,
              { fontSize: isMobile ? '0.9rem' : '1rem', padding: isMobile ? '0.4rem 0' : '0.5rem 0' }
            )}
            aria-label="Chat message input"
          />
          {loading ? (
            <FaEllipsisH className="loading-dots" aria-label="AI is typing" />
          ) : (
            <button
              onClick={handleSend}
              style={getResponsiveStyle(
                styles.sendButton,
                { width: isMobile ? '28px' : '30px', height: isMobile ? '28px' : '30px', marginLeft: isMobile ? '0.8rem' : '1rem' }
              )}
              aria-label="Send message"
              title="Send message"
            >
              <FaMicrophone size={14} />
            </button>
          )}
        </div>
      </footer>

      {/* Global Styles for animations and scrollbars (cannot be inline) */}
      <style>{`
        /* Basic Reset for better cross-browser consistency */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html, body, #root { /* Adjust #root based on your main app entry point */
          height: 100%;
          font-family: 'Inter', sans-serif; /* Ensure 'Inter' font is imported in your index.html */
        }

        /* Animations */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .loading-dots {
          animation: blink 1.2s infinite;
          color: ${COLORS.mutedTextColor};
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }

        /* Scrollbar Styles */
        main::-webkit-scrollbar {
          width: 8px;
        }
        main::-webkit-scrollbar-track {
          background: #202123;
        }
        main::-webkit-scrollbar-thumb {
          background: #505156;
          border-radius: 4px;
        }
        main::-webkit-scrollbar-thumb:hover {
          background: #606168;
        }
      `}</style>
    </div>
  );
}