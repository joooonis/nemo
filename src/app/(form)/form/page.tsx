export default function Page() {
  return (
    <div className='relativ flex w-full flex-col justify-start items-center'>
      <h2 className='text-center text-xl font-normal'>
        어떤 일정인지 알려주세요!
      </h2>
      <form className='w-full flex-col flex items-center'>
        <input
          type='text'
          placeholder='일정 이름을 입력해주세요'
          className='py-3 px-4 text-center block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400'
        />
      </form>
    </div>
  );
}
