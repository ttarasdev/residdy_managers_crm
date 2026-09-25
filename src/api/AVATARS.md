# Аватари акаунтів

Актуальний бек: сусідній `residdy_backend`, зміни описані в його `AVATARS.md`. Копії `src/shared/new-back*` не оновлювалися.

- `accountsApi.uploadMyAvatar(file)` → `POST /account/me/avatar` для кожного залогованого активного акаунта.
- `accountsApi.uploadAvatar(accountId, file)` → `POST /account/:id/avatar` для власника або менеджера з роллю admin. Передавати Account ID, не Manager/User/Specialist ID.
- Запит multipart містить лише `file`; бек визначає власника, bucket `account_ava` і видимість `all_accounts`.
- Відповідь — Account з `avatarId`, який посилається на PrivateVariant. Його small/medium/large assets читаються з bearer-токеном без вимоги підписки. Анонімного доступу немає.
- Профіль CRM має кнопку «Zmień zdjęcie», хедер відображає аватар. Після збереження оновлюються дані акаунта та сесії.
- Зміна інших полів через `PATCH /account/:id` залишається admin-only.

Для існуючих аватарів підготовлена бекенд-міграція `024-avatar-visibility.cjs`; на базі вона не запускалася. Нові аватари одразу отримують потрібну видимість.
