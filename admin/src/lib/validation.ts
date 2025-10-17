
import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email({message:'Please enter a valid email address'}),
    password: z.string().min(6,{
        message:'Password must be at least 6 characters long'
    })


})
export const registerSchema = z.object({
    name: z.string().email({message:'Please enter your name'}),
    email: z.string().email({message:'Please enter a valid email address'}),
    password: z.string().min(6,{
        message:'Password must be at least 6 characters long'
    })


})