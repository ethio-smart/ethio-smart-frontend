'use client'

import MatchesHeader from '@/app/components/matches/MatchesHeader'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { searchTaskers } from '@/app/store/slices/searchSlice'
import TaskerMatchCard from '@/app/components/matches/TaskerMatchCard'
import AppPagination from '@/app/components/common/Pagnation'

function SearchMatches() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { results, loading } = useAppSelector(state => state.search)
   console.log('🐰🐰🐰',results)
  useEffect(() => {
    if (!query) return

    dispatch(searchTaskers({
      query,
      originalLanguage: "en",
    }))
  }, [query, dispatch])

  return (
 <div className="space-y-6 w-full px-4">
  
  
  <MatchesHeader length={results?.results?.length ?? 0} />


  <div className="max-w-4xl mx-auto space-y-6 ">
    {results?.results?.map((result) => (
      <TaskerMatchCard key={result.taskerId} result={result} />
    ))}
  </div>
        <AppPagination  totalPages={results?.results?.length} currentPage={1} onPageChange={(page) => console.log("Go to page:", page)} />

</div>
  )
}

export default SearchMatches