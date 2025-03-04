const Card = ({ img, text, onSent }) => {
  const loadSent = async (prompt) => {
    await onSent(prompt);
  };
  return (
    <div
      className="card bg-slate-200 rounded-2xl p-4 flex flex-col items-center hover:bg-gray-100 cursor-pointer active:bg-gray-600 text-white"
      onClick={() => loadSent(text)}
    >
      <img src={img} alt="" />
      <p className="text-gray-500 hidden md:block">{text}</p>
    </div>
  );
};

export default Card;
