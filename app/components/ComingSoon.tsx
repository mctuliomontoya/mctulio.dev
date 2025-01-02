import React from 'react'

const ComingSoon = () => {
  return (
    <div className="inline-flex  w-full justify-center">
      <h1 className="text-center mt-12 text-red-foreground text-6xl">Coming Soon</h1>
      <div className="flex space-x-2 justify-center items-center self-end mb-3 ml-2">
        <span className="sr-only">Loading...</span>
        <div className="h-3 w-3 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-foreground rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}
export default ComingSoon
