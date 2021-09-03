import React from "react";
import { useState, useEffect } from "react";

import SearchPage from "../SearchPage/SearchPage";
import ResultsPage from "../ResultsPage/ResultsPage";
import ResultsType from "../ResultsPage/ResultsType/ResultsType";
import ErrorPage from "../Utilities/ErrorPage/ErrorPage";
import Loading from "../Utilities/Loading";

import "./App.css";

import zafClient from "../../zafClient";

const App = () => {
    useEffect(() => {
        zafClient.invoke("resize", { height: "300px" });
        const preCheck = async () => {
            // Pulls any data entered in custom fields in zendesk
            const data = await zafClient.get([
                "ticket.customField:custom_field_360045346052",
                "ticket.customField:custom_field_1900000017347",
            ]);
            // Stores data in an array
            const pokemonNameAndNumber = [
                data["ticket.customField:custom_field_360045346052"],
                data["ticket.customField:custom_field_1900000017347"],
            ];
            // Checks if data is present in custom fields on load, sets state to data in fields
            // and displays results immediately]
            if (
                pokemonNameAndNumber[0] != null &&
                pokemonNameAndNumber[0].length > 0
            ) {
                setIsLoading(true);
                setInput("name");
                setSearchValue(pokemonNameAndNumber[0]);
            }
            if (
                pokemonNameAndNumber[1] != null &&
                pokemonNameAndNumber[1].length > 0
            ) {
                setIsLoading(true);
                setInput("index");
                setSearchValue(pokemonNameAndNumber[1]);
            }
        };
        zafClient.on("app.activated", preCheck());
    }, []);

    // Pokemon Data returned from API call
    const [pokeData, setPokeData] = useState({});

    // Checks if error with API request
    const [isError, setIsError] = useState(false);

    // Toggles whether data has loaded or not
    const [isLoading, setIsLoading] = useState(false);

    // Value entered in name or number search field -- also set by setNewPokemon() function
    const [searchValue, setSearchValue] = useState("");

    // Value entered in type search field
    const [type, setType] = useState("");

    // Gets input method used to in search fields
    const [input, setInput] = useState("");

    // Event handler to set new name or index searchValue and input
    // from searchFields component
    const setNameAndNumberFieldResult = data => {
        setIsLoading(true);
        setInput(data.input);
        setSearchValue(data.value);
    };

    // Event handler to set new type from type field
    const setTypeFieldResult = data => {
        setIsLoading(true);
        setInput("type");
        setType(data.value);
        setIsLoading(false);
    };

    // Event handler to set new pokemon search from Type results or Evolution fields
    const setNewPokemon = pokemon => {
        // Prevents attempted reload if user selects pokemon that is currently displayed
        pokemon !== searchValue && setIsLoading(true);
        if (input === "type" || input === "index") {
            setInput("name");
        }
        setSearchValue(pokemon);
    };

    // Returns user to main search landing
    const goBack = () => {
        setInput("");
        setSearchValue("");
        setPokeData({});
        setIsError(false);
    };

    // Calls API on searchValue state change
    useEffect(() => {
        searchValue != "" && getPokeData();
    }, [searchValue]);

    const getPokeData = async () => {
        // Gets object record based on input and searchValue
        const objectRecord = await zafClient.request({
            url: "/api/sunshine/objects/query",
            type: "POST",
            data: JSON.stringify({
                query: {
                    [input]: { $eq: searchValue },
                },
            }),
        });
        // Sets state if object record is returned otherwise displays error page
        if (objectRecord.data.length !== 0) {
            setPokeData({
                data: objectRecord.data[0].attributes,
            });
        } else {
            setIsError(true);
        }
        setIsLoading(false);
    };

    // HELPER FUNCTIONS //

    // Converts Pokemon weight from Hectograms to Pounds
    const weightConversion = weight => {
        const result = Math.floor(weight / 4.536);
        return result + "lbs";
    };

    // Converts Pokemon weight from Decimeters to Feet
    const heightConversion = height => {
        const result = Math.floor(height / 3.048);
        return result + "ft";
    };

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <ErrorPage goBack={goBack} />
    ) : (
        <div className="App">
            {input === "" && (
                <SearchPage
                    setTypeFieldResult={setTypeFieldResult}
                    setNameAndNumberFieldResult={setNameAndNumberFieldResult}
                />
            )}
            {input === "name" || input === "index" ? (
                <ResultsPage
                    pokeData={pokeData.data}
                    setNewPokemon={setNewPokemon}
                    goBack={goBack}
                    setIsLoading={setIsLoading}
                    weightConversion={weightConversion}
                    heightConversion={heightConversion}
                />
            ) : null}
            {input === "type" && (
                <ResultsType
                    typeValue={type}
                    setNewPokemon={setNewPokemon}
                    setIsLoading={setIsLoading}
                    goBack={goBack}
                />
            )}
        </div>
    );
};

export default App;
