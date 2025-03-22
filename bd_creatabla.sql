CREATE TABLE IF NOT EXISTS profiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  photo_url VARCHAR(255),
  description TEXT,
  experience TEXT,
  skills TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
