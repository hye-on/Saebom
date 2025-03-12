import { Migration } from '@mikro-orm/migrations';

export class Migration20250311095310 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "discord_message" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "channel_id" varchar(255) not null, "guild_id" varchar(255) not null, "discord_message_id" varchar(255) not null, "content" jsonb not null, "metadata" jsonb null);`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "discord_message" cascade;`);
  }
}
