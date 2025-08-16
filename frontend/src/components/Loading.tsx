import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-gray-700 " />
      </div>
    </div>
  )
}

export default Loading
