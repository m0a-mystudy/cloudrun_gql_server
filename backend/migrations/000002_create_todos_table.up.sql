
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0 CHECK(done IN (0, 1)),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);