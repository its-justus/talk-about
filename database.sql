
-- built with dbdesigner.net
CREATE TABLE "account" (
	"id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password_hashed" 	VARCHAR (1000) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "account_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "profile" (
	"account_id" integer NOT NULL,
	"email" varchar(320) NOT NULL UNIQUE,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	CONSTRAINT "profile_pk" PRIMARY KEY ("account_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "topic" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "topic_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "convo" (
	"id" serial NOT NULL,
	"topic_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "convo_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "convo_member" (
	"account_id" integer NOT NULL,
	"convo_id" integer NOT NULL,
	CONSTRAINT "convo_member_pk" PRIMARY KEY ("account_id","convo_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favorite_topic" (
	"account_id" integer NOT NULL,
	"topic_id" integer NOT NULL,
	CONSTRAINT "favorite_topic_pk" PRIMARY KEY ("account_id","topic_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "message" (
	"id" serial NOT NULL,
	"author_id" integer NOT NULL,
	"convo_id" integer NOT NULL,
	"text" VARCHAR(4000) NOT NULL,
	CONSTRAINT "message_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "profile" ADD CONSTRAINT "profile_fk0" FOREIGN KEY ("account_id") REFERENCES "account"("id");


ALTER TABLE "convo" ADD CONSTRAINT "convo_fk0" FOREIGN KEY ("topic_id") REFERENCES "topic"("id");

ALTER TABLE "convo_member" ADD CONSTRAINT "convo_member_fk0" FOREIGN KEY ("account_id") REFERENCES "account"("id");
ALTER TABLE "convo_member" ADD CONSTRAINT "convo_member_fk1" FOREIGN KEY ("convo_id") REFERENCES "convo"("id");

ALTER TABLE "favorite_topic" ADD CONSTRAINT "favorite_topic_fk0" FOREIGN KEY ("account_id") REFERENCES "account"("id");
ALTER TABLE "favorite_topic" ADD CONSTRAINT "favorite_topic_fk1" FOREIGN KEY ("topic_id") REFERENCES "topic"("id");

ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("author_id") REFERENCES "account"("id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("convo_id") REFERENCES "convo"("id");
