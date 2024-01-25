# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.12](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.11...v0.0.12) (2024-01-25)


### Features

* add error handling for precompiled files page and expert dataset page ([c8a09c0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c8a09c0b29a1a45686388f85bfd85d423913042d))
* add error message to samples list ([cca7d5c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/cca7d5c8b905bf61f8d1c0d3493571424c92a6ac))
* add more background images to the landingpage, where one gets selected at random on reload ([af07058](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/af070587f9e2e97f36bd409dcffcfc9869f287b5))
* add reset to chemistry filter ([c1837db](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c1837dbd5aceb4481a9daa0c85300d159d8a8a6c))
* elevate header to stay visible in front of ovrlays ([1f8042f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1f8042f247c4650216d8dc00ffe874f9bd25c0ca))
* generate new keys for children in chemistry elements tree (parent key + delimiter + child key) ([b075917](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b0759172ee04386aa4fce2b9cc74ac53e5929b74))
* reset chemistry store on material filter change ([4073906](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/4073906f3f561eb8679232a1c8e0533643bfd2d4))
* swap other filters on material filter change ([3a33802](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3a33802017d2d7f9bbf10c35fd26b22a8e2fb5b8))
* update filter panel min width to avoid material filter overflow ([8e4ef3e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/8e4ef3e3d99d57b56c642a67560da11b12d23722))
* update footer links and add legal notice and privacy statement ([e58fc50](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e58fc50cfba8fd2ee97a948d92fa8e5c160761b6))


### Bug Fixes

* append index of element type to nested chemistry elements to make them unique, so elements won't be selected multiple times ([3a98a97](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3a98a97dc4983782dd9ae9fcb732d562c4192f85))
* avoid overlapping of center top buttons on small desktop screens ([f55f6a5](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f55f6a538cd64cb375b3e1654ccd1217ccf015af))
* don't show material dialog again when already seen and switch to mobile display ([c81a10e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c81a10e68f7b7992cc73cd6271849b00a61e27a1))
* make chemistry element labels scrollable on mobile ([b3a940c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b3a940c532bae7c7e210653b337ad4b3eb98f154))
* manage collapse state at chemistry filter ([5443348](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5443348e023adb480e9092ac00f7a00ebac985b4))
* remove appended index from rock class values when converting to query ([a25a0c8](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a25a0c801af10aa951a46958e9ececb9c1d716b4))
* remove whole chemistry element type when last element was removed ([566ad01](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/566ad01ede60b995231066cbf0e52b93a60c25b1))
* select whole rock glass as preselected material when nothing set ([7caf1ce](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7caf1ce902582e4d7addec8c2e3db60c34dda801))
* set correct chemistry labels after switching back to selected state ([c03d452](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c03d452b37201ceaa5b6e91fefca2c9acaa06eec))
* set correct selected inclusion type after switching material filter ([c5cf9b0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c5cf9b0a010fc1e42a4c672fa0079b9ed92403dc))
* set dialog's z-index higher as bottom sheet ([2a29a65](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2a29a659d4ad6abd2588f7ba718126126d88a924))
* show correct title for mobile list view ([4481024](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/4481024a23700ef77e87fe27f95d7afd96f10847))
* show empty placeholder at samples list correctly ([3a22d25](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3a22d255c3cf25a4ad1af9aa804e217ddeb1866e))
* truncate long element names in chemistry filter ([e3726bd](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e3726bdb09e4a8c8aaef3014284d2902a57b520b))
* unset also in "filters by material" state ([cd9ae58](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/cd9ae5845ca96c21dc5a020b1dce12d4329acb89))
* update checkbox dark mode styles ([2f3f11a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2f3f11a00dc971293417fedd2d561c36600c1361))
* update query list params ([8eba2be](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/8eba2be60d4fe75c065c2acba5824617ae29f1ae))
* update radio button group value correctly ([6e38e25](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/6e38e25409664171aaa7cae68fe5967426b0da08))
* update tree select dark mode styles ([7f4379e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7f4379ebfdade825eb8171768c40ed83a0cd441d))
* updated misc styles at chemistry filter ([a07a5f5](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a07a5f5d81181d7db543a30c74989a96533c43d3))

### [0.0.11](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.10...v0.0.11) (2023-12-13)


### Bug Fixes

* update download button text ([99838db](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/99838dbab86ba604872ea312e6c625e5237a2a9f))

