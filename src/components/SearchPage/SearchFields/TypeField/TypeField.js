import React from "react";
import { useState } from "react";
import styles from "./TypeField.module.css";

const TypeField = ({ searchTerm, setSearchTerm }) => {
    const [searchValue, setSearchValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [keyPress, setKeyPress] = useState("");

    // List of pokemon types
    const types = [
        "normal",
        "fighting",
        "flying",
        "poison",
        "ground",
        "rock",
        "bug",
        "ghost",
        "steel",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ice",
        "dragon",
        "dark",
        "fairy",
    ];

    // Grabs types from array that match searchTerm entered in the input field
    const filteredResults = types.filter(data => {
        if (searchValue === "") {
            return null;
        } else if (data.includes(searchValue.toLowerCase())) {
            return data;
        }
    });

    // Used to set state based on selection from Dislpayed Results
    const setSelection = data => {
        // Sets searchTerm in SearchFields component.
        setSearchTerm({
            ...searchTerm,
            value: data,
            input: "type",
        });
        // Set searchValue and closes drop down
        setSearchValue(data);
        setShowDropdown(false);
    };

    // Maps over returned type items to generate drop down list
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
                    {data}
                </p>
            </div>
        );
    });

    // If filteredResults array is equal to 1, populates searchValue and searchValue (App.js) with filteredResults.name value, and closes dropdown.
    const checkMatch = () => {
        if (filteredResults.length === 1) {
            setSearchValue(filteredResults[0]);
            setSearchTerm({
                ...searchTerm,
                value: filteredResults[0],
                input: "type",
            });
            setShowDropdown(false);
        }
    };
    return (
        <>
            <label className={styles.label} htmlFor="type">
                Type
            </label>
            <div className={styles.formControl}>
                <input
                    className={styles.input}
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Search by type"
                    value={searchValue}
                    // Gets key that has been entered
                    onKeyDown={e => {
                        setKeyPress(e.code);
                    }}
                    onChange={e => {
                        const newValue = e.target.value;
                        setSearchValue(newValue);
                        // Sets searchTerm in SearchFields component.
                        setSearchTerm({
                            ...searchTerm,
                            value: newValue,
                            input: !newValue ? "" : "type",
                        });
                        // Displays dropdown if searchValue is not empty string.
                        searchValue !== "" && setShowDropdown(true);
                        // Negates checkMatch function if key pressed is backspace
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

export default TypeField;
