import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import styled, { keyframes } from "styled-components";
import "./sidebar.css";

const slideUp = keyframes`
  from {
    transform: translateY(100%); 
    opacity: 0;
  }
  to {
    transform: translateY(0); 
    opacity: 1;
  }
`;

const MessageBlock = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  z-index: 1000;
  animation: ${slideUp} 0.4s ease-out forwards;
`;

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { onSent, prevPrompts, setRecentPrompt, newChat, setUserPrompt } =
    useContext(Context);
  const [msg, setMsg] = useState(false);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    setUserPrompt(prompt);
    await onSent(prompt);
  };

  const handleMsg = () => {
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out h-full hidden md:flex flex-col justify-between bg-gray-200 p-3 relative z-20 shadow-md ${
        showSidebar ? "w-60" : "w-20"
      }`}
    >
      {/* Top */}
      <div className="flex flex-col h-[75vh] overflow-hidden">
        {/* Toggle Button */}
        <div className="flex justify-center">
          <img
            src={assets.menu_icon}
            alt="Toggle"
            className="w-6 cursor-pointer"
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>

        {/* New Chat */}
        <div
          className="flex items-center justify-center mt-6 p-2 bg-white rounded-2xl cursor-pointer hover:bg-gray-100"
          onClick={newChat}
        >
          <img src={assets.plus_icon} alt="Plus" className="h-5" />
          {showSidebar && (
            <span className="ml-2 text-sm text-gray-600">New Chat</span>
          )}
        </div>

        {/* Recent Prompts */}
        <div className="mt-5 flex-1 overflow-y-auto">
          <p className="text-sm font-semibold text-gray-500 mb-2 text-center">
            {showSidebar ? "Recent" : ""}
          </p>
          {prevPrompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => loadPrompt(prompt)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <img src={assets.message_icon} alt="Prompt" className="w-5" />
              {showSidebar && (
                <span className="text-[14px] text-gray-700 truncate w-[150px]">
                  {prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Settings */}
      <div className="pb-5">
        <div
          onClick={handleMsg}
          className="flex items-center justify-center gap-2 p-2 rounded-xl hover:bg-gray-100 cursor-pointer"
        >
          <img src={assets.setting_icon} alt="Settings" className="w-5" />
          {showSidebar && (
            <span className="text-sm text-gray-600">Settings</span>
          )}
        </div>

        {msg && (
          <MessageBlock>
            You have to use the default <b>Settings</b> only 🤖
          </MessageBlock>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
