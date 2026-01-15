import axios from "axios";
import { CreateTimeEntryDto } from "../types/CreateTimeEntryDto";
import { TimeEntry } from "../types/TimeEntry";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const timeEntriesApi = {
  create: async (data: CreateTimeEntryDto): Promise<TimeEntry> => {
    const response = await apiClient.post<TimeEntry>("/time-entries", data);
    return response.data;
  },

  getAll: async (): Promise<TimeEntry[]> => {
    const response = await apiClient.get<TimeEntry[]>("/time-entries");
    return response.data;
  },
};
