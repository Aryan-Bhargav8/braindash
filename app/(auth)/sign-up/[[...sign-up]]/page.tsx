import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="bg-tertiary font-sans min-h-screen flex items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <SignUp />
      </div>
    </div>
  )
}