interface PokemonSummary {
  name: string;
  url?: string;
}

interface Move {
  name: string;
  type: Type;
  pokemonWithMove: Array<PokemonSummary>;
}
