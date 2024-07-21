'use client'

import { BitcashAccessContentType } from '@/components/layout/session/session-dialog'
import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconGoogle, IconX } from '@/components/ui/icons'
import { useSession } from '@/hooks/use-session'
import { useSupabaseClient } from '@/lib/supabase'
import { cn } from '@/lib/utils'

export function SessionDialogContent({
  updateDialogContent
}: {
  updateDialogContent: (dialog: BitcashAccessContentType) => void
}) {
  const { loginUri } = useSession();
  const supabaseClient = useSupabaseClient()
  const loginWithGoogle = async () => {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google'
        });
        if (error)
            throw new Error("A ocurrido un error durante la autenticación");
    } catch (error) {
        console.error(error);
    }
}

  const loginOptions = [
    {
      name: "Google",
      icon: <IconGoogle />,
      cta: () => loginWithGoogle(),
      isActive: true
    },
    {
      name: "X",
      icon: <IconX />,
      cta: () => {},
      isActive: process.env.NEXT_PUBLIC_X_LOGIN === "true"
    }
  ]
  return (
    <>
      <DialogHeader className="gap-4">
        {/* @ts-ignore */}
        <DialogTitle>Log in to Morlauncher</DialogTitle>
        {/* @ts-ignore */}
        <DialogDescription>
          Please select one of the options available to log in and connect your wallet.
        </DialogDescription>
      </DialogHeader>
      {loginUri ? (
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          {
            loginOptions.map(({ icon, name, cta, isActive }) => (
              <Button 
                key={name} 
                className={cn("flex justify-center group/modal-btn relative min-w-40 max-w-40 overflow-hidden", !isActive && "select-none cursor-default " )}
                onClick={cta}
              >
                <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                  {name}
                </span>
                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                  {isActive ? icon : <span>Coming Soon! 🚀</span>}
                </div>
              </Button>
            ))
          }
        </div>
      ) : null}
    </>
  )
}
