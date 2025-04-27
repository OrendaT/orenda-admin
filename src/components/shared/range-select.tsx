import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const RangeSelect = () => {
  return (
    <Select defaultValue='30'>
      <SelectTrigger className="font-medium min-w-32">
        <SelectValue placeholder="Select a range" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={'30'}>Last 30 Days</SelectItem>
        <SelectItem value={'60'}>Last 60 Days</SelectItem>
        <SelectItem value={'90'}>Last 90 Days</SelectItem>
      </SelectContent>
    </Select>
  );
};
export default RangeSelect;
