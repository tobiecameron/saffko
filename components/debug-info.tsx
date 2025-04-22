"use client"

import { useState } from "react"

interface DebugInfoProps {
  data: any
}

export default function DebugInfo({ data }: DebugInfoProps) {
  const [isVisible, setIsVisible] = useState(false)

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsVisible(!isVisible)} className="bg-gray-800 text-white px-3 py-1 rounded text-sm">
        {isVisible ? "Hide Debug" : "Show Debug"}
      </button>

      {isVisible && (
        <div className="mt-2 p-4 bg-black border border-gray-700 rounded max-w-lg max-h-96 overflow-auto">
          <pre className="text-white text-xs">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
