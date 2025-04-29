import { SuccessIcon } from '@/assets/svgs';

const SuccessMessage = ({ message }: { message?: string }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6">
      <SuccessIcon className="text-[#00B809]" />
      <p className="text-center text-lg font-semibold">{message}</p>
    </div>
  );
};
export default SuccessMessage;
