import { type KeyboardEvent, useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

type ProjectLink = {
  label: string;
  href: string;
};

type PlanningSection = {
  label: string;
  title: string;
  image: string;
  images?: string[];
  imageCaption?: string;
  intent: string;
  execution: string;
};

type DevelopmentLog = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  sections: PlanningSection[];
};

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  status: string;
  imageLabel: string;
  image: string;
  logo?: string;
  accent: string;
  links?: ProjectLink[];
  featured?: boolean;
  detailIntro?: string;
  statusNote?: string;
  planningSections?: PlanningSection[];
  developmentLogs?: DevelopmentLog[];
};

const PROJECTS: Project[] = [
  {
    "id": "02",
    "title": "Aquach / SoomchaSwim",
    "subtitle": "Swim Training Programs",
    "description": "훈련 목적에 맞는 수영 계획을 세우고, Apple Watch에서 운동하며 기록하는 앱입니다. Aquach 출시 후 프로그램 중심의 SoomchaSwim으로 개편하고 있습니다.",
    "highlights": [
      "훈련 목적과 수준에 맞춘 회차별 프로그램",
      "LLM 기반 생성에서 사전 설계 프로그램으로 발전",
      "iPhone·Apple Watch 운동 계획과 기록 연동"
    ],
    "tags": [
      "TypeScript",
      "React Native",
      "Expo",
      "SwiftUI",
      "HealthKit",
      "Supabase"
    ],
    "status": "출시 · 후속 개발",
    "imageLabel": "SoomchaSwim · 개발 중인 운동 상세",
    "image": "/images/projects/soomchaswim-workout.png",
    "logo": "/images/logo-aquach.png",
    "accent": "AI + Fitness",
    "links": [
      {
        "label": "Aquach · App Store",
        "href": "https://apps.apple.com/kr/app/id6745004612"
      }
    ],
    "featured": true,
    "detailIntro": "자유수영에서는 정해진 프로그램 없이 그날 하고 싶은 영법과 거리를 선택해 운동하기 쉽습니다. 꾸준히 수영해도 다음 운동에서 무엇을 바꾸고 얼마나 늘려야 할지는 스스로 정해야 합니다. 수영강사로 일하며 접한 이 문제에서 Aquach를 시작했습니다. 훈련 프로그램을 직접 설계하는 부담을 줄이고, 자신의 목적과 수준에 맞는 계획을 따라 운동하고 기록하도록 만들었습니다.\n\n현재는 점진적 과부하처럼 훈련량과 강도를 단계적으로 조절하는 원리를 여러 회차에 담을 수 있도록 SoomchaSwim으로 개편하고 있습니다. 함께 개발 중인 Soomcha와는 앱 허브 형태로 묶어갈 계획입니다.",
    "planningSections": [
      {
        "label": "01 / Aquach · SoomchaSwim",
        "title": "훈련 목적에 맞는 수영 프로그램 구성",
        "image": "/images/projects/soomchaswim-workout.png",
        "intent": "호흡과 자세를 익히는 훈련, 스트로크 효율을 높이는 훈련, 유산소·스프린트·장거리 완주처럼 목적에 따라 프로그램을 고르도록 구성했습니다. 목표와 기록 등의 맥락으로 추천 후보를 정하고, 선택한 프로그램에 수준·풀 규격·장비 조건을 적용합니다.",
        "execution": "서버는 해당 조건의 회차별 운동 데이터를 읽고 장비 대체안을 선택합니다. 주당 운동 횟수와 선호 요일을 반영해 일정을 구성하고, 사용자가 수행할 프로그램과 세션을 저장합니다.",
        "imageCaption": "SoomchaSwim 개발 버전 · 회차별 운동 상세"
      },
      {
        "label": "02 / Aquach · SoomchaSwim",
        "title": "LLM 기반 운동 생성에서 프로그램 기반 설계로",
        "image": "",
        "intent": "Aquach의 LLM 기반 운동 생성에서 출발해, 훈련 목적과 구성 규칙을 템플릿으로 제공하는 방식을 거쳤습니다. 템플릿 정책과 운동 라이브러리를 AI에 전달하고, 생성된 프로그램 설계안을 코드에서 세션으로 구성했습니다.",
        "execution": "현재 SoomchaSwim은 회차별 운동을 미리 준비하고 사용자 조건에 맞는 구성을 선택합니다. 주차별 진행과 회복·최종 목표를 프로그램 원본에서 검토할 수 있으며, AI는 제목·개인화 요약·코치 안내를 작성합니다. 프로그램 저장 후 문구를 요청하므로 AI 호출이 실패해도 기본 안내로 시작할 수 있습니다."
      },
      {
        "label": "03 / Aquach · SoomchaSwim",
        "title": "회차별 훈련 데이터를 설계하고 검증하기",
        "image": "",
        "intent": "8개 프로그램의 84개 회차를 준비하고, 초급·중급·상급과 25m·50m·25yd 풀에 따른 756개 처방 조합을 데이터로 관리합니다. 각 회차에는 운동 블록과 세트, 거리·반복·휴식·출발 간격, 장비 대체안을 담았습니다.",
        "execution": "같은 원본에서 DB 반영용 데이터, 앱 테스트용 데이터, 검토용 문서를 생성합니다. 원본 구조와 운동 참조 등을 검사해 자료 간 차이를 줄이고, 사용자가 시작할 때 확정된 세션을 저장해 이후 템플릿 수정이 진행 중인 운동에 영향을 주지 않도록 했습니다."
      },
      {
        "label": "04 / Aquach · SoomchaSwim",
        "title": "iPhone에서 계획하고 Apple Watch에서 수행하기",
        "image": "/images/detail/aquach-watch-plan.png",
        "intent": "iPhone의 운동 구성을 Watch에서 실행할 세트 목록으로 변환해 전달합니다. Watch에서는 받은 계획과 세트별 운동 내용을 확인하고, 운동을 마친 뒤 iPhone에서 기록을 돌아볼 수 있습니다.",
        "execution": "Watch에 도달할 수 있으면 sendMessage로 즉시 보내고, 전송이 실패하거나 연결할 수 없으면 transferUserInfo로 전달을 예약합니다. iPhone에서 받은 완료 메시지는 고유 ID로 중복을 확인하고 로컬 파일에 보관합니다.",
        "images": [
          "/images/detail/aquach-watch-plan.png",
          "/images/detail/aquach-watch-run.png",
          "/images/detail/aquach-calendar.png",
          "/images/detail/aquach-record-summary.png"
        ],
        "imageCaption": "Aquach · Watch 계획 수신·세트 진행 / iPhone 캘린더·운동 기록"
      }
    ],
    "statusNote": "Aquach · App Store 출시 / SoomchaSwim · 후속 개발 중",
    "developmentLogs": [
      {
        "slug": "generation-evolution",
        "title": "Aquach의 운동 생성 방식은 어떻게 바뀌었나",
        "summary": "LLM 기반 생성에서 템플릿 규칙을 거쳐 사전 설계 프로그램으로 발전한 과정",
        "intro": "자유수영에서 매번 운동 내용을 정하는 부담을 줄이기 위해 Aquach를 만들었습니다. SoomchaSwim으로 개편하면서는 한 번의 운동뿐 아니라 여러 회차가 어떤 목적과 순서로 이어지는지를 프로그램의 중심에 놓았습니다. 이 글은 이전 생성 코드와 베이스 프로그램 실험, 현재 Program V1의 구조를 비교한 기록입니다.",
        "sections": [
          {
            "label": "01 / Aquach · SoomchaSwim",
            "title": "한 번의 운동을 여러 회차의 훈련으로 연결하기",
            "image": "",
            "intent": "예를 들어 자유수영 때 익숙한 영법으로 비슷한 거리를 반복한다면, 다음번에는 거리를 늘릴지 쉬는 시간을 바꿀지 결정해야 합니다. 장거리 완주가 목표라면 한 회차의 총거리뿐 아니라 반복 구간, 연속영, 회복과 최종 점검의 순서도 필요합니다.",
            "execution": "이런 사용 상황을 출발점으로 운동 계획을 제공했고, 후속 개발에서는 목적별 프로그램과 회차별 진행을 구체화했습니다. 프로그램의 생성 결과를 읽는 것에서 더 나아가, 어떤 훈련 흐름을 제공하는지 원본 단계에서 검토할 수 있게 만드는 방향입니다."
          },
          {
            "label": "02 / Aquach · SoomchaSwim",
            "title": "템플릿 정책과 운동 라이브러리를 사용하는 생성 흐름",
            "image": "",
            "intent": "이전 ProgramGenerationService는 프로필과 사용자 입력, 템플릿 정책, 운동 라이브러리를 ProgramAIService에 전달합니다. AI가 전체 회차와 주차 테마를 포함한 설계안을 반환하면 SessionBuilder가 각 세션을 구성하고, applyProgramSessionBatch가 결과를 저장합니다.",
            "execution": "이 단계의 템플릿은 AI 입력에 운동 목적과 구성 조건을 제공하는 역할을 합니다. 생성된 회차를 앱에서 다룰 수 있도록 구성하고 저장하는 처리는 코드가 맡습니다. 프로그램을 생성 중·완료·실패 상태로 추적하는 흐름도 이 과정에 포함돼 있습니다."
          },
          {
            "label": "03 / Aquach · SoomchaSwim",
            "title": "베이스 프로그램을 먼저 작성한 실험",
            "image": "",
            "intent": "2026년 3월에는 장거리 완주 프로그램의 주차별 메인 운동을 먼저 작성하고, AI가 드릴·보조 블록·포커스·코치 문구를 선택하는 실험을 진행했습니다. 비교안에는 500m→600m→700m 연속영으로 늘리는 구성과, 4×200m→3×300m처럼 반복 구간을 거쳐 연속영으로 이어지는 구성이 있었습니다.",
            "execution": "검토 기록에서는 첫 회차의 진입 부담, 메인 운동의 단조로움, 목표 거리에 도달하는 시점과 마지막 주의 역할을 비교했습니다. 이 자료는 설계안과 생성 결과의 비교 기록이며, 실제 훈련 효과를 측정한 결과는 아닙니다. 현재 구현과 구분해 전환 과정의 실험으로 남겼습니다."
          },
          {
            "label": "04 / Aquach · SoomchaSwim",
            "title": "현재 Program V1에서 운동 구성을 정하는 방법",
            "image": "",
            "intent": "현재 화면은 ProgramV1Service를 통해 create-program-v1을 호출합니다. 서버는 템플릿·수준·풀 규격·장비·운동 일정 조건을 DB 함수에 전달하고, 준비된 회차별 처방에서 실제 수행할 구성을 선택해 사용자 프로그램을 저장합니다.",
            "execution": "이 구조에서는 운동 구성과 회차의 흐름이 프로그램 데이터에 남습니다. 원본을 검토하고 조건별 조합을 확인한 뒤 앱에 제공할 수 있습니다. 주차별 진행을 검토하는 작업이 매번 생성된 답변을 해석하는 과정에만 의존하지 않게 됐습니다."
          },
          {
            "label": "05 / Aquach · SoomchaSwim",
            "title": "AI가 작성하는 내용과 실패했을 때의 동작",
            "image": "",
            "intent": "프로그램 저장 뒤 AI에 요청하는 출력은 title, personalizationSummary, coachNote 세 가지입니다. 입력에는 템플릿 ID, 수준, 주당 횟수, 선택 장비와 언어가 들어갑니다. 원본 세트나 회차별 처방 전체를 전달하는 구조는 아니므로, 상세 운동 분석까지 수행한다고 설명할 수는 없습니다.",
            "execution": "응답 필드와 길이를 검사하고 유효한 문구만 apply_program_v1_copy로 반영합니다. 호출 시간 제한, 형식 오류 또는 문구 저장 실패가 발생하면 이미 생성된 프로그램과 기본 안내를 유지합니다. 현재 후속 버전의 코드 구조이며, Aquach 출시본의 모든 동작과 동일하다는 의미는 아닙니다."
          }
        ]
      },
      {
        "slug": "program-data-design",
        "title": "회차별 수영 프로그램을 미리 설계하고 데이터로 만들기",
        "summary": "목적·수준·풀 규격별 훈련 데이터와 검토·DB·앱 자료를 함께 관리하는 과정",
        "intro": "미리 준비한 프로그램을 제공하려면 회차별 운동 내용과 앱에서 실행할 데이터를 함께 관리해야 합니다. SoomchaSwim에서는 프로그램 목적, 회차별 처방, 사용자에게 배정한 운동을 연결하고 같은 원본에서 여러 산출물을 생성하도록 구성했습니다.",
        "sections": [
          {
            "label": "01 / Aquach · SoomchaSwim",
            "title": "목적과 회차를 데이터의 기준으로 삼기",
            "image": "",
            "intent": "프로그램 메타데이터에는 목적, 권장 수준, 총 회차 수와 허용 주당 횟수 등을 둡니다. 회차 원본에는 워밍업·드릴·본운동·회복·쿨다운 블록과 세트의 거리·반복·시간 조건을 담습니다. 목적과 회차의 연결을 유지하면서 실제 수행 내용을 확인할 수 있는 구조입니다.",
            "execution": "ProgramRecommendationService는 goalId와 기록 등의 맥락을 받아 우선 추천과 대안 프로그램을 고릅니다. 사용자가 선택한 프로그램을 기준으로 세션을 구성하므로, 추천 단계와 실제 수행할 운동 데이터의 연결을 추적할 수 있습니다."
          },
          {
            "label": "02 / Aquach · SoomchaSwim",
            "title": "수준과 풀 규격에 따른 처방 관리",
            "image": "",
            "intent": "현재 준비된 데이터는 8개 프로그램과 84개 회차입니다. 각 회차의 초급·중급·상급을 합하면 252개 수준별 처방이고, 25m·50m·25yd 조건을 포함하면 756개 조합입니다. 이 수치는 관리하는 데이터의 규모입니다.",
            "execution": "풀 길이와 단위를 명시해 거리와 반복 구성을 해석하고, 장비가 필요한 운동에는 대체안을 둡니다. 생성 함수는 선택한 수준과 풀 규격의 처방을 읽고 사용할 수 있는 장비에 맞는 블록을 고릅니다. 모든 사용자에게 같은 회차 데이터를 그대로 복사하는 흐름과는 구별되는 조건 선택 과정입니다."
          },
          {
            "label": "03 / Aquach · SoomchaSwim",
            "title": "훈련 진행과 회복을 검토하기",
            "image": "",
            "intent": "장거리 완주 베이스를 비교할 때는 회차별 총거리만 보지 않고 반복 구간과 연속영의 배치, 회복 회차, 최종 목표를 확인하는 시점을 함께 검토했습니다. 목표 거리에 마지막 주보다 먼저 도달하는 구성에서는 이후 회차의 목적도 다시 설명해야 했습니다.",
            "execution": "이런 판단을 프로그램 원본과 비교 기록에 남기면 어느 회차를 왜 바꿨는지 확인할 수 있습니다. 점진적 과부하를 지향하는 설계 의도와 실제 훈련 효과는 서로 다른 확인 대상입니다. 여기서는 회차를 구성하고 검토한 과정과 이를 표현하는 데이터 구조를 다룹니다."
          },
          {
            "label": "04 / Aquach · SoomchaSwim",
            "title": "하나의 원본에서 DB·앱·검토 자료 생성하기",
            "image": "",
            "intent": "scripts/program-v1의 빌드 스크립트가 세션 JSON과 프로그램 메타데이터를 읽습니다. 원본의 허용 필드와 값 형식, 운동 라이브러리 참조, 번역 등 구성 규칙을 검사한 뒤 DB 반영용 SQL, 앱 테스트용 fixture, Markdown·HTML 검토 자료를 생성합니다.",
            "execution": "검토 문서를 따로 고치고 실행 데이터를 다시 맞추는 대신, 원본에서 각 형식의 자료를 만들어 비교할 수 있게 했습니다. source_hash를 산출물에 포함해 어떤 원본에서 생성됐는지도 추적합니다. 이 검사는 데이터와 구조의 일관성을 확인하며 운동 효과 자체를 입증하는 검사는 아닙니다."
          },
          {
            "label": "05 / Aquach · SoomchaSwim",
            "title": "사용자가 시작한 프로그램과 저장 결과 다루기",
            "image": "",
            "intent": "생성 시 확정된 세션 구성을 사용자 데이터에 저장합니다. 원본 템플릿을 수정해도 진행 중인 프로그램의 내용이 따라 바뀌지 않도록 하고, 이후 수행과 기록은 저장된 구성을 기준으로 이어집니다.",
            "execution": "생성 응답을 놓친 경우에는 같은 호출에서 사용한 요청 ID로 저장된 활성 프로그램을 조회합니다. 결과가 있으면 그 ID를 반환합니다. 현재 확인한 복구는 생성 호출 중 네트워크 오류를 처리하는 범위이며, 앱 재시작 뒤에도 요청을 자동 복구하는 기능까지 의미하지는 않습니다."
          }
        ]
      },
      {
        "slug": "watch-workout-flow",
        "title": "설계한 운동을 Apple Watch에서 수행하기까지",
        "summary": "운동 데이터의 Watch 전송 형식, 즉시·지연 전달과 완료 메시지 보관",
        "intro": "iPhone에서 만든 운동 계획이 Watch의 세트 진행으로 이어지려면 운동 데이터의 형식과 전달 방식이 맞아야 합니다. Aquach의 저장된 Watch 화면과 현재 SoomchaSwim 저장소의 연결 코드를 바탕으로 계획 전달과 완료 기록 처리 흐름을 정리했습니다.",
        "sections": [
          {
            "label": "01 / Aquach · SoomchaSwim",
            "title": "앱의 운동 구성을 Watch용 계획으로 변환하기",
            "image": "",
            "intent": "WatchConnectivityService는 운동 계획을 WatchWorkoutPlanPayload 형식으로 전달합니다. 계획 ID와 제목, 총거리, 예상 시간, 풀 길이와 거리 단위에 더해 세트별 운동 이름·거리·반복·시간 조건을 담습니다.",
            "execution": "세트 유형은 워밍업·드릴·본운동·쿨다운으로 전달하고 시간 조건은 휴식, 출발 간격, 수행 시간으로 구분합니다. 휴식 시간과 출발 간격은 계산 기준이 다르므로 값만 전달하지 않고 timing.method에 의미를 함께 담습니다."
          },
          {
            "label": "02 / Aquach · SoomchaSwim",
            "title": "받은 계획을 세트별 운동으로 보여주기",
            "image": "/images/detail/aquach-watch-plan.png",
            "intent": "Watch의 계획 화면에는 수신한 운동 이름과 거리, 예상 시간, 세트 수가 표시됩니다. 운동을 시작하면 현재 세트의 운동과 거리, 진행 상태를 확인하고 완료하거나 건너뛸 수 있습니다.",
            "execution": "아래 자료는 기존 Aquach의 저장된 화면입니다. 계획의 목록·세트 데이터가 Watch의 실제 사용 화면에서 어떻게 표현되는지 보여줍니다. 이 글을 작성하면서 새 실기기 운동 테스트를 수행한 것은 아닙니다.",
            "images": [
              "/images/detail/aquach-watch-plan.png",
              "/images/detail/aquach-watch-run.png"
            ],
            "imageCaption": "Aquach 저장 화면 · 계획 수신 / 세트 진행"
          },
          {
            "label": "03 / Aquach · SoomchaSwim",
            "title": "즉시 보낼 수 없을 때도 전달 경로 유지하기",
            "image": "",
            "intent": "Swift의 WatchConnectivityModule은 Watch 도달 가능 여부를 확인합니다. 도달할 수 있으면 sendMessage로 계획을 보내고, 오류가 발생하거나 도달할 수 없으면 transferUserInfo를 사용해 전달을 예약합니다.",
            "execution": "이 연결 처리는 Expo 네이티브 모듈을 통해 React Native 코드와 이어집니다. 즉시 응답이 필요한 전달과 연결 상태에 따라 늦게 도착할 수 있는 전달을 코드에서 구분합니다. 예약한 전송은 WatchConnectivity의 전달 조건에 영향을 받으므로 즉시 도착을 보장하지는 않습니다."
          },
          {
            "label": "04 / Aquach · SoomchaSwim",
            "title": "완료 메시지를 앱에서 처리할 때까지 보관하기",
            "image": "",
            "intent": "완료 데이터에는 계획 ID, 완료 시각, 실제 운동 시간과 수행한 세트 정보 등이 들어갑니다. iPhone의 네이티브 모듈은 완료 메시지에 고유 ID를 붙이고 이미 보관된 메시지인지 확인한 다음 대기 목록에 추가합니다.",
            "execution": "대기 목록은 로컬 JSON 파일에 원자적으로 저장하고 파일 보호를 적용합니다. 메모리에만 보관하지 않아 앱 쪽 처리가 늦어지는 동안 메시지를 유지할 수 있습니다. 계획 전달과 완료 메시지 보관의 각 단계를 확인하면 기록이 누락됐을 때 어느 경로를 조사할지도 좁힐 수 있습니다."
          },
          {
            "label": "05 / Aquach · SoomchaSwim",
            "title": "iPhone에서 운동 기록으로 이어가기",
            "image": "/images/detail/aquach-calendar.png",
            "intent": "Watch에서 수행한 운동은 iPhone의 캘린더와 기록 화면에서 돌아볼 수 있도록 연결했습니다. 계획 ID와 완료 데이터가 앱의 운동 기록으로 이어지는 흐름을 두 기기 사이의 접점으로 사용합니다.",
            "execution": "프로그램을 고르는 화면, Watch에서 수행하는 화면, iPhone에서 기록을 확인하는 화면이 같은 운동을 가리켜야 합니다. 전달 데이터의 식별자와 단위, 세트 구성을 함께 다루는 것이 이 연동의 핵심입니다.",
            "images": [
              "/images/detail/aquach-calendar.png",
              "/images/detail/aquach-record-summary.png"
            ],
            "imageCaption": "Aquach · 캘린더 / 운동 기록"
          }
        ]
      }
    ]
  },
  {
    "id": "01",
    "logo": "/images/logo-jitdeck.png",
    "title": "Jitdeck",
    "subtitle": "AI Developer Tools",
    "status": "개발 중",
    "description": "대화로 할 일을 등록하고, 프로젝트의 진행 상황과 작업 결과를 관리하는 macOS 앱입니다.",
    "tags": [
      "Swift",
      "SwiftUI",
      "SQLite",
      "MCP"
    ],
    "highlights": [
      "대화에서 프로젝트·이슈 조회와 수정",
      "AI 작업의 진행·사용자 확인·결과 관리",
      "프로젝트별 접근 권한과 연결 상태 확인"
    ],
    "detailIntro": "Linear 같은 프로젝트 관리 도구를 쓰면서, AI가 할 일을 정리하고 진행 상황을 갱신하는 데에도 참여하면 관리가 편해지겠다고 생각했습니다. 대화에서 요청한 일이 프로젝트의 이슈와 작업 결과로 남도록 Jitdeck을 만들고 있습니다.",
    "planningSections": [
      {
        "label": "01 / AI Developer Tools",
        "title": "대화에서 등록한 일을 앱에서도 확인하기",
        "image": "/images/projects/jitdeck-board-example.jpg",
        "intent": "ChatGPT나 Codex에서 프로젝트의 할 일을 읽고 등록·수정할 수 있도록 MCP 도구를 연결했습니다. 대화에서 바꾼 내용은 앱의 이슈 목록에도 반영됩니다.",
        "execution": "프로젝트마다 이슈의 우선순위·마감·상태와 작업 기록을 모았습니다. 다른 프로젝트로 옮겼다가 돌아와도 남은 일과 이전 결과를 같은 곳에서 찾을 수 있습니다.",
        "imageCaption": "초기 이슈 보드 · 예시 프로젝트"
      },
      {
        "label": "02 / AI Developer Tools",
        "title": "진행 중인 작업과 확인할 결과 나누기",
        "image": "",
        "intent": "AI에 작업을 맡긴 뒤에는 계속 진행 중인지, 내 답을 기다리는지, 결과를 검토할 차례인지 알아야 합니다. 이슈에 실행 상태와 승인·질문·결과를 연결했습니다.",
        "execution": "질문이나 승인이 필요하면 앱에서 확인하고 응답할 수 있습니다. 실행이 끝난 작업은 결과를 검토할 수 있도록 표시하며, 중단·재개도 해당 작업에서 처리합니다."
      },
      {
        "label": "03 / AI Developer Tools",
        "title": "프로젝트별 접근 범위 정하기",
        "image": "",
        "intent": "대화에서 로컬 프로젝트를 다룰 때는 어떤 파일과 작업을 허용했는지 알 수 있어야 합니다. 프로젝트별로 접근을 요청하고 승인·만료·철회 상태를 관리하도록 구현했습니다.",
        "execution": "대시보드에서 서버와 연결 상태를 확인하고, 연결이 끊겼을 때 다시 연결할 수 있게 했습니다. 여러 프로젝트를 관리하면서도 각 프로젝트의 권한을 따로 확인할 수 있습니다."
      }
    ],
    "statusNote": "출시를 준비하며 직접 사용하고 있습니다.",
    "image": "/images/projects/jitdeck-board-example.jpg",
    "imageLabel": "초기 이슈 보드 · 예시 프로젝트",
    "accent": "AI Developer Tools"
  },
  {
    "id": "03",
    "title": "대화 맥락 기반 발언 탐지",
    "subtitle": "Korean LLM Research",
    "status": "졸업 연구",
    "description": "한국어 대화의 문맥을 읽고 인용·비판·직접 공격을 구별하도록 LLM을 학습하고 오류를 분석한 졸업 연구입니다.",
    "tags": [
      "Python",
      "MLX-LM",
      "LoRA",
      "LLM"
    ],
    "highlights": [
      "대화 문맥을 포함한 대상 발화 분류",
      "프롬프트·LoRA·학습 자료 선별 실험",
      "오답 유형에 따른 입력과 데이터 보강"
    ],
    "detailIntro": "거친 표현이 포함된 문장도 상대를 공격하는 말인지, 다른 사람의 말을 인용하며 문제를 제기하는 말인지에 따라 해석이 달라집니다. 언어학과 언어정보처리에서 공부한 문맥의 문제를 한국어 LLM의 발언 분류 과제로 다뤘습니다.",
    "planningSections": [
      {
        "label": "01 / Korean LLM Research",
        "title": "앞선 대화와 대상 발화를 함께 입력하기",
        "image": "/images/projects/research-experiment-flow.png",
        "intent": "AI말평의 대화 전체와 판정할 발화를 함께 입력하고 적절·부적절을 분류하도록 실험했습니다. EXAONE·Qwen·Gemma 계열에서 기본 응답, 프롬프트 변경, LoRA 미세조정을 비교했습니다.",
        "execution": "입력 형식과 학습·생성 조건을 실행별로 기록하고 예측 원문을 남겼습니다. 같은 사례에서 입력과 학습 조건을 바꿨을 때 판단이 어떻게 달라졌는지 추적했습니다.",
        "imageCaption": "연구 발표 자료 · 실험 흐름"
      },
      {
        "label": "02 / Korean LLM Research",
        "title": "오답을 읽고 다음 실험 정하기",
        "image": "/images/projects/research-error-cases.png",
        "intent": "문제 제기나 인용을 공격으로 분류하는 오탐과, 상대를 비하한 말을 놓치는 미탐을 나눠 살펴봤습니다. 직접 공격·일반 비판·인격 비하·인용 등 반복되는 오류를 유형으로 정리했습니다.",
        "execution": "오류가 집중된 경계 사례를 학습 자료에 보강하고, 표현 자체와 문맥상 역할을 함께 제공하는 입력도 실험했습니다. 자료를 바꾼 이유와 개별 예측을 남겨 다음 실험을 정하는 근거로 사용했습니다.",
        "imageCaption": "연구 포스터 · 오류 유형과 해석"
      },
      {
        "label": "03 / Korean LLM Research",
        "title": "외부 자료의 판정 기준 맞추기",
        "image": "",
        "intent": "외부 윤리검증 데이터의 유형·강도 라벨을 연구에서 사용하는 적절·부적절 기준에 맞춰 선별했습니다. 일반 비판과 인격 공격이 섞여 기준을 정하기 어려운 유형은 제외했습니다.",
        "execution": "선별 규칙과 사용한 자료를 기록해 후속 실험에도 같은 기준을 적용했습니다. 개발 중 반복해 살펴본 평가 자료라는 조건을 연구 결과 해석에 함께 남겼습니다."
      }
    ],
    "statusNote": "학습 실험과 오류 분석을 졸업 연구 문서로 정리했습니다.",
    "image": "/images/projects/research-experiment-flow.png",
    "imageLabel": "졸업 연구 · 실험 흐름 자료",
    "accent": "Korean LLM Research"
  },
  {
    "id": "04",
    "logo": "/images/logo-kiwijju.png",
    "title": "KiwiJju",
    "subtitle": "Local Voice AI",
    "status": "베타 테스트",
    "description": "짧게 영어로 대화하고, 그 대화에서 사용한 표현을 다시 연습하는 iPhone 음성 학습 앱입니다.",
    "tags": [
      "SwiftUI",
      "Python",
      "WebSocket",
      "ASR",
      "LLM",
      "TTS"
    ],
    "highlights": [
      "짧은 응답과 한 번에 한 질문",
      "내가 말한 문장으로 교정·음성 복습",
      "iPhone 음성 입력과 Mac 로컬 AI 연결"
    ],
    "detailIntro": "영어로 자신의 이야기를 꺼내고 대화를 이어갈 수 있는 상대를 만들고 싶었습니다. A2 수준의 학습자가 한 번에 긴 답을 준비하지 않아도 되도록 짧게 묻고 답하게 했고, 대화가 끝난 뒤 자신이 쓴 표현을 돌아보도록 기획했습니다.",
    "planningSections": [
      {
        "label": "01 / Local Voice AI",
        "title": "한 번에 한 질문으로 대화 이어가기",
        "image": "/images/projects/kiwijju-conversation.png",
        "intent": "대화 모델에 A2 수준의 짧은 응답과 한 번에 한 질문을 요청합니다. 최근 대화 주제와 복습할 단어를 읽어 시작 질문을 만들고, 사용자가 말한 내용에 다음 질문이 이어지도록 했습니다.",
        "execution": "말하는 도중에는 뜻을 전달하고 대답을 이어가는 데 집중할 수 있게 했습니다. 도움을 요청하거나 이해에 문제가 생기는 경우에는 필요한 설명을 제공합니다.",
        "imageCaption": "개발 버전 · 음성 전송 중인 대화"
      },
      {
        "label": "02 / Local Voice AI",
        "title": "내가 말한 문장으로 다시 연습하기",
        "image": "/images/projects/kiwijju-feedback.png",
        "intent": "대화가 끝나면 실제로 사용한 문장에서 수정할 부분과 자연스러운 표현을 정리합니다. 이번 대화와 관계있는 단어·문장을 모아 다음 연습에 사용할 수 있게 했습니다.",
        "execution": "대화 중 교정에 계속 끊기는 부담을 줄이면서, 연습할 표현은 놓치지 않도록 대화와 복습을 나눴습니다. 표현장에서는 저장한 문장을 음성으로 다시 연습할 수 있습니다.",
        "imageCaption": "개발 버전 · 대화 후 표현 복습"
      },
      {
        "label": "03 / Local Voice AI",
        "title": "iPhone과 Mac 사이에서 대화 처리하기",
        "image": "",
        "intent": "iPhone의 음성을 Mac에서 인식하고, Ollama의 대화 모델과 음성 합성을 거쳐 응답합니다. 음성 인식·대화·음성 합성을 나눠 모델을 바꿔 비교할 수 있게 했습니다.",
        "execution": "페어링 뒤 연결 정보를 Keychain에 저장해 다시 사용할 수 있습니다. 대화 중 재접속으로 같은 발화가 전송되면 저장된 응답을 반환해 기록과 응답이 중복되지 않게 했습니다."
      }
    ],
    "statusNote": "TestFlight 배포 · iPhone과 Mac을 연결해 사용하는 개발 버전",
    "image": "/images/projects/kiwijju-conversation.png",
    "imageLabel": "KiwiJju · 음성 대화 개발 화면",
    "accent": "Local Voice AI"
  },
  {
    "id": "05",
    "logo": "/images/logo-jujulog.png",
    "title": "주주로그",
    "subtitle": "Travel Journal",
    "status": "출시",
    "description": "반려견과 함께한 산책과 여행을 경로·사진으로 기록하고 여행카드로 공유하는 앱입니다.",
    "tags": [
      "React Native",
      "TypeScript",
      "SQLite",
      "Expo"
    ],
    "highlights": [
      "장소 탐색에서 여행 기록·공유까지",
      "늦게 종료한 여행의 종료 시각 수정",
      "경로·사진 보관과 진행 중 여행 복구"
    ],
    "detailIntro": "반려견과 다녀온 하루를 경로와 사진으로 다시 꺼내보고 싶었습니다. 장소를 찾고 여행을 시작한 뒤, 이동 경로와 사진을 모아 한 기록으로 저장하는 주주로그를 기획·개발했습니다. 저장한 여행은 배경과 문구를 편집한 카드로 공유할 수 있습니다.",
    "planningSections": [
      {
        "label": "01 / Travel Journal",
        "title": "다녀온 하루를 경로와 사진으로 남기기",
        "image": "/images/projects/jujulog-trip.png",
        "intent": "여행을 시작하면 이동 경로를 기록하고 중간에 사진을 추가합니다. 여행을 마친 뒤에는 지도에서 이동한 곳과 사진을 함께 보고, 사진이 없는 여행도 저장할 수 있게 했습니다.",
        "execution": "여행 정보는 SQLite에, 사진은 앱 내부 저장공간에 보관합니다. 진행 중인 여행을 하나로 관리해 앱을 다시 열었을 때 이어서 기록할 수 있습니다.",
        "imageCaption": "여행 상세 · 예시 경로와 사진"
      },
      {
        "label": "02 / Travel Journal",
        "title": "종료 버튼을 늦게 눌렀을 때",
        "image": "",
        "intent": "여행을 마치고 집으로 돌아온 뒤 종료 버튼을 누르면 돌아온 이후의 이동까지 기록될 수 있습니다. 저장 전에 사용자가 여행의 종료 시각을 앞당길 수 있도록 했습니다.",
        "execution": "수정한 시각 이후의 위치·사진·걸음 표본을 결과에서 제외합니다. 보호자의 걸음 수로 계산한 반려견 활동량은 추정값으로 구분해 표시합니다."
      },
      {
        "label": "03 / Travel Journal",
        "title": "장소를 찾고 여행을 시작하기",
        "image": "/images/projects/jujulog-explore.png",
        "intent": "일반 관광정보 API를 연동해 키워드·지역·카테고리로 장소를 찾고 소개와 이용 정보를 확인할 수 있게 했습니다. 찾은 장소에서 여행 시작으로 이어집니다.",
        "execution": "외부 응답을 앱의 장소 형식으로 정리해 로컬에 저장하고, 기존에 보관한 정보가 유지되도록 처리했습니다. 관광지 이미지는 사용자의 여행 사진과 함께 여행카드 배경으로 활용할 수 있습니다.",
        "imageCaption": "장소 탐색 화면"
      }
    ],
    "statusNote": "App Store 출시",
    "image": "/images/projects/jujulog-explore.png",
    "imageLabel": "주주로그 · 장소 탐색 화면",
    "accent": "Travel Journal",
    "links": [
      {
        "label": "App Store",
        "href": "https://apps.apple.com/kr/app/id6807680437"
      }
    ]
  },
  {
    "id": "06",
    "logo": "/images/logo-gamzasaga.png",
    "title": "GamzaSaga",
    "subtitle": "AI Game Systems",
    "status": "개발 중",
    "description": "주민들이 마을을 짓고 항해하며, 함께 겪은 일이 기억과 관계에 남는 게임을 개발하고 있습니다.",
    "tags": [
      "Godot",
      "GDScript",
      "Swift",
      "Gemma",
      "llama.cpp"
    ],
    "highlights": [
      "마을 생활과 원정이 이어지는 게임",
      "주민의 사건 기록과 관계 변화",
      "AI가 선택한 행동을 이동·건설과 연결"
    ],
    "detailIntro": "마을에서 함께 살던 주민들이 배를 타고 떠나고, 원정에서 겪은 일이 돌아온 뒤의 관계에도 남는 게임을 만들고 있습니다. 정착·항해 시스템과 함께 주민의 성격·기억·목표를 행동에 반영하는 기능을 개발하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / AI Game Systems",
        "title": "마을과 원정대가 같은 시간을 보내도록",
        "image": "/images/projects/gamzasaga-village.png",
        "intent": "주민이 먹고 쉬고 일하는 생활에 건설·연구·제작을 연결하고, 선박 준비와 항해로 이어지게 설계했습니다. 본진에 남은 주민과 원정대의 상태를 같은 세계 안에서 다룹니다.",
        "execution": "주민과 물자, 진행 중인 작업·항해 상태를 저장해 중간에 멈춘 세계를 이어갈 수 있게 했습니다. 현재 정착과 선박·항해, 상륙·교역·귀환 기능을 개발하고 있습니다.",
        "imageCaption": "개발 버전 · 마을과 주민"
      },
      {
        "label": "02 / AI Game Systems",
        "title": "함께 겪은 사건이 관계에 남도록",
        "image": "",
        "intent": "구조나 치료 같은 사건이 생겼을 때 참여한 주민을 기록하고, 이후의 관계와 기억에 반영하는 기반을 구현했습니다. 누가 누구를 도왔는지가 남도록 사건에 당사자를 연결했습니다.",
        "execution": "회복 상태·거리·시야 같은 조건을 확인한 뒤 사건을 반영합니다. 주민의 대화와 함께 지낼 상대를 고르는 행동에도 이 기억을 활용하는 방향으로 개발하고 있습니다."
      },
      {
        "label": "03 / AI Game Systems",
        "title": "선택한 행동을 게임에서 실행하기",
        "image": "/images/projects/gamzasaga-gemma-check.png",
        "intent": "주민의 성격·기억·목표와 현재 가능한 작업을 모델에 전달해 행동을 선택하게 했습니다. 응답을 받은 뒤에는 허용한 행동인지, 주민과 대상이 여전히 그 작업을 할 수 있는지 검사합니다.",
        "execution": "늦거나 중복된 응답은 적용하지 않습니다. 별도 시뮬레이터에서 모델의 선택을 이동·건설·저장 복원까지 연결했으며, 목표에 맞는 행동을 고르는 판단 품질은 개선 중입니다.",
        "imageCaption": "AI 행동 연결 · 시뮬레이터 검증 화면"
      }
    ],
    "statusNote": "개발 중 · AI 행동 연결은 별도 시뮬레이터에서 검증 중",
    "image": "/images/projects/gamzasaga-village.png",
    "imageLabel": "GamzaSaga · 개발 중인 마을",
    "accent": "AI Game Systems"
  },
  {
    "id": "07",
    "title": "Nootify",
    "subtitle": "Push-based Language Learning",
    "description": "알림으로 이야기의 다음 장면을 받고, 선택지에 답하며 외국어 문장을 읽는 학습 앱입니다.",
    "highlights": [
      "알림 속 문장과 선택지로 짧게 학습",
      "선택에 따라 달라지는 이야기와 엔딩",
      "장면과 함께 저장하는 표현·단어장"
    ],
    "tags": [
      "TypeScript",
      "React Native",
      "Expo",
      "Notifee",
      "Zustand",
      "MMKV"
    ],
    "status": "출시",
    "imageLabel": "Nootify · 이야기와 학습 기록",
    "image": "/images/detail/nootify-home-dashboard.png",
    "logo": "/images/logo-nootify.png",
    "accent": "Language, Story",
    "links": [
      {
        "label": "App Store",
        "href": "https://apps.apple.com/kr/app/id6757182440"
      }
    ],
    "detailIntro": "학습을 시작할 때마다 따로 시간을 내고 앱을 열어야 하는 부담을 줄이고 싶었습니다. 짧은 이야기와 선택지를 알림으로 보내고, 고른 답에 따라 다음 장면이 달라지는 Nootify를 만들었습니다. 이야기의 결과를 궁금해하며 외국어 문장을 읽도록 기획했습니다.",
    "planningSections": [
      {
        "label": "01 / Push-based Language Learning",
        "title": "알림에서 읽고 선택하기",
        "image": "/images/detail/nootify-notification-entry.png",
        "intent": "알림 안에 상황 문장과 선택지를 넣었습니다. 사용자가 답을 고르면 이야기의 진행 위치와 다음 알림에 그 결과가 반영됩니다. 즉시 이어 읽거나 간격을 두고 다음 장면을 받을 수 있습니다.",
        "execution": "알림에서 한 선택도 앱의 진행 기록에 저장합니다. 앱을 다시 열었을 때 예약된 알림이 없으면 현재 진행 위치를 기준으로 예약을 복구합니다.",
        "imageCaption": "알림에서 이야기 시작하기"
      },
      {
        "label": "02 / Push-based Language Learning",
        "title": "선택에 따라 이야기가 달라지도록",
        "image": "/images/detail/nootify-story-choice.png",
        "intent": "이야기마다 체력·신뢰도 같은 스탯과 분기, 실패·엔딩 조건을 정했습니다. 문장을 읽고 선택한 결과가 다음 장면에 영향을 주도록 했습니다.",
        "execution": "장면·선택지·효과·조건은 스토리 데이터에 저장하고 공통 엔진이 결과를 계산합니다. 새로운 이야기를 추가할 때도 같은 구조로 분기와 난이도별 문장을 다룰 수 있습니다.",
        "imageCaption": "이야기와 선택지"
      },
      {
        "label": "03 / Push-based Language Learning",
        "title": "표현이 나온 장면까지 기억하기",
        "image": "/images/detail/nootify-vocabulary.png",
        "intent": "모르는 단어를 저장할 때 그 표현이 나온 문장과 장면도 다시 볼 수 있게 했습니다. 단어만 따로 외우다가 어떤 상황에서 쓰는지 잊는 것을 줄이려는 선택입니다.",
        "execution": "영어 표현은 문맥을 포함해 Datamuse에서 유의어를 찾습니다. 사용자는 이야기의 선택 기록과 저장한 표현을 앱에서 다시 살펴볼 수 있습니다.",
        "imageCaption": "문맥과 함께 보는 표현장"
      }
    ],
    "statusNote": "App Store 출시 · 개인 프로젝트"
  },
  {
    "id": "08",
    "title": "Soomcha",
    "subtitle": "Gamified Mobile Product",
    "description": "활동 기록으로 보상을 받고, 몸치 캐릭터를 모아 교감하는 운동 앱입니다.",
    "highlights": [
      "건강 데이터에서 보상·캐릭터로 이어지는 경험",
      "몸치 수집·교감과 마을 생활",
      "반복 동기화에도 보상이 중복되지 않는 정산"
    ],
    "tags": [
      "Swift",
      "SwiftUI",
      "SpriteKit",
      "HealthKit"
    ],
    "status": "개발 중",
    "imageLabel": "Soomcha · 개발 중인 마을",
    "image": "/images/projects/soomcha-village.png",
    "logo": "/images/logo-soomcha.png",
    "accent": "Fitness + Gamification",
    "statusNote": "비공개 개발 중",
    "detailIntro": "내가 움직인 결과를 캐릭터와 함께하는 경험으로 이어가고 싶었습니다. 건강 기록을 동기화해 Calo를 받고, 몸치를 수집하고 교감하며 마을에서 생활하는 모습을 보는 Soomcha를 개발하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / Gamified Mobile Product",
        "title": "운동 기록이 몸치와의 생활로 이어지도록",
        "image": "/images/projects/soomcha-village.png",
        "intent": "활동 기록을 동기화하면 Calo를 지급하고, 몸치를 수집하고 교감하는 데 사용할 수 있게 했습니다. 캐릭터의 모습과 성격, 친밀도가 생활 공간의 반응으로 드러나도록 개발하고 있습니다.",
        "execution": "마을에서는 보유한 몸치들이 움직이고 쉬는 모습을 볼 수 있습니다. 캐릭터별 동작을 앱에 연결하고, 화면에서 크기와 이동·휴식의 연결을 확인하며 조정하고 있습니다.",
        "imageCaption": "개발 버전 · 몸치들의 마을"
      },
      {
        "label": "02 / Gamified Mobile Product",
        "title": "반복해서 동기화해도 같은 활동에 한 번만 보상하기",
        "image": "",
        "intent": "건강 기록은 여러 번 동기화되거나 이전 날짜의 기록이 늦게 들어올 수 있습니다. 날짜별 활동량과 지급 내역을 기준으로 보상을 계산하고, 아직 반영하지 않은 활동을 찾아 정산합니다.",
        "execution": "저장에 실패하면 데이터베이스와 화면의 잔액을 함께 복원합니다. 활동 기록·지급 내역·화면의 값이 같은 상태를 가리키도록 처리했습니다."
      }
    ]
  },
  {
    "id": "09",
    "title": "Talkisland",
    "subtitle": "AI Conversation Learning",
    "description": "워킹홀리데이 상황에서 NPC와 영어 대화를 연습하는 팀 프로젝트입니다. 대화 시나리오·캐릭터 설정과 에셋 작업에 참여했습니다.",
    "highlights": [
      "NPC 대화 시나리오와 캐릭터 설정 담당",
      "회화 상황·맵 에셋 구성에 참여",
      "Microsoft AI School 최종 프로젝트 최우수상"
    ],
    "tags": [
      "Unity",
      "OpenAI",
      "Figma"
    ],
    "status": "팀 프로젝트",
    "imageLabel": "Talkisland · 팀 프로젝트 실행 화면",
    "image": "/images/detail/talkisland-gameplay.png",
    "logo": "/images/logo-talkisland.png",
    "accent": "AI Speaking",
    "statusNote": "Microsoft AI School 6기 · 최종 프로젝트 최우수상",
    "detailIntro": "워킹홀리데이를 배경으로, 사용자가 장면 속 NPC에게 필요한 말을 건네며 영어를 연습하는 프로젝트입니다. 저는 NPC 대화 시나리오와 캐릭터 설정, 회화 흐름을 담당하고 맵·캐릭터 에셋 작업에 참여했습니다.",
    "planningSections": [
      {
        "label": "01 / AI Conversation Learning",
        "title": "NPC의 역할에 맞는 대화 만들기",
        "image": "/images/detail/talkisland-gameplay.png",
        "intent": "각 NPC가 장면에서 맡은 역할과 캐릭터 설정을 대화 시나리오에 반영했습니다. 사용자가 무엇을 하려는 상황인지 정하고, 그 목적에 필요한 말을 꺼낼 수 있도록 대화의 순서를 설계했습니다.",
        "execution": "NPC의 설정과 대화 목적을 팀이 구현할 내용으로 정리했습니다. AI 응답이 장면과 회화 과제에 맞게 이어지도록 시나리오와 대화 조건을 다뤘습니다.",
        "imageCaption": "팀 프로젝트 · NPC 대화 화면"
      },
      {
        "label": "02 / AI Conversation Learning",
        "title": "대화가 일어날 장면과 에셋 구성하기",
        "image": "/images/detail/talkisland-editor.png",
        "intent": "회화 상황에 맞는 맵과 캐릭터 에셋 구성에 참여했습니다. 사용자가 이동하는 공간과 NPC의 역할이 대화 시나리오와 맞도록 작업했습니다.",
        "execution": "팀의 시연 흐름에 맞춰 장면과 대화 내용을 정리했습니다.",
        "imageCaption": "팀 프로젝트 · Unity 편집 화면"
      }
    ]
  }
];

