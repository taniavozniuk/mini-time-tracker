"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import axios from "axios";
import { timeEntriesApi } from "../api/timeEntries";

export const useTimeEntryForm = () => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [project, setProject] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedDate) {
      setError("Будь ласка, оберіть дату");
      return;
    }
    if (!project) {
      setError("Будь ласка, оберіть проєкт");
      return;
    }
    if (!hours || parseFloat(hours) <= 0) {
      setError("Будь ласка, введіть кількість годин (більше 0)");
      return;
    }
    if (!description.trim()) {
      setError("Будь ласка, введіть опис роботи");
      return;
    }

    setLoading(true);
    try {
      await timeEntriesApi.create({
        date: selectedDate.toISOString(),
        project,
        hours: parseFloat(hours),
        description: description.trim(),
      });

      router.push("/");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Помилка при збереженні запису";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    project,
    setProject,
    hours,
    setHours,
    description,
    setDescription,
    error,
    loading,
    handleSubmit,
  };
};
