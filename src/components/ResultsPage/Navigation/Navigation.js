import React from "react";
import styles from "./Navigation.module.css";
import zafClient from "../../../zafClient";

const Navigation = ({ goBack, pokeData, page }) => {
    const populateCustomField = () => {
        return zafClient.set({
            "ticket.customField:custom_field_360045346052": pokeData.name,
            "ticket.customField:custom_field_1900000017347": pokeData.index,
            "ticket.customField:custom_field_360046877451": pokeData.cost,
            "ticket.customField:custom_field_360046877471": pokeData.shipping,
            "ticket.customField:custom_field_360046847152": [
                pokeData.availability ? "In Stock" : "Out of Stock",
            ],
        });
    };
    const clearCustomField = () => {
        return zafClient.set({
            "ticket.customField:custom_field_360045346052": "",
            "ticket.customField:custom_field_1900000017347": "",
            "ticket.customField:custom_field_360046877451": "",
            "ticket.customField:custom_field_360046877471": "",
            "ticket.customField:custom_field_360046847152": "",
        });
    };

    return (
        <nav className={styles.nav}>
            <button className={styles.btn} onClick={goBack}>
                New Search
            </button>
            {page != "type" && (
                <>
                    <button
                        className={styles.btn}
                        onClick={() => populateCustomField()}
                    >
                        Copy to ticket
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => clearCustomField()}
                    >
                        Clear Ticket
                    </button>
                </>
            )}
        </nav>
    );
};

export default Navigation;
