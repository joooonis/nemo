import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  [key: string]: any;
}
function Button({ variant = 'solid', children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        `
      ${
        variant === 'solid'
          ? 'bg-primary-main text-white'
          : 'bg-white hover:bg-gray-100 outline outline-1 outline-primary-main'
      }`,
        'disabled:bg-gray-03 disabled:cursor-not-allowed',
        'w-full font-medium h-[54px] rounded-2xl hover:opacity-80 text-lg transition duration-200'
      )}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
