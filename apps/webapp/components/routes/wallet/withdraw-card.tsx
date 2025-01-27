'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'
import { TestnetMor } from 'smartsale-contracts'
import { parseUnits } from 'viem'
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi'
import { Input } from '../../ui/input'

export function WithdrawCard() {
  const { address } = useAccount()
  const { writeContract, ...other } = useWriteContract()
  const [amount, setAmount] = useState<number>(50)
  const { switchChain } = useSwitchChain()

  const withdraw = () => {
    if (!amount || !address) return

    switchChain({ chainId: TestnetMor.chainId })
    writeContract({
      abi: TestnetMor.abi,
      address: TestnetMor.address,
      functionName: 'burn',
      args: [parseUnits(amount.toString(), TestnetMor.decimals)],
      chainId: TestnetMor.chainId
    })
  }

  return (
    <Card className="w-full rounded-xl bg-muted/50 p-4">
      <CardContent>
        <div className="flex flex-col space-y-4">
          <label htmlFor="withdraw" className="text-sm">
            Convert to MOR
          </label>
          <div className="flex items-center justify-between">
            <div className="flex min-w-[40%] flex-col">
              <span className="text-2xl font-semibold">
                <Input
                  type="number"
                  id="withdraw"
                  name="withdraw"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(parseInt(e.target.value))}
                />
              </span>
            </div>
            <Select>
              {/* @ts-ignore */}
              <SelectTrigger id="currency-out">
                <SelectValue placeholder="USDT" />
              </SelectTrigger>
              {/* @ts-ignore */}
              <SelectContent position="popper">
                {coins.map((o, i) => (
                  // @ts-ignore
                  <SelectItem key={i} value={o.coin}>
                    {o.coin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full bg-[#bd1e59]"
          // disabled={!session?.account}
          onClick={withdraw}
        >
          Convert
        </Button>
      </CardFooter>
    </Card>
  )
}

const coins = [
  {
    coin: 'USDT',
    network: 'Arbitrum One'
  },
  {
    coin: 'USDC',
    network: 'Arbitrum One'
  }
]
