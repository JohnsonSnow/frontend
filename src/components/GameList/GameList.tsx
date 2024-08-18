import { Game } from '@/types/game';

type GameListProps = {
  games: Game[];
};

export default function GameList({ games }: GameListProps) {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {games.map((game) => (
        <div
          key={game.id}
          className="flex w-[250px] flex-col gap-4 rounded-md bg-grayscale-700 p-4"
        >
          <img src={game.thumb?.url} alt={game.thumb?.url} className="rounded-md" />
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-xl font-bold">{game.title}</h2>
              <p className="opacity-50">{game.slug}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}