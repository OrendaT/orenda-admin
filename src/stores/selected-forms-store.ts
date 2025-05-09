import { create } from 'zustand';

interface SelectedFormsState {
  forms: string[];
  addForm: (id: string) => void;
  removeForm: (id: string) => void;
  clearForms: () => void;
}

const useSelectedFormsStore = create<SelectedFormsState>((set) => ({
  forms: [],
  addForm: (id: string) => set((state) => ({ forms: [...state.forms, id] })),
  removeForm: (id: string) =>
    set((state) => ({ forms: state.forms.filter((_id) => _id !== id) })),
  clearForms: () => set({ forms: [] }),
}));

export { useSelectedFormsStore };
