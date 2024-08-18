import { useEffect, useState } from 'react'
import { getUser } from '@/lib/api'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'

interface UserInfoProps {
  userId: string
}

export default function UserInfo({ userId }: UserInfoProps) {
  //const [coins, setCoins] = useState(0)
  const coins = useSelector((state: RootState) => state.coins.value)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(userId)

        //setCoins(user.coins)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchUser()
  }, [userId])

  return (
    <div className="mb-4">
      <p className="text-xl">Coins: {coins}</p>
    </div>
  )
}