import { Migration } from '@mikro-orm/migrations';

export class Migration20250319091030 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "channels" drop column "created_at";`);

    this.addSql(`alter table "discord_message" drop column "created_at";`);

    this.addSql(`alter table "mock_exams" drop column "created_at";`);

    this.addSql(`alter table "motivation_messages" drop column "created_at";`);

    this.addSql(`alter table "problems" drop column "created_at";`);

    this.addSql(`alter table "mock_exam_problems" drop column "created_at";`);

    this.addSql(`alter table "users" drop column "created_at";`);

    this.addSql(`alter table "review_schedules" drop column "created_at";`);

    this.addSql(`alter table "notifications" drop column "created_at";`);

    this.addSql(`alter table "user_mock_exam_results" drop column "created_at";`);

    this.addSql(`alter table "user_problem_history" drop column "created_at";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "channels" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "discord_message" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "mock_exams" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "motivation_messages" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "problems" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "mock_exam_problems" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "users" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "review_schedules" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "notifications" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "user_mock_exam_results" add column "created_at" timestamptz not null;`);

    this.addSql(`alter table "user_problem_history" add column "created_at" timestamptz not null;`);
  }
}
