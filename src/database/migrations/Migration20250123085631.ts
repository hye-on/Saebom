import { Migration } from '@mikro-orm/migrations';

export class Migration20250123085631 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "motivation_message" drop constraint if exists "motivation_message_type_check";`);

    this.addSql(`alter table "motivation_message" alter column "type" type varchar(255) using ("type"::varchar(255));`);
    this.addSql(`alter table "motivation_message" alter column "type" set default 'daily';`);

    this.addSql(`alter table "review_schedule" drop constraint review_schedule_review_step_check;`);

    this.addSql(`alter table "review_schedule" alter column "review_step" type int using ("review_step"::int);`);
    this.addSql(`alter table "review_schedule" alter column "review_step" set default 1;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "motivation_message" add constraint "motivation_message_type_check" check("type" in ('daily', 'streak', 'achievement'));`);

    this.addSql(`alter table "review_schedule" alter column "review_step" drop default;`);
    this.addSql(`alter table "review_schedule" alter column "review_step" type int4 using ("review_step"::int4);`);
    this.addSql(`alter table "review_schedule" add constraint review_schedule_review_step_check check((review_step >= 1) AND (review_step <= 5));`);
  }

}
