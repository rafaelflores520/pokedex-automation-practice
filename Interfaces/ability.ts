interface PokemonWithAbility {
  isHidden: boolean;
  pokemon: PokemonSummary;
}

interface Ability {
  name: string;
  pokemonsWith: Array<PokemonWithAbility>;
}
