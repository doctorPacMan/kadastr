# Rosreestr test task
npm install  
npm run start

http://localhost:9000/

Реализовано нативными средствами на TypeScript и завёрнуто в React компонент.  
Недолго перезавернуть в то что нужно. Либо использовать непосредственно без обёртки.  
Поскольку апи rosreestr не отдаёт CORS заголовки, то запросы проксируются средствами webpack-dev-server

Компонент FirObjects состоит из трёх компонентов  
Search - форма поиска  
Table - вывод результатов поиска  
Details - вывод информации по объекту

Хранилище (/stores/FirObjects.ts) занимается загрузкой, хранением, выдачей и обработкой
экземпляров сущности "Объект недвижимости" (модель - /models/FirObject.ts)