### [0.0.10](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.9...v0.0.10) (2023-12-13)


### Features

* add pagination to samples list ([1c03e58](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1c03e5879a28396c0cd4989fe8313bdecda33905))
* add precompiled files page that displays the precompiled files with metadata and download options ([f329651](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f329651ad1e616ba3b249cf46be40ef72100ace6))
* add units message to chemistry filter selected ([7b72f40](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7b72f40adf502516fa8758145d2c0ec9de001671))
* display amount samples next to download button ([ea1532a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ea1532ae0f3611bdade06158c9460b8f8dda9c40))
* display chemistry element units from API response ([e5f7dc7](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e5f7dc76e31450eef15480f4532ebaeb9ab9376f))
* sort selected chemistry items alphabetically ([09ceba1](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/09ceba1657e1adfec9fafc7f026e12295529eb8e))
* update button border radius ([e76ed10](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e76ed107e39c8a0731d71b67c6c1994f3047167d))
* update chemistry filter to handle hierarchical selection of items ([2f88dc0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2f88dc05adf360d6c8b9d7ccc15e8051baebfa15))
* update map control positions ([55ebad6](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/55ebad6c5d495d8f9f45da2dc613d62838834587))
* use PrimeVue checkbox ([2f6732f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2f6732faa3bf817d9dcf723108e2b32f6aee8703))


### Bug Fixes

* add missing semicolons ([61cd3a3](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/61cd3a3637fcac3f4d99d045cab470516f74721e))
* hide show all/less button at chemistryx filter when less that 6 items are selected ([5c6b50e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5c6b50ef02bacd139575077b8825634ea723578d))
* remove selected base filter items from more section correctly ([ffbd299](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ffbd299e4c4772fbe5e66f0e8b2049394fde8a76))
* remove selected chemistry element correctly ([251172c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/251172c3c455af7ff36b97ea765a372c822b453f))
* reset selected keys in the rock type select tree after reset ([0ba813d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/0ba813d69e3b7156cc86505888c02f77845ab6fc))
* set ISR rendering mode for precompiles files ([732e35b](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/732e35b0ff9c1cbba9e078bc8685936e0d4b6d16))
* unselect options in tree when removed value at host/inclusion material filters ([b0182c8](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b0182c8ce59e582ecf7b20c0a009f98fe59bd38b))
* update dark mode styles ([2c47e49](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2c47e49b8cc730ea2fad6ad62d6a88dde701e820))
* update divider in filter container ([10de23a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/10de23a07511845b4d45679ec0cafc562afee6b0))
* update draw area button position on sammler screen ([90f900a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/90f900aed865811df9de624a17660b18c9cf4ead))
* update filter base container styles ([7731bb0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7731bb015367fef969eb39dd73f4638d35643a7a))
* update filter dialog button text ([2ff73f3](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2ff73f35dd5f9d8778088c6b484016270056ba50))
* update samples list headline ([5a59f2f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5a59f2fde931c1bc356f0505990eabcc10707624))

### [0.0.9](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.8...v0.0.9) (2023-11-08)


### Features

* show amount samples on mobile view ([4ca3e73](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/4ca3e73ae2773ec45fc08d34ba4fccedcfa27fdb))
* use host/inclusion material endpoints ([0f2df49](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/0f2df49daa581ecf90055f9716b88be28dc158d3))

### [0.0.8](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.7...v0.0.8) (2023-11-08)


### Features

* add expert datasets page that shows the expert datasets in a datatable ([9b7b86e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9b7b86e30e96aa4de23a153ae1877b41363eb4af))

### [0.0.7](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.6...v0.0.7) (2023-10-25)

### Features

* cache all filters in local storage and use cached value on mount ([577f868](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/577f86848993fa22c6ff01c922200e68aeeccd3f))
* set correct selected rock type filter state when load from cache ([30988ac](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/30988ac4e5f2746110f7d6bf44e5787d2e90f996))
* update loading component ([cdc0682](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/cdc0682faf1038b383324c89b5725716ae1d15dd))
* add loading comp to rock type filter ([d669c5c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/d669c5ce8c6db24fe026798e6a202ca6db099ca8))
* keep a full list of rock classes in cache but don't append them to query when "all selected" at rock type filter ([178df93](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/178df93d1cd7edc7e01f6bbceca5cd050deb21ef))

