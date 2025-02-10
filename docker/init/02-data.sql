-- 사용자 데이터
INSERT INTO users (discord_user_id, guild_id, username, learning_streak, is_notification_enabled) 
VALUES 
 ('123456789', '987654321', '김철수', 5, true),
 ('123456790', '987654321', '이영희', 3, true),
 ('123456791', '987654321', '박지민', 0, false);

INSERT INTO problems (title, content, answer, explanation, type, difficulty_level, category, keywords) 
VALUES 
 (
   'B-Tree 구조', 
   'DBMS에서 B-Tree의 구조와 특징을 설명하시오.',
   '{
     "exampleAnswer": "B-Tree는 자가 균형 트리로, 데이터를 정렬된 상태로 유지하며 검색, 순차 접근, 삽입, 삭제를 로그 시간에 수행하는 효율적인 자료구조입니다. 특히 데이터베이스의 인덱싱에 적합합니다.",
     "keyPoints": ["자가 균형 트리", "정렬 상태 유지", "로그 시간 복잡도", "순차 접근 가능", "데이터베이스 활용"],
     "similarityThreshold": 0.7
   }',
   'B-Tree는 데이터베이스 시스템에서 가장 널리 사용되는 인덱스 구조입니다.',
   'descriptive',
   'high',
   'database',
   ARRAY['B-Tree', '인덱스', 'DB']
 ),
 (
  '프로세스란?', 
  '운영체제에서 프로세스는 [        ]이며, [        ]의 기본 단위입니다.', 
  '{
    "blanks": [
      {
        "correctAnswer": "실행단위",
        "acceptableKeywords": ["실행 단위", "실행", "프로세스 단위"]
      },
      {
        "correctAnswer": "자원할당",
        "acceptableKeywords": ["자원 할당", "리소스 할당", "할당"]
      }
    ],
    "exampleAnswer": "프로세스는 운영체제에서 실행단위이며, 자원할당의 기본 단위입니다."
  }',
  '프로세스는 실행 중인 프로그램으로, 운영체제로부터 자원을 할당받는 기본 단위입니다.',
  'blank',
  'medium',
  'operating_system',
  ARRAY['프로세스', '운영체제', '실행']
),
 (
   'TCP vs UDP', 
   'TCP와 UDP의 주요 차이점을 설명하시오.',
   '{
     "exampleAnswer": "TCP는 연결형 프로토콜로 신뢰성과 순서를 보장하며 흐름제어를 제공합니다. UDP는 비연결형으로 신뢰성은 낮지만 빠른 전송이 가능합니다.",
     "keyPoints": ["연결형/비연결형", "신뢰성", "순서보장", "흐름제어", "전송속도"],
     "similarityThreshold": 0.7
   }',
   'TCP와 UDP는 전송 계층의 대표적인 프로토콜입니다.',
   'descriptive',
   'medium',
   'network',
   ARRAY['TCP', 'UDP', '프로토콜']
 ),
 (
   '정규화 단계', 
   '데이터베이스 정규화의 단계별 정의를 순서대로 작성하시오:

    1. [    ] : 원자값으로 분해
    2. [    ] : 부분적 함수 종속 제거
    3. [    ] : 이행적 함수 종속 제거
    4. [    ] : 결정자이면서 후보키가 아닌 것 제거',
   '{
     "blanks": [
       {
         "correctAnswer": "1NF",
         "acceptableKeywords": ["제1정규형", "제1 정규형", "First Normal Form"]
       },
       {
         "correctAnswer": "2NF",
         "acceptableKeywords": ["제2정규형", "제2 정규형", "Second Normal Form"]
       },
       {
         "correctAnswer": "3NF",
         "acceptableKeywords": ["제3정규형", "제3 정규형", "Third Normal Form"]
       },
       {
         "correctAnswer": "BCNF",
         "acceptableKeywords": ["Boyce-Codd 정규형", "BC 정규형"]
       }
     ],
     "exampleAnswer": "정규화 단계는 1NF, 2NF, 3NF, BCNF 순으로 진행됩니다."
   }',
   '정규화는 데이터베이스의 논리적 설계 단계에서 중요한 과정입니다.',
   'blank',
   'high',
   'database',
   ARRAY['정규화', '설계', 'DB']
 ),
 (
   '이진트리 순회', 
   '이진트리의 순회 방법에는 [    ] 순회, [    ] 순회, [    ] 순회가 있다.',
   '{
     "blanks": [
       {
         "correctAnswer": "전위",
         "acceptableKeywords": ["preorder", "pre-order", "전위순회"]
       },
       {
         "correctAnswer": "중위",
         "acceptableKeywords": ["inorder", "in-order", "중위순회"]
       },
       {
         "correctAnswer": "후위",
         "acceptableKeywords": ["postorder", "post-order", "후위순회"]
       }
     ],
     "exampleAnswer": "이진트리의 순회 방법에는 전위 순회, 중위 순회, 후위 순회가 있습니다."
   }',
   '트리 순회는 모든 노드를 체계적으로 방문하는 방법입니다.',
   'blank',
   'medium',
   'data_structure',
   ARRAY['트리', '순회', '노드']
 ),
