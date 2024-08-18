'use client'

import { useQuery } from '@tanstack/react-query';
import { fetchGames, GameFilters } from '@/api/games';
import GameList from '@/components/GameList/GameList';
import GameListFilters from '@/components/GameList/GameListFilters';
import { SetStateAction, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState<GameFilters['search']>();


  const { data, isFetching } = useQuery({
    queryKey: ['games', { search }],
    queryFn: () => fetchGames({ search }),
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-4xl font-bold text-center p-2">Kanon Games</h1>
      </div>
      <div className='p-3'>
        <GameListFilters
          onChange={(filters) => {
          
            setSearch(filters.search);
          }}
        />
      </div>
      <div>
        {data && <GameList games={data} />}
        {isFetching && <div className='flex flex-col gap-2'><p>Loading...</p></div>}
      </div>
    </div>
  );
}