
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL ,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_num INTEGER NOT NULL,
    identity TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    teahcer_image TEXT NOT NULL,
    teacher_description TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE timetable (
    id SERIAL PRIMARY KEY,
    weekday TEXT NOT NULL,
    booking_time TIME NOT NULL
);

CREATE TABLE can_booking_table (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER,
    timetable_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (timetable_id) REFERENCES timetable(id)
);

CREATE TABLE packages (
    id SERIAL PRIMARY KEY,
    package_name TEXT NOT NULL,
    package_descatiption TEXT NOT NULL,
    total_lesson_num INTEGER NOT NULL
);

CREATE TABLE packages_prices (
    id SERIAL PRIMARY KEY,
    price INTEGER NOT NULL,
    activate_time TIMESTAMP NOT NULL,
    package_id INTEGER,
    FOREIGN KEY (package_id) REFERENCES packages(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    total_lesson_num INTEGER NOT NULL,
    remaining_lesson_num INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    package_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (package_id) REFERENCES packages(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL,
    lession_link TEXT,
    date_time TIMESTAMP NOT NULL,
    order_id INTEGER,
    teacher_id INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

CREATE TABLE sample_sign_language (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    sample_video TEXT NOT NULL
);

CREATE TABLE users_sign_language (
    id SERIAL PRIMARY KEY,
    user_SL_title TEXT NOT NULL,
    user_video TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    best_match_ratio INTEGER NOT NULL,
    user_id INTEGER,
    sample_SL_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sample_SL_id) REFERENCES sample_sign_language(id)
);

