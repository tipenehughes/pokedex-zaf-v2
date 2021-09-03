import React from "react"
import styles from "./Loading.module.css"
import Loader from "../../assets/loader.gif"

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img className={styles.loader} src={Loader} />
    </div>
  )
}

export default Loading
