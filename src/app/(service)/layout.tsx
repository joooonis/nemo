export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex flex-col mx-auto items-center bg-background-white scrollbar-hide overflow-y-scroll max-h-[100dvh] max-w-xl'>
      <main className='w-full px-4 mt-48 mb-40'>{children}</main>
    </div>
  );
}
