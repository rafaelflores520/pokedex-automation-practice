interface Type {
  name: string;
  url?: string;
}

interface Ability {
  name: string;
  url?: string;
  isHidden: boolean;
}

interface Pokemon {
  id: number;
  name: string;
  type: Array<Type>;
  abilities: Array<Ability>;
}
