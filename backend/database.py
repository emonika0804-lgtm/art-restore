import sqlite3

conn = sqlite3.connect("artrestore.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()