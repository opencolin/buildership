ALTER TABLE "projects" ADD COLUMN "is_finalist" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "hidden" boolean DEFAULT false NOT NULL;