(
  '시간복잡도 계산', 
  '다음 코드의 시간복잡도를 빅오 표기법으로 나타내고 설명하시오.
   ```python
   for i in range(n):
       print(i)
   ```',
  '{
    "exampleAnswer": "주어진 코드의 시간복잡도는 O(n)입니다. 입력 크기 n에 비례하여 실행 시간이 증가하는 선형 시간복잡도를 가집니다.",
    "keyPoints": ["O(n) 표기", "선형 시간복잡도", "n에 비례하는 실행시간"],
    "similarityThreshold": 0.7
  }',
  '시간복잡도는 알고리즘의 효율성을 나타내는 중요한 지표입니다.',
  'descriptive',
  'medium',
  'algorithm',
  ARRAY['복잡도', '효율성', '알고리즘']
),
(
  'CPU 구성요소', 
  'CPU의 주요 구성요소 3가지:

   1. [      ] : 연산을 담당하는 장치
   2. [      ] : 명령어를 해석하고 제어하는 장치
   3. [      ] : 데이터를 임시 저장하는 장치',
  '{
    "blanks": [
      {
        "correctAnswer": "ALU",
        "acceptableKeywords": ["산술논리장치", "연산장치"]
      },
      {
        "correctAnswer": "제어장치",
        "acceptableKeywords": ["Control Unit", "CU"]
      },
      {
        "correctAnswer": "레지스터",
        "acceptableKeywords": ["Register", "임시기억장치"]
      }
    ],
    "exampleAnswer": "CPU는 연산을 담당하는 ALU, 명령어를 해석하고 제어하는 제어장치, 데이터를 임시 저장하는 레지스터로 구성됩니다."
  }',
  'CPU는 컴퓨터 시스템의 핵심 부품입니다.',
  'blank',
  'medium',
  'computer_architecture',
  ARRAY['CPU', '구성', '하드웨어']
),
 (
   '교착상태 조건', 
   '교착상태가 발생하기 위한 4가지 필요조건은 다음과 같다:
   
    1. [    ] : 한 번에 한 프로세스만 자원 사용
    2. [    ] : 자원을 가진 상태에서 다른 자원 요청
    3. [    ] : 강제로 자원을 빼앗을 수 없음
    4. [    ] : 각 프로세스가 순환형태로 자원을 기다림',
   '{
     "blanks": [
       {
         "correctAnswer": "상호배제",
         "acceptableKeywords": ["mutual exclusion", "뮤텍스"]
       },
       {
         "correctAnswer": "점유대기",
         "acceptableKeywords": ["hold and wait", "보유대기"]
       },
       {
         "correctAnswer": "비선점",
         "acceptableKeywords": ["no preemption", "비선점조건"]
       },
       {
         "correctAnswer": "순환대기",
         "acceptableKeywords": ["circular wait", "환형대기"]
       }
     ],
     "exampleAnswer": "교착상태의 4가지 필요조건은 상호배제, 점유대기, 비선점, 순환대기입니다."
   }',
   '교착상태는 시스템의 성능을 저하시키는 중요한 문제입니다.',
   'blank',
   'high',
   'operating_system',
   ARRAY['교착상태', '프로세스', '자원']
 ),
 (
   'TCP/IP 모델의 계층', 
   'TCP/IP 모델의 4개 계층을 위에서 아래로 순서대로 쓰시오: 

    1. [          ]
    2. [          ]
    3. [          ]
    4. [          ]',
   '{
     "blanks": [
       {
         "correctAnswer": "응용 계층",
         "acceptableKeywords": ["Application Layer", "응용"]
       },
       {
         "correctAnswer": "전송 계층",
         "acceptableKeywords": ["Transport Layer", "전송"]
       },
       {
         "correctAnswer": "인터넷 계층",
         "acceptableKeywords": ["Internet Layer", "네트워크 계층"]
       },
       {
         "correctAnswer": "네트워크 접근 계층",
         "acceptableKeywords": ["Network Access Layer", "네트워크 인터페이스 계층"]
       }
     ],
     "exampleAnswer": "TCP/IP 모델은 응용 계층, 전송 계층, 인터넷 계층, 네트워크 접근 계층으로 구성됩니다."
   }',
   'TCP/IP 모델은 OSI 7계층을 단순화한 모델로, 실제 인터넷 프로토콜 스택의 기초가 됩니다.',
   'blank',
   'medium',
   'network',
   ARRAY['TCP/IP', '네트워크', '프로토콜']
 ),
 (
   '트랜잭션 특성', 
   'ACID로 알려진 트랜잭션의 4가지 특성: 

    1. [    ] (Atomicity)
    2. [    ] (Consistency)
    3. [    ] (Isolation)
    4. [    ] (Durability)',
   '{
     "blanks": [
       {
         "correctAnswer": "원자성",
         "acceptableKeywords": ["Atomicity", "전부처리"]
       },
       {
         "correctAnswer": "일관성",
         "acceptableKeywords": ["Consistency", "일치성"]
       },
       {
         "correctAnswer": "고립성",
         "acceptableKeywords": ["Isolation", "독립성", "격리성"]
       },
       {
         "correctAnswer": "지속성",
         "acceptableKeywords": ["Durability", "영속성"]
       }
     ],
     "exampleAnswer": "트랜잭션의 4가지 특성은 원자성, 일관성, 고립성, 지속성입니다."
   }',
   '트랜잭션의 ACID 특성은 데이터베이스의 무결성을 보장합니다.',
   'blank',
   'medium',
   'database',
   ARRAY['트랜잭션', 'ACID', 'DB']
 ),
   (
    '정렬 알고리즘', 
    '다양한 정렬 알고리즘의 특징과 시간복잡도를 비교 설명하시오.',
    '{
      "exampleAnswer": "버블, 선택, 삽입 정렬은 O(n^2)의 시간복잡도를 가지며 구현이 간단합니다. 퀵, 병합 정렬은 O(nlogn)의 시간복잡도를 가지며 더 효율적이지만 구현이 복잡하고 추가 공간이 필요할 수 있습니다.",
      "keyPoints": [
        "기본 정렬 O(n^2)",
        "고급 정렬 O(nlogn)",
        "공간복잡도",
        "안정성",
        "구현 복잡도"
      ],
      "similarityThreshold": 0.7
    }',
    '정렬 알고리즘은 상황에 따라 적절한 선택이 필요합니다.',
    'descriptive',
    'high',
    'algorithm',
    ARRAY['정렬', '알고리즘', '복잡도']
  );
