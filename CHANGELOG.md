# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.5](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.4...v0.0.5) (2023-09-08)


### Features

* abort old query requests when there are newer ones ([1c16c37](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1c16c377902b62c60b5affb9e135a9875902906c))
* add close button to dialog ([595031f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/595031f91acb0171c9e88aa94cb8477dc0ee3562))
* add custom scrollbar ([5d07867](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5d07867b2896913ed210b9e4bec9238b1db17c17))
* add debounce to query execution ([0fe82fe](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/0fe82fe31b5d0efd3ecb48a5e96032d5855eecc1))
* add i18n ([4ff8a6d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/4ff8a6ddc43f936edc364edca28026827943cc65))
* add inclusion types filter ([8add582](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/8add582e122dfdce94df29793a4308754ccf5d9e))
* add lat/lng mouse track in map corner ([7d729f0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7d729f0830b4f93214e25b7535023f26a93d9e56))
* add loading spinner at map ([6edd682](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/6edd682396209c32563e39784610f58c4a6d2d41))
* add rock type filter ([2672124](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/267212406c560e9d7e25ad21b47b47e102476aee))
* centralize query loading state in store ([392f1fd](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/392f1fd3f9a4c4defb0f9e87fc631abcedfe4f4f))
* consider result bbox from API to trigger new clusters request ([34b01ea](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/34b01ea1cba7e493fa7d03a37b46dcbd44126d6b))
* create custom map marker ([11a89b4](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/11a89b4743477d95b24d19d2172a9d2a959d3b05))
* create proxy for API requests at server ([3370456](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/33704566d27a7bbdf6003a017620badeb0b75f2e))
* get markers from new cluster endpoint ([5e71e9c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5e71e9c4ec03683ba06dfc335d4e532693896b70))
* get samples list from separate API endpoint ([db51dd8](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/db51dd8731e8d454516458be469bc39976bce597))
* move polygon filter state to own store ([dc1167f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/dc1167f0fe7687ac5667e4a27bb84272543b3c8d))
* show debug panel on map only if GET param is set ([97fc292](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/97fc292f59f9382bd00901462da2e59b885f39ec))
* show rock type filter only when "Whole Rock" is selected ([a407da3](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a407da31d6dce7213cf310ca5664571a1a5255f9))
* update button styles ([a78525f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a78525f2d30564279abb4fc69eccc258bf3ae29c))
* update dark mode style ([a36081d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a36081de7973e8cb71802c328f55d1fb1ac1e16a))
* update map center ([98b3240](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/98b3240c1c43b53098d50ebb78b0132ee30952a4))
* update material filter design ([1696816](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1696816e89dc094837df2b5fc2754712867e8bc3))


### Bug Fixes

* remove "addcoordinates" from query request ([9f52efb](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9f52efbb87eb0cc93b6b3721982ebadfa79f95c1))
* set local storage material filter cache ([f5509d0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f5509d030c6abf381d1362224779dd3816679409))
* update out of bounds calculation on map ([b272e9f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b272e9f026bbd5ae7381f6be535dc4d50f2594fb))
* use Polygon instead of MultiPoint at bbox ([b680a3c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b680a3c56475430346d06afffdf7f4774abd3906))

### [0.0.4](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.3...v0.0.4) (2023-07-20)


### Features

* add mobile components for query page ([681de65](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/681de65ac92a2943c5ac419b18e8d6f3e94cc6ea))

### [0.0.3](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.1...v0.0.3) (2023-07-18)


### Bug Fixes

* set always dark color on map cluster ([9535fc2](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9535fc2cbe368ffa5f4669a8f3e19503f067e269))

### [0.0.2](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.1...v0.0.2) (2023-07-17)
- Add polygon filter
- Add material filter with dialog
- Set map layers
- Add list view to query page
