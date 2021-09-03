import React from "react";
import { useState } from "react";

import NameField from "./NameField/NameField";
import NumberField from "./NumberField/NumberField";
import TypeField from "./TypeField/TypeField";

import styles from "./SearchFields.module.css";

const SearchFields = ({ setTypeFieldResult, setNameAndNumberFieldResult }) => {
    // Input method and value set from input field components
    const [searchTerm, setSearchTerm] = useState({
        value: "",
        input: "",
    });

    return (
        <div className={styles.searchFields}>
            <form className={styles.form} autoComplete="off">
                <NameField
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                <div className={styles.secondaryInputs}>
                    <TypeField
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <NumberField
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                <input
                    className={`${styles.submitBtn} ${styles.input}`}
                    type="submit"
                    name="submit"
                    value="Submit!"
                    onClick={e => {
                        e.preventDefault();
                        // Sets searchValue and input state in App component. If no input
                        // value, returns null to avoid submit
                        searchTerm.input === "index" ||
                        searchTerm.input === "name"
                            ? setNameAndNumberFieldResult(searchTerm)
                            : null;
                        searchTerm.input === "type" &&
                            setTypeFieldResult(searchTerm);
                    }}
                />
            </form>
        </div>
    );
};

export default SearchFields;
