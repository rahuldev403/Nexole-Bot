import { createContext, useState, useCallback } from "react";
import run from "../config/config.js";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [imageBase64, setImageBase64] = useState(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const newChat = () => {
    setLoading(false);
    setResponse(false);
    setImageBase64(null);
  };

  const showTypingEffect = (formattedResponse) => {
    setResult([]);

    formattedResponse.forEach((part, index) => {
      setTimeout(() => {
        setResult((prev) => [...prev, part]);
      }, index * 75);
    });
  };

  const onSent = useCallback(
    async (prompt, imageBase64) => {
      const promptToSend = prompt ?? input;
      if (!promptToSend.trim() && !imageBase64) return;

      setLoading(true);
      setResponse(true);
      setResult([]);

      try {
        let fullPrompt;
        if (imageBase64) {
          fullPrompt = `I have an image. Here is the image data: [Image: ${imageBase64}]\n\n`;

          if (prompt.trim() !== "") {
            fullPrompt += `${prompt}`;
          } else {
            fullPrompt +=
              "Please describe the image.  What objects are present? What is the scene or context?  Are there any notable features?";
          }
        } else {
          fullPrompt = promptToSend;
        }

        const Response = await run(fullPrompt);

        if (!Response) {
          setResult(["Error: No response received."]);
          setLoading(false);
          return;
        }

        setPrevPrompts((prev) => {
          const promptToStore = imageBase64
            ? `[Image] ${promptToSend}`
            : promptToSend;
          if (!prev.includes(promptToStore)) {
            setRecentPrompt(promptToStore);
            return [...prev, promptToStore];
          }
          return prev;
        });

        let responseArray = Response.split("**");
        const formattedResponse = responseArray.map((part, index) =>
          index % 2 === 1 ? (
            <span key={index}>
              <div>
                <br />
                <b className="text-green-500">{part}</b>
                <br />
              </div>
            </span>
          ) : (
            part
              .replaceAll("*", "")
              .split(" ")
              .map((word, wordIndex) => (
                <span key={`${index}-${wordIndex}`}>
                  {word} <span> </span>
                </span>
              ))
          )
        );

        showTypingEffect(formattedResponse);
      } catch (error) {
        
        setResult(["An error occurred. Please try again."]);
      } finally {
        setLoading(false);
        setInput("");
        setImageBase64(null);
      }
    },
    [input, imageBase64]
  );

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    response,
    setResponse,
    loading,
    setLoading,
    result,
    setResult,
    onSent,
    newChat,
    imageBase64,
    setImageBase64,
    userPrompt,
    setUserPrompt,
    darkMode,
    setDarkMode,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
