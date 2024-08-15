import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className="bg-tertiary font-sans">
    <SignIn />
    </div>
  )
}