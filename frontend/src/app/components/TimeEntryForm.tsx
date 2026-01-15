"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./TimeEntryForm.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const options = [
  { value: "viso", label: "Viso Internal" },
  { value: "client-a", label: "Client A" },
  { value: "client-b", label: "Client B" },
  { value: "personal", label: "Personal Development" },
];

export const TimeEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(dayjs());
  return (
    <div className={styles.wrapper}>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Дата"
              minDate={dayjs()}
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
              defaultValue=""
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
            inputProps={{
              step: 0.25,
              min: 0.25,
              max: 24,
              className: styles.input,
            }}
            fullWidth
            placeholder="наприклад: 7.5"
          />
        </div>

        <div className={styles.formGroup}>
          <TextField
            label="Опис роботи"
            multiline
            rows={4}
            fullWidth
            InputProps={{
              className: styles.textarea,
            }}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          className={styles.submitButton}
        >
          Зберегти
        </Button>
      </form>
    </div>
  );
};
