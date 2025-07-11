# Paritet

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/SjFHomzTWz)


## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)



nx g @nx/workspace:remove @paritet/service-gateway-e2e

npx nx show projects

npx nx dev @paritet/web

npx nx show project api-gateway --target=build




docker-compose build --no-cache
docker-compose up --build -d 
docker-compose pull
docker-compose up -d
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d


docker compose -f docker-compose.dev.yml logs nginx
docker compose -f docker-compose.dev.yml build --no-cache
docker builder prune


npx create-nx-workspace@latest paritet

nx generate @nx/js:library libs/shared/i18n --bundler=none --importPath=@paritet/shared-i18n
npx nx g @nx/js:lib libs/shared/ui --bundler=none --importPath=@paritet/shared-ui

npx nx g @nx/react:lib feature-about-page --directory=libs/public/feature-about-page
npx nx g @nx/workspace:remove "@paritet/feature-about-page"
nx g rm "@paritet/feature-about-page"
nx show projects

nx add @nx/next
nx g @nx/next:app apps/frontend-service

nx add @nx/nest
nx g @nx/nest:app apps/api-gateway

npx nx sync
nx reset

nx serve api-gateway
npx nx dev @paritet/frontend-service


tree /F /A > project-description.txt
команда яка робе структуру папок та файлiв удобно для роботи з АI
краще робити її до установки нод модульсiв.



  Статический сайт ---------------------------- (frontend-service)
  Портал специалиста -------------------------- (specialist-frontend-service)
  Клиентский портал --------------------------- (client-frontend-service)
  Шлюз API ------------------------------------ (api-gateway)
  Сервис Аутентификации и Авторизации --------- (auth-service)


  Административная панель --------------------- (admin-panel-frontend)
  Брокер сообщений ---------------------------- (Message Broker)
  Сервис Профилей Специалистов ---------------- (Specialist Profile Service) 
  Сервис Профилей Клиєнтов ----------------     (Client Profile Service) 
  Сервис Кейсов ------------------------------- (Case Service)
  Сервис Платежей и Биллинга ------------------ (Payment Service)
  Сервис Уведомлений -------------------------- (Notification Service)
  Сервис Документов --------------------------- (Document Service)
  Конструктор Документов ---------------------- (Document Constructor Service)
  Гео-сервис "Радар" -------------------------- (Geo Service)
  Сервис Отзывов и Рейтингов ------------------ (Review & Rating Service)
  Сервис Чатов и Сообщений -------------------- (Messaging Service)
  Сервис Администрирования -------------------- (Admin Service)



	отвечай только по делу только конкретно описуй все по одному шагу не делай много писанины я тибе сам будуу говорить огда переходить на новый шаг ты мамсимум можешь прописать список шагов и описать один исходный шаг подробно в полном масштабе 
у меня монорепозиторий Nx и он уже установлен микросервисная архитектура 
создан уже проект
у меня виндовс 
я фронтенд розработчик
работаю на Vscode



Алгоритм запиту до translation-service:

🌐 1.Користувач відкриває: https://paritet.com/ua/translate?text=Hello
Або фронтенд виконує запит:
GET /ua/api/translation?text=Hello

📥 2. NGINX приймає запит:
location ~ ^/(ua|en)/api/ {
    rewrite ^/(ua|en)/(api/.*)$ /$2 break;
    proxy_pass http://host.docker.internal:3333;  # ← Порт API Gateway
}

https://paritet.com/ua/api/translation?text=Hello
Перетворюється у:
http://host.docker.internal:3333/api/translation?text=Hello

🛂3. API Gateway (NestJS) приймає /api/translation

🔄 4. API Gateway проксірує запит на: http://translation-service:3006/translate?text=Hello

🧠 5. translation-service (NestJS) обробляє запит:

📤 6. Відповідь повертається через API Gateway → NGINX → браузер:

📦 Що треба мати:
У NGINX — переписування /ua/api/... на /api/...

У API Gateway — проксі логіку на translation-service

У translation-service — ендпоінт /translate


✅ Бонус: Можеш навіть у api-gateway використовувати Nest microservices (наприклад, @nestjs/microservices з TCP, Redis або NATS) — тоді проксі буде ще потужніший. Але для початку достатньо HttpService.

бази даних
npx nx run prisma-translation:prisma-generate   Коли запускати 🔁 Завжди після зміни schema.prisma (локально чи перед білдом сервісу)
npx nx run prisma-translation:prisma-migrate-dev --name init  Коли запускати  🛠️ Один раз при створенні нової схеми — перед деплоєм або в dev-контейнері вручну

PRISMA generate
auth-service DB
npx prisma generate --schema=./libs/prisma/auth/prisma/schema.prisma

client-profile-service DB
npx prisma generate --schema=./libs/prisma/client-profile/prisma/schema.prisma




можна подивитися які бібліотеки належать мікросервісу
nx dep-graph --focus=@paritet/auth-service

запуск
docker compose -f docker-compose.dev.yml up -d
npx prisma generate --schema=./libs/prisma/auth/prisma/schema.prisma
npx prisma migrate dev --name init --schema=./libs/prisma/auth/prisma/schema.prisma
nx serve api-gateway
nx serve auth-service
npx nx dev @paritet/frontend-service