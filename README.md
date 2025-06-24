# Diagram Auto

🎨 **서비스 아키텍처 다이어그램 자동 생성 도구**

React Flow를 기반으로 한 인터랙티브 다이어그램 편집기입니다. 마이크로서비스 아키텍처, 데이터베이스, API, 프론트엔드 등 다양한 서비스 컴포넌트를 시각화할 수 있습니다.

## ✨ 주요 기능

- 🔧 **드래그 앤 드롭 노드 편집**
- 🎯 **다양한 노드 타입** (Database, API, Frontend, External)
- 🔍 **검색 기능**
- 🌓 **다크/라이트 테마**
- 📂 **가져오기/내보내기**
- ⏳ **실행 취소/재실행**
- 🗺️ **미니맵 및 줌 컨트롤**

## 🚀 실행 방법

### 간단 실행

```bash
# 한번에 실행
./run.sh

# 또는
npm start
```

### 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 생성
npm run build
```

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript
- **UI**: Tailwind CSS
- **다이어그램**: React Flow
- **상태 관리**: Zustand
- **빌드 도구**: Vite
- **기타**: UUID, Classnames

## 📁 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── ServiceNode.tsx     # 서비스 노드 컴포넌트
│   ├── NodeEditor.tsx      # 노드 편집기
│   ├── SearchBar.tsx       # 검색 바
│   ├── ThemeToggle.tsx     # 테마 토글
│   └── ImportExport.tsx    # 파일 가져오기/내보내기
├── App.tsx             # 메인 앱 컴포넌트
├── store.ts            # Zustand 상태 저장소
├── api.ts              # API 함수들
└── main.tsx            # 엔트리 포인트
```

## 🎯 사용법

1. **노드 추가**: '+' 버튼 클릭
2. **노드 편집**: 노드 클릭
3. **연결 생성**: 노드 간 드래그
4. **검색**: 상단 검색바 사용
5. **테마 변경**: 테마 버튼 클릭

## �� 라이센스

ISC License