### Bug Fixes
* append chemistry query params in api ([90a5fcc](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/90a5fccf20da1fefb41f352f02b610ed64c4f39e))
* show host and inclusion material filters when loading inclusion type filter value from cache ([bee6178](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/bee61781f31d3b804152e67258a446f19ec77a7d))
* mark rock type as checked when all classes were cached ([bf8dcfa](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/bf8dcfa5e60146f7235a79aea7dacd519a109c18))
* update loading ([816e75f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/816e75f58d0bdca0ff11928269dbb5b4a2781d77))


### [0.0.6](https://gitlab.gwdg.de/subugoe/georoc-frontend/compare/v0.0.5...v0.0.6) (2023-10-24)


### Features

* add amount samples display ([30acd4d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/30acd4daa76c0eb5a8693c08e76d128e94713bb8))
* add custom popover ([ec38426](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ec38426e7e244fab7b91958b247c53c93823ba29))
* add download button and move draw shape button to controls section on map ([5b57e5c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/5b57e5c1fd937aa0c4ed2213a25fcf0302378b99))
* add first chemistry filter functionalities ([2ef062a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2ef062ab5fa4ffe63bae2f8f746f1a3d7809435a))
* add logo as svg ([0bc2514](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/0bc2514b879c5bc44634f53cf9186ad3d6928294))
* add pencil cursor icon when drawing polygon ([3aaf1ff](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3aaf1ffd510841c2e0b2bdeac168a4891c44d7f3))
* add prototype chemistry filter functionality ([3f969c6](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3f969c6fa850094cd44818cc389a2c2fd62bd23b))
* add reset to filters ([fcf526c](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/fcf526cbea4ca0babc027b756601fe0fc81d932a))
* add rock classes to rock type filter ([50f9077](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/50f9077931ecf0086932fd6c4e85b166811b889a))
* add scroll gradient to filters ([6fdc284](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/6fdc284cfbb564f6c00ff4ab10044000bebb6d74))
* add total amount number from response ([f9d1cb3](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f9d1cb389e0d9ae8523095807e7adaf0cf56bf30))
* add unset filter function ([9a7c4a1](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9a7c4a1535ae4333d02239419de269c6dfd09ed3))
* change primary color ([a71d8a6](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a71d8a6721b79ac46aa1c2ce54cbc4b16a658c41))
* colorize cluster icons dynamically ([a41b437](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a41b437f50d4588ecf585afac27cf04902d282bd))
* combine glass and melt under single option at inclusion type filter ([1232cd5](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1232cd51e16c96d12825390afc97887058df270c))
* display list view at full height on mobile ([7ba9211](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/7ba9211634fbaad8d076d72b441c9daaf37d8bf2))
* display mobile filters as full screen ([b28160a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b28160a0a39a9b4b2627b3be1026774b025aab80))
* hide "draw shape" button on touch devices ([eece789](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/eece789fbd4afb980805f2c75a155285a633fb32))
* hide long/lat map cursor display on mobile ([94925ef](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/94925ef31f1972a90789e5ffb3779453fc6f4d7b))
* keep info about hidden material dialog in session storage ([e419fd3](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e419fd39bb5bae943a966987577e24a9e04b4820))
* make elements select dependant on element type select at chemistry filter ([572fc4a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/572fc4aab93a366ba8d6c9256b757f2e65761e37))
* move draw shape button to bottom ([a904247](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a9042479ada9d20807c8612cf6182fd6dbf16fb9))
* refactor filters to vertical style ([f099fd8](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f099fd87127e46cfda5bc51398a852c4d0048e61))
* reset some filters on material filter change ([110fa49](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/110fa49f00e73fa6b6ac834dc17cbf091175acb8))
* set filter values from store on mounted ([bb24b23](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/bb24b2362ae605ec7cad3dcafbaed985fc904f4c))
* set selected value from material dialog also on click outside ([38fd069](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/38fd0695bc49de95b97edeb37b257a4bcc5f20e8))
* show convex hulls on map only on hover ([c106a20](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c106a20006411fa2ae940377f92a901240754a25))
* show only 3 elected filter values and hide the rest in popover ([61cfd75](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/61cfd75d3c57e7ffbf4c4740c788c4a034037141))
* shrink map when opening list ([8f0dd08](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/8f0dd08f0dce2cf14a92deb8e57f18c52449d044))
* switch positions of filters and list button on mobile ([bcdf48d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/bcdf48db9ca49c3daba5954af050e340b8b4235d))
* update base selected items colors ([c91462a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c91462a024bd1bccbb03410216f0475b2dd6a566))
* update colors ([ce6f2f0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ce6f2f09973b1a9c813fa11a184a62b8e9e8e829))
* update display logic of host and inclusion material filters when selecting inclusion types ([490adb2](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/490adb23bef1a4b7b9c76c7cbe579f6ab0c158d4))
* update options active states on mounted in filters ([1ba3dfa](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1ba3dfab16d16081f5435ba626af42a8daca3bad))
* update texts in filters ([97afe1a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/97afe1aa9d970baa8697476daf2106633adef43a))
* use only last response from query when many requests are sent ([699f656](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/699f656b63b0fe5257d51255ded036393886aea2))


