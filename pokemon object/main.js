const pokeCall = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const res = await data.json();
    const object = await Promise.all(
        res.results.map(async data => {
            const pokemonData = async data => {
                const pokeData = await fetch(data.url);
                const pokeRes = await pokeData.json();
                const speciesData = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${data.name}`
                );
                const speciesRes = await speciesData.json();
                const evolutionData = await fetch(
                    speciesRes.evolution_chain.url
                );
                const evolutionRes = await evolutionData.json();
                const cost = () => {
                    return Math.floor(Math.random() * 501) + 500;
                };
                const shipping = () => {
                    return Math.floor(Math.random() * 20) + 50;
                };
                const objRec = {
                    type: "pokemon_api",
                    attributes: {
                        name: `${pokeRes.name}`,
                        index: `${pokeRes.id}`,
                        image: `${pokeRes.sprites.other.dream_world.front_default}`,
                        elementalType_1: `${pokeRes.types[0].type.name}`,
                        elementalType_2: `${
                            pokeRes.types[1] ? pokeRes.types[1].type.name : ""
                        }`,
                        evolution_1: `${evolutionRes.chain.species.name}`,
                        evolution_2: `${
                            evolutionRes.chain.evolves_to[0]
                                ? evolutionRes.chain.evolves_to[0].species.name
                                : ""
                        }`,
                        evolution_3: `${
                            !evolutionRes.chain.evolves_to[0]
                                ? ""
                                : evolutionRes.chain.evolves_to[0].evolves_to[0]
                                ? evolutionRes.chain.evolves_to[0].evolves_to[0]
                                      .species.name
                                : ""
                        }`,
                        height: `${pokeRes.height}`,
                        weight: `${pokeRes.weight}`,
                        cost: cost().toString(),
                        shipping: shipping().toString(),
                        availability: Math.random() < 0.5,
                    },
                };
                return objRec;
            };
            return pokemonData(data).then(res => res);
        })
    );
    const objectJob = {
        type: "resources",
        action: "post",
        data: object,
    };
    console.log(JSON.stringify(objectJob, null, 2));
};

pokeCall();
