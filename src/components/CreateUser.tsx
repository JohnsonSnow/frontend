import { useState } from 'react'
import { createUser } from '@/lib/api'

interface CreateUserProps {
  onUserCreated: (userId: string) => void
}

export default function CreateUser({ onUserCreated }: CreateUserProps) {
  const [name, setName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = await createUser(name)
      onUserCreated(user.id)
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="px-4 py-2 border rounded mb-4"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Start Game
      </button>
    </form>
  )
}