CREATE DATABASE POS_INVENTORY_SYSTEM;

USE POS_INVENTORY_SYSTEM;

CREATE TABLE users (
    id int AUTO_INCREMENT,
    firstname varchar (32) NOT NULL,
    lastname varchar (32) NOT NULL,
    email varchar (64) NOT NULL,
    password varchar (64) NOT NULL,
    position enum ('Admin', 'Clerk'),
    contact char (11) NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY (id),
    CONSTRAINT UC_Users UNIQUE (email)
);

INSERT INTO
    users (
        firstname,
        lastname,
        email,
        password,
        position,
        contact
    )
VALUES
(
        'test',
        'test',
        'test@test.com',
        123123,
        'Admin',
        123123
    );

CREATE TABLE items (
    id int AUTO_INCREMENT,
    item_name varchar (64) NOT NULL,
    item_description varchar (128) NOT NULL,
    item_qty int UNSIGNED DEFAULT 0,
    item_price float UNSIGNED DEFAULT 0,
    CONSTRAINT PK_Items PRIMARY KEY (id)
);

CREATE TABLE actions (
    id int AUTO_INCREMENT,
    user_id int,
    item_id int,
    action_type ENUM (
        'Created an item',
        'Updated an item',
        'Deleted an item'
    ),
    created_at DATETIME DEFAULT now(),
    CONSTRAINT PK_actions PRIMARY KEY (id),
    CONSTRAINT FK1_actions FOREIGN KEY (user_id) REFERENCES users (id) -- CONSTRAINT FK2_actions FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE transactions (
    id int AUTO_INCREMENT,
    user_id int,
    total_price float,
    created_at DATETIME DEFAULT now(),
    CONSTRAINT PK_Transactions PRIMARY KEY (id),
    CONSTRAINT FK1_Transactions FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE carts (
    id int AUTO_INCREMENT,
    transaction_id int,
    item_id int,
    item_qty int UNSIGNED,
    created_at DATETIME DEFAULT now(),
    CONSTRAINT PK_carts PRIMARY KEY (id),
    CONSTRAINT FK1_carts FOREIGN KEY (transaction_id) REFERENCES transactions (id),
    CONSTRAINT FK2_carts FOREIGN KEY (item_id) REFERENCES items (id)
);