# MiQuiz

[comment]: <> (![JavaScript]&#40;https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&#41;)
[comment]: <> (![TypeScript]&#40;https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&#41;)
[comment]: <> (![Angular]&#40;https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white&#41;)
[comment]: <> (![Nx]&#40;https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white&#41;)
[comment]: <> (![Electron.js]&#40;https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white&#41;)
[comment]: <> (![Windows]&#40;https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&#41;)
[comment]: <> (![Linux]&#40;https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black&#41;)

[Требования](#require)  
[Запуск](#run)  

## <a id="require"></a> Требования 

**Node.js**  
[Документация](https://nodejs.org/en/download/package-manager) по установке Node.js. Рекомендуется проводить установку node через nvm, это позволит переключаться между различными версиями node.js.

- Рекомендуемая версия node: `v22.3.0`
- Рекомендуемая версия npm: `10.8.0`

**Angular/cli**  
Для разработки angular приложения необходимо глобально установить пакеты `npm install -g @angular/cli`

**Nx**  
Необходимо поставить nx глобально не ниже 19 версии `npm add --global nx@latest`

**Docker**   
Установить в системе docker

## <a id="run"></a> Запуск 

### База данных и переменные окружения
1. Создать в папке `psy-quiz/db` файл `.env`, как указано в `psy-quiz/db/.env.example`
2. Выполнить в папке `psy-quiz/db` команду `docker compose up -d`
3. Создать в папке `psy-quiz/project` файл `.env`, как указано в `psy-quiz/project/.env.example`. Данные для подключения к базе данных должны совпадать с `psy-quiz/db/.env` 

### Установка зависимостей
1. Перейти в папку `psy-quiz/project`
2. Выполнить команду `npm ci`

### Backend
Для запуска сервера в dev режиме выполнить следующие команды по порядку:
1. `npm run psy-quiz-backend` - запуск сервера
2. `npm run migration:run` - заполнение базы стартовыми ролями и супер пользователем

### Frontend
Для запуска фронтенда в dev режиме выполнить команду `npm run psy-quiz-frontend`

