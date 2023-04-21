"use client";

export default function Footer() {
  return (
    <footer className='w-full text-center py-3'>
      Copyright &copy; {new Date().getFullYear()} MR-Addict •{" "}
      <a href='https://github.com/MR-Addict/github-users'>Github</a>
    </footer>
  );
}
