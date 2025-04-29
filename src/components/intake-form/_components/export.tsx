'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import DownloadForm from './intake-form-table/options/download-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LuUpload } from 'react-icons/lu';

const Export = () => {
  const [open, setOpen] = useState(false);
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

      <DownloadForm open={open} />
    </Dialog>
  );
};
export default Export;
