import React, { useState, useEffect } from 'react';
import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
}

interface ListProps {
    onSelect: (pokemon: Pokemon) => void;
    filterType: string | null; // Accepts string or null for the filterType
  }

const List: React.FC<{ onSelect: (pokemon: Pokemon) => void }> = ({ onSelect }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=800').then((response) => {
      setPokemonList(response.data.results);
    });
  }, []);

  // Filter the pokemonList based on the searchQuery
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toUpperCase().includes(searchQuery.toUpperCase())
  );

  return (
    <div className="containerA">
      <div className="sticky-header">
        <h2>Pokémon List</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="pokemon-list-container">
        <div className="pokemon-list">
          {filteredPokemonList.map((pokemon) => (
            <button key={pokemon.name} onClick={() => onSelect(pokemon)}>
              {pokemon.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;