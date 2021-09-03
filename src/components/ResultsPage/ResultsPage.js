import React from "react";

import Navigation from "./Navigation/Navigation";

import styles from "./ResultsPage.module.css";

const ResultsPage = ({
    pokeData,
    setNewPokemon,
    goBack,
    weightConversion,
    heightConversion,
}) => {
    // Determines element color to display based on pokeData.type input
    const getTypeColor = type => {
        let color = "";
        switch (type) {
            case "normal":
                color = "#A8A878";
                break;
            case "fighting":
                color = "#C03028";
                break;
            case "flying":
                color = "#A890F0";
                break;
            case "poison":
                color = "#A03FA0";
                break;
            case "ground":
                color = "#E0C068";
                break;
            case "rock":
                color = "#B8A038";
                break;
            case "bug":
                color = "#A8B81F";
                break;
            case "ghost":
                color = "#705898";
                break;
            case "steel":
                color = "#B8B8D0";
                break;
            case "fire":
                color = "#F08030";
                break;
            case "water":
                color = "#6890F0";
                break;
            case "grass":
                color = "#79C850";
                break;
            case "electric":
                color = "#F8D030";
                break;
            case "psychic":
                color = "#F85888";
                break;
            case "ice":
                color = "#98D8D8";
                break;
            case "dragon":
                color = "#7038F8";
                break;
            case "dark":
                color = "#705848";
                break;
            case "fairy":
                color = "#EE99AC";
                break;
            default:
                "#A8A878";
        }
        return color;
    };
    return (
        /**************************************************************/
        /**  The code below to be separated into smaller components  **/
        /**************************************************************/

        <main className={styles.main}>
            <Navigation goBack={goBack} pokeData={pokeData} />
            <section className={styles.container}>
                <section className={`${styles.img_container} ${styles.box}`}>
                    <img src={pokeData.image} alt={pokeData.name} />
                </section>
                <section
                    className={`${styles.details_container} ${styles.box}`}
                >
                    <div className={styles.details_item}>
                        <h1>{pokeData.name}</h1>
                        <p>#{pokeData.index}</p>
                    </div>
                    <div className={styles.details_item}>
                        <div
                            className={styles.elements}
                            style={{
                                backgroundColor: getTypeColor(
                                    pokeData.elementalType_1
                                ),
                            }}
                        >
                            <p>{pokeData.elementalType_1}</p>
                        </div>
                        {/* Displays second type element, if present */}
                        {pokeData.elementalType_2 ? (
                            <div
                                className={styles.elements}
                                style={{
                                    backgroundColor: getTypeColor(
                                        pokeData.elementalType_2
                                    ),
                                    marginLeft: 4,
                                }}
                            >
                                <p>{pokeData.elementalType_2}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.details_item}>
                        <p>HT:</p>
                        <p>{heightConversion(pokeData.height)}</p>
                    </div>
                    <div className={styles.details_item}>
                        <p>WT:</p>
                        <p>{weightConversion(pokeData.weight)}</p>
                    </div>
                </section>
            </section>
            <section className={styles.container}>
                <section
                    className={`${styles.evolutions_container} ${styles.box}`}
                >
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Evolutions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Displays evolutions if present otherwise displays placeholder NONE*/}
                            {pokeData.evolution_1 ? (
                                <tr
                                    tabIndex="0"
                                    onClick={() =>
                                        setNewPokemon(pokeData.evolution_1)
                                    }
                                    onKeyDown={e => {
                                        e.code == "Enter" &&
                                            setNewPokemon(pokeData.evolution_1);
                                    }}
                                >
                                    <td>{pokeData.evolution_1}</td>
                                </tr>
                            ) : null}
                            {pokeData.evolution_2 ? (
                                <tr
                                    tabIndex="0"
                                    onClick={() =>
                                        setNewPokemon(pokeData.evolution_2)
                                    }
                                    onKeyDown={e => {
                                        e.code == "Enter" &&
                                            setNewPokemon(pokeData.evolution_2);
                                    }}
                                >
                                    <td>{pokeData.evolution_2}</td>
                                </tr>
                            ) : null}
                            {pokeData.evolution_3 ? (
                                <tr
                                    tabIndex="0"
                                    onClick={() =>
                                        setNewPokemon(pokeData.evolution_3)
                                    }
                                    onKeyDown={e => {
                                        e.code == "Enter" &&
                                            setNewPokemon(pokeData.evolution_3);
                                    }}
                                >
                                    <td>{pokeData.evolution_3}</td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </section>
                <section
                    className={`${styles.evolutions_container} ${styles.box}`}
                >
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cost</td>
                                <td>{`$${pokeData.cost}`}</td>
                            </tr>
                            <tr>
                                <td>Shipping</td>
                                <td>{`$${pokeData.shipping}`}</td>
                            </tr>
                            <tr>
                                <td>Availability</td>
                                <td>
                                    {pokeData.availability ? "In Stock" : "OOS"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
        </main>
    );
};

export default ResultsPage;
