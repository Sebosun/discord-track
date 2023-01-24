require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')

const supabaseBaseLink = process.env.SUPABASE_BASE_LINK
const supabaseHash = process.env.SUPABASE_ADMIN_HASH

const supabase = createClient(supabaseBaseLink, supabaseHash)

module.exports = { supabase }
