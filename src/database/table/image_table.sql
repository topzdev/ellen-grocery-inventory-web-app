CREATE TABLE IF NOT EXISTS image_table(
    image_id SERIAL NOT NULL,
    public_id TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    secure_url TEXT NOT NULL
);