-- 사용자 문제 풀이 기록
INSERT INTO user_problem_history (user_id, problem_id, user_answer, answer_details, is_correct) 
VALUES 
(
  1, 
  7, 
  '{"blanks": ["ALU", "제어기", "레지스터"]}',
  '{
    "results": [
      {
        "blankIndex": 0,
        "userInput": "ALU",
        "isCorrect": true
      },
      {
        "blankIndex": 1,
        "userInput": "제어기",
        "isCorrect": false,
        "matchedAcceptableKeywords": "제어장치"
      },
      {
        "blankIndex": 2,
        "userInput": "레지스터",
        "isCorrect": true
      }
    ],
    "allCorrect": false
  }',
  false
),

 -- 이영희 - 트랜잭션 특성 (전부 정답)
 (
   2, 
   10, 
   '{"blanks": ["원자성", "일관성", "고립성", "지속성"]}',
   '{
     "results": [
       {
         "blankIndex": 0,
         "userInput": "원자성",
         "isCorrect": true
       },
       {
         "blankIndex": 1,
         "userInput": "일관성",
         "isCorrect": true
       },
       {
         "blankIndex": 2,
         "userInput": "고립성",
         "isCorrect": true
       },
       {
         "blankIndex": 3,
         "userInput": "지속성",
         "isCorrect": true
       }
     ],
     "allCorrect": true
   }',
   true
 ),

 --  박지민 - 정렬 알고리즘 (낮은 점수)
 (
   3, 
   11, 
   '{"text": "버블 정렬과 선택 정렬은 n제곱의 시간이 걸리고, 퀵 정렬은 더 빠릅니다."}',
   '{
     "similarityScore": 0.45,
     "matchedKeyPoints": [
       "기본 정렬 O(n^2)"
     ],
     "missedKeyPoints": [
       "고급 정렬 O(nlogn)",
       "공간복잡도",
       "안정성",
       "구현 복잡도"
     ],
     "feedback": "시간복잡도에 대한 기본적인 이해는 있으나, 더 자세한 설명과 다양한 알고리즘의 특징 비교가 필요합니다."
   }',
   false
 ),

 --  김철수 - 교착상태 조건 (절반만 정답)
 (
   1, 
   8, 
   '{"blanks": ["상호배제", "점유대기", "선점", "환형대기"]}',
   '{
     "results": [
       {
         "blankIndex": 0,
         "userInput": "상호배제",
         "isCorrect": true
       },
       {
         "blankIndex": 1,
         "userInput": "점유대기",
         "isCorrect": true
       },
       {
         "blankIndex": 2,
         "userInput": "선점",
         "isCorrect": false,
         "matchedAcceptableKeywords": "비선점"
       },
       {
         "blankIndex": 3,
         "userInput": "환형대기",
         "isCorrect": false,
         "matchedAcceptableKeywords": "순환대기"
       }
     ],
     "allCorrect": false
   }',
   false
 ),

 --  이영희 - 시간복잡도 (전체 정답)
