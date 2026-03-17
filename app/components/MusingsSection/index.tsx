import styles from './MusingsSection.module.css';

export default function MusingsSection() {
  return (
    <section className={styles.musings} data-nav-variant="light">
      <div className={`${styles.gridLine} ${styles.line1}`} />
      <div className={`${styles.gridLine} ${styles.line2}`} />
      <div className={`${styles.gridLine} ${styles.line3}`} />
      <div className={`${styles.gridLine} ${styles.line4}`} />

      <h2 className={styles.title}>MUSINGS</h2>

      <div className={`${styles.postCard} ${styles.post1}`}>
        <div className={styles.postTitle}>Post Title Placeholder</div>
        <div className={styles.postDate}>Date Placeholder</div>
      </div>

      <div className={`${styles.postCard} ${styles.post2}`}>
        <div className={styles.postTitle}>Post Title Placeholder</div>
        <div className={styles.postDate}>Date Placeholder</div>
      </div>

      <div className={`${styles.postCard} ${styles.post3}`}>
        <div className={styles.postTitle}>Post Title Placeholder</div>
        <div className={styles.postDate}>Date Placeholder</div>
      </div>
    </section>
  );
}
