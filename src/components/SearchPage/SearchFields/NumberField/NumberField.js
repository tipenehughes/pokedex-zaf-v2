import React from "react"
import styles from "./NumberField.module.css"

const NumberField = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <label className={styles.label} htmlFor="index">
                Number
      </label>
      <input
        className={styles.input}
        type="text"
        id="index"
        name="index"
        placeholder="Search by number"
        onChange={(e) =>
        // Sets searchTerm in SeachFields component
          setSearchTerm({
            ...searchTerm,
            value: e.target.value,
            input: !e.target.value ? "" : e.target.name,
          })
        }
      />
    </>
  )
}

export default NumberField
