ALTER TABLE "projects" ADD COLUMN "slug" text;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" ("slug");
