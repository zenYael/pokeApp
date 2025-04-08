import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yrivbyoxrejhygdqagcp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyaXZieW94cmVqaHlnZHFhZ2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNzAzMzgsImV4cCI6MjA1OTY0NjMzOH0.RnppGKPw2ak2alNZKmvXxd6wfdLt3casdrBJABe7xfQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
