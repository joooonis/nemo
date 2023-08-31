function FixedTop({ children }: { children: React.ReactNode }) {
  return (
    <div className='z-10 flex flex-col fixed max-w-xl top-0 px-4 pt-5 pb-[30px] bg-black justify-between w-full'>
      {children}
    </div>
  );
}

export default FixedTop;
