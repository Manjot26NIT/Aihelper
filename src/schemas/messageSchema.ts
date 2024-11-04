import {z} from 'zod';

export const messageSchema=z.object({
content:z.string().min(1,'Message must not be empty').max(500,'Message must not be more than 500 characters')    
})