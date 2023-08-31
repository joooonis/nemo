function FixedBottom({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex fixed rounded-t-md shadow-t-sm max-w-xl bottom-0 bg-background-white px-4 justify-between pt-[18px] h-32 w-full'>
      {children}
    </div>
  );
}

export default FixedBottom;
