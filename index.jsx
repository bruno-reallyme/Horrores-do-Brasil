import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

const regioes = {
  "Norte": [
    { nome: "Curupira", som: "/sons/curupira.mp3", imagem: "/img/curupira.png", descricao: "Guardião das matas, com pés virados para trás, confunde caçadores e protege a floresta. Lenda indígena da Amazônia." },
    { nome: "Boto-cor-de-rosa", som: "/sons/boto.mp3", imagem: "/img/boto.png", descricao: "Encantado que vira homem bonito em festas, seduz mulheres e depois retorna ao rio. Cultura amazônica ribeirinha." }
  ],
  "Nordeste": [
    { nome: "Cabeleira de Fogo", som: "/sons/cabeleira.mp3", imagem: "/img/cabeleira.png", descricao: "Assombração de uma mulher com cabelos flamejantes que aterroriza vilarejos. Presente no folclore nordestino." }
  ],
  "Centro-Oeste": [
    { nome: "Cabeça de Cuia", som: "/sons/cuia.mp3", imagem: "/img/cuia.png", descricao: "Homem amaldiçoado após matar a própria mãe, transformado em monstro que assombra rios." }
  ],
  "Sudeste": [
    { nome: "Mula Sem Cabeça", som: "/sons/mula.mp3", imagem: "/img/mula.png", descricao: "Mulher amaldiçoada que se transforma em uma mula em chamas, ligada ao imaginário católico colonial." }
  ],
  "Sul": [
    { nome: "Negrinho do Pastoreio", som: "/sons/negrinho.mp3", imagem: "/img/negrinho.png", descricao: "Espírito de um menino escravizado que ajuda a encontrar objetos perdidos. Folclore gaúcho de origem afro-brasileira." }
  ]
};

const sonsAmbientais = [
  "/sons/sussurros.mp3",
  "/sons/grito.mp3",
  "/sons/vento.mp3"
];

export default function HorroresDoBrasil() {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState(null);
  const [lendaSelecionada, setLendaSelecionada] = useState(null);

  useEffect(() => {
    const hino = new Audio("/sons/hino_dissonante.mp3");
    hino.loop = true;
    hino.volume = 0.6;
    hino.play();

    const tocarAmbiental = () => {
      const som = new Audio(sonsAmbientais[Math.floor(Math.random() * sonsAmbientais.length)]);
      som.play();
      setTimeout(tocarAmbiental, 5000 + Math.random() * 10000); // intervalos aleatórios 5-15s
    };
    tocarAmbiental();
  }, []);

  const tocarSom = (som) => { const audio = new Audio(som); audio.play(); };

  return (
    <motion.div
      className="min-h-screen bg-black text-red-600 flex flex-col items-center p-6 relative overflow-hidden"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        filter: ["hue-rotate(0deg) contrast(100%)", "hue-rotate(45deg) contrast(150%)", "hue-rotate(-45deg) contrast(80%)", "hue-rotate(0deg) contrast(100%)"]
      }}
      transition={{ duration: 10, repeat: Infinity }}
      style={{ backgroundImage: "radial-gradient(circle, #1a1a1a, #000000)" }}
    >
      <motion.h1 className="text-4xl font-bold mb-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
        Horrores de um Brasil Esquecido
      </motion.h1>
      <p className="mb-4 italic text-sm">por Bruno Reallyme - Universo Reallyme - <a href="https://universoreallyme.com.br" className="underline">universoreallyme.com.br</a></p>

      <div className="grid grid-cols-5 gap-2 w-full max-w-4xl animate-pulse">
        {Object.keys(regioes).map((regiao) => (
          <motion.div key={regiao} className="bg-red-900 rounded-2xl shadow-lg p-4 text-center cursor-pointer hover:bg-red-700" whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }} transition={{ duration: 0.3 }} onClick={() => setRegiaoSelecionada(regiao)}>{regiao}</motion.div>
        ))}
      </div>

      {regiaoSelecionada && (
        <motion.div className="mt-8 grid grid-cols-2 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {regioes[regiaoSelecionada].map((lenda) => (
            <Card key={lenda.nome} className="bg-gray-900 text-white cursor-pointer hover:bg-gray-800 animate-bounce" onClick={() => { setLendaSelecionada(lenda); tocarSom(lenda.som); }}>
              <CardContent className="p-4 flex flex-col items-center">
                <img src={lenda.imagem} alt={lenda.nome} className="w-24 h-24 mb-2" />
                <p className="font-bold">{lenda.nome}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {lendaSelecionada && (
        <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1, scale: [0.9, 1.05, 1] }}>
          <Card className="bg-gray-800 text-white max-w-lg p-6 relative shadow-2xl animate-pulse">
            <button className="absolute top-2 right-2 text-red-500" onClick={() => setLendaSelecionada(null)}>✕</button>
            <h2 className="text-2xl font-bold mb-2">{lendaSelecionada.nome}</h2>
            <img src={lendaSelecionada.imagem} alt={lendaSelecionada.nome} className="w-40 h-40 mx-auto mb-4" />
            <p className="mb-4">{lendaSelecionada.descricao}</p>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => tocarSom(lendaSelecionada.som)}>
              <Volume2 className="mr-2 h-4 w-4" /> Ouvir Som da Lenda
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
