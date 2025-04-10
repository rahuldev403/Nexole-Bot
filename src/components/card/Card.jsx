const Card = ({ img, text, onSent }) => {
  const loadSent = async (prompt) => {
    await onSent(prompt);
  };
  return (
    <div
      className="card bg-slate-200 rounded-2xl p-4 flex flex-col items-center cursor-pointer active:bg-gray-600"
      onClick={() => loadSent(text)}
    >
      <img src={img} alt="" />
      <p className=" hidden md:block text-gray-900">{text}</p>
    </div>
  );
};

export default Card;
