'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form"

import { z } from "zod"
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const ScienceForm = () => {
    const router = useRouter()

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signInSchema>) {

        // Do something with the form values.
        // ✅ This will be type-safe and validated.
    }
    return (
        <Card className='min-w-[100%] bg-white/60 backdrop-blur-sm text-black'>
            <CardHeader>
                <CardTitle>Search for Universities with Science Major</CardTitle>
                {/* <CardDescription className='text-black'>
                    Sign in to your account to continue.
                </CardDescription> */}
            </CardHeader>
            <CardContent className='space-y-2'>
                
            </CardContent>
        </Card>
    )
}

export default ScienceForm