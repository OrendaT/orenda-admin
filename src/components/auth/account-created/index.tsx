import { CheckIcon } from '@/assets/svgs';
import Button from '@/components/ui/custom-button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const AccountCreated = ({ className }: { className?: string }) => {
  return (
    <main className={cn('padding_inline', className)}>
      <div className="box_center text-center">
        <CheckIcon className="text-orenda-purple mb-6" />

        <h1 className="auth_page_heading clamp-[text,xl,3xl] mb-6">
          Verification Successful
        </h1>

        <p className="clamp-[text,sm,base] mb-12 max-w-[23.5rem]">
          Your account has been successfully created.
        </p>

        <Button className="max-w-[23.5rem]" asChild>
          <Link href="/login">Login to account</Link>
        </Button>
      </div>
    </main>
  );
};
export default AccountCreated;
