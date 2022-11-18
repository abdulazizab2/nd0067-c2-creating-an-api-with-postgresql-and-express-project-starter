CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(64),
    username VARCHAR(30) REFERENCES users(username)
);