import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "./assets/logo.svg";
import GameBanner from "./components/GameBanner";
import CreateAdBanner from "./components/CreateAdBanner";
import api from "./services/api";
import { GameController } from "phosphor-react";

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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480] shadow-lg shadow-black/25">
            <Dialog.Title>Publique um anúncio</Dialog.Title>
            <Dialog.Content className="text-3xl font-black">
              <form>
                <div>
                  <div>
                    <label htmlFor="game">Qual o game?</label>
                    <input
                      id="game"
                      placeholder="Selecione o game que desja jogar"
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Seu nome (ou nickname)</label>
                    <input
                      id="name"
                      placeholder="COmo te chamam dentro do game?"
                    />
                  </div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <input id="discord" placeholder="Usuario#0000" />
                  </div>

                  <div>
                    <div>
                      <label htmlFor="weekDays">Quando costuma jogar?</label>
                    </div>
                    <div>
                      <label htmlFor="hourStart">Qual horário do dia?</label>
                    </div>
                    <div>
                      <input type="time" id="hourStart" placeholder="De" />
                      <input type="time" id="hourEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div>
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer>
                  <button>Cancelar</button>
                  <button>
                    <GameController />
                    Encontrar duo
                  </button>
                </footer>
                
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
