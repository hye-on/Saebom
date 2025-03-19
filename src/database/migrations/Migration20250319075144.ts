import { Migration } from '@mikro-orm/migrations';

export class Migration20250319075144 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "review_schedules" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null, add column "deleted_at" timestamptz null;`
    );
    this.addSql(
      `alter table "review_schedules" alter column "review_step" type varchar(255) using ("review_step"::varchar(255));`
    );
    this.addSql(`alter table "review_schedules" alter column "review_step" set default 'FIRST_REPEAT';`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "review_schedules" drop column "created_at", drop column "updated_at", drop column "deleted_at";`
    );

    this.addSql(`alter table "review_schedules" alter column "review_step" type int using ("review_step"::int);`);
    this.addSql(`alter table "review_schedules" alter column "review_step" set default 1;`);
  }
}
