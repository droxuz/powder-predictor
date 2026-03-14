-- SQL Schema for Powder Predictor

CREATE TABLE hills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    description TEXT
);

CREATE TABLE hill_conditions (
    id SERIAL PRIMARY KEY,
    hill_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    temperature_2m DOUBLE PRECISION,
    wind_speed_10m DOUBLE PRECISION,
    wind_gusts_10m DOUBLE PRECISION,
    rain DOUBLE PRECISION,
    snowfall DOUBLE PRECISION,
    FOREIGN KEY (hill_id) REFERENCES hills(id) ON DELETE CASCADE,
    UNIQUE (hill_id, timestamp)
);

CREATE INDEX idx_condition_time ON hill_conditions(timestamp);
CREATE INDEX idx_condition_hill ON hill_conditions(hill_id);

CREATE TABLE powder_prediction_score (
    id SERIAL PRIMARY KEY,
    hill_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    powder_score DOUBLE PRECISION NOT NULL
        CHECK (powder_score >= 0 AND powder_score <= 100),
    FOREIGN KEY (hill_id) REFERENCES hills(id) ON DELETE CASCADE,
    UNIQUE (hill_id, timestamp)
);

CREATE INDEX idx_pow_scores_hill_time
ON powder_prediction_score(hill_id, timestamp);