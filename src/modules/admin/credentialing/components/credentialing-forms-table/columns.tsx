import { CredentialingFormData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import Options from './options';
import DownloadButton from './options/download-button';
import {
  SelectCell,
  SelectHeader,
} from '@/components/shared/forms-select-checkbox';
import FormColName from '@/components/shared/form-col-name';
import FormColStatus from '@/components/shared/form-col-status';
import FormColStatusDate from '@/components/shared/form-col-status-date';
import FormColLastAccessed from '@/components/shared/form-col-last-accessed';

export const columns: ColumnDef<CredentialingFormData>[] = [
  {
    id: 'select',
    header: SelectHeader,
    cell: SelectCell,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Provider Name',
    cell: FormColName,
  },
  {
    accessorKey: 'type',
    header: 'Form Type',
    cell: 'Onboarding Form',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: FormColStatus,
  },
  {
    accessorKey: 'updated_at',
    header: 'Status Date',
    cell: FormColStatusDate,
  },
  {
    accessorKey: 'last_accessed_at',
    header: 'Last Accessed',
    cell: FormColLastAccessed,
  },
  {
    id: 'download',
    enableHiding: false,
    cell: DownloadButton,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: Options,
  },
];
