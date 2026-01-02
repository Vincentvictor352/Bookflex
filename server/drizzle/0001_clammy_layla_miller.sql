ALTER TABLE "user_sessions" ALTER COLUMN "ip_address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "points" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "points" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "filePublicId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "coverPublicId" text NOT NULL;