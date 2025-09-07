import React, { useRef, useState, useEffect } from "react";
import CardImagem from "./CardImagem.jsx";

export default function SliderInfinito({
  imagens = [
    "./imgs_gallery/gato1.png",
    "./imgs_gallery/gato2.png",
    "./imgs_gallery/gato3.png",
    "./imgs_gallery/gato4.png",
    "./imgs_gallery/gato5.jpg",
  ],
  speed = 80, // px por segundo (ajuste a velocidade aqui: maior = mais rápido)
}) {
  const trackRef = useRef(null);
  const [halfWidth, setHalfWidth] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  // conta imagens carregadas (somente as únicas, não as duplicadas)
  const handleImgLoad = () => setLoadedCount((c) => c + 1);

  // mede a largura da faixa (duplica a lista, por isso metade = metade da largura total)
  useEffect(() => {
    if (!trackRef.current) return;

    // fallback: mede também depois de um pequeno delay (caso imagens carreguem rápido)
    const measure = () => {
      const full = trackRef.current.scrollWidth;
      setHalfWidth(full / 2);
    };

    // só medir quando todas as imagens únicas tiverem chamado onLoad
    if (loadedCount >= imagens.length) {
      measure();
    }

    // medir ao redimensionar a janela
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // fallback measure após 300ms (garante medir mesmo que onLoad não tenha disparado)
    const t = setTimeout(measure, 300);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [loadedCount, imagens.length]);

  // duração em segundos: quanto tempo leva para percorrer halfWidth (metade da faixa)
  const duration = halfWidth ? Math.max(1, halfWidth / speed) : 0; // evita 0s

  return (
    <div className="relative w-full overflow-hidden">
      {/* track com duplicação das imagens */}
      <div
        ref={trackRef}
        className={`track ${halfWidth ? "anim" : ""}`}
        // define variáveis CSS que a animação usa
        style={{
          // --half precisa vir com unidade px
          "--half": `${halfWidth}px`,
          "--duration": `${duration}s`,
        }}
      >
        {/* primeira sequência */}
        {imagens.map((src, i) => (
          <div key={`a-${i}`} className="slide-item">
            <img
              src={src}
              alt={`slide-${i}`}
              onLoad={handleImgLoad}
              draggable="false"
            />
          </div>
        ))}

        {/* duplicata para criar loop contínuo */}
        {imagens.map((src, i) => (
          <div key={`b-${i}`} className="slide-item">
            <img src={src} alt={`slide-dup-${i}`} draggable="false" />
            <div className="flex gap-[18px] overflow-x-scroll no-scrollbar">
      <CardImagem src="./imgs_gallery/gato1.png" curtidasIniciais={10000} />
      <CardImagem src="./imgs_gallery/gato2.png" curtidasIniciais={8500} />
      <CardImagem src="./imgs_gallery/gato3.png" curtidasIniciais={9200} />
    </div>
          </div>
          
        ))}
      </div>
    </div>
  );
}
