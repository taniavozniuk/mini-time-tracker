import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Entry } from "../types/Entry";
import { TimeEntry } from "../types/TimeEntry";
import { timeEntriesApi } from "../api/timeEntries";
import axios from "axios";

export const useHistoryEntries = () => {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const data = await timeEntriesApi.getAll();
        const formattedEntries: Entry[] = data.map((entry: TimeEntry) => {
          const dateStr = dayjs(entry.date).format("YYYY-MM-DD");
          return {
            id: entry.id,
            date: dateStr,
            project: entry.project,
            hours: entry.hours,
            description: entry.description,
          };
        });
        setEntries(formattedEntries);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Помилка при завантажені записів";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const grouped = entries.reduce((acc: Record<string, Entry[]>, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) =>
    dayjs(b).diff(dayjs(a))
  );

  const dailyTotals = sortedDates.map((date) => {
    const total = grouped[date].reduce((sum, e) => sum + e.hours, 0);
    return { date, total, entries: grouped[date] };
  });

  const grandTotal = dailyTotals.reduce((sum, day) => sum + day.total, 0);

  return { entries, dailyTotals, grandTotal, loading, error, router };
};
