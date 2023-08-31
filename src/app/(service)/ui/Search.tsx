interface SearchProps {
  placeholder: string;
}

function Search({ placeholder }: SearchProps) {
  return (
    <div className='relative w-full'>
      <div className='absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
            stroke='#3E3E3E'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
      <div className='bg-white flex justify-start items-center w-full h-10 text-gray-900 rounded-lg text-gray-02 pl-4 pr-16'>
        {placeholder}
      </div>
    </div>
  );
}
export default Search;
