#!/bin/bash

echo "🚀 Diagram Auto 실행 중..."

# 의존성 설치 (필요한 경우)
if [ ! -d "node_modules" ]; then
    echo "📦 의존성 설치 중..."
    npm install
fi

# 개발 서버 실행
echo "🌐 http://localhost:5173 에서 실행됩니다"
npm run dev 