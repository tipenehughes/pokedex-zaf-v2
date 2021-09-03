import React from "react"
import styles from "./ErrorPage.module.css"

const ErrorPage = ({ goBack }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.errorMessage}>Sorry, your search was invalid. Please try again!</p>
        <button className={styles.btn} onClick={goBack}>
                    New Search
        </button>
      </div>
    </main>
  )
}

export default ErrorPage
