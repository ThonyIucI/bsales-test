# bsales-test
## Front End
Se presenta una SPA de productos de distintas categorías. los productos pueden filtrarse por nombre,
categorías, precio y descuento. Para ejecutar la acción de filtrar basta con presionar el botón "buscar"
en la barra de navegación.

Filtro por Nombre: Se ingresa el nombre deseado en la barra de búsqueda, una vez se presiona el botón de 
buscar se devuelven los productos cuyo nombre coincida con la palabra añadida.
Filtro por Categoría: Se seleccionan las categorías deseadas, puede elegirse las categorías que desee y presiona el botón de buscar.
Filtros por Precio: En las inputs correspondientes se ingresa un valor máximo, mínimo o ambos. 
Se devolverán los productos cuyo precio se encuentre en el rango indicado. Si no se indica algún valor, se tomará 0 y el máximo valor de precio posible.
Filtros por Descuento: En las inputs correspondientes a descuentos se ingresa un valor máximo, mínimo o ambos. 
Se devolverán los productos cuyo precio se encuentre en el rango indicado. Si no se indica algún valor, se tomará 0 y 100 como valores extremos.

Puede seleccionarse más de un filtro a la vez, de tal modo que pueda buscar productos por nombre que correspondan a una determinada categoría y con un descuento específico o precio.

El Frontend de esta aplicación se desarrolló usando únicamente HTML, CSS y Javascript puro, sin ningún framwork adicional. 
[Link de deploy](https://bsales-test.herokuapp.com/)

## Back End
El backend está estructurado usando el ORM sequelize, para hacer una mejor manejo de los datos en el entorno Node JS. el motor usado es MySQL.

Las peticiones se realizan a la ruta: "https://bsales-api.herokuapp.com/api", y se han subdividido en dos controladores principales:
### Productos:
- POST: "/products"-> Devuelve los productos solicitados, recibe por body los filtros solicitados desde el Front, cuando no se especifica todos los filtros se devuelven todos los productos existentes.
- GET: "/prices"-> Devuelven todos los precios existentes.
- GET: "/discounts"-> Devuelven todos los descuentos existentes.

### Categorias: 
- GET: "/categories"-> Develven las categorías de clasificación de los productos. 
