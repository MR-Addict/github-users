import { LoadingDots } from "@/components";

export default function Loading() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center gap-2'>
      <LoadingDots />
      <p>Loading users</p>
    </main>
  );
}
