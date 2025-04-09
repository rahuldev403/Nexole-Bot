import { assets } from "../../assets/assets";
import { useContext, useState, useRef } from "react";
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
const Search = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageSelectedMessage, setImageSelectedMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const inputRef = useRef(null);
  const handleSent = async () => {
    try {
      await onSent(input.trim(), imageBase64);
      setInput("");
      setUserPrompt(input);
      setImageBase64(null);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handelOnchange = (e) => {
    setInput(e.target.value);
  };

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setImageSelectedMessage("Image selected!👍🏻");
        setTimeout(() => {
          if (inputRef.current) inputRef.current.focus();
        }, 100);

        setTimeout(() => {
          setImageSelectedMessage("");
        }, 3000);
      };
      reader.onerror = (error) => {
        console.error("Error reading image:", error);
        alert("Error reading image. Please try again.");
      };
    } else {
      setImageBase64(null);
      setImageSelectedMessage("");
    }
  };

  const { input, setInput, onSent, setUserPrompt, darkMode } =
    useContext(Context);
  const handleMicClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSent();
    }
  };

  return (
    <div className={`${darkMode ? "bg-[#f5f2f2a1] text-gray-800" : "bg-[#7171712d] text-gray-800"} search p-4 rounded-2xl fixed bottom-3 w-4/5 md:w-1/2 mx-auto`}>
      {imageSelectedMessage && (
        <MessageBlock>
          <p className="ml-2">{imageSelectedMessage}</p>
        </MessageBlock>
      )}

      <div className="flex items-center w-full justify-between">
        <input
          onChange={handelOnchange}
          value={input}
          type="text"
          placeholder="Enter prompt here..."
          className="bg-transparent w-[90%] h-full outline-none placeholder:text-gray-900"
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {input || imageBase64 ? (
          <button
            onClick={handleSent}
            className="bg-[#e0e0e090] p-2 rounded-full"
          >
            <img src={assets.send_icon} alt="" className="w-[1.5em]" />
          </button>
        ) : null}
      </div>
      <div className="mt-3 flex ">
        <button onClick={handleMicClick}>
          {" "}
          <img src={assets.mic_icon} alt="" className="w-[1.5em]" />
        </button>

        {showMessage && (
          <MessageBlock>I don't take commands, prompts only! 😜</MessageBlock>
        )}
        <div
          className="cursor-pointer"
          onClick={() => document.querySelector("input[type='file']").click()}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handelFileChange}
          />
          <img src={assets.gallery_icon} alt="" className="w-[1.5em] ml-3" />
        </div>
      </div>
    </div>
  );
};

export default Search;
