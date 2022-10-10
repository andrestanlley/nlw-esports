import * as Dialog from '@radix-ui/react-dialog';
import { useState, FormEvent } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { GameController } from 'phosphor-react';
import Input from './Form/input';
import Checkbox from './Form/checkbox';
import { Game } from '../App';
import { publishAds } from '../services/api';

interface GameList {
  games: Game[];
}

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

export default function CreateAdModal({ games }: GameList) {
  const [gameId, setGameId] = useState<string>('');
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<Boolean>(false);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const result = await publishAds(gameId, {
      data,
      weekDays,
      useVoiceChannel,
    });
    console.log(result);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480] shadow-lg shadow-black/25">
        <Dialog.Title>Publique um anúncio</Dialog.Title>
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              name="game"
              placeholder="Selecione o game que deseja jogar"
              defaultValue={'default'}
              className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
              onChange={(e) => setGameId(e.target.value)}
            >
              <option disabled value="default">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu discord?</label>
              <Input id="discord" name="discord" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
              >
                {daysOfWeek.map((weekDay, indexWeekDay) => (
                  <ToggleGroup.Item
                    value={indexWeekDay.toString()}
                    key={indexWeekDay}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes(indexWeekDay.toString())
                        ? 'bg-violet-900'
                        : 'bg-zinc-900'
                    }`}
                    title={weekDay}
                  >
                    {weekDay[0]}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  id="hoursStart"
                  name="hoursStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  id="hoursEnd"
                  name="hoursEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm ">
            <Checkbox setState={setUseVoiceChannel} />
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-sm hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-sm flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
