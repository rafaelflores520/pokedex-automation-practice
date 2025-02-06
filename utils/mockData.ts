export const mockPokemon: Pokemon = {
  name: "Kommo-o",
  id: 784,
  type: [{ name: "Dragon" }, { name: "Fighting" }],
  abilities: [
    { name: "Bulletproof", isHidden: false },
    { name: "Soundproof", isHidden: false },
    { name: "Overcoat", isHidden: true },
  ],
};

export const mockAbility: Ability = {
  name: "Aroma Veil",
  pokemonsWith: [
    {
      isHidden: true,
      pokemon: {
        name: "spritzee",
        url: "https://pokeapi.co/api/v2/pokemon/682/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "aromatisse",
        url: "https://pokeapi.co/api/v2/pokemon/683/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "milcery",
        url: "https://pokeapi.co/api/v2/pokemon/868/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "alcremie",
        url: "https://pokeapi.co/api/v2/pokemon/869/",
      },
    },
    {
      isHidden: false,
      pokemon: {
        name: "lechonk",
        url: "https://pokeapi.co/api/v2/pokemon/915/",
      },
    },
    {
      isHidden: true,
      pokemon: {
        name: "dachsbun",
        url: "https://pokeapi.co/api/v2/pokemon/927/",
      },
    },
    {
      isHidden: false,
      pokemon: {
        name: "oinkologne",
        url: "https://pokeapi.co/api/v2/pokemon/10254/",
      },
    },
  ],
};

export const mockMove: Move = {
  name: "Attract",
  type: {
    name: "normal",
  },
  pokemonWithMove: [
    {
      name: "Milotic",
    },
    {
      name: "Luvdisc",
    },
    {
      name: "Finneon",
    },
    {
      name: "Lumineon",
    },
    {
      name: "Vullaby",
    },
    {
      name: "Mandibuzz",
    },
    {
      name: "Milcery",
    },
    {
      name: "Alcremie",
    },
    {
      name: "Frosmoth",
    },
    {
      name: "Fezandipiti",
    },
    {
      name: "Illumise",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
    {
      name: "Oricorio",
    },
  ],
};
