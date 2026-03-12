--SQL Schema for Powder Predictor(Will be used on Neon to create tables and such)


--Stores the hills that will run queries on
CREATE TABLE hills(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    description TEXT
);

--Stores the conditions of all the hills Hourly for the next 7 days
CREATE TABLE hill_conditions(
    id SERIAL PRIMARY KEY,
    hill_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    temperature DOUBLE PRECISION, 
    wind_speed_10 DOUBLE PRECISION, 
    wind_gust_10 DOUBLE PRECISION,
    rain DOUBLE PRECISION,
    snowfall DOUBLE PRECISION,
    FOREIGN KEY (hill_id) REFERENCES hills(id) ON DELETE CASCADE,
    UNIQUE (hill_id, timestamp)
);

CREATE INDEX idx_condition_time ON hill_conditions(timestamp); --Allows fast query on timestamp for all hills
CREATE INDEX idx_condition_hill ON hill_conditions(hill_id); --Allows fast query on hill_id for all conditions

CREATE TABLE powder_prediction_score(
    id SERIAL PRIMARY KEY,
    hill_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    powder_score DOUBLE PRECISION NOT NULL
        CHECK (powder_score >= 0 AND powder_score <= 100),
    FOREIGN KEY (hill_id) REFERENCES hills(id) ON DELETE CASCADE,
    UNIQUE (hill_id, timestamp)
);

CREATE INDEX idx_pow_scores_hill_time ON powder_prediction_score(hill_id, timestamp);