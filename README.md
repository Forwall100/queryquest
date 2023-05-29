# 🔎🤔 QuerryQuest
![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

https://github.com/Forwall100/queryquest/assets/78537089/c8a385e8-bcf9-4387-8b6d-035a27c8186e

## 📚 Что это?
QuerryQuest - это мощный сервис, который помогает студентам изучать SQL в увлекательной и интерактивной форме. 

С помощью QuerryQuest преподаватели могут легко загружать базы данных SQLite для создания тестов и писать вопросы на составление SQL-запросов, а студенты могут проходить эти тесты и улучшать свои навыки.

## ⚙️ Фичи
- 👨‍🏫 Преподаватели имеют доступ к функциональности большой языковой модели "[gpt4all](https://github.com/nomic-ai/gpt4all)", которая работает локально и автоматически генерирует вопросы на основе базы данных, загруженной преподавателем. На странице каждого теста преподаватель также может увидеть статистику прохождения теста студентами. 

- 📈 Студенты, решая тест, могут делать SQL-запросы к базе данных, загруженной преподавателем, ориентируясь на ER-диаграмму, которая автоматически генерируется из базы данных SQLite, которую загрузил учитель. 

## 🚀 QuerryQuest имеет три сервиса на бэкенде:
- `backend_service`: сервис, который использует Pocketbase для хранения основной информации сайта, такой как пользователи, тесты, вопросы, результаты тестов и т.д.
- `sqlite_query_service`: сервис, написанный на FastAPI, который обрабатывает SQL-запросы от студентов к определенной базе данных теста и отправляет ответ. Он также генерирует ER-диаграмму для базы данных и генерирует схему базы данных для работы большой языковой модели.
- `ai_service`: сервис, написанный на FastAPI, использующий фреймворк LangChain для работы с LLM, для генерации вопросов с использованием большой языковой модели "gpt4all". Этот сервис получает схему от `sqlite_query_service` и на ее основе придумывает вопрос заданной сложности от 1 до 5.

## 🎨 Фронтенд
Фронтенд сервиса написан на Vue.js с использованием конструктора Vite. В качестве CSS фреймворка был выбран Vuetify для основных элементов, таких как кнопки и инпуты, и Tailwind для более тонкой настройки внешнего вида сайта. 

## 🏃‍♂️Как это запустить?
```zsh
git clone https://github.com/Forwall100/queryquest.git
```

```zsh
cd queryquest/frontend
npm i
npm run dev
```

```zsh
cd ../backend/backend_service
./pocketbase_linux serve
```

```zsh
cd ../sqlite_query_service
pip install -r requirements.txt
python main.py
```

```zsh
cd ../ai_service
pip install -r requirements.txt
wget -P ./utils/ "https://gpt4all.io/models/ggml-gpt4all-j-v1.3-groovy.bin"
python main.py
```
