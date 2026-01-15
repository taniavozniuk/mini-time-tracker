"use client";
import dayjs from "dayjs";
import styles from "./page.module.css";
import { useHistoryEntries } from "../hooks/useHistoryEntries";
import { PROJECT_OPTIONS } from "../constants/projects";

export default function HistoryPage() {
  const { entries, dailyTotals, grandTotal, loading, error, router } =
    useHistoryEntries();
  return (
    <div className={styles.historyContainer}>
      <div className={styles.headerWithBack}>
        <button onClick={() => router.back()} className={styles.backIconButton}>
          ← Back
        </button>
        <h1 className={styles.pageTitle}>Історія записів</h1>
      </div>
      {loading ? (
        <p className={styles.emptyText}>Завантаження...</p>
      ) : error ? (
        <p className={styles.emptyText} style={{ color: "#dc2626" }}>
          {error}
        </p>
      ) : entries.length === 0 || dailyTotals.length === 0 ? (
        <p className={styles.emptyText}>Ще немає записів</p>
      ) : (
        <>
          {dailyTotals.map((day) => (
            <div key={day.date} className={styles.dayGroup}>
              <div className={styles.dayHeader}>
                <h2>{dayjs(day.date).format("DD.MM.YYYY")}</h2>
                <span className={styles.dayTotal}>
                  Загалом: {day.total.toFixed(2)} год
                </span>
              </div>

              <div className={styles.entriesList}>
                {day.entries.map((entry) => (
                  <div key={entry.id} className={styles.entryCard}>
                    <div className={styles.entryDate}>
                      {dayjs(entry.date).format("DD.MM.YYYY")}
                    </div>
                    <div className={styles.entryProject}>
                      {PROJECT_OPTIONS.find((o) => o.value === entry.project)
                        ?.label || entry.project}
                    </div>
                    <div className={styles.entryHours}>
                      {entry.hours.toFixed(2)} год
                    </div>
                    <div className={styles.entryDesc}>{entry.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className={styles.grandTotal}>
            Загальний час за весь період:{" "}
            <strong>{grandTotal.toFixed(2)} год</strong>
          </div>
        </>
      )}
    </div>
  );
}
