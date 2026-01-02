ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;