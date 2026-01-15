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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTimeEntryForm } from "../hooks/useTimeEntries";
import { PROJECT_OPTIONS } from "../constants/projects";

export const TimeEntryForm = () => {
  const {
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
  } = useTimeEntryForm();

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
              {PROJECT_OPTIONS.map((option) => (
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
