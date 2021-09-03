import React from "react";
import { useState, useEffect } from "react";
import styles from "./NameFields.module.css";
import zafClient from "../../../../zafClient";

const NameField = ({ searchTerm, setSearchTerm }) => {
    const [pokeList, setPokeList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [keyPress, setKeyPress] = useState("");

    useEffect(() => {
        getPokeList();
        return () => {
            setPokeList([]);
        };
    }, []);

    // GET request for all Pokemon equal to or less than 151 (Generation 1)
    // and saves to pokeList
    const getPokeList = async () => {
        const data = await zafClient.request(
            `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        setPokeList(data.results);
    };

    // Grabs pokemon from array that match searchValue entered in the input field
    const filteredResults = pokeList.filter(data => {
        if (searchValue === "") {
            return null;
        } else if (
            data.name.toLowerCase().includes(searchValue.toLowerCase())
        ) {
            return data.name;
        }
    });

    // Used to set state based on selection from Dislpayed Results
    const setSelection = data => {
        // Sets searchTerm in SearchFields component.
        setSearchTerm({
            ...searchTerm,
            value: data.name,
            input: "name",
        });
        // Set searchValue and closes drop down
        setSearchValue(data.name);
        setShowDropdown(false);
    };

    // Maps over filteredResults to generate drop down list
    const DisplayResults = filteredResults.map((data, key) => {
        return (
            <div className={styles.resultsContainer} key={key}>
                <p
                    tabIndex="0"
                    className={styles.results}
                    onClick={() => {
                        setSelection(data);
                    }}
                    onKeyDown={e => {
                        e.code == "Enter" && setSelection(data);
                    }}
                >
                    {data.name}
                </p>
            </div>
        );
    });

    // If filteredResults array is equal to 1, populates searchValue and searchTerm (App.js)
    // with filteredResults.name value, and closes dropdown.
    const checkMatch = () => {
        if (filteredResults.length === 1) {
            setSearchValue(filteredResults[0].name);
            setSearchTerm({
                ...searchTerm,
                value: filteredResults[0].name,
                input: "name",
            });
            setShowDropdown(false);
        }
    };
    return (
        <>
            <label className={styles.label} htmlFor="name">
                Name
            </label>
            <div className={styles.formControl}>
                <input
                    className={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Search by name"
                    value={searchValue}
                    // Gets key that has been entered
                    onKeyDown={e => {
                        setKeyPress(e.code);
                    }}
                    // Sets searchTerm in App component.
                    // Sets searchValue to value entered in input field.
                    // Displays dropdown if searchTerm is not empty string.
                    onChange={e => {
                        const newValue = e.target.value;
                        setSearchValue(newValue);
                        setSearchTerm({
                            ...searchTerm,
                            value: newValue,
                            input: !newValue ? "" : "name",
                        });
                        searchValue !== "" && setShowDropdown(true);
                        // If key pressed is backspace, negates checkMatch function
                        // to prevent re-populating searchTerm and SearchValue when
                        // trying to backspace character
                        if (keyPress == "Backspace") {
                            return;
                        }
                        checkMatch();
                    }}
                />
                <span
                    // Clears searchTerm if "X" is clicked
                    aria-label="clear input"
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                        setSearchTerm("");
                        setSearchValue("");
                    }}
                    onKeyDown={e => {
                        if (e.code === "Enter") {
                            setSearchTerm("");
                            setSearchValue("");
                        }
                    }}
                >
                    {searchValue ? "X" : null}
                </span>
            </div>
            {showDropdown ? (
                <div className={styles.container}>{DisplayResults}</div>
            ) : null}
        </>
    );
};

export default NameField;
