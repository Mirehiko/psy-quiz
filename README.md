# MiQuiz

[comment]: <> (![JavaScript]&#40;https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&#41;)
[comment]: <> (![TypeScript]&#40;https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&#41;)
[comment]: <> (![Angular]&#40;https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white&#41;)
[comment]: <> (![Nx]&#40;https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white&#41;)
[comment]: <> (![Electron.js]&#40;https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white&#41;)
[comment]: <> (![Windows]&#40;https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white&#41;)
[comment]: <> (![Linux]&#40;https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black&#41;)

[Требования](#require)  
[Установка](#install)  
[Настройка](#settings)
[Запуск](#run)  

## <a id="require"></a> Требования 

**Node.js**  
[Документация](https://nodejs.org/en/download/package-manager) по установке Node.js. Рекомендуется проводить установку node через nvm, это позволит переключаться между различными версиями node.js.

- Рекомендуемая версия node: `v20.11.0`
- Рекомендуемая версия npm: `10.7.0`

**Angular/cli**  
Для разработки angular приложения необходимо глобально установить пакеты `npm install -g @angular/cli`

**Nx**  
Необходимо поставить nx глобально не ниже 19 версии `npm add --global nx@latest`

**Docker**   
Установить в системе docker

## <a id="install"></a> Установка 

1. Склонировать проект
2. Из папки `psy-quiz` выполнить команду `npm ci`

## <a id="settings"></a> Настройка
Необходимо создать `docker-compose.yml` файл в папке `psy-quiz`. По примеру `example.docker-compose.yml` файла

## <a id="run"></a> Запуск. Разработка

#### Backend 
В папке `psy-quiz` выполнить `npm run psy-quiz-backend`
#### Frontend
В папке `psy-quiz` выполнить `npm run psy-quiz-frontend`
