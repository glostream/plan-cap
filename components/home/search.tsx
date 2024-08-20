'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchResult from '@/components/home/search-result';
import { useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [searchData, setSearchData] = useState();

  async function getKeywordPlanner(formData: FormData) {
    const term = formData.get('searchTerm');

    if (!term) {
      console.error('No search term provided');
      return;
    }

    console.log('got term:', term);

    const data = await axios
      .request({
        method: 'POST',
        url: 'http://127.0.0.1:54321/functions/v1/g-keyword-planner',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: '{"name":"Functions"}'
      })
      .then((res) => res.data);

    // const data = await axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/g-keyword-planner`,
    //     {
    //       name: term
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }
    //   )
    //   .then((res) => res.data);

    console.log('fetched data:', data);

    setSearchData(data.message);
  }

  return (
    <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center">
        <form action={getKeywordPlanner} className="flex flex-row">
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
      <SearchResult message={searchData} />
    </div>
  );
}
