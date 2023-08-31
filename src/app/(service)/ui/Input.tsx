interface InputProps {
  placeholder: string;
  size?: 'sm' | 'lg';
}

function Input({ size, placeholder }: InputProps) {
  return (
    <div className='relative w-full'>
      <input
        type='text'
        className={`${
          size === 'sm' ? 'h-7' : 'h-12'
        } border-none focus:outline-none focus:border-transparent w-full text-gray-900 rounded-lg focus:border focus:ring-1 focus:ring-primary-main focus:border-prring-primary-main block pl-4 pr-16`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
