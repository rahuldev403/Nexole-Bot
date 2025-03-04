import { useContext,useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from {
    transform: translateY(100%); 
    opacity: 0;
  }
  to {
    transform: translateY(-50%); 
    opacity: 1;
  }
`;
const MessageBlock = styled.div`
  position: fixed;
  bottom: 0; // Start at the bottom
  left: 50%;
  transform: translateX(-50%) translateY(100%); 
  background-color: rgba(0, 0, 0, 0.7); 
  color: white;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1000; // Ensure it's on top
  animation: ${slideUp} 0.5s ease-in-out forwards; 
`;

import "./sidebar.css";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const [msg, setMsg] = useState(false);
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  const handleMsg = () => {
    setMsg(true);
    setTimeout(() => setMsg(false), 3000);
  };

  return (
    <div
      className={`h-full hidden md:block  bg-gray-300 p-3 relative z-10 transition-all duration-300 flex flex-col justify-center align-center ${
        showSidebar ? "w-60" : "w-20"
      }`}
    >
      <div className="top rounded-2xl bg-gray-200 p-2 h-[60vh] backdrop-filter backdrop-blur-lg">
        <div
          className=" flex justify-center rounded-2xl"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <img src={assets.menu_icon} alt="" className="w-7 cursor-pointer" />
        </div>
        <div
          className="new-chat flex items-center justify-center bg-white p-2 cursor-pointer mt-7 rounded-3xl  hover:bg-gray-100"
          onClick={() => newChat()}
        >
          <img src={assets.plus_icon} alt="" className="h-[1.5em]" />
          {showSidebar ? <p className="ml-2 text-gray-400">New-chat</p> : null}
        </div>
        <div className="recent mt-3 text-center cursor-pointer overflow-y-auto h-[40vh]">
          <p className="text-black text-[0.8em] fixed backdrop-blur-lg ">
            Recent
          </p>
        {prevPrompts.map((items, index) => {
            return (
              <div
                onClick={() => loadPrompt(items)}
                key={index}
                className="recent-chat flex items-center p-2 cursor-pointer mt-2 hover:bg-gray-100 rounded-2xl"
              >
                <img src={assets.message_icon} alt="" className="w-[1.5em]" />
                {showSidebar ? (
                  <p className="text-[15px]">{items.slice(0, 18)}...</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom fixed bottom-9 h-[20vh] flex flex-col justify-center  align-center ">
      

        <div className="bottom-item grid grid-cols-2 items-center justify-center   hover:bg-gray-100 rounded-2xl p-2 cursor-pointer" onClick={handleMsg}>
          <img src={assets.setting_icon} alt="" className="h-[1.5em]" />
          {showSidebar ? <p className="text-sm">Settings</p> : null}
        </div>
        {msg && (
          <MessageBlock>You have to use the default <b>Settings</b>  only 🤖 </MessageBlock>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
