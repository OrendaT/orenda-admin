import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = () => {
  return (
    <button className="mx-auto mt-8 flex w-full items-center justify-center gap-2 rounded-3xl border border-[#E7E7E7] p-[0.625rem] font-semibold transition-colors duration-500 hover:bg-[#f5f5f5]">
      <FcGoogle />
      Continue with Google
    </button>
  );
};
export default GoogleAuthButton;
