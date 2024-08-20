import Search from '@/components/home/search';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 flex flex-col items-center justify-center">
      <nav className="flex p-6 pb-20 text-2xl w-full justify-start">
        SearchCap
        <Image
          src={'/logo.png'}
          width={60}
          height={30}
          alt="Search Cap"
          className="pl-2 h-5 w-10"
        />
      </nav>
      <div className="text-center">
        <h1>SEO and Market Research Tool</h1>
        <p className="text-xl mt-10 mb-4">Enter your search term below</p>
      </div>
      <Search />
    </div>
  );
}
