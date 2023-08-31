import { forwardRef } from 'react';

interface MyInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, MyInputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <label className='flex'>
        <span>{label}</span>
        <input ref={ref} {...rest} />
      </label>
    );
  }
);

Input.displayName = 'Input';

export default Input;
