'use client'

import MatchesHeader from '@/app/components/matches/MatchesHeader'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import { searchTaskers } from '@/app/store/slices/searchSlice'
import TaskerMatchCard from '@/app/components/matches/TaskerMatchCard'
import AppPagination from '@/app/components/common/Pagnation'
import { Search, UserX } from 'lucide-react'

function SearchMatches() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const query = searchParams.get("query")

  const { results, loading } = useAppSelector(state => state.search)
  console.log('🐰🐰🐰', results)
  
  useEffect(() => {
    if (!query) return

    dispatch(searchTaskers({
      query,
      originalLanguage: "en",
    }))
  }, [query, dispatch])

  const hasResults = results?.results && results.results.length > 0
  const isLoading = loading

  return (
    <div className="space-y-6 w-full px-4 bg-[#F9FAFB]">
      <MatchesHeader length={results?.results?.length ?? 0} />

      <div className="max-w-4xl mx-auto space-y-6">
        {isLoading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Searching for taskers...</p>
          </div>
        ) : !hasResults ? (
          // No results state
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UserX className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Taskers Found</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              We couldn't find any taskers matching "{query}". Try adjusting your search terms or browse our categories.
            </p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Browse Categories
              </button>
            </div>
          </div>
        ) : (
          // Results found
          results?.results?.map((result) => (
            <TaskerMatchCard key={result.taskerId} result={result} />
          ))
        )}
      </div>
      
      {hasResults && (
        <AppPagination 
          totalPages={results?.results?.length} 
          currentPage={1} 
          onPageChange={(page) => console.log("Go to page:", page)} 
        />
      )}
    </div>
  )
}

export default SearchMatches