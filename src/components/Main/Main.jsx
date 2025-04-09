import { assets } from "../../assets/assets";
import Search from "../bottom/Search";
import Card from "../card/Card";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import "./Main.css";
import Load from "../../Load";

const Main = ({ showSidebar, setOpenSidebar }) => {
  const {
    response,
    loading,
    result,
    onSent,
    userPrompt,
    darkMode,
    setDarkMode,
  } = useContext(Context);

  const resultContainerRef = useRef(null);
  const [userScrolled, setUserScrolled] = useState(false);

  useEffect(() => {
    if (!userScrolled && resultContainerRef.current) {
      resultContainerRef.current.scrollTo({
        top: resultContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [result, userScrolled]);

  const handleScroll = () => {
    if (resultContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        resultContainerRef.current;
      setUserScrolled(scrollTop + clientHeight < scrollHeight - 10);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-gray-800"
      } p-6 h-full transition-all duration-300 flex-1 ${
        showSidebar ? "ml-66" : "ml-1"
      }`}
    >
      <div className="relative z-10">
        <div className="nav w-full flex justify-between items-center">
          <img src={assets.nexole} alt="" className="w-[70px]" />
          <img
            src={assets.user}
            alt="User Icon"
            className="w-8 h-8 rounded-full"
          />

          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-full transition-all duration-300"
          >
            {darkMode ? (
              <span role="img" aria-label="moon">
                🌙
              </span> // Moon icon for dark mode
            ) : (
              <span role="img" aria-label="sun">
                🌞
              </span> // Sun icon for light mode
            )}
          </button>
        </div>
        <div className="mainContainer flex flex-col items-center">
          {!response ? (
            <>
              <div className="greet mt-10">
                <div className="md:text-[3em] font-bold text-gray-200 flex items-center gap-4">
                  <span className="font-bold bg-gradient-to-r from-[#79f034] to-[#515151] bg-clip-text text-transparent">
                    Nexole-Bot Welcomes you -
                  </span>
                  <span>
                    <motion.img
                      src={assets.robo}
                      alt=""
                      className="w-[2em] rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  </span>
                </div>
                <p
                  className={`${
                    darkMode
                      ? "text-gray-200 hidden md:block"
                      : "text-gray-800 hidden md:block"
                  }`}
                >
                  Nexole-Bot may display inaccurate info, including about
                  people, so double-check its responses. Your privacy and Nexole
                  Apps
                </p>
                <p className="que text-gray-500">How can i help you with ? </p>
              </div>
              <div className="cards grid md:grid-cols-4 gap-4 mt-6 grid-cols-2">
                <Card
                  img={assets.compass_icon}
                  text="Suggest a place to go"
                  onSent={onSent}
                />
                <Card
                  img={assets.bulb_icon}
                  text="Ideas to explore for new tech"
                  onSent={onSent}
                />
                <Card
                  img={assets.code_icon}
                  text="Code Snippets for new projects"
                  onSent={onSent}
                />
                <Card
                  img={assets.message_icon}
                  text="How to write a professional email"
                  onSent={onSent}
                />
              </div>
            </>
          ) : (
            <div
              className="result p-3 overflow-y-auto rounded-2xl bg-[#dedcdc29] mt-5 h-[60vh] w-[95%] backdrop-filter backdrop-blur-lg shadow-lg transition-all duration-300"
              ref={resultContainerRef}
              onScroll={handleScroll}
              style={{ scrollBehavior: "smooth", willChange: "transform" }}
            >
              <div className="result-icon flex items-center gap-4">
                <img
                  src={assets.user}
                  alt=""
                  className="rounded-full w-[2em]"
                />
                <p>{userPrompt ? userPrompt : "Default Prompt"}</p>
              </div>
              <div className="result-data mt-4 flex items-start gap-4">
                <img
                  src={assets.robo1}
                  alt="Bot Icon"
                  className={`w-[2em] rounded-full ${
                    loading ? "animate-[bounce_2s_infinite]" : ""
                  }`}
                />
                {loading ? (
                  <Load />
                ) : (
                  <motion.p
                    className=" text-sm leading-[1.5em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {result}
                  </motion.p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="bottom w-full flex justify-center">
          <Search setBar={setOpenSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Main;
