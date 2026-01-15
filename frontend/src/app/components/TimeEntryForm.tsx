"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
} from "@mui/material";
import styles from "./TimeEntryForm.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { timeEntriesApi } from "../api/timeEntries";

const options = [
  { value: "viso", label: "Viso Internal" },
  { value: "client-a", label: "Client A" },
  { value: "client-b", label: "Client B" },
  { value: "personal", label: "Personal Development" },
];

export const TimeEntryForm = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [project, setProject] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Валідація
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
      // Перенаправлення на головну сторінку після успішного збереження
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Помилка при збереженні запису"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <div className={styles.formGroup}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </LocalizationProvider>
        </div>

        <div className={styles.formGroup}>
          <FormControl fullWidth>
            <InputLabel className={styles.label}>Проєкт</InputLabel>
            <Select
              label="Проєкт"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className={styles.select}
              MenuProps={{
                classes: { paper: styles.menuPaper },
              }}
            >
              <MenuItem value="" disabled>
                Оберіть проєкт
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={styles.formGroup}>
          <TextField
            label="Години"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            inputProps={{
              step: 0.25,
              min: 0.25,
              max: 24,
              className: styles.input,
            }}
            fullWidth
            placeholder="наприклад: 7.5"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            label="Опис роботи"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            InputProps={{
              className: styles.textarea,
            }}
            required
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Збереження..." : "Зберегти"}
        </Button>
      </form>
    </div>
  );
};
