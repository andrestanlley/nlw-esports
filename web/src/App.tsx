import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo.svg";
import CreateAdModal from "./components/CreateAdModal";
import GameBanner from "./components/GameBanner";
import api from "./services/api";
import CreateAdBanner from "./components/CreateAdBanner";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames();
  }, []);

  async function getGames() {
    const request = await fetch(api.getGames);
    const result = await request.json();
    setGames(result);
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
