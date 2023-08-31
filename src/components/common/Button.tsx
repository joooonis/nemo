interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
}
function Button({ variant = 'solid', children, ...props }: ButtonProps) {
  return (
    <button
      className={`
      ${
        variant === 'solid'
          ? 'bg-primary-main text-white'
          : 'bg-white hover:bg-gray-100 outline outline-1 outline-primary-main'
      }
       w-full font-medium h-[54px] rounded-2xl hover:opacity-80 text-lg transition duration-200`}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
