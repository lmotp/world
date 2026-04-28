# World

Vue 3, TypeScript, Vite, Three.js로 만든 셰이더 기반 3D 자연 월드 프로젝트입니다.

하늘, 지형, 물, 풀, 바위 같은 요소를 조합해 작은 오픈 월드 느낌의 장면을 렌더링하며, 커스텀 셰이더와 GLTF 모델을 활용해 환경 표현을 구현합니다.

## 주요 기능

- Three.js 기반 3D 씬 렌더링
- 하늘, 지형, 물, 풀, 바위로 구성된 자연 환경
- 커스텀 셰이더를 이용한 표면 표현
- GLTF 모델 로딩 및 배치
- OrbitControls를 이용한 카메라 회전 및 시점 조작
- Tweakpane 기반 디버그 패널 지원

## 기술 스택

- Vue 3
- TypeScript
- Vite
- Three.js
- three-custom-shader-material
- Pinia
- Tweakpane

## 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 프로덕션 빌드

```bash
npm run build
```

### 4. 빌드 결과 미리보기

```bash
npm run preview
```

## 프로젝트 구조

```text
src/
├── assets/        # 텍스처, 모델, 스타일
├── components/    # 메인 3D 씬과 디버그 패널
├── composables/   # 카메라, 조명, 물, 지형, 풀, 바위 설정
├── shaders/       # 버텍스/프래그먼트 셰이더
├── stores/        # 상태 관리
└── App.vue        # 앱 엔트리
```

## 참고

- 이 프로젝트는 3D 렌더링과 셰이더 실험을 위한 실습용 구조에 가깝습니다.
- 환경에 따라 로딩 시간이나 렌더링 성능이 달라질 수 있습니다.
