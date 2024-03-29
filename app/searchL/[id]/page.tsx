import { SitterServices } from '@/common.types';


import SearchForm from '@/components/searchResults/SearchForm';

import { fetchAllSitters, fetchAllSittersN } from '@/lib/actions'
import React from 'react'

type SearchParams = {
    locationM?: string | undefined;
    endcursor?: string | null;
  }
  type SitterSearch = {
    mongoDB:{
      sitterCollection: {
        edges: { node: SitterServices }[];
        pageInfo: {
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          startCursor: string;
          endCursor: string;
        };
      },
    }
  }
  type Props = {
    searchParams: SearchParams
    params:{id:string}
  }
const Search = async({
    searchParams: { locationM, endcursor },
    params: { id },
  }: Props) => {//the page is showed when the user enters a location in the search bar
  const data =id? await fetchAllSitters(id) as SitterSearch :await fetchAllSittersN(endcursor) as SitterSearch//get all the sitters that have the searched location
    console.log(data.mongoDB.sitterCollection?.edges)
    const sittersToDisplay = data?.mongoDB.sitterCollection?.edges || [];
    {/**the component accepts 2 times the same array because the firstArray is used so it can be accepted all the filters that can be applied in the search form */}
  return (
    <SearchForm sittersArray={sittersToDisplay} firstArray={sittersToDisplay}/>
  )
}

export default Search