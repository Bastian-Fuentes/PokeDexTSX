import React, { useState } from 'react';
import List, { Pokemon } from './PkmnList';
import Detail from './PkmnDetail';
import "./App.css"

const App: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleFilterType = (type: string | null) => {
    setFilterType(type);
  };

  return (

    <div className="mainCT">
      <div className='CTA'>
        <List onSelect={handleSelectPokemon}/>
      </div>
      <div className='CTB'>
        <Detail selectedPokemon={selectedPokemon} />
      </div>
    </div>
  );
};

export default App;