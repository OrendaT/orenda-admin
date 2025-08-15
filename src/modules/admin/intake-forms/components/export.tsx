'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
<<<<<<<< HEAD:src/modules/admin/intake-forms/components/export.tsx
import DownloadForm from './intake-forms-table/options/download-form';
========
import DownloadForm from './download-form';
>>>>>>>> origin/develop:src/components/shared/export.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuUpload } from 'react-icons/lu';
import { useSelectedFormsStore } from '@/stores/selected-forms-store';
<<<<<<<< HEAD:src/modules/admin/intake-forms/components/export.tsx
========
import useFormType from '@/hooks/use-form-type';
>>>>>>>> origin/develop:src/components/shared/export.tsx

const Export = () => {
  const [open, setOpen] = useState(false);

  const forms = useSelectedFormsStore((state) => state.forms);
<<<<<<<< HEAD:src/modules/admin/intake-forms/components/export.tsx
========
  const { type:form } = useFormType();
>>>>>>>> origin/develop:src/components/shared/export.tsx

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

<<<<<<<< HEAD:src/modules/admin/intake-forms/components/export.tsx
      <DownloadForm open={open} forms={forms.intake} />
========
      <DownloadForm open={open} forms={forms[form]} />
>>>>>>>> origin/develop:src/components/shared/export.tsx
    </Dialog>
  );
};
export default Export;
