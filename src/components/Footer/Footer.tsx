"use client";

export default function Footer() {
  return (
    <footer className='w-full flex flex-row justify-center gap-1 py-4 text-[15px] bg-slate-800 text-white'>
      <p>Copyright &copy; {new Date().getFullYear()} MR-Addict</p>
      <p>•</p>
      <a href='https://github.com/MR-Addict/github-users' className='underline'>
        Github
      </a>
    </footer>
  );
}
