import { Migration } from '@mikro-orm/migrations';

export class Migration20250402015813 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "motivation_messages" drop column "type";`);

    this.addSql(`alter table "review_schedules" drop column "review_date";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "motivation_messages" add column "type" varchar(255) not null default 'daily';`);

    this.addSql(`alter table "review_schedules" add column "review_date" timestamptz not null;`);
  }
}
