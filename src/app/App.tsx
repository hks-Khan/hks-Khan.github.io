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
  intent: string;
  execution: string;
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
};

const PROJECTS: Project[] = [
  {
    "id": "01",
    "title": "Jitdeck",
    "subtitle": "AI Developer Tools",
    "status": "개발 중",
    "description": "여러 프로젝트의 다음 할 일과 AI 작업 상태를 한곳에서 확인하기 위해 만든 macOS 개발 도구입니다.",
    "tags": [
      "Swift",
      "SwiftUI",
      "SQLite",
      "MCP"
    ],
    "highlights": [
      "프로젝트·이슈·AI 실행 상태를 함께 관리",
      "승인·질문·검증 기록을 작업에 연결",
      "완료 이슈를 개발로그 초안으로 활용"
    ],
    "detailIntro": "여러 개인 프로젝트를 병행하면서 대화마다 흩어진 결정과 작업 결과를 다시 찾는 일이 반복됐습니다. 지금 어느 단계에 있고, 무엇을 먼저 해야 하는지 프로젝트별로 확인하고 싶었습니다. Jitdeck은 이 문제에서 시작한 macOS 앱으로, 직접 사용하면서 작업 관리와 AI 실행 기능을 개발하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / AI Developer Tools",
        "title": "프로젝트를 다시 파악하는 시간을 줄이기",
        "image": "",
        "intent": "프로젝트를 바꿀 때마다 대화 기록과 Git 상태, 남은 할 일을 따로 확인해야 했습니다. 한동안 손을 놓았던 프로젝트도 다시 시작할 지점을 찾기 쉬워야 한다고 생각했습니다.",
        "execution": "프로젝트 아래에 이슈와 진행 기록을 모으고, 우선순위·마감·현재 상태를 함께 볼 수 있도록 구성했습니다. 어떤 작업을 요청했는지와 그 결과가 어디에 남았는지를 같은 화면에서 따라갈 수 있게 했습니다."
      },
      {
        "label": "02 / AI Developer Tools",
        "title": "AI 응답이 끝난 뒤에도 남아 있던 작업",
        "image": "",
        "intent": "초기 구조에서는 AI의 응답이 끝난 뒤 하위 작업이 파일을 수정하거나 테스트하는 동안에도 완료로 보일 수 있었습니다. 이때 화면에 표시된 상태만으로 다음 작업을 결정하기 어려웠습니다.",
        "execution": "작업과 실행 시도, 프로세스, 이벤트, 검증 결과를 나눠 기록하는 구조로 정리했습니다. Codex 실행 중 발생하는 승인과 질문을 사용자에게 전달하고, 중단·재개·결과 회수도 실행 상태에 맞춰 처리하도록 연결했습니다."
      },
      {
        "label": "03 / AI Developer Tools",
        "title": "대화에서 요청하고 앱에서 확인하기",
        "image": "",
        "intent": "ChatGPT나 Codex에서 프로젝트를 살펴보고 일을 요청한 뒤, 앱에서도 같은 내용을 확인할 수 있도록 MCP 도구를 구성했습니다. 프로젝트와 이슈를 조회하고 갱신하는 경로가 실제로 사용되고 있습니다.",
        "execution": "로컬 파일에 대한 직접 접근은 프로젝트별로 요청·확인·만료·철회 상태를 관리합니다. 작업 실행과 권한 처리를 구분해 어떤 프로젝트에서 무엇이 허용됐는지 확인할 수 있게 했습니다."
      },
      {
        "label": "04 / AI Developer Tools",
        "title": "연결 문제를 찾을 수 있는 화면",
        "image": "",
        "intent": "직접 설치해 사용하면서 서버가 실행 중인지, 대화 연결이 살아 있는지, 어떤 승인이 유효한지 확인할 화면이 필요해졌습니다. 연결 상태와 실행 결과를 사용자가 읽을 수 있는 정보로 정리했습니다.",
        "execution": "서버 상태와 프로젝트 접근 상태를 대시보드에 표시하고, 재연결과 승인 관리 기능을 추가했습니다. 변경한 코드를 설치 앱에 반영한 뒤 실제 화면과 MCP 호출을 확인하며 개발하고 있습니다."
      },
      {
        "label": "05 / AI Developer Tools",
        "title": "개발한 내용을 다시 설명할 수 있도록",
        "image": "",
        "intent": "작업을 마친 뒤에는 그 내용을 포트폴리오나 개발로그로 다시 정리해야 했습니다. 이슈에 쌓인 설명과 작업 기록을 초안의 재료로 사용할 수 있도록 개발로그 기능을 만들었습니다.",
        "execution": "초안과 공개본을 따로 저장하고, 검토한 글만 HTML로 생성해 GitHub Pages에 게시합니다. 파일 경로와 실행 로그 등 내부 기술 기록은 공개 글과 분리합니다. 실제 사이트에 글을 게시하고 웹 반영을 확인했습니다."
      }
    ],
    "statusNote": "직접 사용하며 출시를 준비하고 있습니다. 오픈소스 공개 방식도 검토 중입니다.",
    "image": "",
    "imageLabel": "",
    "accent": "AI Developer Tools"
  },
  {
    "id": "02",
    "title": "Aquach / SoomchaSwim",
    "subtitle": "AI Swim Training App",
    "description": "수영강사로 일하며 경험한 훈련 계획과 피드백의 어려움을 수영 앱으로 풀고 있습니다.",
    "highlights": [
      "수영강사 경험을 바탕으로 Aquach 출시",
      "수준·일정에 맞춘 다회차 프로그램 개발",
      "운동 계획·Watch·기록·복구 흐름 구현"
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
    "imageLabel": "Workout plan",
    "image": "/images/hero-aquach-card.png",
    "logo": "/images/logo-aquach.png",
    "accent": "AI + Fitness",
    "links": [
      {
        "label": "Aquach · App Store",
        "href": "https://apps.apple.com/kr/app/id6745004612"
      }
    ],
    "featured": true,
    "detailIntro": "수영강사로 일하며 같은 운동도 수준과 목표에 따라 필요한 안내가 달라진다는 점을 경험했습니다. 혼자 운동할 때도 오늘 무엇을 하고, 수행한 기록을 다음 훈련에 어떻게 반영할지 알 수 있는 앱을 만들고 싶었습니다. Aquach를 출시한 뒤, 계획과 실행·기록을 더 긴 훈련 과정으로 이어가는 SoomchaSwim을 개발하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / AI Swim Training App",
        "title": "수영장에서 필요한 정보부터 정하기",
        "image": "",
        "intent": "초급자에게는 운동을 시작할 수 있는 안내가 필요하고, 숙련자에게는 자세와 기록에 기반한 구체적인 피드백이 중요했습니다. 수영장에서는 운동 중에 휴대폰을 오래 조작하기도 어렵습니다.",
        "execution": "Aquach에서 수준·목표·선호 영법·최근 기록을 기준으로 운동 계획을 구성하고, 오늘의 계획과 수행 기록을 확인하는 흐름을 만들었습니다. React Native·TypeScript로 앱을 구현하고 Supabase와 iOS 기능을 연결했습니다."
      },
      {
        "label": "02 / AI Swim Training App",
        "title": "오늘의 운동에서 여러 주의 훈련으로",
        "image": "",
        "intent": "SoomchaSwim에서는 한 번의 운동 이후에도 훈련을 이어갈 수 있도록 다회차 프로그램을 개발하고 있습니다. 사용자는 수준과 템플릿을 정한 뒤 장비, 주당 횟수와 선호 요일을 입력합니다.",
        "execution": "생성한 개인 프로그램에서 예정된 세션을 열어 운동하고, 기록을 남겨 진행 상황을 확인합니다. 주당 일정과 세션 난이도를 함께 다루고, 운동을 수행한 결과가 프로그램 안에 남도록 구성했습니다."
      },
      {
        "label": "03 / AI Swim Training App",
        "title": "운동 구성과 AI 안내의 역할 나누기",
        "image": "",
        "intent": "운동 프로그램은 사용자가 시작한 뒤에도 구성이 일관돼야 합니다. 현재 Program V1은 검토된 템플릿을 기준으로 개인 프로그램을 만들고, 생성한 세션을 스냅샷으로 보존합니다.",
        "execution": "템플릿을 수정해도 이미 시작한 프로그램의 구성은 유지됩니다. AI는 제목·개인화 요약·코치 안내 문구를 작성하고, 호출에 실패하면 기본 문구를 제공합니다. 운동 구성과 안내 문구가 각각 어떤 기준으로 만들어지는지 구분했습니다."
      },
      {
        "label": "04 / AI Swim Training App",
        "title": "저장은 됐는데 응답을 받지 못한 경우",
        "image": "",
        "intent": "프로그램을 생성하는 도중 네트워크가 끊기면 서버에는 결과가 저장됐어도 앱에서는 실패로 보일 수 있습니다. 사용자가 다시 생성 버튼을 눌렀을 때 기존 결과를 찾을 수 있어야 했습니다.",
        "execution": "프로그램과 세션을 서버에서 함께 저장하고, 요청 ID를 기준으로 생성 결과를 조회하는 복구 경로를 구현했습니다. 앱은 통신이 복구된 뒤 기존 결과를 확인해 생성·저장·표시 상태를 맞춥니다."
      },
      {
        "label": "05 / AI Swim Training App",
        "title": "Aquach의 기록과 Watch 연동",
        "image": "/images/detail/aquach-calendar.png",
        "intent": "Aquach에서는 iPhone에서 만든 운동 계획을 Apple Watch로 보내고, 운동이 끝나면 수행 기록을 다시 확인하도록 구성했습니다. 기기 연결이 일시적으로 끊기는 상황도 기록 과정에 포함해 다뤘습니다.",
        "execution": "운동 계획과 완료 메시지를 큐에 보관하고, HealthKit 운동 UUID로 기기의 건강 데이터를 조회합니다. 아래 이미지는 Aquach의 기록 화면입니다. SoomchaSwim의 최신 구현과 공개 배포 상태는 별도로 관리하고 있습니다.",
        "images": [
          "/images/detail/aquach-calendar.png",
          "/images/detail/aquach-record-summary.png"
        ]
      }
    ],
    "statusNote": "Aquach는 App Store에 출시했습니다. SoomchaSwim은 후속 개발 버전이며, 아래에서 두 버전의 내용을 구분했습니다."
  },
  {
    "id": "03",
    "title": "대화 맥락 기반 발언 탐지",
    "subtitle": "Korean LLM Research",
    "status": "졸업 연구",
    "description": "한국어 대화에서 문제 제기·인용·비판·직접 공격을 구분하는 기준과 학습 방법을 연구했습니다.",
    "tags": [
      "Python",
      "MLX-LM",
      "LoRA",
      "LLM"
    ],
    "highlights": [
      "한국어 대화의 대상 발화 분류",
      "프롬프트·LoRA·데이터 보강 실험",
      "오류 유형 분석과 연구 문서 작성"
    ],
    "detailIntro": "같은 표현도 앞선 대화와 상대를 향한 의도에 따라 다르게 해석됩니다. 온라인 대화에서 공격적인 표현을 인용하며 문제를 제기하는 발언, 상대를 조롱하는 발언, 일반적인 비판을 문맥 안에서 구분하는 방법을 졸업 연구로 다뤘습니다.",
    "planningSections": [
      {
        "label": "01 / Korean LLM Research",
        "title": "표현이 대화에서 맡는 역할 살펴보기",
        "image": "",
        "intent": "판정할 발화에 거친 단어가 포함돼 있어도, 실제로 누구에게 어떤 말을 하고 있는지 확인해야 했습니다. 대화의 흐름과 대상 발화를 함께 입력해 적절·부적절을 분류하는 문제로 실험을 구성했습니다.",
        "execution": "언어학과 언어정보처리에서 다룬 맥락과 의미의 문제를 모델의 예측 결과와 대조했습니다. 모델이 반복해서 혼동하는 경계를 찾고, 그 경계가 데이터와 입력에 어떻게 표현됐는지 살펴봤습니다."
      },
      {
        "label": "02 / Korean LLM Research",
        "title": "실험 조건을 다시 확인할 수 있는 구성",
        "image": "",
        "intent": "AI말평 데이터를 학습·평가 입력으로 변환하고, 한국어 LLM의 기본 응답과 프롬프트 변경, LoRA 미세조정을 비교했습니다. EXAONE·Qwen·Gemma 계열을 사용해 실험을 진행했습니다.",
        "execution": "모델과 어댑터, 데이터 경로, 입력 형식과 생성 설정을 실행별로 기록했습니다. 최종 응답은 자동으로 검사할 수 있는 라벨 형식으로 정리하고, 예측 원문을 보존해 어떤 문맥에서 판단이 달라졌는지 추적했습니다."
      },
      {
        "label": "03 / Korean LLM Research",
        "title": "오답을 유형으로 나눠 다음 실험 정하기",
        "image": "",
        "intent": "다른 사람의 말을 인용하거나 문제를 제기한 발화가 부적절로 잘못 분류되는 사례를 확인했습니다. 오탐과 미탐을 모아 문제 제기, 직접 공격, 일반 비판, 인격 비하, 인용 등으로 나눴습니다.",
        "execution": "반복되는 오류를 기준으로 학습 자료를 보강하고 입력 구성을 바꿨습니다. 문장의 표면 표현, 맥락상 역할, 상대에게 미치는 효과를 구분해 제공하는 방식도 실험했습니다."
      },
      {
        "label": "04 / Korean LLM Research",
        "title": "외부 데이터의 판정 기준 맞추기",
        "image": "",
        "intent": "외부 윤리검증 데이터에는 유형과 강도에 따른 라벨이 있었고, 연구 과제에서 사용하는 적절·부적절 기준과 대응 관계를 확인해야 했습니다.",
        "execution": "유형과 강도를 살펴 목적에 맞는 사례를 선별했습니다. 일반 비판과 인격 공격이 섞여 기준이 불명확한 유형은 제외하고, 선별 규칙과 사용한 자료를 기록해 후속 실험에서 같은 기준을 확인할 수 있게 했습니다."
      },
      {
        "label": "05 / Korean LLM Research",
        "title": "판단의 근거를 연구 결과로 남기기",
        "image": "",
        "intent": "오류 분석을 통해 데이터 선별과 입력 구성을 바꾸는 과정을 졸업 연구로 정리했습니다. 실험 결과를 해석할 때는 개발 중 반복해서 살펴본 평가 자료라는 조건도 함께 기록했습니다.",
        "execution": "학습 설정, 개별 예측, 평가 결과와 연구 문서를 보존했습니다. 이 과정을 통해 모델이 실패한 문맥을 읽고, 다음에 바꿀 데이터와 실험 조건을 결정하는 경험을 쌓았습니다."
      }
    ],
    "statusNote": "학습 실험과 오류 분석을 수행하고 졸업 연구 문서로 정리했습니다.",
    "image": "",
    "imageLabel": "",
    "accent": "Korean LLM Research"
  },
  {
    "id": "04",
    "title": "KiwiJju",
    "subtitle": "Local Voice AI",
    "status": "베타 테스트",
    "description": "짧은 영어 자유 대화를 이어가고, 실제로 말한 문장으로 복습하는 iPhone 음성 학습 앱입니다.",
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
      "대화 후 표현 교정과 음성 복습",
      "Mac 로컬 추론과 iPhone 페어링"
    ],
    "detailIntro": "영어로 자신의 이야기를 이어갈 수 있는 대화 상대를 만들고 있습니다. A2 수준의 학습자가 짧게 말하고 응답할 수 있도록 한 번에 한 질문을 주고받게 구성했습니다. iPhone에서 대화하고, Mac의 로컬 AI가 음성을 처리하며, 대화가 끝난 뒤 사용한 표현을 복습하는 앱입니다.",
    "planningSections": [
      {
        "label": "01 / Local Voice AI",
        "title": "짧게 말하고 다음 말을 이어가기",
        "image": "",
        "intent": "대화 모델에는 A2 수준의 짧은 응답과 한 번에 한 질문을 요청합니다. 학습자의 관심사와 일상 주제를 반영하고, 최근에 다룬 주제가 반복되지 않도록 대화 시작 정보를 구성합니다.",
        "execution": "새 대화를 시작할 때는 최근 주제와 복습할 단어를 읽어 구체적인 상황과 질문을 만듭니다. 사용자가 말한 내용에 다음 질문이 이어지도록 자유 대화 흐름을 정리했습니다."
      },
      {
        "label": "02 / Local Voice AI",
        "title": "대화 후에 내가 쓴 표현 돌아보기",
        "image": "",
        "intent": "말하는 동안에는 뜻을 전하고 답을 이어가는 데 집중하도록 구성했습니다. 사용자가 도움을 요청하거나 이해에 문제가 생기는 상황에는 필요한 설명을 제공합니다.",
        "execution": "대화가 끝나면 실제로 사용한 문장에서 수정할 부분과 자연스러운 표현을 정리하고, 단어·문장을 다시 연습할 수 있게 했습니다. 최근에는 고정 커리큘럼을 정리하고 자유 대화와 표현장 음성 복습에 집중하도록 방향을 조정했습니다."
      },
      {
        "label": "03 / Local Voice AI",
        "title": "iPhone과 Mac 사이의 음성 처리",
        "image": "",
        "intent": "iPhone에서 받은 음성은 Mac의 ASR로 인식하고, Ollama 기반 로컬 대화 모델을 거쳐 TTS 응답으로 돌려줍니다. 모델을 바꿔 실험할 수 있도록 음성 인식·대화·음성 합성의 역할을 나눴습니다.",
        "execution": "인증된 WebSocket으로 세션을 연결하고 대화 내용과 응답 상태를 저장합니다. 모델이 생성한 텍스트를 사용자가 듣는 음성으로 전달하는 과정과, 중간에 연결이 끊겼을 때의 상태를 함께 다루고 있습니다."
      },
      {
        "label": "04 / Local Voice AI",
        "title": "연결 과정에서 입력할 정보 줄이기",
        "image": "",
        "intent": "Mac의 서버 주소와 포트, 긴 인증 정보를 매번 입력하면 학습을 시작하기 번거롭습니다. 앱에서는 페어링 코드로 기기를 연결하고 이후 접속 정보를 다시 사용할 수 있도록 구성했습니다.",
        "execution": "서버와 프로필을 검증한 뒤 Keychain에 연결 정보를 저장하고, 고정 HTTPS 주소로 접속합니다. 프로필별 기기 권한을 관리해 한 기기를 해제해도 다른 사용자의 연결과 기록은 유지되도록 했습니다."
      },
      {
        "label": "05 / Local Voice AI",
        "title": "같은 요청이 다시 도착했을 때",
        "image": "",
        "intent": "음성 대화 중 재연결이나 재시도가 발생하면 같은 발화가 다시 전송될 수 있습니다. 같은 말이 두 번 저장되거나 응답이 중복 생성되는 상황을 구분할 필요가 있었습니다.",
        "execution": "turn ID로 요청을 식별하고, 같은 요청은 저장된 응답을 돌려줍니다. 같은 ID에 다른 내용이 담겨 오면 거부하고, 중복 세션도 제어합니다. 대화의 진행 순서와 저장된 기록이 맞도록 처리했습니다."
      }
    ],
    "statusNote": "TestFlight 배포와 본인 기기 설치를 마쳤습니다. 실제 iPhone의 음성 대화와 외부 이동통신 환경을 확인할 단계입니다.",
    "image": "",
    "imageLabel": "",
    "accent": "Local Voice AI"
  },
  {
    "id": "05",
    "title": "주주로그",
    "subtitle": "Travel Journal",
    "status": "출시",
    "description": "반려견과 함께한 산책과 여행을 경로·사진·여행카드로 남기는 모바일 앱입니다.",
    "tags": [
      "React Native",
      "TypeScript",
      "SQLite",
      "Expo"
    ],
    "highlights": [
      "관광지 탐색에서 여행 기록·공유까지",
      "진행 중 여행 복구와 종료 시각 보정",
      "App Store 1.0.1 공개"
    ],
    "detailIntro": "반려견과 함께 걷고 다녀온 하루를 다시 꺼내볼 수 있는 기록으로 남기고 싶었습니다. 장소를 찾고 여행을 시작한 뒤, 이동 경로와 사진을 모아 여행카드로 정리하는 앱을 기획·개발했습니다. 일상적인 산책과 여행을 같은 기록 흐름 안에서 다루고 있습니다.",
    "planningSections": [
      {
        "label": "01 / Travel Journal",
        "title": "동행한 하루가 기록에 남도록",
        "image": "",
        "intent": "주주로그에서는 반려견과 함께한 시간을 기록의 중심에 뒀습니다. 시작·진행·완료 화면에 반려견 이름을 사용하고, 경로와 사진을 한 여행 안에서 다시 볼 수 있도록 구성했습니다.",
        "execution": "사용자는 관광 장소를 탐색해 여행을 시작하고, 이동 중 사진을 추가한 뒤 여행을 마쳐 저장합니다. 저장된 여행은 지도와 사진으로 다시 보거나, 배경과 문구를 편집한 여행카드로 공유할 수 있습니다."
      },
      {
        "label": "02 / Travel Journal",
        "title": "종료 버튼을 늦게 눌렀을 때",
        "image": "",
        "intent": "여행이 끝난 뒤 앱을 늦게 열어 종료하는 경우에는 집으로 돌아온 이후의 이동이 함께 기록될 수 있습니다. 사용자가 실제로 남기려던 여행 구간을 정할 수 있게 했습니다.",
        "execution": "저장 전에 종료 시각을 앞당기면 그 이후의 위치·사진·걸음 표본을 결과에서 제외합니다. 사진이 없는 여행도 저장할 수 있고, 한 기기에서 진행 중인 여행을 하나로 관리해 재실행 시 이어서 복구합니다."
      },
      {
        "label": "03 / Travel Journal",
        "title": "관광정보를 탐색과 기록에 활용하기",
        "image": "",
        "intent": "여행을 기록하기 전에 갈 장소를 찾고, 장소의 소개와 이용 정보를 확인할 수 있도록 일반 관광정보 API를 연동했습니다. 키워드·지역·카테고리 조건으로 검색하고 상세 화면으로 이어집니다.",
        "execution": "외부 응답을 앱에서 사용하는 장소 형태로 정리해 로컬에 저장하고, 기존에 저장한 정보가 유지되도록 처리했습니다. 관광지 상세 이미지는 여행 사진과 함께 여행카드의 배경 자료로 활용할 수 있게 했습니다."
      },
      {
        "label": "04 / Travel Journal",
        "title": "휴대폰 안에 남는 여행 데이터",
        "image": "",
        "intent": "여행 정보는 SQLite에, 사진은 앱 내부 저장공간에 보관하는 구조로 개발했습니다. 기록을 수정하거나 앱을 다시 열 때 경로·사진·시간 정보가 함께 유지돼야 했습니다.",
        "execution": "건강 데이터는 보관 조건에 맞춰 별도 저장소로 분리했습니다. 이전 과정에서 트랜잭션과 값 일치 검사를 수행하고, 검증이 실패하면 원본을 보존하도록 처리해 기존 기록을 지키는 데 집중했습니다."
      },
      {
        "label": "05 / Travel Journal",
        "title": "측정한 값과 추정한 값 구분하기",
        "image": "",
        "intent": "GPS의 부정확한 지점이나 수집 공백은 경로와 거리 계산에 영향을 줍니다. 기록 화면에서 보이는 값을 해석할 수 있도록 측정과 보정의 조건을 다뤘습니다.",
        "execution": "보호자의 걸음 수로 계산한 반려견 활동량은 추정 지표로 구분합니다. 여행 기록에서 실제로 수집한 데이터와 이를 가공해 만든 표시값을 구분해 다루고 있습니다."
      }
    ],
    "statusNote": "App Store에 출시했습니다. 현재 공개 버전은 1.0.1이며, 장소 탐색·상세 수정과 OTA 구성을 포함한 iOS 배포를 진행했습니다.",
    "image": "",
    "imageLabel": "",
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
    "title": "GamzaSaga",
    "subtitle": "AI Game Systems",
    "status": "개발 중",
    "description": "주민들이 마을을 짓고 항해하며, 함께 겪은 사건이 기억과 관계에 남는 공동체 게임을 만들고 있습니다.",
    "tags": [
      "Godot",
      "GDScript",
      "Swift",
      "Gemma",
      "llama.cpp"
    ],
    "highlights": [
      "정착·생활·항해가 이어지는 세계",
      "주민의 사건 기록과 관계 변화",
      "LLM 행동 선택과 게임 실행 검증"
    ],
    "detailIntro": "주민들이 생활하고, 함께 배를 타고 떠나고, 위기를 겪은 뒤 다시 마을을 이어가는 게임을 만들고 있습니다. 플레이어가 내린 결정과 주민들이 겪은 사건이 다음 생활과 관계에 남는 경험을 목표로 합니다. 현재 정착·항해 시스템과 주민의 AI 행동 연결을 개발하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / AI Game Systems",
        "title": "마을의 생활과 항해가 이어지는 세계",
        "image": "",
        "intent": "주민이 먹고 쉬고 일하는 생활 위에 건설·연구·제작과 선박 준비, 원정을 쌓는 구조입니다. 본진에 남은 주민과 원정대가 같은 시간 속에서 움직이도록 설계했습니다.",
        "execution": "현재 정착, 선박과 항해, 상륙·교역·귀환 경로를 구현하고 있습니다. 주민과 물자, 작업·항해 상태를 저장해 중간에 멈춘 세계를 이어갈 수 있도록 구성했습니다."
      },
      {
        "label": "02 / AI Game Systems",
        "title": "함께 겪은 일이 관계에 남도록",
        "image": "",
        "intent": "주민이 먼저 말을 걸고, 함께 겪은 사건이 다음 대화와 함께 지낼 상대를 고르는 데 영향을 주는 생활을 목표로 합니다. 구조나 치료 같은 사건에는 실제로 참여한 당사자가 남아야 합니다.",
        "execution": "사건과 당사자를 기록하고, 회복·거리·시야 등 조건을 확인한 뒤 관계와 후속 기억에 반영하는 기반을 구현했습니다. 장기간 이어지는 기억과 대화의 품질은 계속 다듬고 있습니다."
      },
      {
        "label": "03 / AI Game Systems",
        "title": "모델이 고른 행동을 게임의 작업으로",
        "image": "",
        "intent": "최근에는 주민의 성격·기억·목표를 입력해 행동을 선택하게 하고, 선택 결과를 실제 이동과 건설 작업에 연결했습니다. 게임이 현재 상태에서 실행할 수 있는 선택인지 확인하는 단계가 필요했습니다.",
        "execution": "응답 형식, 허용 행동과 근거, 요청 유효기간, 주민과 대상의 상태를 검사합니다. 한 번 적용한 요청은 소비하고, 늦거나 중복된 응답은 거부합니다. iOS Simulator에서 실제 추론을 작업 완료와 저장 복원까지 연결해 확인했습니다."
      },
      {
        "label": "04 / AI Game Systems",
        "title": "작업이 끝난 뒤에도 남는 판단 문제",
        "image": "",
        "intent": "식량 확보를 목표로 제시했을 때 주민이 벽 건설을 선택하고, 그 일이 식량 확보에 도움이 된다고 설명한 사례가 있었습니다. 공사는 완료됐으나 설명한 인과관계가 제공된 세계의 사실과 맞지 않았습니다.",
        "execution": "이 사례를 기록하고 출력 형식, 행동의 실행 가능성, 목표에 맞는 판단을 나눠 확인하고 있습니다. 현재의 검수는 제한된 상황을 대상으로 하며, 주민 수가 늘고 생활이 길어졌을 때의 판단도 후속 검증에 포함합니다."
      }
    ],
    "statusNote": "개발 중입니다. 최근 AI 행동 연결은 iOS Simulator의 별도 검수 앱에서 확인했으며, 실기기와 장기 플레이 검증을 이어갈 예정입니다.",
    "image": "",
    "imageLabel": "",
    "accent": "AI Game Systems"
  },
  {
    "id": "07",
    "title": "Nootify",
    "subtitle": "Push-based Language Learning",
    "description": "이야기의 다음 장면을 알림으로 받고, 선택지에 답하며 외국어 문장을 읽는 학습 앱입니다.",
    "highlights": [
      "알림을 받는 순간 시작하는 짧은 학습",
      "선택에 따라 달라지는 이야기와 엔딩",
      "진행 기록·단어장·알림 예약 복구"
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
    "imageLabel": "Push stories",
    "image": "/images/hero-nootify-card.png",
    "logo": "/images/logo-nootify.png",
    "accent": "Language, Story",
    "links": [
      {
        "label": "App Store",
        "href": "https://apps.apple.com/kr/app/id6757182440"
      }
    ],
    "detailIntro": "학습을 시작하기 위해 따로 시간을 내고 앱을 여는 부담을 줄이고 싶었습니다. Nootify는 짧은 이야기와 선택지를 알림으로 보내고, 사용자가 고른 답에 따라 다음 장면이 달라지는 앱입니다. 이야기의 결과를 궁금해하며 문장을 읽고, 익숙하지 않은 표현은 맥락과 함께 다시 살펴보도록 기획했습니다.",
    "planningSections": [
      {
        "label": "01 / Push-based Language Learning",
        "title": "알림이 학습의 첫 화면이 되도록",
        "image": "/images/detail/nootify-notification-entry.png",
        "intent": "알림 안에 상황 문장과 선택지를 넣고, 사용자의 선택이 다음 장면으로 이어지도록 구성했습니다. 한 번의 학습을 짧게 끝내고 다음 이야기를 기다릴 수 있는 흐름을 목표로 했습니다.",
        "execution": "즉시 진행, 간격을 둔 진행, 정해진 시간의 알림 예약을 지원합니다. 앱 안에서는 지나간 이야기와 선택 기록, 저장한 표현을 다시 확인할 수 있습니다."
      },
      {
        "label": "02 / Push-based Language Learning",
        "title": "이야기를 읽어야 선택할 수 있는 구조",
        "image": "/images/detail/nootify-story-choice.png",
        "intent": "이야기마다 체력·신뢰도 같은 스탯과 분기, 실패·엔딩 조건을 정의했습니다. 사용자의 선택이 어떤 결과를 만드는지 문장 안에서 파악하도록 콘텐츠를 구성했습니다.",
        "execution": "스토리 JSON에 장면·선택지·효과·조건을 저장하고, 공통 엔진이 분기와 스탯 변화를 계산합니다. 난이도별 문장을 같은 구조로 다루고, 새로운 이야기의 규칙을 데이터로 추가할 수 있게 했습니다."
      },
      {
        "label": "03 / Push-based Language Learning",
        "title": "낯선 표현을 문맥과 함께 기억하기",
        "image": "/images/detail/nootify-vocabulary.png",
        "intent": "모르는 단어를 저장할 때는 그 표현이 나온 장면과 함께 다시 볼 수 있도록 했습니다. 사용자가 의미를 추론하고 확인하는 과정이 이야기 읽기 안에 남도록 단어장과 유의어 기능을 구성했습니다.",
        "execution": "영어 표현은 Datamuse로 유의어를 조회하고 주변 문맥을 요청에 포함합니다. 조회 시간이 길어지거나 네트워크 오류가 나면 빈 결과로 마무리해 이야기 진행을 계속할 수 있게 했습니다."
      },
      {
        "label": "04 / Push-based Language Learning",
        "title": "앱이 꺼져 있어도 이어지는 진행 상태",
        "image": "/images/detail/nootify-history-timeline.png",
        "intent": "알림 버튼에서 고른 선택도 진행 위치와 스탯, 다음 알림에 반영돼야 합니다. 알림 이벤트를 처리할 때 저장된 상태와 이야기 데이터를 불러와 선택 결과를 계산합니다.",
        "execution": "진행 위치·선택·엔딩·단어장을 Zustand와 MMKV에 저장합니다. 앱 재시작 시 진행 중인 이야기의 예약 알림이 없으면 현재 위치를 기준으로 다시 예약하도록 복구 경로를 구현했습니다."
      }
    ],
    "statusNote": "App Store에 출시한 개인 프로젝트입니다. 상세의 엔진·복구 설명은 현재 개발 소스를 기준으로 정리했습니다."
  },
  {
    "id": "08",
    "title": "Soomcha",
    "subtitle": "Gamified Mobile Product",
    "description": "내가 움직인 만큼 몸치 캐릭터가 성장하고, 함께 생활하는 모습을 볼 수 있는 운동 앱입니다.",
    "highlights": [
      "건강 데이터와 캐릭터 성장의 연결",
      "날짜별 정산·중복 지급 방지·저장 복원",
      "수집·교감·마을에서 운동 육성으로 확장"
    ],
    "tags": [
      "Swift",
      "SwiftUI",
      "SpriteKit",
      "HealthKit"
    ],
    "status": "개발 중",
    "imageLabel": "Fitness loop",
    "image": "/images/hero-soomcha-card.png",
    "logo": "/images/logo-soomcha.png",
    "accent": "Fitness + Gamification",
    "statusNote": "비공개로 개발 중입니다. 장소 선택·종목별 성장·밤 정산은 다음 개발 범위로 구분했습니다.",
    "detailIntro": "사용자가 움직인 결과를 캐릭터의 변화로 확인할 수 있는 앱을 만들고 있습니다. 몸치라는 캐릭터를 만나 교감하고, 마을에서 생활하는 모습을 보며 다음 운동을 이어가는 경험을 목표로 합니다. 현재 건강 데이터 정산과 수집·교감·마을 기능을 구현했고, 하루 운동 육성 기획으로 확장하고 있습니다.",
    "planningSections": [
      {
        "label": "01 / Gamified Mobile Product",
        "title": "운동한 결과가 캐릭터에 쌓이도록",
        "image": "",
        "intent": "운동 기록을 동기화하면 Calo를 받고, 몸치를 수집하고 교감하는 흐름을 구현했습니다. 캐릭터별 모습과 성격, 친밀도가 생활 공간의 반응으로 드러나도록 구성하고 있습니다.",
        "execution": "현재 앱에서는 보유한 몸치가 마을에서 움직이는 모습을 확인할 수 있습니다. 캐릭터의 동작과 화면 반영을 시뮬레이터에서 비교하며, 활동 기록과 성장 경험을 함께 다듬고 있습니다."
      },
      {
        "label": "02 / Gamified Mobile Product",
        "title": "같은 건강 기록을 여러 번 받아도 맞는 보상",
        "image": "",
        "intent": "건강 데이터는 반복 동기화되거나 늦게 들어올 수 있습니다. 같은 운동량에 보상이 중복 지급되거나 이전 날짜의 활동이 빠지는 상황을 처리해야 했습니다.",
        "execution": "날짜별 검증 에너지와 지급 원장을 기준으로 정산하고, 과거 미정산분을 복구합니다. 잘못된 값과 중복 반영을 검사해 건강 기록과 잔액이 같은 기준으로 계산되게 했습니다."
      },
      {
        "label": "03 / Gamified Mobile Product",
        "title": "저장 실패가 화면에 남지 않도록",
        "image": "",
        "intent": "정산 결과를 화면에 표시한 뒤 저장에 실패하면 실제 잔액과 화면이 달라질 수 있습니다. 건강 데이터에서 보상과 화면까지 이어지는 전체 흐름을 확인했습니다.",
        "execution": "저장 실패 시 데이터베이스와 화면이 관찰하는 모델 값을 함께 복원하도록 처리했습니다. 실제 데이터가 반영된 상태와 화면의 상태를 맞추는 작업에 집중했습니다."
      },
      {
        "label": "04 / Gamified Mobile Product",
        "title": "다음 단계: 몸치의 하루 운동",
        "image": "",
        "intent": "새 기획에서는 사용자가 함께 갈 장소를 정하고, 몸치들이 하루 운동을 마친 뒤 성장 결과를 확인하는 흐름을 준비했습니다. 근력·지구력·순발력·유연성과 종목별 경험치가 성장의 기준입니다.",
        "execution": "장소 선택, 종목별 성장, 밤 정산은 기획을 정리한 단계입니다. 기존 소유·친밀도·보상 데이터를 유지하면서 새 육성 흐름을 구현하는 것이 다음 작업입니다."
      }
    ]
  },
  {
    "id": "09",
    "title": "Talkisland",
    "subtitle": "AI Conversation Learning",
    "description": "워킹홀리데이 상황을 배경으로 NPC와 영어 대화를 연습하는 팀 프로젝트입니다.",
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
    "imageLabel": "NPC dialogue",
    "image": "",
    "logo": "/images/logo-talkisland.png",
    "accent": "AI Speaking",
    "statusNote": "Microsoft AI School 6기 팀 프로젝트로 최종 프로젝트 최우수상을 받았습니다.",
    "detailIntro": "낯선 상황에서 필요한 말을 직접 꺼내보는 영어 회화 경험을 팀과 함께 만들었습니다. 워킹홀리데이를 배경으로 사용자가 NPC와 대화하고 상황별 과제를 진행하는 프로젝트입니다. 저는 대화 시나리오와 캐릭터 설정, 회화 흐름과 에셋 구성에 참여했습니다.",
    "planningSections": [
      {
        "label": "01 / AI Conversation Learning",
        "title": "상황이 대화의 목적을 만들도록",
        "image": "",
        "intent": "사용자가 장면 안에서 무엇을 해야 하는지 알 수 있고, 그 목적에 맞는 말을 NPC에게 건넬 수 있도록 회화 상황을 구성했습니다. 각 NPC의 역할과 캐릭터 설정을 대화 시나리오에 반영했습니다.",
        "execution": "AI 응답이 해당 장면과 학습 맥락 안에서 이어지도록 대화 흐름을 설계했습니다. 맵 에셋과 회화 상황 구성을 함께 다루며 텍스트와 공간이 같은 상황을 설명하도록 작업했습니다."
      },
      {
        "label": "02 / AI Conversation Learning",
        "title": "팀 안에서 맡은 역할과 결과",
        "image": "",
        "intent": "NPC 대화 스크립트·캐릭터 설정·회화 흐름을 담당하고 에셋 제작에 참여했습니다. 시연에서 사용자가 경험할 장면을 기준으로 팀의 구현과 콘텐츠를 맞췄습니다.",
        "execution": "NPC의 설정, 대화의 목적, 사용자가 이동하는 장면을 함께 정리했습니다. 팀이 구현할 수 있는 시연 흐름에 맞춰 시나리오와 에셋 구성을 완성하는 경험을 쌓았습니다."
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

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    dialog?.querySelector<HTMLElement>('button')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
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
  }, [selectedProject]);

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
                수영·언어 학습 앱과 AI 개발 도구를 만듭니다.
              </p>
              <p className="hero-copy mt-4 mb-7 max-w-[330px] text-[13px] leading-[1.75] text-[#6E6E73] sm:max-w-md sm:text-[14px] lg:text-[15px] break-keep">
                수영강사로 일하며 겪은 문제와 언어학을 공부하며 생긴 질문을 앱과 연구로 옮겼습니다. 직접 사용하고 살펴본 결과를 다음 개발에 반영합니다.
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
              출시 앱, 개인 사용 도구, 연구와 개발 중인 프로젝트를 각각의 상태와 함께 소개합니다.
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
            className="mx-auto w-full max-w-6xl rounded-[30px] border border-[#D2D2D7] bg-white shadow-[0_36px_120px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#E5E5EA] bg-white/92 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                {selectedProject.logo && (
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[14px] bg-[#F5F5F7] shadow-[0_10px_26px_rgba(15,23,42,0.1)] ring-1 ring-[#E5E5EA]">
                    <img src={selectedProject.logo} alt={`${selectedProject.title} logo`} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <div style={MONO} className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#E60012]">
                    {selectedProject.id} / {selectedProject.accent}
                  </div>
                  <h2 id="project-detail-title" className="truncate text-[24px] font-black leading-none tracking-[-0.04em] text-[#1D1D1F] sm:text-[32px]">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span style={MONO} className={statusBadgeClass(selectedProject.status, "small")}>
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

            <div className="p-5 sm:p-7">
              <div className="rounded-[24px] border border-[#E5E5EA] bg-[#FBFBFD] p-5 shadow-[0_14px_42px_rgba(15,23,42,0.06)] sm:p-6">
                <div style={MONO} className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#E60012]">
                  Product detail
                </div>
                <p className="max-w-4xl break-keep text-[16px] font-bold leading-[1.75] text-[#1D1D1F] sm:text-[18px]">
                  {selectedProject.detailIntro}
                </p>

                <p className="mt-5 border-l-2 border-[#E60012] pl-4 text-[14px] leading-[1.75] text-[#515154]">{selectedProject.statusNote}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={`${selectedProject.id}-detail-tag-${tagIndex}`} className={tagBadgeClass(tag)}>
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
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#E60012] px-3 py-2 text-[11px] font-bold text-white transition-colors duration-200 hover:bg-[#1D1D1F]"
                      >
                        {link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="mb-4 flex items-end justify-between gap-4 border-t border-[#E5E5EA] pt-6">
                  <div>
                    <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.24em] text-[#E60012]">
                      Problem & implementation
                    </div>
                    <h3 className="text-[24px] font-black tracking-[-0.04em] text-[#1D1D1F] sm:text-[30px]">
                      기획과 구현
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {selectedProject.planningSections?.map((section) => (
                    <article
                      key={`${selectedProject.id}-${section.title}`}
                      className="overflow-hidden rounded-[22px] border border-[#D2D2D7] bg-[#FBFBFD] shadow-[0_14px_42px_rgba(15,23,42,0.07)]"
                    >
                      <div className={getSectionImages(section).length ? "grid min-h-full md:grid-cols-[0.92fr_1fr] lg:grid-cols-1 xl:grid-cols-[0.92fr_1fr]" : "grid min-h-full"}>
                        {getSectionImages(section).length > 0 && <div className="flex min-h-[300px] items-center justify-center overflow-hidden border-b border-[#E5E5EA] bg-[#F5F5F7] p-3 md:border-b-0 md:border-r lg:border-b lg:border-r-0 xl:border-b-0 xl:border-r">
                          {getSectionImages(section).length > 1 ? (
                            <div className="grid w-full grid-cols-2 gap-2">
                              {getSectionImages(section).map((image, imageIndex) => (
                                <img
                                  key={`${selectedProject.id}-${section.label}-image-${imageIndex}`}
                                  src={image}
                                  alt={`${selectedProject.title} ${section.title} 화면`}
                                  className="max-h-[430px] w-auto max-w-full rounded-[16px] object-contain shadow-[0_12px_36px_rgba(15,23,42,0.12)]"
                                />
                              ))}
                            </div>
                          ) : (
                            <img
                              src={section.image}
                              alt={`${selectedProject.title} ${section.title} 화면`}
                              className="max-h-[430px] w-auto max-w-full rounded-[16px] object-contain shadow-[0_12px_36px_rgba(15,23,42,0.12)]"
                            />
                          )}
                        </div>}

                        <div className="p-5 sm:p-6">
                          <div style={MONO} className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#E60012]">
                            {section.label}
                          </div>
                          <h4 className="text-[18px] font-black tracking-[-0.03em] text-[#1D1D1F]">
                            {section.title}
                          </h4>
                          <div className="mt-4 space-y-4 break-keep text-[15px] leading-[1.85] text-[#515154]">
                            <p>{section.intent}</p>
                            <p>{section.execution}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
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
              <p>여러 프로젝트를 병행하며 작업 기록과 AI 실행을 관리할 필요가 생겨 Jitdeck을 개발하고 있습니다. 프로젝트마다 실제로 사용할 상황을 정하고, 화면·데이터·실행 과정이 그 상황에 맞게 이어지는지 확인하며 작업합니다.</p>
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
