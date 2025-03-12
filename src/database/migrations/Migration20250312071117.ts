import { Migration } from '@mikro-orm/migrations';

export class Migration20250312071117 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_discord_user_id_unique";`);

    this.addSql(
      `alter table "users" add constraint "users_discord_user_id_guild_id_unique" unique ("discord_user_id", "guild_id");`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_discord_user_id_guild_id_unique";`);

    this.addSql(`alter table "users" add constraint "users_discord_user_id_unique" unique ("discord_user_id");`);
  }
}
