'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import DownloadForm from './download-form';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuUpload } from 'react-icons/lu';
import { useSelectedFormsStore } from '@/stores/selected-forms-store';

import useFormType from '@/hooks/use-form-type';

const Export = () => {
  const [open, setOpen] = useState(false);

  const forms = useSelectedFormsStore((state) => state.forms);

  const { type:form } = useFormType();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-orenda-purple border-orenda-purple w-fit py-1 text-sm"
          variant="outline"
        >
          <LuUpload /> Export
        </Button>
      </DialogTrigger>


      <DownloadForm open={open} forms={forms[form]} />

    </Dialog>
  );
};
export default Export;
