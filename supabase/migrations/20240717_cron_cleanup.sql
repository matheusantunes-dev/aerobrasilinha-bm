-- Enable pg_cron for scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup every day at midnight (GMT)
SELECT cron.schedule(
  'cleanup-events',
  '0 0 * * *',
  $$ SELECT
    net.http_post(
      url:='https://aloqvzxsdhphfbkpwctw.supabase.co/functions/v1/cleanup-events',
      headers:='{"Content-Type": "application/json"}'::jsonb
    ) $$
);
