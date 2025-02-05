import { request } from "@playwright/test";
import { console } from "inspector";

const initRequestContext = async () => {
  return await request.newContext({
    baseURL: "https://pokeapi.co",
  });
};

export const getPokemon = async (pokeName: string): Promise<Pokemon> => {
  const context = await initRequestContext();
  const callResponse = await context.get(`/api/v2/pokemon/${pokeName}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await callResponse.json();
  return {
    id: data.id,
    name: data.name,
    type: data.types.map((elem) => {
      return {
        name: elem.type?.name,
        url: elem.type?.url,
      };
    }),
    abilities: data.abilities.map((elem) => {
      return {
        name: elem.ability?.name,
        isHidden: elem.is_hidden,
      };
    }),
  };
};

export const getAbility = async (pokeAbility: string): Promise<Ability> => {
  const context = await initRequestContext();
  const callResponse = await context.get(`/api/v2/ability/${pokeAbility}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await callResponse.json();
  return {
    name: data.name,
    pokemonsWith: data.pokemon.map((elem) => {
      return {
        isHidden: elem.is_hidden,
        pokemon: {
          name: elem.pokemon.name,
        },
      };
    }),
  };
};
