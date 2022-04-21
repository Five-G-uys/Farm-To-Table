CREATE TABLE "farms" (
  "id" int,
  "name" varchar(50),
  "description" varchar(200)
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "name" varchar(60),
  "address" varchar(200),
  "subscribed" boolean,
  "role_id" int,
  "delivery_zone" varchar(100),
  "created_at" timestamp,
  "farm_id" int
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "farm_id" int
);

CREATE TABLE "subscriptions" (
  "subscription_id" SERIAL PRIMARY KEY,
  "season" varchar(50),
  "price" int,
  "description" varchar(200),
  "tier" varchar(50),
  "payment_option" varchar(50),
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "orders" (
  "order_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "subscription_id" int,
  "delivery_date" date,
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "delivery_zone" (
  "delivery_zone_id" int,
  "name" varchar(50),
  "farm_id" int,
  "zip_codes" varchar(200)
);

CREATE TABLE "products" (
  "product_id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "description" varchar(200),
  "vendor_id" int,
  "quantity" int,
  "tier" int,
  "img_url" varchar(100),
  "available" boolean,
  "add_ons" boolean,
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "dietary_restrictions" (
  "dietary_restrictions_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "product_id" int,
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "vendors" (
  "vendor_id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "contact_information" varchar(100),
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "events" (
  "events_id" SERIAL PRIMARY KEY,
  "name" varchar(100),
  "description" varchar(200),
  "farm_id" int,
  "created_at" timestamp
);

CREATE TABLE "rsvps" (
  "rsvp_id" SERIAL PRIMARY KEY,
  "user_id" int,
  "event_id" int,
  "farm_id" int,
  "created_at" timestamp
);

ALTER TABLE "dietary_restrictions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "products" ADD FOREIGN KEY ("product_id") REFERENCES "dietary_restrictions" ("product_id");

ALTER TABLE "subscriptions" ADD FOREIGN KEY ("subscription_id") REFERENCES "orders" ("subscription_id");

ALTER TABLE "products" ADD FOREIGN KEY ("vendor_id") REFERENCES "vendors" ("vendor_id");

ALTER TABLE "users" ADD FOREIGN KEY ("user_id") REFERENCES "rsvps" ("user_id");

ALTER TABLE "events" ADD FOREIGN KEY ("events_id") REFERENCES "rsvps" ("event_id");

ALTER TABLE "users" ADD FOREIGN KEY ("delivery_zone") REFERENCES "deliveryZone" ("delivery_zone_id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("role_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "rsvps" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "dietary_restrictions" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "subscriptions" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "products" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "vendors" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "orders" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "events" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "deliveryZone" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "roles" ("farm_id");

ALTER TABLE "farms" ADD FOREIGN KEY ("farm_id") REFERENCES "users" ("farm_id");
