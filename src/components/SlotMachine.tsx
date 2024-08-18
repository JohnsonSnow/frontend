import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setCoins } from '../store/coinsSlice'
import { spin } from '@/lib/api'
import styles from './SlotMachine.module.css'

interface SlotMachineProps {
  userId: string
}

const FRUIT_ICONS: { [key: string]: string } = {
  cherry: '🍒',
  lemon: '🍋',
  apple: '🍎',
  banana: '🍌'
}

const FRUITS = ['🍒', '🍋', '🍎', '🍌']

export default function SlotMachine({ userId }: SlotMachineProps) {
  const [result, setResult] = useState<string[]>(['🍒', '🍋', '🍎',])
  const [spinning, setSpinning] = useState(false)
  const [winnings, setWinnings] = useState(0)

  const dispatch = useDispatch()

//   useEffect(() => {
//     // Preload audio files
//     new Audio('/spin.mp3')
//     new Audio('/win.mp3')
//   }, [])

//   const playSound = (soundName: string) => {
//     const audio = new Audio(`/${soundName}.mp3`)
//     audio.play()
//   }

const rollReel = (reelIndex: number, finalFruit: string) => {
    return new Promise<void>((resolve) => {
      let currentFruitIndex = 0
      const interval = setInterval(() => {
        setResult((prev) => {
          const newResult = [...prev]
          newResult[reelIndex] = FRUITS[currentFruitIndex]
          return newResult
        })
        currentFruitIndex = (currentFruitIndex + 1) % FRUITS.length
      }, 100) // Change the fruit every 100ms

      setTimeout(() => {
        clearInterval(interval)
        setResult((prev) => {
          const newResult = [...prev]
          newResult[reelIndex] = FRUIT_ICONS[finalFruit] || ''
          return newResult
        })
        resolve()
      }, 2000) // Stop rolling after 2 seconds and show the final result
    })
  }

  const handleSpin = async () => {
    setSpinning(true)
    setWinnings(0)
    //playSound('spin')

    try {
      const spinResult = await spin(userId)

      for (let i = 0; i < 3; i++) {
        await rollReel(i, spinResult.spin_result[i])
      }

      setSpinning(false)
      setWinnings(spinResult.winnings)
      dispatch(setCoins(spinResult.coins))
    //   if (spinResult.winnings > 0) {
    //     playSound('win')
    //   }
    } catch (error) {
      console.error('Failed to spin:', error)
      setSpinning(false)
    }
  }

  const reelVariants = {
    spinning: {
      y: [0, -10],
      transition: {
        y: {
          repeat: Infinity,
          duration: 0.5,
          ease: "linear"
        }
      }
    },
    stopped: { y: 0 }
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`flex space-x-4 mb-4 ${styles.slotMachine}`}>
        {result.map((fruit, index) => (
          <motion.div 
            key={index} 
            className={`${styles.reel} ${spinning ? styles.blur : ''}`}
            variants={reelVariants}
            animate={spinning ? "spinning" : "stopped"}
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={fruit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="text-6xl"
              >
                {fruit}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <p className="mb-2">Winnings: {winnings}</p>
      <motion.button 
        onClick={handleSpin} 
        className={`px-4 py-2 bg-green-500 text-white rounded ${spinning ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={spinning}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {spinning ? 'Spinning...' : 'Spin'}
      </motion.button>
    </div>
  )
}