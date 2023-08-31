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
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      </div>
      <input
        type='text'
        className='border-none focus:outline-none focus:border-transparent w-full h-10 text-gray-900 rounded-lg focus:border focus:ring-1 focus:ring-gray-02 focus:border-gray-02 block pl-4 pr-16'
        placeholder={placeholder}
      />
    </div>
  );
}
export default Search;
