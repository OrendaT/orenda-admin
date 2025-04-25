import { arch_banner } from "@/assets";
import Image from "next/image";

const LoginSignUpLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="padding_inline grid size-full flex-grow pt-24 md:py-6">
      <div className="container md:grid md:grid-cols-2 md:gap-5">
        <div className="mx-auto grid size-full max-w-[23.75rem] md:place-items-center">
          {children}
        </div>
        <div className="hidden h-full max-w-[40rem] overflow-hidden rounded-2xl md:flex">
          <Image
            className="block h-full w-full object-cover object-center"
            src={arch_banner}
            alt="arch-banner"
            placeholder="blur"
          />
        </div>
      </div>
    </main>
  );
};
export default LoginSignUpLayout;