const ABOUT_POINTS = [
  {
    title: "충남대학교",
    meta: "언어학과 / 언어정보처리",
  },
  {
    title: "수영강사",
    meta: "2019.07 ~ / 수영 강습 및 회원 관리",
  },
  {
    title: "Microsoft AI School 6기",
    meta: "2024.12 ~ 2025.06 / 최종 프로젝트 최우수상",
  },
];

const getSectionImages = (section: PlanningSection) =>
  section.images?.length ? section.images : section.image ? [section.image] : [];

const SLAB = { fontFamily: "'Roboto Slab', serif" };
const MONO = { fontFamily: "'JetBrains Mono', monospace" };
const BODY = { fontFamily: "'Inter', sans-serif" };

const TAG_BADGE_BASE = "rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors duration-300 group-hover:border-[#E60012]/20 group-hover:bg-[#FFF1F1] group-hover:text-[#B0000E]";
const TAG_BADGE_STYLES: Record<string, string> = {
  TypeScript: "border-[#2F74C0]/22 bg-[#EAF4FF] text-[#1D5D99]",
  "React Native": "border-[#0891B2]/22 bg-[#E7F8FC] text-[#08768F]",
  Expo: "border-[#111827]/14 bg-[#F4F4F5] text-[#3F3F46]",
  Swift: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  SwiftUI: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  SpriteKit: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  HealthKit: "border-[#E60012]/22 bg-[#FFF1F1] text-[#B0000E]",
  Supabase: "border-[#16A34A]/22 bg-[#EAF8EF] text-[#17713A]",
  Notifee: "border-[#F97316]/24 bg-[#FFF2E8] text-[#B94600]",
  Zustand: "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  MMKV: "border-[#111827]/14 bg-[#F4F4F5] text-[#52525B]",
  Unity: "border-[#111827]/14 bg-[#F4F4F5] text-[#3F3F46]",
  OpenAI: "border-[#16A34A]/22 bg-[#EAF8EF] text-[#17713A]",
  Figma: "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  Python: "border-[#EAB308]/28 bg-[#FFF8D8] text-[#8B6500]",
  "MLX-LM": "border-[#8B5CF6]/22 bg-[#F3EEFF] text-[#6D3CCB]",
  LLM: "border-[#E60012]/22 bg-[#FFF1F1] text-[#B0000E]",
};
const tagBadgeClass = (tag: string) =>
  `${TAG_BADGE_BASE} ${TAG_BADGE_STYLES[tag] ?? "border-[#111827]/14 bg-[#F4F4F5] text-[#52525B]"}`;

const STATUS_BADGE_BASE = "rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition-colors duration-300";
const STATUS_BADGE_SMALL_BASE = "rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(15,23,42,0.1)] transition-colors duration-300";
const STATUS_BADGE_STYLES: Record<string, string> = {
  "출시": "border-[#FF3B30]/75 bg-[#E60012]",
  "출시 · 후속 개발": "border-[#FF3B30]/75 bg-[#E60012]",
  Award: "border-[#FFD84D]/80 bg-[#D7A500] text-[#14100A]",
  "In Progress": "border-[#3B82F6]/70 bg-[#1E4FA3]",
};
const statusBadgeClass = (status: string, size: "large" | "small") =>
  `${size === "large" ? STATUS_BADGE_BASE : STATUS_BADGE_SMALL_BASE} ${
    STATUS_BADGE_STYLES[status] ?? "border-[#111827]/20 bg-[#52525B]"
  }`;

const getDevelopmentLogs = (project: Project): DevelopmentLog[] => project.developmentLogs ?? [{
  slug: "design-and-implementation",
  title: `${project.title} — 기획과 구현`,
  summary: project.planningSections?.map((section) => section.title).join(" · ") ?? "",
  intro: project.detailIntro ?? project.description,
  sections: project.planningSections ?? [],
}];

function DevelopmentLogPage({ project, log }: { project: Project; log: DevelopmentLog }) {
  return (
    <div style={BODY} className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <header className="border-b border-[#D2D2D7] bg-white">
        <nav aria-label="개발로그 탐색" className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="#work" style={MONO} className="text-[11px] tracking-[0.2em] hover:text-[#E60012]">HKS.DEV</a>
          <a href={`#/projects/${project.id}`} className="text-[13px] font-semibold hover:text-[#E60012]">← 프로젝트 상세</a>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16">
        <article>
          <div style={MONO} className="mb-4 text-[11px] tracking-[0.2em] text-[#E60012]">개발로그 / {project.title}</div>
          <h1 tabIndex={-1} className="break-keep text-[32px] font-black leading-[1.25] tracking-[-0.045em] outline-none sm:text-[46px]">{log.title}</h1>
          <p className="mt-6 max-w-3xl break-keep text-[16px] leading-[1.9] text-[#515154]">{log.intro}</p>
          <div className="mb-8 mt-8 border-b border-[#D2D2D7] pb-5 text-[13px] text-[#6E6E73]">{project.statusNote}</div>
                {log.sections.some((section) => getSectionImages(section).length > 0) && (
                  <p className="mb-4 text-[12px] text-[#6E6E73]">이미지를 누르면 원본을 볼 수 있습니다.</p>
                )}
                <div className="grid gap-4 grid-cols-1">
                  {log.sections.map((section) => (
                    <article
                      key={`${project.id}-${section.title}`}
                      className="overflow-hidden rounded-[22px] border border-[#D2D2D7] bg-[#FBFBFD] shadow-[0_14px_42px_rgba(15,23,42,0.07)]"
                    >
                      <div className="grid min-h-full">
                        {getSectionImages(section).length > 0 && (
                          <figure className="flex min-w-0 flex-col justify-center gap-3 border-b border-[#E5E5EA] bg-[#F5F5F7] p-4 sm:p-6">
                            <div className={getSectionImages(section).length > 1 ? "grid w-full grid-cols-2 items-center gap-3" : "flex items-center justify-center"}>
                              {getSectionImages(section).map((image, imageIndex) => (
                                <a
                                  key={`${project.id}-${section.label}-image-${imageIndex}`}
                                  href={image}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={`${project.title} ${section.title} 이미지 ${imageIndex + 1} 원본 보기`}
                                  className="flex min-w-0 justify-center rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012]"
                                >
                                  <img
                                    src={image}
                                    alt={section.imageCaption || `${project.title} ${section.title} 화면`}
                                    loading="lazy"
                                    className="max-h-[460px] max-w-full rounded-[10px] object-contain shadow-[0_8px_28px_rgba(15,23,42,0.12)]"
                                  />
                                </a>
                              ))}
                            </div>
                            <figcaption className="text-center text-[11px] leading-relaxed text-[#6E6E73]">
                              {section.imageCaption || `${project.title} 앱 화면`}
                            </figcaption>
                          </figure>
                        )}

                        <div className="p-5 sm:p-6">
                          <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#E60012]">
                            {section.label}
                          </div>
                          <h2 className="text-[18px] font-black tracking-[-0.03em] text-[#1D1D1F]">
                            {section.title}
                          </h2>
                          <div className="mt-4 space-y-4 break-keep text-[15px] leading-[1.85] text-[#515154]">
                            <p>{section.intent}</p>
                            <p>{section.execution}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
        </article>
        <a href={`#/projects/${project.id}`} className="mt-10 inline-flex border-b border-[#1D1D1F] pb-1 text-[14px] font-semibold hover:border-[#E60012] hover:text-[#E60012]">← {project.title} 상세로</a>
      </main>
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [hash, setHash] = useState(() => window.location.hash);
  const route = /^#\/projects\/([^/]+)(?:\/logs\/([a-z0-9-]+))?$/.exec(hash);
  const selectedProject = PROJECTS.find((project) => project.id === route?.[1]) ?? null;
  const selectedLog = selectedProject && route?.[2]
    ? getDevelopmentLogs(selectedProject).find((log) => log.slug === route[2])
      ?? (selectedProject.id === "02" && route[2] === "design-and-implementation" ? getDevelopmentLogs(selectedProject)[0] : undefined)
    : undefined;
  const activeLog = selectedLog && selectedProject ? selectedProject : null;
  const invalidRoute = hash.startsWith("#/") && (!selectedProject || Boolean(route?.[2] && !selectedLog));
  const setSelectedProject = (project: Project | null) => {
    window.location.hash = project ? `/projects/${project.id}` : "work";
  };

  useEffect(() => {
    const updateRoute = () => setHash(window.location.hash);
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    if (activeLog) {
      document.title = `${selectedLog?.title} | 황경상`;
      window.scrollTo(0, 0);
      document.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    }
    return () => { document.title = previousTitle; };
  }, [activeLog, hash]);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntroDone(true), 1050);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeLog, invalidRoute]);

  useEffect(() => {
    if (!selectedProject || activeLog) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    dialog?.querySelector<HTMLElement>('button')?.focus();
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Tab" && dialog) {
        const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, activeLog]);

  const openProjectDetail = (project: Project) => {
    if (project.planningSections?.length) {
      setSelectedProject(project);
    }
  };

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLElement>, project: Project) => {
    if (!project.planningSections?.length) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedProject(project);
    }
  };

  if (activeLog && selectedLog) return <DevelopmentLogPage project={activeLog} log={selectedLog} />;
  if (invalidRoute) return (
    <main style={BODY} className="grid min-h-screen place-content-center gap-5 bg-[#F5F5F7] px-6 text-center text-[#1D1D1F]">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요.</h1>
      <a href="#work" className="text-[#E60012] underline">프로젝트 목록으로</a>
    </main>
  );

  return (
    <div style={BODY} className="overflow-x-hidden bg-[#F5F5F7] text-[#1D1D1F]">
      {!introDone && (
        <div className="portfolio-loader">
          <div style={SLAB} className="portfolio-loader__mark">
            HKS
          </div>
          <div style={MONO} className="portfolio-loader__caption">
            Portfolio / Loading
          </div>
        </div>
      )}

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-[#D2D2D7] bg-white/86 backdrop-blur-xl">
        <div className="flex h-full items-center px-8 lg:px-16">
          <span style={MONO} className="text-[11px] tracking-[0.25em] text-[#1D1D1F] uppercase">
            HKS.DEV
          </span>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="bg-[#F5F5F7]">

        {/* Hero */}
        <div className="relative w-full overflow-hidden px-6 pt-24 pb-12 md:px-8 lg:px-16 lg:pt-28 lg:pb-16">
          <div className="hero-grid" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3 md:gap-8 lg:gap-12">
              <div className="min-w-0 w-[calc(100%-94px)] md:w-auto">
                <h1
                  style={SLAB}
                  className="hero-title max-w-full text-[clamp(42px,10.4vw,92px)] font-black leading-[0.94] text-[#1D1D1F] tracking-[-0.02em] uppercase"
                >
                  <span>HWANG</span>
                  <span>KYEONG</span>
                  <span>SANG</span>
                </h1>
              </div>

              <aside className="z-10 hidden w-[220px] shrink-0 md:block lg:w-[320px]">
                <div className="hero-portrait w-full min-h-[190px] rounded-[28px] border border-[#D2D2D7] bg-white shadow-[0_24px_90px_rgba(15,23,42,0.14)] md:min-h-[280px] lg:min-h-[420px]">
                  <img
                    src="/images/profile-hwang-kyeongsang.jpg"
                    alt="Hwang Kyeongsang profile"
                    className="h-full min-h-[190px] w-full object-cover object-top md:min-h-[280px] lg:min-h-[420px]"
                  />
                </div>
              </aside>
            </div>

            <div className="mt-10 max-w-xl">
              <p className="hero-copy max-w-[340px] text-[18px] font-semibold leading-[1.5] text-[#1D1D1F] sm:max-w-xl sm:text-[20px] lg:text-[24px] break-keep">
                App &amp; AI Developer
              </p>
              <p className="hero-copy mt-4 mb-7 max-w-[330px] text-[13px] leading-[1.75] text-[#6E6E73] sm:max-w-md sm:text-[14px] lg:text-[15px] break-keep">
                모바일 앱 · LLM 미세조정 및 평가 · 온디바이스 AI
              </p>
              <div style={MONO} className="hero-contact flex flex-col gap-2 border-l-2 border-[#E60012] pl-4 text-[12px] tracking-[0.08em] text-[#6E6E73]">
                <span className="font-sans text-[13px] font-semibold tracking-[0.02em] text-[#1D1D1F]">황경상</span>
                <a href="mailto:hks8680@gmail.com" className="w-fit hover:text-[#E60012] transition-colors duration-200">
                  hks8680@gmail.com
                </a>
                <span>010-3253-8680</span>
                <a href="https://github.com/hks-Khan" target="_blank" rel="noreferrer" className="w-fit hover:text-[#E60012]">GitHub ↗</a>
                <a href="#work" className="w-fit hover:text-[#E60012]">프로젝트 보기 ↓</a>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── PROJECTS ────────────────────────────────────────── */}
      <section id="work" className="reveal-on-scroll bg-[#F5F5F7] px-6 py-16 text-[#1D1D1F] lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 border-t border-[#D2D2D7] pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#E60012]">
                002 / Selected Work
              </div>
              <h2 className="text-[clamp(38px,6vw,76px)] font-black leading-[0.92] tracking-[-0.05em] text-[#1D1D1F]">
                Projects
              </h2>
            </div>
            <p className="max-w-sm break-keep text-[14px] leading-[1.75] text-[#6E6E73]">

            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.slice(0, 2).map((project) => {
              const hasDetail = Boolean(project.planningSections?.length);

              return (
              <article
                key={project.id}
                role={hasDetail ? "button" : undefined}
                tabIndex={hasDetail ? 0 : undefined}
                onClick={() => openProjectDetail(project)}
                onKeyDown={(event) => handleProjectKeyDown(event, project)}
                aria-label={hasDetail ? `${project.title} 상세 보기` : undefined}
                className={`project-app-card reveal-on-scroll group flex min-h-[470px] flex-col overflow-hidden rounded-[26px] border border-[#D2D2D7] bg-white p-7 shadow-[0_22px_70px_rgba(15,23,42,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E60012]/40 hover:shadow-[0_30px_90px_rgba(230,0,18,0.16),0_24px_80px_rgba(15,23,42,0.08)] ${
                  hasDetail
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60012]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F7]"
                    : ""
                }`}
              >
                <div className="mb-10 flex items-start justify-between gap-5">
                  {project.logo && (
                    <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-[18px] bg-[#F5F5F7] shadow-[0_14px_34px_rgba(15,23,42,0.12)] ring-1 ring-[#E5E5EA] transition-colors duration-300 group-hover:ring-[#E60012]/25">
                      <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span style={MONO} className={`ml-auto ${statusBadgeClass(project.status, "large")}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#E60012] transition-colors duration-300">
                        {project.id} / {project.accent}
                      </div>
                      <h3 className="text-[30px] font-black leading-none tracking-[-0.05em] text-[#1D1D1F] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[#86868B] transition-colors duration-300">
                    {project.subtitle}
                  </p>
                  <p className="break-keep text-[13px] leading-[1.7] text-[#515154] transition-colors duration-300">
                    {project.description}
                  </p>

                  <ul className="mt-5 grid gap-1.5">
                    {project.highlights.slice(0, 3).map((item, itemIndex) => (
                      <li key={`${project.id}-highlight-${itemIndex}`} className="flex gap-2.5 break-keep text-[12px] leading-[1.55] text-[#515154] transition-colors duration-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E60012] transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={`${project.id}-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.links && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#E60012] px-3 py-2 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-[#1D1D1F]"
                          >
                            {link.label}
                            <ArrowUpRight size={12} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {PROJECTS.slice(2).map((project) => {
              const hasDetail = Boolean(project.planningSections?.length);

              return (
              <article
                key={project.id}
                role={hasDetail ? "button" : undefined}
                tabIndex={hasDetail ? 0 : undefined}
                onClick={() => openProjectDetail(project)}
                onKeyDown={(event) => handleProjectKeyDown(event, project)}
                aria-label={hasDetail ? `${project.title} 상세 보기` : undefined}
                className={`project-app-card reveal-on-scroll group flex min-h-[360px] flex-col overflow-hidden rounded-[24px] border border-[#D2D2D7] bg-white p-6 shadow-[0_18px_58px_rgba(15,23,42,0.09)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E60012]/40 hover:shadow-[0_24px_76px_rgba(230,0,18,0.14),0_18px_58px_rgba(15,23,42,0.08)] ${
                  hasDetail
                    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E60012]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F7]"
                    : ""
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  {project.logo && (
                    <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[#F5F5F7] shadow-[0_10px_26px_rgba(15,23,42,0.1)] ring-1 ring-[#E5E5EA] transition-colors duration-300 group-hover:ring-[#E60012]/25">
                      <img src={project.logo} alt={`${project.title} logo`} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <span style={MONO} className={`ml-auto ${statusBadgeClass(project.status, "small")}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#E60012] transition-colors duration-300">
                    {project.id} / {project.accent}
                  </div>
                  <h3 className="text-[26px] font-black leading-none tracking-[-0.05em] text-[#1D1D1F] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p style={MONO} className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#86868B] transition-colors duration-300">
                    {project.subtitle}
                  </p>
                  <p className="mt-4 break-keep text-[12px] leading-[1.65] text-[#515154] transition-colors duration-300">
                    {project.description}
                  </p>

                  <ul className="mt-4 grid gap-1.5">
                    {project.highlights.slice(0, 2).map((item, itemIndex) => (
                      <li key={`${project.id}-compact-highlight-${itemIndex}`} className="flex gap-2.5 break-keep text-[11px] leading-[1.5] text-[#515154] transition-colors duration-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#E60012] transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={`${project.id}-compact-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-[#1D1D1F]/58 px-4 py-6 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            className="mx-auto w-full max-w-[1040px] rounded-[16px] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-3 rounded-t-[16px] border-b border-[#E5E5EA] bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-10 sm:py-7">
              <div className="flex min-w-0 items-center gap-3">
                {selectedProject.logo && (
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-white">
                    <img src={selectedProject.logo} alt={`${selectedProject.title} logo`} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#86868B]">
                    {selectedProject.accent}
                  </div>
                  <h2 id="project-detail-title" className="break-keep text-[21px] font-semibold leading-[1.3] tracking-[-0.035em] text-[#232326] sm:text-[30px]">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              <div className="flex shrink-0 flex-col-reverse items-end gap-3 sm:flex-row sm:items-center">
                <span style={MONO} className="rounded-full bg-[#F3F4F6] px-3 py-2 text-[10px] font-normal text-[#626268] sm:text-[12px]">
                  {selectedProject.status}
                </span>
                <button
                  type="button"
                  aria-label="상세 닫기"
                  onClick={() => setSelectedProject(null)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#D2D2D7] bg-[#F5F5F7] text-[#1D1D1F] transition-colors duration-200 hover:border-[#E60012]/30 hover:bg-[#FFF1F1] hover:text-[#E60012]"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="px-5 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-10">
              <div>
                <div style={MONO} className="mb-4 text-[13px] font-normal text-[#6E6E73]">
                  프로젝트 소개
                </div>
                <p className="max-w-[720px] whitespace-pre-line break-keep text-[16px] font-normal leading-[1.85] text-[#424245]">
                  {selectedProject.detailIntro}
                </p>

                <p className="mt-7 text-[13px] font-normal leading-[1.8] text-[#6E6E73]">{selectedProject.statusNote}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={`${selectedProject.id}-detail-tag-${tagIndex}`} className="rounded-full border border-[#E5E5EA] bg-[#F7F7F8] px-3 py-1 text-[12px] font-normal text-[#626268]">
                      {tag}
                    </span>
                  ))}
                </div>

                {selectedProject.links && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedProject.links.map((link) => (
                      <a
                        key={`${selectedProject.id}-detail-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 py-1 text-[14px] font-medium text-[#E60012] underline-offset-4 hover:underline"
                      >
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12">
                <div className="mb-8 flex items-end justify-between gap-4 border-t border-[#E5E5EA] pt-10">
                  <div>
                    <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-[#232326]">
                      기획과 구현
                    </h3>
                  </div>
                </div>

                <p className="mb-4 text-[12px] text-[#6E6E73]">이미지를 누르면 원본을 볼 수 있습니다.</p>
                <div className="grid grid-cols-1 divide-y divide-[#E5E5EA]">
                  {selectedProject.planningSections?.map((section) => (
                    <article
                      key={`${selectedProject.id}-${section.title}`}
                      className="py-10 first:pt-3"
                    >
                      <div className={getSectionImages(section).length ? "grid items-start gap-8 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] md:gap-10" : "max-w-[720px]"}>
                        <div>
                          <div style={MONO} className="mb-3 text-[12px] tracking-[0.12em] text-[#86868B]">
                            {section.label.split(" / ")[0]}
                          </div>
                          <h4 className="break-keep text-[19px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#232326]">
                            {section.title}
                          </h4>
                          <div className="mt-5 space-y-5 break-keep text-[16px] font-normal leading-[1.85] text-[#424245]">
                            <p>{section.intent}</p>
                            <p>{section.execution}</p>
                          </div>
                        </div>

                        {getSectionImages(section).length > 0 && (
                          <figure className="flex min-w-0 flex-col gap-4">
                            <div className={getSectionImages(section).length > 1 ? "grid w-full grid-cols-2 items-center gap-3" : "flex items-center justify-center"}>
                              {getSectionImages(section).map((image, imageIndex) => (
                                <a
                                  key={`${selectedProject.id}-${section.label.split(" / ")[0]}-image-${imageIndex}`}
                                  href={image}
                                  target="_blank"
                                  rel="noreferrer"
                                  aria-label={`${selectedProject.title} ${section.title} 이미지 ${imageIndex + 1} 원본 보기`}
                                  className="flex min-w-0 justify-center rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012]"
                                >
                                  <img
                                    src={image}
                                    alt={section.imageCaption || `${selectedProject.title} ${section.title} 화면`}
                                    loading="lazy"
                                    className="max-h-[460px] max-w-full rounded-[12px] object-contain"
                                  />
                                </a>
                              ))}
                            </div>
                            <figcaption className="text-center text-[11px] leading-relaxed text-[#6E6E73]">
                              {section.imageCaption || `${selectedProject.title} 앱 화면`}
                            </figcaption>
                          </figure>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <section aria-labelledby="development-logs-title" className="mt-6 border-t border-[#E5E5EA] pt-10">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <h3 id="development-logs-title" className="text-[23px] font-semibold tracking-[-0.03em]">개발로그</h3>
                  <span className="text-[12px] text-[#86868B]">{getDevelopmentLogs(selectedProject).length}편</span>
                </div>
                <div className="grid gap-3">
                {getDevelopmentLogs(selectedProject).map((log) => (
                <a
                  key={log.slug}
                  href={`#/projects/${selectedProject.id}/logs/${log.slug}`}
                  className="group flex items-start justify-between gap-5 border-b border-[#E5E5EA] py-5 transition-colors hover:text-[#E60012] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E60012]"
                >
                  <div className="min-w-0">
                    <h4 className="break-keep text-[17px] font-medium leading-[1.5]">{log.title}</h4>
                    <p className="mt-2 break-keep text-[13px] leading-[1.8] text-[#6E6E73]">{log.summary}</p>
                  </div>
                  <ArrowUpRight size={20} className="mt-1 shrink-0 text-[#E60012]" aria-hidden="true" />
                </a>
                ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      )}

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about" className="reveal-on-scroll bg-white px-6 py-14 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[#D2D2D7] pt-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#E60012]">
              003 / About
            </div>
            <h2 style={SLAB} className="text-[clamp(34px,5vw,64px)] font-black leading-[0.95] text-[#1D1D1F] uppercase">
              About
            </h2>
            <div className="mt-7 max-w-2xl space-y-4 break-keep text-[15px] leading-[1.85] text-[#515154]">
              <p>수영강사로 일하면서 사람마다 운동 목표와 필요한 안내가 다르다는 점을 경험했습니다. 혼자 수영할 때도 훈련 계획을 세우고 기록을 돌아볼 수 있도록 Aquach를 만들었고, 현재는 SoomchaSwim으로 발전시키고 있습니다.</p>
              <p>언어학과 언어정보처리를 공부하며 문맥이 의미와 판단에 미치는 영향에 관심을 가졌습니다. 졸업 연구에서는 한국어 대화의 부적절 발언 탐지를 다뤘고, Talkisland·Nootify·KiwiJju에서는 이야기와 대화를 통해 외국어를 접하는 경험을 만들었습니다.</p>
              <p>현재는 모바일 앱 개발과 함께 AI를 사용하는 프로젝트 관리 도구 Jitdeck을 개발하고 있습니다.</p>
            </div>
          </div>

          <aside className="rounded-[24px] border border-[#D2D2D7] bg-[#F5F5F7] p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] lg:p-6">
            <div className="divide-y divide-[#D2D2D7]">
              {ABOUT_POINTS.map((item) => (
                <div key={item.title} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-[17px] font-black leading-tight tracking-[-0.02em] text-[#1D1D1F]">
                    {item.title}
                  </h3>
                  <div style={MONO} className="mt-2 text-[10px] uppercase tracking-[0.16em] text-[#E60012]">
                    {item.meta}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-white border-t border-[#D2D2D7] px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-[#6E6E73] uppercase">
            © 2026 Hwang Kyeongsang
          </span>
          <span style={MONO} className="text-[10px] tracking-[0.25em] text-[#86868B] uppercase">
            Daejeon, South Korea
          </span>
        </div>
      </footer>

    </div>
  );
}
