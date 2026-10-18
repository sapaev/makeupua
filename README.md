# MakeUp.ua — E2E автотесты

Автоматизированные UI-тесты для интернет-магазина косметики [makeup.com.ua](https://makeup.com.ua), написанные на **Playwright + TypeScript** с использованием паттерна **Page Object Model**.

Тесты запускаются на десктопных и мобильных браузерах и проверяют работу фильтра по цене и сортировки в каталоге товаров.

## Стек

- [Playwright Test](https://playwright.dev/) `^1.64`
- TypeScript
- Node.js
- Page Object Model
- HTML-репортер Playwright

## Требования

- Node.js 18+
- npm

## Установка

```bash
git clone <url-репозитория>
cd makeUpUa
npm install
npx playwright install
```

> Для проекта **Desktop Edge** нужен установленный браузер Microsoft Edge.

## Запуск тестов

```bash
# все тесты во всех браузерах
npx playwright test

# конкретный файл
npx playwright test tests/categoryTests.spec.ts

# только в одном браузере / устройстве
npx playwright test --project="Desktop Chrome"
npx playwright test --project="Mobile Safari"

# с открытым браузером
npx playwright test --headed

# интерактивный UI-режим
npx playwright test --ui

# режим отладки
npx playwright test --debug
```

## Браузеры и устройства

Настроены в [playwright.config.ts](playwright.config.ts):

| Проект          | Устройство             |
|-----------------|------------------------|
| Desktop Chrome  | Desktop Chrome         |
| Desktop firefox | Desktop Firefox        |
| Desktop webkit  | Desktop Safari         |
| Desktop Edge    | Desktop Edge (msedge)  |
| Mobile Chrome   | Pixel 5                |
| Mobile Safari   | iPhone 12              |

Page Objects учитывают флаг `isMobile` и на мобильных устройствах используют отдельные элементы интерфейса (бургер-меню, кнопки фильтров и сортировки, кнопку «Застосувати»).

## Тестовые сценарии

Файл [tests/categoryTests.spec.ts](tests/categoryTests.spec.ts) — **Check price filter** (категория «Парфумерія»):

| Тест                         | Что проверяет                                                                 |
|------------------------------|-------------------------------------------------------------------------------|
| Check min and max price filter | Фильтр «от 50 до 100 грн»: все цены в диапазоне на первой и последней странице |
| Check min price filter       | Фильтр «от 50 грн»: все цены ≥ 50 на первой и последней странице               |
| Check max price filter       | Фильтр «до 100 грн»: все цены ≤ 100 на первой и последней странице             |

Общие шаги в каждом тесте:

1. Открыть главную страницу и принять cookie-баннер.
2. Перейти в категорию и проверить её заголовок.
3. Убедиться, что отображается боковое меню фильтров.
4. Ввести цену и дождаться обновления URL (`price_from` / `price_to`) и ответа API со списком товаров.
5. Выбрать сортировку «Від найдешевших» и проверить, что цены идут по возрастанию.
6. Проверить цены товаров, перейти на последнюю страницу пагинации и проверить ещё раз.

## Структура проекта

```
makeUpUa/
├── helpers/
│   └── categories.ts       # названия категорий в меню и ожидаемые заголовки страниц
├── pages/
│   ├── BasePage.ts         # базовый класс: page, isMobile, переход на главную
│   ├── HomePage.ts         # главная страница: cookie, тултип, меню категорий
│   └── CategoriesPage.ts   # страница категории: фильтр цены, сортировка, пагинация
├── tests/
│   └── categoryTests.spec.ts
├── playwright.config.ts
└── package.json
```

## Конфигурация

Основные настройки в [playwright.config.ts](playwright.config.ts):

- `baseURL`: `https://makeup.com.ua`
- таймаут теста: 70 с, таймаут `expect`: 18 с
- тесты запускаются параллельно (`fullyParallel: true`)
- в CI (`CI=true`): 2 повторных запуска упавших тестов, 1 воркер, запрещён `test.only`
- trace собирается при первом повторном запуске (`on-first-retry`)

## Отчёты

После прогона формируется HTML-отчёт в папке `playwright-report/`:

```bash
npx playwright show-report
```

Trace упавших тестов открывается из отчёта или командой:

```bash
npx playwright show-trace test-results/<папка-теста>/trace.zip
```
