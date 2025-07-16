import { create } from 'zustand';

interface ActionProps {
  form: keyof SelectedFormsState['forms'];
  id: string;
}

type SelectedFormsState = {
  forms: { intake: string[]; credit_card: string[] };
};

type SelectedFormsActions = {
  addForm: (props: ActionProps) => void;
  removeForm: (id: ActionProps) => void;
  clearForms: (form: ActionProps['form']) => void;
};

type SelectedFormsStore = SelectedFormsState & SelectedFormsActions;

const useSelectedFormsStore = create<SelectedFormsStore>((set) => ({
  forms: { intake: [], credit_card: [] },
  addForm: ({ form, id }) =>
    set((state) => ({ ...state, [form]: [...state.forms[form], id] })),
  removeForm: ({ form, id }) =>
    set((state) => ({
      ...state,
      [form]: state.forms[form].filter((_id) => _id !== id),
    })),
  clearForms: (form) => set((state) => ({ ...state, [form]: [] })),
}));

export { useSelectedFormsStore };
