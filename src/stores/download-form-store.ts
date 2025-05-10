import { create } from 'zustand';

interface DownloadState {
  task_id: string;
  status: 'pending' | 'success' | 'error';
  url?: string;
}

interface DownloadFormState {
  downloads: Record<string, DownloadState>;
  addTask: (key: string, value: DownloadState) => void;
  updateTask: (key: string, value: Partial<DownloadState>) => void;
  removeTask: (key: string) => void;
  clearTasks: () => void;
}

const useDownloadFormStore = create<DownloadFormState>((set) => ({
  downloads: {},
  addTask: (key: string, value: DownloadState) =>
    set((state) => ({ downloads: { ...state.downloads, [key]: value } })),
  updateTask: (key: string, value: Partial<DownloadState>) =>
    set((state) => ({
      downloads: {
        ...state.downloads,
        [key]: { ...state.downloads[key], ...value },
      },
    })),
  removeTask: (key: string) =>
    set((state) => {
      const { [key]: _, ...rest } = state.downloads;
      console.log(_);
      return { downloads: rest };
    }),
  clearTasks: () => set({ downloads: {} }),
}));

export default useDownloadFormStore;
