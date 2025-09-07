import { useState } from "react";

export default function CardImagem({ src, curtidasIniciais = 0 }) {
  const [curtidas, setCurtidas] = useState(curtidasIniciais);
  const [curtido, setCurtido] = useState(false);

  const toggleCurtir = () => {
    setCurtido(!curtido);
    setCurtidas(curtido ? curtidas - 1 : curtidas + 1);
  };

  return (
    <div className="relative w-[200px] h-[200px] flex flex-col items-center">
      <img
        src={src}
        alt="Imagem"
        className="w-full h-full object-cover rounded-lg"
        draggable="false"
      />
      <button
        onClick={toggleCurtir}
        className={`absolute top-2 right-2 text-2xl ${curtido ? "text-red-500" : "text-gray-400"}`}
      >
        ❤️
      </button>
      <span className="mt-2 text-sm">{curtidas} curtidas</span>
    </div>
  );
}
