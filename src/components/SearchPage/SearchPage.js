import React from "react"

import SearchFields from "./SearchFields/SearchFields"

import styles from "./Search.module.css"
import image from "../../assets/logo.png"

const SearchPage = ({
  setTypeFieldResult,
  setNameAndNumberFieldResult,
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.logoContainer}>
          <div>
            <img src={image} alt="Pokedex Logo" />
          </div>
        </header>
        <SearchFields
          setTypeFieldResult={setTypeFieldResult}
          setNameAndNumberFieldResult={setNameAndNumberFieldResult}
        />
      </div>
    </main>
  )
}

export default SearchPage
