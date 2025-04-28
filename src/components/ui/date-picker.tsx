'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useId, useState } from 'react';
import { DayPickerProps } from 'react-day-picker';
import { Controller } from 'react-hook-form';
import FormErrorMessage from './error-message';

interface DatePickerBaseProps extends Omit<DayPickerProps, 'mode'> {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  dateFormat?: string;
}

interface DatePickerProps extends DatePickerBaseProps {
  date?: Date;
  setDate: (date?: Date) => void;
}

interface FormDatePickerProps extends DatePickerBaseProps {
  name: string;
  label: string;
}

const Picker = ({
  date,
  setDate,
  children,
  className,
  placeholder,
  dateFormat,
  ...props
}: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      {children ? (
        children
      ) : (
        <Button
          variant={'outline'}
          className={cn(
            'relative justify-start pe-14 text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <span className="block truncate">
            {date ? (
              format(date, dateFormat || 'PPP')
            ) : (
              <span>{placeholder ? placeholder : 'Pick a date'}</span>
            )}
          </span>

          <span className="bg-lavender-mist text-orenda-purple clamp-[w,8,2.94rem] absolute right-0 flex h-full items-center justify-center rounded-r-lg">
            <CalendarIcon className="clamp-[size,5,6]" />
          </span>
        </Button>
      )}
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        {...props}
      />
    </PopoverContent>
  </Popover>
);

const DatePicker = ({ ...props }: DatePickerProps) => {
  const [date, setDate] = useState<Date>();

  return <Picker {...props} date={date} setDate={setDate} />;
};

const FormDatePicker = ({ label, name, ...props }: FormDatePickerProps) => {
  const id = useId();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <div className="w-full">
          {label && (
            <label className="label" htmlFor={name}>
              {label}
            </label>
          )}

          <Picker
            id={id}
            date={field.value}
            setDate={field.onChange}
            {...props}
          />

          <FormErrorMessage name={name} id={id} />
        </div>
      )}
    />
  );
};

export { DatePicker, FormDatePicker };
