import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className="bg-tertiary font-sans">
     <div className="w-full 2 flex items-center justify-center">
    <SignIn />
    </div>
    </div>
  )
}