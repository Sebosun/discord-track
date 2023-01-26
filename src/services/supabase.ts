import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseBaseLink = process.env.SUPABASE_BASE_LINK
const supabaseHash = process.env.SUPABASE_ADMIN_HASH

if (!supabaseBaseLink || !supabaseHash) throw new Error('Missing env files')
const supabase = createClient(supabaseBaseLink, supabaseHash)

export default supabase
