CREATE TABLE IF NOT EXISTS "meme_tags" (
	"meme_url" text NOT NULL,
	"tag" text DEFAULT 'NO TAG' NOT NULL
);
ALTER TABLE "meme_tags" ADD CONSTRAINT "meme_tags_meme_url_tag" PRIMARY KEY("meme_url","tag");

CREATE INDEX IF NOT EXISTS tag_idx ON meme_tags ("tag");