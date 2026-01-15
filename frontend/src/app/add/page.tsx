"use client";
import { useRouter } from "next/navigation";
import { TimeEntryForm } from "../components/TimeEntryForm";
import styles from "./page.module.css";

export default function AddTimeEntryPage() {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()} className={styles.backIconButton}>
        ← Back
      </button>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>Додати робочий час</h1>
            <p className={styles.subtitle}>
              Заповніть форму, щоб зберегти свій робочий день
            </p>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Новий запис</h2>
            <TimeEntryForm />
          </div>
        </div>
      </div>
    </>
  );
}
