-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "discord";

-- CreateTable
CREATE TABLE "discord"."embed" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "embed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord"."log" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord"."user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "embed_id_key" ON "discord"."embed"("id");

-- CreateIndex
CREATE UNIQUE INDEX "log_id_key" ON "discord"."log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "discord"."user"("id");

