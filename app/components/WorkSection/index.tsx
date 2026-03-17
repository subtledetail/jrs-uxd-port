import styles from './WorkSection.module.css';

export default function WorkSection() {
  return (
    <section className={styles.work} data-nav-variant="dark">
      <div className={`${styles.gridLine} ${styles.line1}`} />
      <div className={`${styles.gridLine} ${styles.line2}`} />
      <div className={`${styles.gridLine} ${styles.line3}`} />
      <div className={`${styles.gridLine} ${styles.line4}`} />

      <h2 className={styles.title}>WORK</h2>

      {/* Card 1 — YETI */}
      <div className={`${styles.card} ${styles.card1}`}>
        <div className={`${styles.imageBlock} ${styles.card1bg}`} />
        <div className={styles.client}>YETI</div>
        <div className={styles.descriptor}>E-COMMERCE REDESIGN</div>
      </div>

      {/* Card 2 — Kaiser */}
      <div className={`${styles.card} ${styles.card2}`}>
        <div className={`${styles.imageBlock} ${styles.card2bg}`} />
        <div className={styles.client}>KAISER PERMANENTE</div>
        <div className={styles.descriptor}>DESIGN SYSTEM</div>
      </div>

      {/* Card 3 — FRB */}
      <div className={`${styles.card} ${styles.card3}`}>
        <div className={`${styles.imageBlock} ${styles.card3bg}`} />
        <div className={styles.client}>FEDERAL RESERVE BANK</div>
        <div className={styles.descriptor}>UX STRATEGY</div>
      </div>

      <div className={styles.viewAll}>VIEW ALL WORK</div>
    </section>
  );
}
