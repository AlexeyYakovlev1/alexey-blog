CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    avatar TEXT DEFAULT '/images/admin-avatar.jpg',
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT DEFAULT 'Описание профиля отсутствует',
    password TEXT NOT NULL
);

CREATE TABLE tag(
    id SERIAL PRIMARY KEY,
    value TEXT NOT NULL DEFAULT 'Разработка'
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    owner INTEGER,
    FOREIGN KEY (owner) REFERENCES person(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tags INTEGER ARRAY NOT NULL
);