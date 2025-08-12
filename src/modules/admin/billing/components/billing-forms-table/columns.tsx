import { BillingFormData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import DownloadButton from './options/download-button';
import Options from './options';
import FormColName from '@/components/shared/form-col-name';
import FormColStatus from '@/components/shared/form-col-status';
import FormColStatusDate from '@/components/shared/form-col-status-date';

export const columns: ColumnDef<BillingFormData>[] = [
  // {
  //   id: 'select',
  //   header: SelectHeader,
  //   cell: SelectCell,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'patient_name',
    header: 'Patient Name',
    cell: FormColName,
  },
  {
    accessorKey: 'type',
    header: 'Form Type',
    cell: 'Credit Card',
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
