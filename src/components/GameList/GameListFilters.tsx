import { GameFilters } from '@/api/games';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

type GameListFiltersProps = {
  onChange: (filters: GameFilters) => void;
};

export default function GameListFilters({
  onChange,
}: GameListFiltersProps) {
  const [search, setSearch] = useState<GameFilters['search']>();
  const debouncedSearch = useDebounce(search);


  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <div className="flex flex-row gap-2">
      <input
        type="text"
        value={search}
        className="px-4 py-2 border rounded mb-4"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search games"
      />
     
    </div>
  );
}