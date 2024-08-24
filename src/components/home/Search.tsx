'use client';

import SearchResultTable from '@/src/components/home/SearchResultTable';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { TermSearchResult } from '@/src/types/TermSearchResult';
import axios from 'axios';
import { useState } from 'react';
import { getSearch } from './actions';

export default function Search() {
  const [searchData, setSearchData] = useState<TermSearchResult[]>([]);

  async function getTermsStats(formData: FormData) {
    const term = formData.get('searchTerm');

    if (!term) {
      console.warn('No search term provided');
      return;
    }

    const data = await getSearch([term as string]);

    // const data = await axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/g-keyword-planner`,
    //     {
    //       terms: [term]
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    //       }
    //     }
    //   )
    //   .then((res) => res.data);

    console.log('got data', data);

    setSearchData(data);
  }

  return (
    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center">
        <form action={getTermsStats} className="flex flex-row">
          <Input
            className="w-60 border-2 p-2"
            name="searchTerm"
            type="text"
            placeholder="e.g. Paris Olympics"
          />
          <Button type="submit" className="ml-2 bg-purple-600 text-white">
            Search
          </Button>
        </form>
      </div>
      <SearchResultTable results={searchData} />
    </div>
  );
}
