CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date DATE NOT NULL,
  time TEXT DEFAULT '',
  location TEXT DEFAULT '',
  address TEXT DEFAULT '',
  maps_url TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery (
  id BIGSERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT DEFAULT ''
);

INSERT INTO admins (email, name) VALUES ('aerobrasilinha@gmail.com', 'Admin Aerobrasilinha') ON CONFLICT (email) DO NOTHING;

INSERT INTO events (title, description, date, time, location, address, maps_url, image_url) VALUES
(
  'Revoada de Sábado',
  'Venha participar da nossa revoada semanal! Traga seu aeromodelo e voe conosco. Aberto para todos os níveis, desde iniciantes até pilotos experientes.',
  '2026-07-19',
  '08:00 - 12:00',
  'Pista Aerobrasilinha',
  'Pista de Aeromodelismo Aerobrasilinha',
  'https://maps.app.goo.gl/example1',
  ''
),
(
  'Grande Encontro de Aeromodelismo',
  'Evento especial de domingo com competições amistosas, exposição de aeromodelos, sorteios e confraternização. Não perca! Haverá food truck e área para famílias.',
  '2026-07-20',
  '07:00 - 16:00',
  'Pista Aerobrasilinha',
  'Pista de Aeromodelismo Aerobrasilinha',
  'https://maps.app.goo.gl/example2',
  ''
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON gallery FOR SELECT USING (true);

CREATE POLICY "Admin Write Events" ON events 
  FOR INSERT WITH CHECK (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin Update Events" ON events 
  FOR UPDATE USING (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin Delete Events" ON events 
  FOR DELETE USING (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin Write Gallery" ON gallery 
  FOR INSERT WITH CHECK (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin Update Gallery" ON gallery 
  FOR UPDATE USING (
    auth.email() IN (SELECT email FROM admins)
  );

CREATE POLICY "Admin Delete Gallery" ON gallery 
  FOR DELETE USING (
    auth.email() IN (SELECT email FROM admins)
  );
