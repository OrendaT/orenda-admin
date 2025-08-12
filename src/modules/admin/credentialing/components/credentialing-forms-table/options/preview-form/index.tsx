'use client';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralTab from './general-tab';
import SignatureTab from './signature-tab';

const PreviewForm = ({ id, status }: { id: string; status: string }) => {
  return (
    <DialogContent className="max-h-[97dvh]">
      <DialogHeader>
        <DialogTitle>Preview</DialogTitle>
        <DialogDescription>
          Tab through different sections of the form
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="general" className="mt-4">
        <TabsList className="w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger
            className="disabled:cursor-not-allowed"
            value="signature"
            disabled={status !== 'submitted'}
          >
            Signature
          </TabsTrigger>
        </TabsList>

        <GeneralTab id={id} />
        <SignatureTab id={id} />
      </Tabs>
    </DialogContent>
  );
};

export default PreviewForm;
