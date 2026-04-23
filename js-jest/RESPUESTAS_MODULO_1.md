# **Taller Refactorizacion Gilded Rose - Modulo 1**

**Universidad La Salle Bajio**  
Facultad de Ingenieria - Ingenieria en Software

**Materia:** Reingenieria de Software  
**Profesor:** Javier Ivan Manzanares Cuadros

**Alumno:** Bardo Arion Aranda  
**Fecha:** 21 de abril de 2026

## **Introduccion**
Este modulo sirve para entender el comportamiento de un sistema legacy antes de tocarlo. La idea fue revisar los requisitos, leer el codigo real y crear pruebas que protejan el comportamiento actual.

En este kata trabaje con la version de **JavaScript** usando **Jest**, porque ahi me resulto mas claro hacer los tests de caracterizacion y mantener el comportamiento del sistema bajo control.

## **1. Preparacion del entorno**
Repositorio usado:

`git clone https://github.com/BardoArionAranada/GildedRose-Refactoring-Kata.git`

Carpeta de trabajo:

`D:\08_Octavo semestre La Salle\REINGENIERÍA DE SOFTWARE\REINIGIENERIA\TAREA COLONAR REPO\GildedRose-Refactoring-Kata`

Ruta trabajada en este modulo:

`js-jest`

Rama utilizada:

`practica/refactoring-gilded-rose`

Comandos que use:

```bash
git clone https://github.com/BardoArionAranada/GildedRose-Refactoring-Kata.git
cd GildedRose-Refactoring-Kata
git switch -c practica/refactoring-gilded-rose
cd js-jest
npm ci
npm test
```

## **2. Lectura de requisitos**
Se mencionan **cinco tipos de items**:

- Item normal
- Aged Brie
- Sulfuras, Hand of Ragnaros
- Backstage passes to a TAFKAL80ETC concert
- Conjured

### **Comportamiento de cada uno**
- **Item normal:** baja 1 de quality por dia y, despues de `sellIn`, baja 2.
- **Aged Brie:** sube de quality con el tiempo y no puede pasar de 50.
- **Sulfuras:** no cambia `sellIn`, no cambia `quality` y se queda en 80.
- **Backstage passes:** sube mas rapido conforme se acerca el concierto y luego cae a 0.
- **Conjured:** se degrada el doble de rapido que un item normal.

### **sellIn**
Es el numero de dias que faltan para vender el item.

### **quality**
Es el valor del item. En general baja con el tiempo, aunque algunos items especiales suben.

### **Limites**
- `quality` no debe ser negativa.
- `quality` normalmente no debe pasar de 50.
- La excepcion es **Sulfuras**, que siempre vale 80.

### **Restriccion importante**
No se debe modificar la clase **Item** ni la propiedad **items** de **Shop**.

## **3. Analisis del codigo legacy**
Archivo principal analizado:

`js-jest/src/gilded_rose.js`

Metodo principal:

`updateQuality()`

Ahí se concentra casi toda la logica del sistema. El codigo mezcla reglas de negocio, validaciones y actualizacion diaria en un solo metodo, por eso es dificil de leer y mantener.

## **4. Olores de codigo detectados**
- Metodo demasiado largo.
- Condicionales anidados.
- Strings literales repetidos.
- Numeros magicos.
- Falta de abstraccion.
- Baja separacion de responsabilidades.

## **5. Puntos de cambio para agregar Conjured**
La logica de **Conjured** se agregaria dentro de `updateQuality()`, en la parte donde se revisa el nombre del item.

El riesgo de tocar esa zona directo es que el metodo ya tiene mucha logica anidada. Agregar algo nuevo sin pruebas podria romper items como **Aged Brie**, **Sulfuras** o **Backstage passes**.

## **6. Dependencias identificadas**
La clase **Shop** trabaja con objetos **Item**. Cada item usa:

- `name`
- `sellIn`
- `quality`

La relacion principal es:

- **Shop** contiene una lista de **Item**
- **Shop** ejecuta `updateQuality()`
- `updateQuality()` modifica `sellIn` y `quality`

## **7. Preguntas ambiguas**
- ¿Que pasa si un item entra con `quality` negativa?
- ¿Que pasa si entra con `quality` mayor a 50 y no es Sulfuras?
- ¿Un item desconocido se trata como item normal?
- ¿Conjured debe degradarse igual cuando `sellIn` ya es menor que 0?

## **8. Red de seguridad con tests**
Se reemplazo el test falso inicial por una suite de **14 tests de caracterizacion** en `js-jest/test/gilded_rose.test.js`.

Casos cubiertos:

- Item normal antes y despues de `sellIn`
- Limite inferior de `quality`
- Item desconocido
- Aged Brie antes y despues de `sellIn`
- Limite superior de `quality`
- Sulfuras
- Backstage passes en varios escenarios

Comando para correrlo:

```bash
npm test
```

## **9. Evidencia del commit**
El commit que guarda la red de seguridad es:

```bash
git commit -m "test: add characterization tests as safety net"
```

Ese commit representa el punto donde el sistema ya tiene una base segura antes de refactorizar.

## **10. Conclusiones**
En este modulo entendi el comportamiento real del sistema, identifique sus problemas principales y deje pruebas para protegerlo. Con eso ya se puede avanzar al modulo 2 sin tocar a ciegas el codigo de produccion.
