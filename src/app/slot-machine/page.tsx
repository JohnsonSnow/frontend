'use client'

import { useState } from 'react'
import CreateUser from '@/components/CreateUser'
import SlotMachine from '@/components/SlotMachine'
import UserInfo from '@/components/UserInfo'
import { Provider } from 'react-redux'
import store from '../../store/store'
export default function GameSlotMachine() {
  const [userId, setUserId] = useState<string | null>(null)

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Slot Machine Game</h1>
        {!userId ? (
          <CreateUser onUserCreated={setUserId} />
        ) : (
          <>
            <UserInfo userId={userId} />
            <SlotMachine userId={userId} />
          </>
        )}
      </main>
    </Provider>
  )
}