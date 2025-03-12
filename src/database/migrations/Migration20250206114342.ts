import { Migration } from '@mikro-orm/migrations';

export class Migration20250206114342 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "channels" drop constraint if exists "channels_type_check";`);

    this.addSql(
      `alter table "channels" add constraint "channels_type_check" check("type" in ('cs', 'review', 'chat'));`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "channels" drop constraint if exists "channels_type_check";`);

    this.addSql(
      `alter table "channels" add constraint "channels_type_check" check("type" in ('cs', 'chat', 'review'));`
    );
  }
}
