import { EmailIcon } from '@/assets/svgs';
import useResetPassword from '@/hooks/mutations/use-reset-password';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const CheckMail = ({
  email,
  className,
}: {
  email: string;
  className?: string;
}) => {
  const { mutateAsync, isPending } = useResetPassword();
  const resend = async () => {
    await mutateAsync(
      { email },
      {
        onSuccess: () => {
          toast.success('Email sent successfully');
        },
        onError: () => {
          toast.error('Something went wrong');
        },
      },
    );
  };

  return (
    <section className={cn('padding_inline', className)}>
      <div className="box_center text-center">
        <EmailIcon className="mb-4" />

        <h1 className="clamp-[text,xl,3xl] mb-6 font-bold">
          Check your mailbox
        </h1>

        <p className="clamp-[text,sm,base] mb-12 max-w-[23.5rem]">
          Click on the reset password link sent to{' '}
          <strong className="font-bold">{email}</strong> to create a new
          password.
        </p>

        <strong className="mb-6 text-sm">Didn’t receive an email?</strong>

        <button
          disabled={isPending}
          onClick={resend}
          className="text-orenda-purple text-sm font-semibold underline"
        >
          Resend confirmation email
        </button>
      </div>
    </section>
  );
};
export default CheckMail;