(
  2, 
  6, 
  '{"text": "주어진 코드의 시간복잡도는 O(n)입니다. n번 반복하는 단순 반복문이므로 입력 크기 n에 비례하여 실행 시간이 증가하는 선형 시간복잡도를 가집니다."}',
  '{
    "similarityScore": 0.85,
    "matchedKeyPoints": [
      "O(n) 표기",
      "선형 시간복잡도",
      "n에 비례하는 실행시간"
    ],
    "missedKeyPoints": [],
    "feedback": "정확한 시간복잡도를 파악하고 그 이유를 잘 설명했습니다."
  }',
  true
),

 --  박지민 - 이진트리 순회 (높은 점수)
 (
   3, 
   5, 
   '{"blanks": ["전위", "중위", "후위"]}',
   '{
     "results": [
       {
         "blankIndex": 0,
         "userInput": "전위",
         "isCorrect": true
       },
       {
         "blankIndex": 1,
         "userInput": "중위",
         "isCorrect": true
       },
       {
         "blankIndex": 2,
         "userInput": "후위",
         "isCorrect": true
       }
     ],
     "allCorrect": true
   }',
   true
 ),

 --  김철수 - TCP vs UDP (중간 점수)
 (
   1, 
   3, 
   '{"text": "TCP는 연결형으로 신뢰성이 있고 UDP는 비연결형으로 신뢰성이 없습니다."}',
   '{
     "similarityScore": 0.75,
     "matchedKeyPoints": [
       "연결형/비연결형",
       "신뢰성"
     ],
     "missedKeyPoints": [
       "순서보장",
       "흐름제어",
       "전송속도"
     ],
     "feedback": "기본적인 차이점은 잘 이해하고 있으나, 각 프로토콜의 특징과 장단점에 대한 더 자세한 설명이 필요합니다."
   }',
   true
 );


-- 복습 일정 데이터
INSERT INTO review_schedules (user_id, problem_id, review_date, review_step, is_completed)
VALUES 
 -- 김철수의 복습 일정
 (1, 1, CURRENT_DATE + INTERVAL '1 day', 'FIRST_REPEAT', false),
 (1, 2, CURRENT_DATE + INTERVAL '7 days', 'SECOND_REPEAT', false),
 (1, 3, CURRENT_DATE + INTERVAL '30 days', 'THIRD_REPEAT', false),
 (1, 1, CURRENT_DATE - INTERVAL '1 day', 'FIRST_REPEAT', true),
 (1, 2, CURRENT_DATE - INTERVAL '7 days', 'SECOND_REPEAT', true),
 
 -- 이영희의 복습 일정
 (2, 1, CURRENT_DATE + INTERVAL '1 day', 'FIRST_REPEAT', false),
 (2, 2, CURRENT_DATE + INTERVAL '7 days', 'SECOND_REPEAT', false),
 (2, 3, CURRENT_DATE - INTERVAL '1 day', 'FIRST_REPEAT', true),
 (2, 1, CURRENT_DATE - INTERVAL '7 days', 'SECOND_REPEAT', true),
 
 -- 박지민의 복습 일정
 (3, 1, CURRENT_DATE + INTERVAL '1 day', 'FIRST_REPEAT', false),
 (3, 2, CURRENT_DATE + INTERVAL '30 days', 'THIRD_REPEAT', false),
 (3, 3, CURRENT_DATE - INTERVAL '1 day', 'FIRST_REPEAT', true);
