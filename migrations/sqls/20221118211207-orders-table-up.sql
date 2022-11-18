CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    user_id VARCHAR(30) REFERENCES users(username)
);