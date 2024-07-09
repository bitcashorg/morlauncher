import { init, identify, track } from '@multibase/js'

const MULTIBASE_API_KEY = process.env.MULTIBASE_API_KEY || ""

if (!MULTIBASE_API_KEY) {
    throw new Error("Missing MULTIBASE_API_KEY")
}

export function initMultibase() {

}
export function useDepositAndPlaceOrder({ type, timeToClick = 10 }: { type: string, timeToClick?: number }) {
    init(MULTIBASE_API_KEY)

    identify({
        address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    })

    track("Link Click", { type, timeToClick })
}