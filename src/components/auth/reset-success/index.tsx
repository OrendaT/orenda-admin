import { SuccessIcon } from '@/assets/svgs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ResetSuccess = ({ className }: { className?: string }) => {
  return (
    <main className={cn('padding_inline', className)}>
      <div className="box_center text-center">
        <SuccessIcon className="mb-6 text-[#70B100]" />

        <h1 className="clamp-[text,xl,3xl] mb-6 font-bold">
          Password reset successful
        </h1>

        <p className="clamp-[text,sm,base] mb-12 max-w-[23.5rem]">
          You can log into your account with your new password.
        </p>

        <Button className="max-w-[23.5rem]" asChild>
          <Link href="/login">Login to account</Link>
        </Button>
      </div>
    </main>
  );
};
export default ResetSuccess;
