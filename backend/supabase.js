const SUPABASE_URL =
    "https://ugxfottlpuwxmrqkvymx.supabase.co"

const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneGZvdHRscHV3eG1ycWt2eW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NDg3MjgsImV4cCI6MjA5NDQyNDcyOH0.OqDYw2v44cD39ZW87GFeJWsX78OVYJQvLEA0VofFnVY"

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    )