interface Type {
  name: string;
  url?: string;
}

interface PokeAbility {
  name: string;
  url?: string;
  isHidden: boolean;
}

interface Pokemon {
  id: number;
  name: string;
  type: Array<Type>;
  abilities: Array<PokeAbility>;
}
