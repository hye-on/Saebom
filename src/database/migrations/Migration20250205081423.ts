import { Migration } from '@mikro-orm/migrations';

export class Migration20250205081423 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "mock_exam_problem" drop constraint "mock_exam_problem_exam_id_foreign";`);

    this.addSql(`alter table "user_mock_exam_result" drop constraint "user_mock_exam_result_exam_id_foreign";`);

    this.addSql(`alter table "mock_exam_problem" drop constraint "mock_exam_problem_problem_id_foreign";`);

    this.addSql(`alter table "review_schedule" drop constraint "review_schedule_problem_id_foreign";`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_problem_id_foreign";`);

    this.addSql(`alter table "review_schedule" drop constraint "review_schedule_user_id_foreign";`);

    this.addSql(`alter table "notification" drop constraint "notification_user_id_foreign";`);

    this.addSql(`alter table "user_mock_exam_result" drop constraint "user_mock_exam_result_user_id_foreign";`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_user_id_foreign";`);

    this.addSql(
      `create table "channel_configs" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "guild_id" varchar(255) not null, "channel_id" varchar(255) not null, "type" text check ("type" in ('cs', 'chat', 'review')) not null);`
    );

    this.addSql(
      `create table "mock_exams" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "title" varchar(255) not null, "description" varchar(255) null, "difficulty_level" text check ("difficulty_level" in ('low', 'medium', 'high')) not null default 'medium');`
    );

    this.addSql(
      `create table "motivation_messages" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "content" varchar(255) not null, "type" varchar(255) not null default 'daily');`
    );

    this.addSql(
      `create table "problems" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "title" varchar(255) not null, "content" varchar(255) not null, "answer" jsonb not null, "explanation" varchar(255) null, "type" text check ("type" in ('keyword', 'blank', 'descriptive')) not null default 'descriptive', "difficulty_level" text check ("difficulty_level" in ('low', 'medium', 'high')) not null default 'medium', "category" text check ("category" in ('operating_system', 'network', 'database', 'data_structure', 'algorithm', 'computer_architecture')) not null, "keywords" text[] not null);`
    );

    this.addSql(
      `create table "mock_exam_problems" ("exam_id" int not null, "problem_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "problem_order" int not null, constraint "mock_exam_problems_pkey" primary key ("exam_id", "problem_id"));`
    );

    this.addSql(
      `create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "discord_user_id" varchar(255) not null, "guild_id" varchar(255) not null, "username" varchar(255) not null, "learning_streak" int not null default 0, "is_notification_enabled" boolean not null default true);`
    );
    this.addSql(`alter table "users" add constraint "users_discord_user_id_unique" unique ("discord_user_id");`);

    this.addSql(
      `create table "review_schedules" ("id" serial primary key, "user_id" int not null, "problem_id" int not null, "review_date" timestamptz not null, "review_step" int not null default 1, "is_completed" boolean not null default false);`
    );

    this.addSql(
      `create table "notifications" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "user_id" int not null, "content" varchar(255) not null, "type" text check ("type" in ('daily_problem', 'review', 'streak')) not null, "is_read" boolean not null default false);`
    );

    this.addSql(
      `create table "user_mock_exam_results" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "user_id" int not null, "exam_id" int not null, "score" int not null, "completed_at" timestamptz not null);`
    );

    this.addSql(
      `alter table "mock_exam_problems" add constraint "mock_exam_problems_exam_id_foreign" foreign key ("exam_id") references "mock_exams" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "mock_exam_problems" add constraint "mock_exam_problems_problem_id_foreign" foreign key ("problem_id") references "problems" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "review_schedules" add constraint "review_schedules_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "review_schedules" add constraint "review_schedules_problem_id_foreign" foreign key ("problem_id") references "problems" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "notifications" add constraint "notifications_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "user_mock_exam_results" add constraint "user_mock_exam_results_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "user_mock_exam_results" add constraint "user_mock_exam_results_exam_id_foreign" foreign key ("exam_id") references "mock_exams" ("id") on update cascade;`
    );

    this.addSql(`drop table if exists "mock_exam" cascade;`);

    this.addSql(`drop table if exists "motivation_message" cascade;`);

    this.addSql(`drop table if exists "problem" cascade;`);

    this.addSql(`drop table if exists "mock_exam_problem" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "review_schedule" cascade;`);

    this.addSql(`drop table if exists "notification" cascade;`);

    this.addSql(`drop table if exists "user_mock_exam_result" cascade;`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_user_id_foreign";`);
    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_problem_id_foreign";`);

    this.addSql(
      `alter table "user_problem_history" add constraint "user_problem_history_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "user_problem_history" add constraint "user_problem_history_problem_id_foreign" foreign key ("problem_id") references "problems" ("id") on update cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "mock_exam_problems" drop constraint "mock_exam_problems_exam_id_foreign";`);

    this.addSql(`alter table "user_mock_exam_results" drop constraint "user_mock_exam_results_exam_id_foreign";`);

    this.addSql(`alter table "mock_exam_problems" drop constraint "mock_exam_problems_problem_id_foreign";`);

    this.addSql(`alter table "review_schedules" drop constraint "review_schedules_problem_id_foreign";`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_problem_id_foreign";`);

    this.addSql(`alter table "review_schedules" drop constraint "review_schedules_user_id_foreign";`);

    this.addSql(`alter table "notifications" drop constraint "notifications_user_id_foreign";`);

    this.addSql(`alter table "user_mock_exam_results" drop constraint "user_mock_exam_results_user_id_foreign";`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_user_id_foreign";`);

    this.addSql(
      `create table "mock_exam" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "title" varchar(255) not null, "description" varchar(255) null, "difficulty_level" text check ("difficulty_level" in ('low', 'medium', 'high')) not null default 'medium');`
    );

    this.addSql(
      `create table "motivation_message" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "content" varchar(255) not null, "type" varchar(255) not null default 'daily');`
    );

    this.addSql(
      `create table "problem" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "title" varchar(255) not null, "content" varchar(255) not null, "answer" jsonb not null, "explanation" varchar(255) null, "type" text check ("type" in ('keyword', 'blank', 'descriptive')) not null default 'descriptive', "difficulty_level" text check ("difficulty_level" in ('low', 'medium', 'high')) not null default 'medium', "category" text check ("category" in ('operating_system', 'network', 'database', 'data_structure', 'algorithm', 'computer_architecture')) not null, "keywords" text[] not null);`
    );

    this.addSql(
      `create table "mock_exam_problem" ("exam_id" int not null, "problem_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "problem_order" int not null, constraint "mock_exam_problem_pkey" primary key ("exam_id", "problem_id"));`
    );

    this.addSql(
      `create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "discord_user_id" varchar(255) not null, "guild_id" varchar(255) not null, "username" varchar(255) not null, "learning_streak" int not null default 0, "is_notification_enabled" boolean not null default true);`
    );
    this.addSql(`alter table "user" add constraint "user_discord_user_id_unique" unique ("discord_user_id");`);

    this.addSql(
      `create table "review_schedule" ("id" serial primary key, "user_id" int not null, "problem_id" int not null, "review_date" timestamptz not null, "review_step" int not null default 1, "is_completed" boolean not null default false);`
    );

    this.addSql(
      `create table "notification" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "user_id" int not null, "content" varchar(255) not null, "type" text check ("type" in ('daily_problem', 'review', 'streak')) not null, "is_read" boolean not null default false);`
    );

    this.addSql(
      `create table "user_mock_exam_result" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "user_id" int not null, "exam_id" int not null, "score" int not null, "completed_at" timestamptz not null);`
    );

    this.addSql(
      `alter table "mock_exam_problem" add constraint "mock_exam_problem_exam_id_foreign" foreign key ("exam_id") references "mock_exam" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "mock_exam_problem" add constraint "mock_exam_problem_problem_id_foreign" foreign key ("problem_id") references "problem" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "review_schedule" add constraint "review_schedule_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "review_schedule" add constraint "review_schedule_problem_id_foreign" foreign key ("problem_id") references "problem" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "notification" add constraint "notification_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "user_mock_exam_result" add constraint "user_mock_exam_result_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "user_mock_exam_result" add constraint "user_mock_exam_result_exam_id_foreign" foreign key ("exam_id") references "mock_exam" ("id") on update cascade;`
    );

    this.addSql(`drop table if exists "channel_configs" cascade;`);

    this.addSql(`drop table if exists "mock_exams" cascade;`);

    this.addSql(`drop table if exists "motivation_messages" cascade;`);

    this.addSql(`drop table if exists "problems" cascade;`);

    this.addSql(`drop table if exists "mock_exam_problems" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "review_schedules" cascade;`);

    this.addSql(`drop table if exists "notifications" cascade;`);

    this.addSql(`drop table if exists "user_mock_exam_results" cascade;`);

    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_user_id_foreign";`);
    this.addSql(`alter table "user_problem_history" drop constraint "user_problem_history_problem_id_foreign";`);

    this.addSql(
      `alter table "user_problem_history" add constraint "user_problem_history_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "user_problem_history" add constraint "user_problem_history_problem_id_foreign" foreign key ("problem_id") references "problem" ("id") on update cascade;`
    );
  }
}
