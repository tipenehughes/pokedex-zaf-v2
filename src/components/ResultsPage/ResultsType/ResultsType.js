import React from "react";
import { useState, useEffect } from "react";

import Navigation from "../Navigation/Navigation.js";
import Loading from "../../Utilities/Loading.js";
import ErrorPage from "../../Utilities/ErrorPage/ErrorPage.js";
import zafClient from "../../../zafClient";
import styles from "./ResultsType.module.css";

const ResultsType = ({ typeValue, setNewPokemon, goBack }) => {
    // Type data returned from API call
    const [typeResults, setTypeResults] = useState([]);

    // Toggles whether data has loaded or not
    const [isLoading, setIsLoading] = useState(true);

    const [isError, setIsError] = useState(false);

    const getTypeData = async () => {
        const typeData = await zafClient.request({
            url: "/api/sunshine/objects/query?per_page=50",
            type: "POST",
            data: JSON.stringify({
                query: {
                    $or: [
                        { elementalType_1: { $eq: typeValue } },
                        { elementalType_2: { $eq: typeValue } },
                    ],
                },
            }),
        });
        // Sets state if typeData is returned otherwise displays error page
        if (typeData.data.length !== 0) {
            setTypeResults(typeData.data.reverse());
        } else {
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getTypeData();
    }, []);

    // Mapping over results data to generate list of pokemon based on type
    const TypeData = typeResults.map((data, i) => {
        return (
            <tr
                tabIndex="0"
                className={styles.typeTableRow}
                key={i}
                onClick={() => setNewPokemon(data.attributes.name)}
                onKeyDown={e =>
                    e.code == "Enter" && setNewPokemon(data.attributes.name)
                }
            >
                <td className={styles.typeTableData}>{data.attributes.name}</td>
                <td
                    className={styles.typeTableData}
                >{`#${data.attributes.index}`}</td>
            </tr>
        );
    });

    return isLoading ? (
        <Loading />
    ) : isError ? (
        <ErrorPage goBack={goBack} />
    ) : (
        <div className={styles.container}>
            <Navigation goBack={goBack} page={"type"} />
            <table className={styles.tableContainer}>
                <tbody>{TypeData}</tbody>
            </table>
        </div>
    );
};

export default ResultsType;
