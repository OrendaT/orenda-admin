import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = ({ asChild, className, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "bg-orenda-purple hover:bg-orenda-purple/80 w-full rounded-3xl px-4 py-3 font-semibold text-white transition-colors duration-500 disabled:cursor-default disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
};
export default Button;
