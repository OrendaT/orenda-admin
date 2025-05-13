'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="clamp-[text,sm,base] mx-auto mt-8 flex w-4/5 items-center justify-center gap-2 rounded-3xl border border-[#E7E7E7] p-[0.625rem] font-semibold transition-colors duration-500 hover:bg-[#f5f5f5] md:w-full"
    >
      <FcGoogle className="clamp-[size,5,1.3rem]" />
      Continue with Google
    </button>
  );
};
export default GoogleAuthButton;
