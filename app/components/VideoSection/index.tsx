import styles from './VideoSection.module.css';

export default function VideoSection() {
  return (
    <section className={styles.video} data-nav-variant="dark">
      <span className={styles.label}>VIDEO</span>
      <div className={`${styles.gridLine} ${styles.line1}`} />
      <div className={`${styles.gridLine} ${styles.line2}`} />
      <div className={`${styles.gridLine} ${styles.line3}`} />
      <div className={`${styles.gridLine} ${styles.line4}`} />
    </section>
  );
}
