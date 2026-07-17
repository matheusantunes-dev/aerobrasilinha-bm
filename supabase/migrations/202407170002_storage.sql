-- Create images bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit)
VALUES ('images', 'images', true, false, 5242880)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public Read Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users (admins) to upload
CREATE POLICY "Admin Insert Access" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to update
CREATE POLICY "Admin Update Access" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'images' AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete
CREATE POLICY "Admin Delete Access" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' AND auth.role() = 'authenticated'
  );
