# Taller Refactorizacion Gilded Rose - Modulo 1

Universidad La Salle Bajio  
Facultad de Ingenieria - Ingenieria en Software  
Materia: Reingenieria de Software  
Profesor: Javier Ivan Manzanares Cuadros  

Alumno: Bardo Arion Aranda  
Fecha: 21 de abril de 2026  

## 1. Lectura de requisitos

### Cuantos tipos de items diferentes se mencionan?

Se mencionan cinco tipos de items:

1. Item normal.
2. Aged Brie.
3. Sulfuras, Hand of Ragnaros.
4. Backstage passes to a TAFKAL80ETC concert.
5. Conjured, que es el nuevo item que se implementara al final del kata.

### Cual es el comportamiento de cada uno?

El item normal pierde calidad con el paso del tiempo. Antes de la fecha de venta pierde 1 punto de calidad por dia y, cuando la fecha ya paso, pierde 2 puntos por dia.

Aged Brie aumenta su calidad conforme envejece. Antes de la fecha de venta aumenta 1 punto y, despues de la fecha de venta, aumenta 2 puntos. Su calidad no debe superar 50.

Sulfuras es un item legendario. No baja su calidad, no cambia su sellIn y su quality se mantiene en 80.

Backstage passes aumenta su calidad mientras se acerca el concierto: aumenta 1 punto cuando faltan mas de 10 dias, aumenta 2 puntos cuando faltan 10 dias o menos, aumenta 3 puntos cuando faltan 5 dias o menos, y despues del concierto su calidad cae a 0.

Conjured es el item nuevo que se implementara en un modulo posterior. Su regla indica que se degrada el doble de rapido que un item normal.

### Que significa sellIn?

sellIn representa la cantidad de dias que quedan para vender el item. Al final de cada dia, el sistema reduce este valor para todos los items, excepto Sulfuras.

### Que significa quality?

quality representa que tan valioso es el item. En general, la calidad baja con el tiempo, aunque existen items especiales como Aged Brie y Backstage passes que aumentan su calidad bajo ciertas condiciones.

### Cuales son los limites de quality?

La calidad de un item nunca debe ser negativa y nunca debe ser mayor que 50. La excepcion es Sulfuras, que es un item legendario con calidad fija de 80.

### Cual es la restriccion mas importante sobre la clase Item?

La restriccion principal es no modificar la clase Item ni la propiedad items de GildedRose/Shop. Esta regla simula codigo compartido o de terceros que no se puede cambiar directamente.

### Que nuevo item hay que implementar al final del kata?

El nuevo item es Conjured. Su comportamiento esperado es degradarse el doble de rapido que un item normal.

## 2. Ficha de analisis de codigo legacy

### Olores de codigo detectados

- Metodo demasiado largo: updateQuality concentra toda la logica de negocio en un solo metodo.
- Condicionales anidados: existen varios if dentro de otros if, lo que dificulta leer los casos de negocio.
- Numeros magicos: aparecen valores como 0, 50, 80, 11 y 6 sin nombres descriptivos.
- Strings literales repetidos: se usan directamente nombres como "Aged Brie", "Sulfuras, Hand of Ragnaros" y "Backstage passes to a TAFKAL80ETC concert".
- Falta de abstraccion: cada tipo de item se decide por comparaciones de texto dentro del mismo metodo.
- Baja separacion de responsabilidades: Shop actualiza todos los comportamientos, valida limites y conoce reglas especificas de cada item.

### Puntos de cambio para agregar Conjured

El punto de cambio estaria dentro de src/gilded_rose.js, en el metodo updateQuality, aproximadamente entre las lineas 14 y 57. Directamente ahi se decide como se modifica quality y sellIn segun el nombre del item.

El riesgo de modificar ahi directamente es alto porque la logica ya esta muy anidada. Agregar otro caso con mas condicionales puede romper el comportamiento de items existentes como Aged Brie, Sulfuras o Backstage passes. Por eso primero se construyo una red de tests de caracterizacion.

### Dependencias identificadas

La clase Shop usa objetos de la clase Item. Cada Item tiene tres propiedades: name, sellIn y quality. El metodo updateQuality es llamado por los tests y representa la actualizacion diaria del inventario.

### Preguntas sin respuesta o comportamientos ambiguos

- Que deberia pasar si un item entra con quality negativa?
- Que deberia pasar si un item entra con quality mayor a 50 y no es Sulfuras?
- Que comportamiento exacto debe tener un item con nombre desconocido?
- Debe validarse el nombre del item o simplemente tratarse como item normal?
- Conjured debe degradarse el doble tambien despues de sellIn menor que 0?

## 3. Red de seguridad con tests de caracterizacion

Se trabajo en la variante JavaScript con Jest, dentro de la carpeta js-jest.

Archivo de tests:

`test/gilded_rose.test.js`

La suite incluye 14 tests de caracterizacion que cubren:

- Items normales antes y despues de la fecha de venta.
- Limite inferior de quality en 0.
- Comportamiento de nombres desconocidos.
- Aged Brie antes y despues de la fecha de venta.
- Limite superior de quality en 50.
- Sulfuras sin cambios en quality ni sellIn.
- Backstage passes con mas de 10 dias, con 10 dias o menos, con 5 dias o menos, despues del concierto y cerca del limite de calidad.

Comando de ejecucion:

```bash
npm test
```

Resultado esperado:

```text
14 tests passed
```

## 4. Commit obligatorio del modulo

Comando solicitado por el taller:

```bash
git add .
git commit -m "test: add characterization tests as safety net"
```

Este commit representa la red de seguridad antes de cualquier refactorizacion o implementacion de nueva funcionalidad.