### Bug Fixes

* active material filter value ([6b151a0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/6b151a0fa340504c99a9966646f7fc36f940ea8a))
* chemistry input widths ([d639c58](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/d639c5886d28219bf49b121db3d1e921bea5a6ae))
* debounce times ([f0e9eba](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f0e9ebaf323b68104774fb95fa32836c72ee8e38))
* display "draw shape" button on mobile ([18bbdb4](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/18bbdb491994ceaf99a824ccc1032df476d864bc))
* display selected inclusion type ([984f53f](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/984f53f44f39d07944b18a0e5bac18854d07c45f))
* display selected material inclusion ([9f8a97a](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9f8a97a460c8135c43482dc9e45600a3a2a14cf7))
* find also uppercase items in multiselect search ([3f25ca7](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/3f25ca7d761e82dfb23469960a26e844ed08f80f))
* get rock types after mount of comp ([1bd93f6](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/1bd93f613d31759a46e4f431f7e4c0ad1c19ba3e))
* increase debounce time at query request ([c6c7eda](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/c6c7eda3b002b28eea4655a2ed1fc9a5b910c66b))
* make checkbox label clickable ([a57080d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a57080d6f37651b9cfd7b21749352445f0e6a198))
* minor style issues ([2e2892d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2e2892dddf6c2557f0ddc6e292917188be68a1ae))
* remove active state from multiselect options correctly ([a1c038d](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/a1c038d5b8d794c99b18fa3715aba32259952669))
* remove space at filters ([d3cdd22](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/d3cdd22b1b0f922afa25071a76ef64703e3a9c49))
* remove whole rock type when last rock class was removed ([ed8727e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ed8727e13aa253a9b9b408de750fb423407f0d77))
* set tags in multiselect on mount ([f339710](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/f3397109054d838ed5eab39d1bc6059e09475877))
* show close button in dialogs ([b991cf2](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/b991cf24fe0ae7e10cd245fd5b4ac01c378eee66))
* submit on material filter selection and update multiselect height ([d85fd37](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/d85fd37365c3b3d688f0469650adefb87a0c003b))
* uncheck option in multiselect when removed tag ([e05aede](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/e05aedee8ea181e1c0da8e79f39a27c177e8471c))
* update filter container spacing ([9ddf4ee](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/9ddf4ee5eace8774186ee4af7057f9371103a0ee))
* update loading indicator size on mobile ([8e44bc7](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/8e44bc797058fe3ebeb77179f1d8b63f0ed904b0))
* update logo primary color ([96cbadb](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/96cbadb88d6440dc82f7ba241985cff024963ffb))
* update material filter mobile display ([0862c11](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/0862c11cfeb315cc4a872d04d6ab56d12a04ca65))
* update material tabs focus ring ([79148a0](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/79148a05b2b1d41cc3fb704e5851cfa8143e7f18))
* update max visible filter items to 7 ([ea93a5e](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/ea93a5e44fe3edd6328466a317eaaddca2cbbd88))
* update mobile breakpoint value ([2e7d226](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/2e7d226184b653c9696af70b835eb8172e322a3a))
* update multiselect filter options size ([25021de](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/25021dea6a6ff510a4110abac462d48dfed80b90))
* update primary color ([19afa85](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/19afa85d7db504d1b1ca42350c5fd792b640ecba))
* update scrollbar width ([27998a7](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/27998a779c9d7e1061d70918f6444baae9631187))
* update spacings in filters ([4ef37fb](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/4ef37fbdcff68c811492de37ea483d096f6a1cf3))
* update total amount of samples ([58b2242](https://gitlab.gwdg.de/subugoe/georoc-frontend/commit/58b22422282c0dfc8865e1fc443f364924a16028))

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
