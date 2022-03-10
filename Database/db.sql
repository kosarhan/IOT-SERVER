-- Creating Tables
CREATE TABLE "Node"
(
    id integer NOT NULL,
    name text NOT NULL,
    "temperatureAlertId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY ("temperatureAlertId") REFERENCES "TemperatureAlert"(id);
);

CREATE TABLE "Temperature"
(
    id SERIAL NOT NULL,
    value float NOT NULL,
    "nodeId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id),
	FOREIGN KEY ("nodeId") REFERENCES "Node"(id)
);

CREATE TABLE "Humidity"
(
    id SERIAL NOT NULL,
    value float NOT NULL,
    "nodeId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id),
	FOREIGN KEY ("nodeId") REFERENCES "Node"(id)
);

CREATE TABLE "TemperatureAlert"
(
    id SERIAL NOT NULL,
    name text NOT NULL,
    "minValue" float NOT NULL,
    "maxValue" float NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE "HumidityAlert" (
    id SERIAL NOT NULL,
    name text NOT NULL,
    "minValue" float NOT NULL,
    "maxValue" float NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE "Alert" (
    id SERIAL NOT NULL,
    "nodeId" int NOT NULL,
	"temperatureAlertId" int DEFAULT 1,
	"humidityAlertId" int DEFAULT 1,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id),
	FOREIGN KEY ("nodeId") REFERENCES "Node"(id),
	FOREIGN KEY ("temperatureAlertId") REFERENCES "TemperatureAlert"(id),
	FOREIGN KEY ("humidityAlertId") REFERENCES "HumidityAlert"(id)
);

CREATE TABLE "AlertLog" (
    id SERIAL NOT NULL,
    "nodeId" int NOT NULL,
    "message" text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    PRIMARY KEY (id),
	FOREIGN KEY ("nodeId") REFERENCES "Node"(id)
);

-- Creating Trigger Functions

CREATE OR REPLACE FUNCTION process_insert_value() RETURNS TRIGGER AS $insert_value$
	DECLARE
    	node_count INTEGER;
    	deleted_node_count INTEGER;
    BEGIN
        --
        -- If node that has nodeId in the query does not exist, create the node
        --
		node_count := (SELECT COUNT(*) FROM "Node" WHERE "id" = NEW."nodeId" AND "deletedAt" IS NULL);
		deleted_node_count := (SELECT COUNT(*) FROM "Node" WHERE "id" = NEW."nodeId" AND "deletedAt" IS NOT NULL);
		
		IF (deleted_node_count = 0) THEN
			IF (TG_OP = 'INSERT' AND node_count = 0) THEN
				INSERT INTO "Node"("id", "name", "createdAt", "updatedAt") VALUES (NEW."nodeId", CONCAT('Node Address ', NEW."nodeId"), NOW(), NOW());
				INSERT INTO "Alert"("nodeId", "createdAt", "updatedAt") VALUES (NEW."nodeId", NOW(), NOW());
			ELSIF (TG_OP = 'UPDATE' AND node_count = 0) THEN
				INSERT INTO "Node"("id", "name", "createdAt", "updatedAt") VALUES (NEW."nodeId", CONCAT('Node Address ', NEW."nodeId"), NOW(), NOW());
				INSERT INTO "Alert"("nodeId", "createdAt", "updatedAt") VALUES (NEW."nodeId", NOW(), NOW());
			END IF;
			
			RETURN NEW;
		ELSE
			RETURN NULL;
		END IF;
    END;

$insert_value$ LANGUAGE plpgsql;

CREATE TRIGGER insert_temperature_value BEFORE INSERT OR UPDATE ON "Temperature" FOR EACH ROW EXECUTE FUNCTION process_insert_value();
CREATE TRIGGER insert_humidity_value BEFORE INSERT OR UPDATE ON "Humidity" FOR EACH ROW EXECUTE FUNCTION process_insert_value();

-- Creating Example Data

INSERT INTO "TemperatureAlert" ("name", "minValue", "maxValue", "createdAt", "updatedAt") VALUES
    ('None', 0, 0, NOW(), NOW()),
    ('Cat', 38.1, 39.2, NOW(), NOW()),
    ('Dog', 37.9, 39.9, NOW(), NOW()),
    ('Horse', 37.2, 38.2, NOW(), NOW()),
    ('Chicken', 40.6, 43.0, NOW(), NOW()),
    ('Sheep', 38.3, 39.9, NOW(), NOW()),
    ('Goat', 38.5, 39.7, NOW(), NOW()),
    ('Cattle', 36.7, 39.1, NOW(), NOW()),
    ('Cow', 38.0, 39.3, NOW(), NOW()),
    ('Pig', 38.7, 39.8, NOW(), NOW()),
    ('Stable', 10.0, 15.0, NOW(), NOW())
;

INSERT INTO "HumidityAlert" ("name", "minValue", "maxValue", "createdAt", "updatedAt") VALUES
    ('None', 0, 0, NOW(), NOW()),
    ('Stable', 50.0, 75.0, NOW(), NOW())
;
