import styles from "./tests.module.css"

export function Tests() {
  return (
    <div>
      <h2>Exemplo com display: inline</h2>
      <span className={styles.inline}>Elemento 1</span>
      <span className={styles.inline}>Elemento 2</span>
      <span className={styles.inline}>Elemento 3</span>

      <h2>Exemplo com display: block</h2>
      <span className={styles.bloc}>Elemento 1</span>
      <span className={styles.block}>Elemento 2</span>
      <span className={styles.block}>Elemento 3</span>
    </div>
  )
}