# 프로젝트 이름 (예: My Personal Project Management Tool)

## 개요

이 프로젝트는 개인 프로젝트 관리 도구입니다. 사용자는 JWT를 이용한 로그인/로그아웃 기능을 통해 이용할 수 있으며, 개인 프로젝트를 추가/삭제/수정하여 카드 형식으로 볼 수 있습니다.

## 기술 스택

- Back-end: FastAPI <img src="https://fastapi.tiangolo.com/img/favicon.png" width="25">
- Front-end: Vue.js <img src="https://vuejs.org/images/logo.png" width="25">
- Containerization: Docker <img src="https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png" width="25">
- DBMS : PostgreSQL <img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="25">
- Authentication : JWT (Json Web Token) <img src="https://jwt.io/img/pic_logo.svg" width="25">


## 기능

1. 사용자 인증: 사용자는 JWT를 이용한 로그인 및 로그아웃 기능을 통해 이용할 수 있습니다. 사용자가 로그인을 하면 서버는 JWT를 생성하여 반환하고, 사용자는 이 토큰을 이용하여 인증이 필요한 요청을 보낼 수 있습니다.
2. 프로젝트 관리: 사용자는 개인 프로젝트를 추가, 삭제, 수정할 수 있습니다.
3. 프로젝트 뷰: 추가된 프로젝트는 카드 형식으로 보여집니다.

## 기능 세부 설명

### 1. 사용자 인증

사용자는 로그인 및 로그아웃 기능을 통해 이용할 수 있습니다. 이메일과 비밀번호를 통해 로그인하며, 로그인 성공 시 사용자는 프로젝트 관리 페이지로 이동합니다.

### 2. 프로젝트 관리

사용자는 개인 프로젝트를 추가, 삭제, 수정할 수 있습니다.

- 추가: '+' 버튼을 누르면 새 프로젝트가 생성됩니다. 프로젝트 이름, 설명, 시작일, 종료일 등의 정보를 입력하여 프로젝트를 추가할 수 있습니다.
- 삭제: 각 프로젝트 카드에는 '삭제' 버튼이 있습니다. 이 버튼을 누르면 해당 프로젝트가 삭제됩니다.
- 수정: 프로젝트에서 수정하고 싶은 부분을 누르면 바로 수정이 가능합니다. 그 후 저장을 누르면 수정사항이 저장됩니다.

### 3. 프로젝트 뷰

추가된 프로젝트는 카드 형식으로 보여집니다. 카드에는 프로젝트 이름, 설명, 시작일, 종료일 등의 정보가 표시됩니다.

## 설치 방법

Docker가 사전에 설치되어 있어야 합니다.

1. 저장소를 clone 합니다.

```
git clone https://github.com/wintiger98/ppmt
```

2. Docker를 사용하여 서비스를 시작합니다.

```
docker-compose up
```

## 기능 시연

아래 링크에서 각 기능의 동작을 확인할 수 있습니다.

### 로그인 및 프로젝트 생성
<iframe width="560" height="315" src="https://www.youtube.com/embed/r85Dzw-CzLI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[![Watch the video](https://img.youtube.com/vi/r85Dzw-CzLI/0.jpg)](https://youtu.be/r85Dzw-CzLI)

### 프로젝트 수정
<iframe width="560" height="315" src="https://www.youtube.com/embed/ITpkQrVD83E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[![Watch the video](https://img.youtube.com/vi/ITpkQrVD83E/0.jpg)](https://youtu.be/ITpkQrVD83E)

### 프로젝트 삭제
<iframe width="560" height="315" src="https://www.youtube.com/embed/9PLtwEJnUpU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[![Watch the video](https://img.youtube.com/vi/9PLtwEJnUpU/0.jpg)](https://youtu.be/9PLtwEJnUpU)
