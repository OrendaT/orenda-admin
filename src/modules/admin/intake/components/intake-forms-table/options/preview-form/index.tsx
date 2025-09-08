'use client';

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralTab from './general-tab';
import CreditCardTab from './credit-card-tab';
import SignaturesTab from './signatures-tab';

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
          <TabsTrigger value="cc_info" disabled={status !== 'submitted'}>
            Credit Card Info
          </TabsTrigger>
          <TabsTrigger value="signatures" disabled={status !== 'submitted'}>
            Signature
          </TabsTrigger>
        </TabsList>

        <GeneralTab id={id} />
        <CreditCardTab id={id} />
        <SignaturesTab id={id} />
      </Tabs>
    </DialogContent>
  );
};

export default PreviewForm;
