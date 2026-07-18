CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read messages" ON chat_messages
  FOR SELECT USING (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin delete messages" ON chat_messages
  FOR DELETE USING (
    auth.email() IN (SELECT email FROM admins)
  );
