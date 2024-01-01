-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "discord";

-- CreateTable
CREATE TABLE "discord"."embed" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "channel_id" TEXT,
    "message_id" TEXT,
    "title" TEXT,
    "description" TEXT,
    "url" TEXT,
    "timestamp" TEXT,
    "color" INTEGER,
    "footer_text" TEXT,
    "footer_icon_url" TEXT,
    "footer_proxy_icon_url" TEXT,
    "image_url" TEXT,
    "image_proxy_url" TEXT,
    "image_height" INTEGER,
    "image_width" INTEGER,
    "thumbnail_url" TEXT,
    "thumbnail_proxy_url" TEXT,
    "thumbnail_height" INTEGER,
    "thumbnail_width" INTEGER,
    "video_url" TEXT,
    "video_proxy_url" TEXT,
    "video_height" INTEGER,
    "video_width" INTEGER,
    "provider_name" TEXT,
    "provider_url" TEXT,
    "author_name" TEXT,
    "author_url" TEXT,
    "author_icon_url" TEXT,
    "author_proxy_icon_url" TEXT,
    "fields" JSONB,
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

