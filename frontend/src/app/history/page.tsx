"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className={styles.historyContainer}>
      <div className={styles.headerWithBack}>
        <button onClick={() => router.back()} className={styles.backIconButton}>
          ← Back
        </button>
        <h1 className={styles.pageTitle}>Історія записів</h1>
      </div>
    </div>
  );
}
