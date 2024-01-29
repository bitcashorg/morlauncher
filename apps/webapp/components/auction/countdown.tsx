'use client'

import { useAuctionData } from '@/hooks/use-auction-data'
import React, { useEffect, useState } from 'react'
import { TimerIcon } from 'lucide-react'

export function Countdown({ auctionId }: { auctionId: number }) {
  const { data: auctionData } = useAuctionData(auctionId)
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (auctionData && auctionData.auctionEndDate) {
        const now = new Date()
        const endDate = auctionData.auctionEndDate
        const timeDiff = endDate.getTime() - now.getTime()

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, '0')
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
            .toString()
            .padStart(2, '0')
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          )
            .toString()
            .padStart(2, '0')
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, '0')

          setTimeLeft({ days, hours, minutes, seconds })
        } else {
          clearInterval(interval)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [auctionData])

  return (
    <div className="max-h-[200px] px-8 pt-5 bg-black">
      <div className="flex justify-between ">
        <div>
          <TimerIcon className="text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">COUNTDOWN</h2>
        </div>
        <div />
      </div>
      <div className="flex justify-between">
        <CountdownItem value={timeLeft.days} label="DAYS" />
        <CountdownItem value={timeLeft.hours} label="HOURS" />
        <CountdownItem value={timeLeft.minutes} label="MINUTES" />
        <CountdownItem value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  )
}

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center size-32">
      <div className="text-6xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  )
}

interface CountdownItemProps {
  value: string
  label: string
}