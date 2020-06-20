import React from "react";
import { useAxios } from "./hooks";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, addPokemon, clearPokemons] = useAxios("https://pokeapi.co/api/v2/pokemon/");

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        {!!pokemon.length && <button onClick={clearPokemons}>Clear</button>}
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(card => (
          <PokemonCard
            key={card.id}
            front={card.data.sprites.front_default}
            back={card.data.sprites.back_default}
            name={card.data.name}
            stats={card.data.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
