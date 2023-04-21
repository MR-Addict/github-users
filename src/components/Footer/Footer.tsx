"use client";

export default function Footer() {
  return (
    <footer className='w-full flex flex-row justify-center gap-1 py-5 md:py-7 bg-slate-800 text-white'>
      <p>Copyright &copy; {new Date().getFullYear()} MR-Addict</p>
      <p>•</p>
      <a href='https://github.com/MR-Addict/github-users' className='underline'>
        Github
      </a>
    </footer>
  );
}
