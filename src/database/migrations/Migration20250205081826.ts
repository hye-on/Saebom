import { Migration } from '@mikro-orm/migrations';

export class Migration20250205081826 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "channels" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "guild_id" varchar(255) not null, "channel_id" varchar(255) not null, "type" text check ("type" in ('cs', 'chat', 'review')) not null);`);

    this.addSql(`drop table if exists "channel_configs" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "channel_configs" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "guild_id" varchar(255) not null, "channel_id" varchar(255) not null, "type" text check ("type" in ('cs', 'chat', 'review')) not null);`);

    this.addSql(`drop table if exists "channels" cascade;`);
  }

}
