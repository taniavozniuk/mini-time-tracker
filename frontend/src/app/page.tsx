import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Mini Time Tracket</h1>
          <p className={styles.subtitle}>
            Простий та зручний спосіь вести облік робочого часу
          </p>

          <div className={styles.ctaButtons}>
            <Link href="/add" className={styles.btnPrimary}>
              Почати додавати час
            </Link>
            <Link href="/history" className={styles.btnPrimary}>
              Переглянути історію
            </Link>
          </div>
        </section>
        <section className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📅</div>
            <h3>Щоденні записи</h3>
            <p>Додавайте час за кожен день швидко та без зайвих полів</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Автоматичні підсумки</h3>
            <p>Бачте загальну кількість годин за день та за весь період</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏷️</div>
            <h3>Проєкти</h3>
            <p>Розподіляйте час між різними клієнтами та задачами</p>
          </div>
        </section>
        <section className={styles.githubSection}>
          <h2 className={styles.sectionTitle}>Цей проєкт на GitHub</h2>

          <p className={styles.githubText}>
            Весь код в вільному доступі,ви можете переглянути як усе влаштовано
            всередині
          </p>

          <div className={styles.linksContainer}>
            <a
              href="https://github.com/taniavozniuk/mini-time-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              GitHub
            </a>

            <a
              href="https://mini-time-tracker-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoLink}
            >
              Демо
            </a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} Mini Time Tracker • створено для Viso
          Academy
        </p>
      </footer>
    </div>
  );
}
