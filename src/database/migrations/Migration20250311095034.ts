import { Migration } from '@mikro-orm/migrations';

export class Migration20250311095034 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "problems" drop constraint if exists "problems_type_check";`);

    this.addSql(
      `alter table "problems" add constraint "problems_type_check" check("type" in ('blank', 'descriptive'));`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "problems" drop constraint if exists "problems_type_check";`);

    this.addSql(
      `alter table "problems" add constraint "problems_type_check" check("type" in ('keyword', 'blank', 'descriptive'));`
    );
  }
}
