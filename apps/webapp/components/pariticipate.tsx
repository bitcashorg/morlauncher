import { Button } from '@/components/ui/button'

function WalletIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}

export default function Participate() {
  return (
    <div className="pt-12 pb-10 text-white">
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">{textContent.title}</h2>
        <p className="text-xl">{textContent.stepsInfo}</p>
      </div>

      <div className="container flex flex-col md:flex-row md:justify-between md:items-start">
        {textContent.steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 mb-8 md:items-start md:flex-row md:w-1/3"
          >
            <div className="mt-4 md:mt-0 md:ml-4">
              <h2 className="flex text-2xl font-semibold text-center align-items md:text-left">
                <step.icon className="mr-2 text-gray-400 size-6" />
                {step.title}
              </h2>
              <p className="text-center text-gray-400 md:text-left">
                {step.description}
              </p>
              {step.buttonText && (
                <Button className="mt-2 bg-[#7f5af0]">{step.buttonText}</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const textContent = {
  title: 'Join The AI and Web3 Revolution With SmartSale',
  stepsInfo:
    'Only 3 steps are needed for you to start enjoying all the advantages',
  steps: [
    {
      icon: FileEditIcon,
      title: 'Complete KYC',
      description:
        "It's a simple step to ensure your participation, create a bitcash account to complete this step.",
      buttonText: 'Register'
    },
    {
      icon: WalletIcon,
      title: 'Get USD Credits',
      description:
        'Deposit USDT on any chain to get USD Credit Tokens on EOS EVM',
      buttonText: 'Get Credits'
    },
    {
      icon: HeartHandshakeIcon,
      title: 'Place Bids',
      description:
        'Select a project from the Auctions list and place your bids.',
      buttonText: 'MBOTS Auction'
    }
  ]
}

interface IconProps {
  className?: string
}

function FileEditIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  )
}

function HeartHandshakeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  )
}
