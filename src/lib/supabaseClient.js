import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
const supabaseUrl = 'https://orptgqvqkogbqcaajxjb.supabase.co'
// const supabaseKey = process.env.SUPABASE_API_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycHRncXZxa29nYnFjYWFqeGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyODgyNTUsImV4cCI6MjAwMjg2NDI1NX0.xgWdZFIBxd-vCv_-YDhOSNREvz1BqEQFY8aTIM3wFBg'
export const supabase = createClient(supabaseUrl, supabaseKey)
