# API менеджерського CRM

Самостійний клієнт під `src/shared/new-back-2`: без імпортів із довідкових копій, NestJS, Sequelize, React або бібліотеки кешування.

## Налаштування

Скопіюйте `.env.example` у `.env.local` і задайте `NEXT_PUBLIC_API_URL` — адресу бека. Значення `http://localhost:3001` у прикладі передбачає, що бек запущено на порту 3001; стандартний порт бека в його `main.ts` — 3000, як і у фронта. Для одночасного запуску задайте одному з них інший порт.

## Структура та єдиний стиль

Кожна сутність має папку з `<entity>.api.ts` і `<entity>.types.ts`. `BASE` розташований у `.api.ts`, окремих файлів констант немає. Групи: `accounts`, `managers`, `users`, `specialists`, `partners`, `blog`, `cases`, `consultations`, `documents`, `media`, `mail`, `promocodes`, `notifications`, `reminders`.

- `list(query = {}, options?)` — список.
- `getById(id, options?)` — один запис.
- `create(dto, options?)`, `update(id, dto, options?)`, `remove(id, options?)` — звичайні операції, коли вони існують у бекові.
- Вкладені списки — `listByCase`, `listByStage`, `listByInstruction`.
- Окремі дії названі явно: `register`, `updateRoles`, `approve`, `reject`, `schedule`, `download` тощо.
- Файли: `create(dto, file, options?)`, `uploadLogo(id, file, options?)`, `uploadPhoto(companyId, file, options?)`.
- Типи параметрів списку — `*Query`; тіла — `Create*Dto`, `Update*Dto` або назва дії з `Dto`.
- `id` передається в URL окремо від DTO; в JSON немає службової обгортки `{ id, dto }`.
- Кожен метод приймає останнім аргументом `RequestOptions`: `signal`, `headers`, `token`, `baseUrl`.

Назви полів та значення enum відповідають бекові, включно з його відмінностями `titleUA`, `titleUa`, `name_ua`. Дати у відповідях — JSON-рядки, грошові поля DECIMAL — рядки. Nullable-поля мають `null`, зв'язки, які завантажуються не кожним запитом, позначені необов'язковими.

Деякі `.types.ts` не мають сусіднього `.api.ts`: вони описують вкладені дані відповіді, наприклад профіль спеціаліста або задачу нагадування. Це не додає особистих маршрутів до CRM.

## Використання

```ts
import { managersApi, blogPostsApi, ApiError } from '@/api'
import { BlogPostStatus } from '@/api/blog/blog-posts/blog-posts.types'

const manager = await managersApi.getMe()
const roles = manager.roles ?? []

const controller = new AbortController()
const page = await blogPostsApi.list(
    { page: 1, limit: 20, status: BlogPostStatus.DRAFT },
    { signal: controller.signal },
)
// page.rows, page.total, page.page, page.limit, page.offset

try {
    await blogPostsApi.update(12, { title: 'Нова назва' })
} catch (error) {
    if (error instanceof ApiError) {
        console.error(error.status, error.messages, error.data)
    }
}
```

Можна імпортувати API безпосередньо з `.api.ts` або через `@/api`. Типи й enum імпортуються з відповідних `.types.ts`; спільні `Languages`, `AccountType`, `PageResponse` — з `common.types.ts`.

## Авторизація

`accountAuthApi.login({ email, password })` повертає `{ token }`. Вхід сам не зберігає токен: браузерний auth-flow може викликати `setAccessToken(token)`, після чого захищені запити читатимуть `access_token` із localStorage. `clearAccessToken()` видаляє лише токен; очищення кешу та навігація належать auth-flow.

На сервері передавайте токен явно для кожного запиту:

```ts
const manager = await managersApi.getMe({ token })
```

Глобального серверного токена немає. `token: null` вимикає читання браузерного токена для конкретного запиту. Публічні auth-операції не відправляють Authorization. Ролі потрібно читати з `/managers/me`, а не з JWT.

HTTP-клієнт не робить автоматичних повторів, refresh або redirect на 401. У цьому бекові немає refresh/logout endpoints. Помилки HTTP повертаються як `ApiError` зі `status`, `data`, `messages`; некоректна успішна JSON-відповідь — `ApiResponseError`. Abort і мережеві помилки зберігаються без обгортки. Статуси 204/205 повертають `undefined`.

## Межі менеджерського API

Включені всі маршрути з доступом `ManagerGuard`: керування акаунтами, профілями та ролями, контентом, справами, документними шаблонами, промокодами, модерацією, розсилками й нагадуваннями. Обмеження ролей зазначені над методами; вони відображають поточний бек, де, наприклад, поштові операції потребують `writer`.

Додатково є спільна авторизація, читання медіа й довідників. `specialistConsultationsApi` читає лише активні консультації для вибору умов промокоду; це не менеджерське керування консультаціями.

Не включені особисті `me/my` користувачів, спеціалістів і партнерів, публічна реєстрація користувача, створення/оплата/скасування бронювання від імені користувача, керування слотами спеціаліста, користувацькі справи й генерація особистих документів, покази/кліки реклами.

Важливі особливості поточного бека:

- Компанії читаються через `/partner-companies/manage`, банер — через `/partner-banners/manage/:id`.
- `/specialists/:id` повертає `SpecialistProfile`, скорочений публічний профіль активного спеціаліста. Повний менеджерський запис доступний в `specialistsApi.list({ id })`; окремого менеджерського GET за ID немає.
- `/consultation-categories/:id` читає лише активну категорію. Неактивні доступні через менеджерський `list`.
- Приватні assets/variants не мають list endpoints; клієнт не вигадує їх.
- Методи `tick` і `build` лише оголошені. Вони нічого не запускають автоматично.

## Файли

Завантаження формує `FormData` з полем `file`; браузер сам задає multipart boundary. `publicAssetsApi.create` повертає `{ asset }`, а приватні завантаження — запис напряму, як у бекові.

`download` повертає `Blob`, придатний для `URL.createObjectURL` (після використання URL потрібно звільнити). Приватний підписаний URL також потребує Authorization, тому не варто просто вставляти його в `<img src>` або посилання. Для assets є `privateAssetsApi.download(id)`, для файлів бронювання — `consultationBookingsApi.download(id)`.

## Перевірки

`npm test` перевіряє типи та виконує тести HTTP-клієнта і контрактів запитів зі змоканим fetch. `npm run lint` та `npm run build` перевіряють проєкт. Тести не підключаються до бека й не потребують довідкової папки `src/shared`.

## Бек v2

Додано підписки, юридичні документи, платежі, аналітику та адміністративні дії бронювань. Перелік контрактів і обмежень: [BACKEND-2.md](BACKEND-2.md).
