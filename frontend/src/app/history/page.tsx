"use client";
import dayjs from "dayjs";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { Entry } from "../types/Entry";
import { useState, useEffect } from "react";
import { timeEntriesApi, TimeEntry } from "../api/timeEntries";

const options = [
  { value: "viso", label: "Viso Internal" },
  { value: "client-a", label: "Client A" },
  { value: "client-b", label: "Client B" },
  { value: "personal", label: "Personal Development" },
];

export default function HistoryPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const data = await timeEntriesApi.getAll();
        console.log("Fetched data:", data); // Для дебагу
        // Конвертуємо TimeEntry в Entry формат та нормалізуємо дату
        const formattedEntries: Entry[] = data.map((entry: TimeEntry) => {
          // Нормалізуємо дату до формату YYYY-MM-DD для групування
          const dateStr = dayjs(entry.date).format("YYYY-MM-DD");
          return {
            id: entry.id,
            date: dateStr,
            project: entry.project,
            hours: entry.hours,
            description: entry.description,
          };
        });
        console.log("Formatted entries:", formattedEntries); // Для дебагу
        setEntries(formattedEntries);
      } catch (err: unknown) {
        console.error("Error fetching entries:", err); // Для дебагу
        let errorMessage = "Помилка при завантаженні записів";
        if (err && typeof err === "object") {
          if ("response" in err) {
            const axiosError = err as {
              response?: { data?: { message?: string } };
            };
            errorMessage = axiosError.response?.data?.message || errorMessage;
          } else if ("message" in err) {
            errorMessage = String((err as { message: unknown }).message);
          }
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Групування за датою
  const grouped = entries.reduce((acc: Record<string, Entry[]>, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  // Сортування дат від нових до старих
  const sortedDates = Object.keys(grouped).sort((a, b) =>
    dayjs(b).diff(dayjs(a))
  );

  // Підсумки
  const dailyTotals = sortedDates.map((date) => {
    const total = grouped[date].reduce((sum, e) => sum + e.hours, 0);
    return { date, total, entries: grouped[date] };
  });

  const grandTotal = dailyTotals.reduce((sum, day) => sum + day.total, 0);

  // Дебаг
  console.log("Entries:", entries);
  console.log("Grouped:", grouped);
  console.log("Sorted dates:", sortedDates);
  console.log("Daily totals:", dailyTotals);
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
                      {options.find((o) => o.value === entry.project)?.label ||
                        entry.project}
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
