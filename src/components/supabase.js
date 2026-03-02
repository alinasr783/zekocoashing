import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pdbghqjomkdrqaswdrms.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkYmdocWpvbWtkcnFhc3dkcm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODE4MDUsImV4cCI6MjA4Nzk1NzgwNX0.mfgBwfAW-iz8Y9208JPoyOUTmRahxp_os996gX9Yv4M'

export const supabase = createClient(supabaseUrl, supabaseKey)