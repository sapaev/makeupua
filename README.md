# makeupua

Автотесты фильтра «Ціна» на странице категории сайта [makeup.com.ua](https://makeup.com.ua). Playwright + TypeScript, десктоп и мобильная версия.

## Установка

```
npm install
npx playwright install
```

## Запуск

Все тесты:

```
npx playwright test
```

Только десктоп или только мобильная версия:

```
npx playwright test --project="Desktop Chrome"
npx playwright test --project="Mobile Chrome"
```

С открытым браузером:

```
npx playwright test --headed
```

## Отчёт

```
npx playwright show-report
```


## Найденный дефект

Фильтр «Ціна» и сортировка «Від найдешевших» в категории «Парфумерія» возвращают товары, цена которых ниже заданного минимума. Из-за этого тесты `Check min price filter` и `Check min and max price filter` падают.

Как воспроизвести:

1. Открыть https://makeup.com.ua/ua/categorys/3/#price_from=1572&sort=priceAsc
2. Прокрутить первую страницу до товаров по 1574 ₴.

Ожидаемо: все цены не ниже 1572 ₴.
Фактически: в выдаче есть Alhambra Kismet Magic за 1090 ₴.

API `/shop/v1/categories/3/products/?sort=priceAsc&priceFrom=1572` возвращает этот товар с `price.current: 1090`.

Дефект зависит от данных и может не воспроизводиться, если ассортимент или цены изменятся.


