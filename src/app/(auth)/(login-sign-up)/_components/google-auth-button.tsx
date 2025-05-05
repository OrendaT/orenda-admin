import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = () => {
  return (
    <button className="mx-auto mt-8 clamp-[text,sm,base] flex w-4/5 md:w-full items-center justify-center gap-2 rounded-3xl border border-[#E7E7E7] p-[0.625rem] font-semibold transition-colors duration-500 hover:bg-[#f5f5f5]">
      <FcGoogle className='clamp-[size,5,1.3rem]' />
      Continue with Google
    </button>
  );
};
export default GoogleAuthButton;
