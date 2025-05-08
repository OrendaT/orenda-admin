'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePreviousDateStore } from '@/stores/previous-date-store';

const RangeSelect = () => {
  const days = usePreviousDateStore((state) => state.days);
  const setDays = usePreviousDateStore((state) => state.setDays);

  const onSelect = (value: string) => {
    setDays(value);
  };

  return (
    <Select onValueChange={onSelect} defaultValue={days}>
      <SelectTrigger className="min-w-32 font-medium">
        <SelectValue placeholder="Select a range" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={'7'}>Last 7 Days</SelectItem>
        <SelectItem value={'30'}>Last 30 Days</SelectItem>
        <SelectItem value={'60'}>Last 60 Days</SelectItem>
        <SelectItem value={'90'}>Last 90 Days</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default RangeSelect;
