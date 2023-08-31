export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col bg-neutral-100 mx-auto items-center scrollbar-hide overflow-y-scroll max-h-[100dvh] max-w-xl'>
      <main className='w-full px-4 pt-12 pb-16'>{children}</main>
    </div>
  );
}
