CREATE DATABASE jwttutorial;

--set Extension
CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL  
);

--Insert user
INSERT INTO users ( user_name, user_email, user_password)
VALUES ('amara','ammar@gmail.com','kth124314');