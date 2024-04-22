import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

const Detail: React.FC<{ selectedPokemon: Pokemon | null }> = ({ selectedPokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedPokemon) {
      axios.get(selectedPokemon.url).then((response) => {
        setPokemonDetails(response.data);
        // Extracting Pokemon ID from the URL
        const id = selectedPokemon.url.split('/').slice(-2, -1)[0];
        setPokemonId(parseInt(id));
      });
    }
  }, [selectedPokemon]);

  if (!selectedPokemon || !pokemonDetails) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="containerB">
      <h2>Pokémon Details</h2>
      <div className="pokemon-details">
        <h3>{pokemonDetails.name.toUpperCase()}</h3>
        <p>ID: {pokemonId}</p>
        <div className="pokemon-types">
          <h4>Types:</h4>
            {pokemonDetails.types.map((type: any) => (
              <div key={type.slot}>{type.type.name.toUpperCase()}</div>
            ))}
        </div>
        <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
        <p>HEIGHT: ~{pokemonDetails.height / 10} meters</p>
        <p>WEIGHT: ~{pokemonDetails.weight / 10} kilograms</p>
        <h4>Abilities:</h4>
        {pokemonDetails.abilities.map((ability: any) => (
          <div key={ability.ability.name}>{ability.ability.name.toUpperCase()}</div>
        ))}
      </div>
    </div>
  );
};

export default Detail;