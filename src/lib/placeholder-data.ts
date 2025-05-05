import { IntakeFormTableData } from '@/types';

export const intakeForms: IntakeFormTableData[] = [
  {
    id: '001',
    first_name: 'John',
    last_name: 'Doe',
    status: 'pending',
    type: 'Intake form',
    date: new Date(2025, 2, 28, 14, 30),
  },
  {
    id: '002',
    first_name: 'Jane',
    last_name: 'Smith',
    status: 'submitted',
    type: 'Intake form',
    date: new Date(2025, 2, 29, 9, 15),
  },
  {
    id: '003',
    first_name: 'Michael',
    last_name: 'Johnson',
    status: 'pending',
    type: 'Intake form',
    date: new Date(2025, 2, 30, 16, 45),
    flag: true,
  },
  {
    id: '004',
    first_name: 'Emily ',
    last_name: 'Davis',
    status: 'submitted',
    type: 'Intake form',
    date: new Date(2025, 3, 2, 11, 20),
  },
  {
    id: '005',
    first_name: 'Daniel ',
    last_name: 'Martinez',
    status: 'pending',
    type: 'Intake form',
    date: new Date(2025, 3, 3, 8, 50),
  },
];
