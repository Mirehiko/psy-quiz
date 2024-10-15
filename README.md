# MiQuiz

[comment]: <> (![JavaScript]&#40;https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&#41;)

[comment]: <> (![TypeScript]&#40;https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&#41;)

[comment]: <> (![Angular]&#40;https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white&#41;)

[comment]: <> (![Nx]&#40;https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white&#41;)

[comment]: <> (![Electron.js]&#40;https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white&#41;)

[comment]: <> (![Windows]&#40;https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&#41;)

[comment]: <> (![Linux]&#40;https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black&#41;)

[Требования](#require)  
[Установка зависимостей и переменных окружения](#env)  
[Developmnent](#dev)
[Production](#prod)

## <a id="require"></a> Требования

**Node.js**  
[Документация](https://nodejs.org/en/download/package-manager) по установке Node.js. Рекомендуется проводить установку
node через nvm, это позволит переключаться между различными версиями node.js.

- Рекомендуемая версия node: `v22.3.0`
- Рекомендуемая версия npm: `10.8.0`

**Angular/cli**  
Для разработки angular приложения необходимо глобально установить пакеты `npm install -g @angular/cli`

**Nx**  
Необходимо поставить nx глобально не ниже 19 версии `npm add --global nx@latest`

**Docker**   
Установить в системе docker

## <a id="env"></a> Установка зависимостей и переменных окружения

1. Перейти в папку cli
2. Выполнить команду `npm i -g .`
3. Перейти в корень проекта
4. Выполнить команду `miterm`, откроется кастомный miterm CLI
5. Выполнить команду `setup-env` для создания дефотных переменных окружения
6. Выполнить команду `install`. Данный скрипт установит зависимости в проекте
7. Выполнить команду `quit` для выхода из кастомного CLI

[//]: # (### Установка зависимостей)

[//]: # (1. Перейти в папку `psy-quiz/project`)

[//]: # (2. Выполнить команду `miterm install`)

[//]: # (## <a id="run"></a> Запуск)

## <a id="dev"></a> Development

### База данных

1. Выполнить в папке `psy-quiz/db` команду `docker compose -f docker-up -d`

### Backend

Для запуска сервера в dev режиме выполнить следующие команды по порядку:

1. `npm run psy-quiz-backend` - запуск сервера
2. `npm run migration:run` - заполнение базы стартовыми ролями и супер пользователем

### Frontend

Для запуска фронтенда в dev режиме выполнить команду `npm run psy-quiz-frontend`

## <a id="prod"></a> Production