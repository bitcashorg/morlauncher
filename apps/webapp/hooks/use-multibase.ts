import { init, identify, track } from '@multibase/js'

const NEXT_PUBLIC_MULTIBASE_API_KEY = process.env.NEXT_PUBLIC_MULTIBASE_API_KEY || ""

if (!NEXT_PUBLIC_MULTIBASE_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_MULTIBASE_API_KEY")
}

export function useMultibase() {
    init(NEXT_PUBLIC_MULTIBASE_API_KEY)

    const identifyUser = (properties: any, address = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045') =>
        identify({
            address,
            properties
        })

    const trackInteraction = (label: string, properties: MultibaseTrackPropertiesProps) =>
        track(label, properties)

    return { trackInteraction, identifyUser }
}

// interface MultibaseIdentifyUserProps {
//     plan: string,
//     email: string
// }

interface MultibaseTrackPropertiesProps {
    type: string,
    timeToClick: number
}