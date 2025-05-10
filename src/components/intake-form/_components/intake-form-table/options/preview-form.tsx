import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const PreviewForm = ({ id }: { id: string }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Preview</DialogTitle>
        <DialogDescription>
          Tab through different sections of the form
        </DialogDescription>

        <p>{id}</p>
      </DialogHeader>
    </DialogContent>
  );
};

export default PreviewForm;
