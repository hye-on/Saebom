-- 난이도를 위한 ENUM 타입 생성
CREATE TYPE difficulty AS ENUM ('low', 'medium', 'high');

-- 카테고리를 위한 ENUM 타입 생성
CREATE TYPE cs_category AS ENUM (
  'operating_system',
  'network',
  'database',
  'data_structure',
  'algorithm',
  'computer_architecture'
);

-- notification_type ENUM 추가
CREATE TYPE notification_type AS ENUM ('daily_problem', 'review', 'streak');

-- motivation_type ENUM 추가
CREATE TYPE motivation_type AS ENUM ('daily', 'streak', 'achievement');

-- review_step ENUM 추가  
CREATE TYPE review_step AS ENUM ('FIRST_REPEAT', 'SECOND_REPEAT', 'THIRD_REPEAT', 'FOURTH_REPEAT');

-- channel_type ENUM 추가  
CREATE TYPE channel_type AS ENUM ('cs', 'review', 'chat');



-- 채널 테이블
CREATE TABLE channels (
   id SERIAL PRIMARY KEY,
   guild_id VARCHAR(255) NOT NULL,
   channel_id VARCHAR(255) NOT NULL,
   type channel_type NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 사용자 테이블
CREATE TABLE users (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 discord_user_id VARCHAR(20) UNIQUE NOT NULL,
 guild_id VARCHAR(20) NOT NULL,
 username VARCHAR(100) NOT NULL,
 learning_streak INTEGER DEFAULT 0,
 is_notification_enabled BOOLEAN DEFAULT true,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 UNIQUE (discord_user_id, guild_id)
);

-- CS 문제 테이블 
CREATE TABLE problems (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 title VARCHAR(200) NOT NULL,
 content TEXT NOT NULL,
 answer JSONB NOT NULL,
 explanation TEXT,
 type VARCHAR(50) NOT NULL CHECK (type IN ('keyword', 'blank', 'descriptive')),
 difficulty_level difficulty DEFAULT 'medium',
 category cs_category NOT NULL,
 keywords TEXT[],
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP
);

-- 사용자 문제 풀이 기록
CREATE TABLE user_problem_history (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id INTEGER NOT NULL,
 problem_id INTEGER NOT NULL,
 user_answer JSONB,
 answer_details JSONB,
 is_correct BOOLEAN,
 solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (problem_id) REFERENCES problems(id)
);

-- 복습 일정 테이블
CREATE TABLE review_schedules (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id INTEGER NOT NULL,
 problem_id INTEGER NOT NULL,
 review_date DATE NOT NULL,
 review_step review_step NOT NULL,
 is_completed BOOLEAN DEFAULT false,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (problem_id) REFERENCES problems(id)
);

-- 모의고사 테이블
CREATE TABLE mock_exams (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 title VARCHAR(200) NOT NULL,
 description TEXT,
 difficulty_level difficulty DEFAULT 'medium',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP
);

-- 모의고사-문제 연결 테이블
CREATE TABLE mock_exam_problems (
 exam_id INTEGER NOT NULL,
 problem_id INTEGER NOT NULL,
 problem_order INTEGER NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 PRIMARY KEY (exam_id, problem_id),
 FOREIGN KEY (exam_id) REFERENCES mock_exams(id),
 FOREIGN KEY (problem_id) REFERENCES problems(id)
);

-- 사용자 모의고사 결과
CREATE TABLE user_mock_exam_results (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id INTEGER NOT NULL,
 exam_id INTEGER NOT NULL,
 score INTEGER CHECK (score >= 0),
 completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (exam_id) REFERENCES mock_exams(id)
);

-- 알림 테이블
CREATE TABLE notifications (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 user_id INTEGER NOT NULL,
 content TEXT NOT NULL,
 type notification_type NOT NULL,
 is_read BOOLEAN DEFAULT false,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 응원 메시지 테이블
CREATE TABLE motivation_messages (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 content TEXT NOT NULL,
 type motivation_type NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 deleted_at TIMESTAMP
);

CREATE TABLE "discord_message" (
  "id"                  SERIAL        PRIMARY KEY,
  "channel_id"          VARCHAR(50)   NOT NULL,
  "guild_id"            VARCHAR(50)   NOT NULL,
  "discord_message_id"  VARCHAR(50)   NOT NULL,
  "content"             JSONB         NOT NULL,
  "metadata"            JSONB,
  "created_at"          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at"          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deleted_at"          TIMESTAMP,

  UNIQUE ("discord_message_id")
);


-- 인덱스 생성
CREATE INDEX idx_users_discord_guild ON users(discord_user_id, guild_id);
CREATE INDEX idx_user_problem_history_user ON user_problem_history(user_id);
CREATE INDEX idx_review_schedules_user_date ON review_schedules(user_id, review_date);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_user_streak ON users(learning_streak DESC);
CREATE INDEX idx_motivation_messages_type ON motivation_messages(type);
CREATE INDEX idx_problems_category ON problems(category);
