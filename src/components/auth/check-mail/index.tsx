import { EmailIcon } from "@/assets/svgs";
import { cn } from "@/lib/utils";

const CheckMail = ({ className }: { className?: string }) => {
  return (
    <section className={cn("padding_inline", className)}>
      <div className="box_center text-center">
        <EmailIcon className="mb-4" />

        <h1 className="clamp-[text,xl,3xl] mb-6 font-bold">Check your mailbox</h1>

        <p className="clamp-[text,sm,base] mb-12 max-w-[23.5rem]">
          Click on the reset password link sent to{" "}
          <strong className="font-bold">mikeross@gmail.com</strong> to create a
          new password.
        </p>

        <strong className="mb-6 text-sm">Didn’t receive an email?</strong>

        <button className="text-orenda-purple text-sm font-semibold underline">
          Resend confirmation email
        </button>
      </div>
    </section>
  );
};
export default CheckMail;
