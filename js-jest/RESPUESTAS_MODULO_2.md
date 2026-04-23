# **Taller Refactorizacion Gilded Rose - Modulo 2**

**Universidad La Salle Bajio**  
**Facultad de Ingenieria - Ingenieria en Software**

**Materia:** Reingenieria de Software  
**Profesor:** Javier Ivan Manzanares Cuadros

**Alumno:** Bardo Arion Aranda  
**Fecha:** 23 de abril de 2026

## **Introduccion**
En este modulo se trabajo la refactorizacion del codigo legacy de Gilded Rose sin cambiar su comportamiento. La idea fue mejorar la lectura, separar responsabilidades y dejar una estructura mas clara para poder seguir avanzando con seguridad.

La base de este trabajo fue el archivo `js-jest/src/gilded_rose.js`. Antes de hacer cualquier cambio, se verifico que los tests existentes siguieran pasando para asegurar que el comportamiento actual no se rompiera.

## **1. Objetivo del modulo**
El objetivo principal fue limpiar el codigo de `updateQuality()` y sacar la logica de negocio de un solo bloque grande. En lugar de dejar toda la actualizacion dentro de una sola clase, se dividio el comportamiento por tipo de item para que el codigo fuera mas facil de leer, mantener y extender.

## **2. Cambios realizados**
Durante este modulo se hicieron varios pasos pequenos de refactorizacion:

- Se extrajeron constantes para los nombres de los items.
- Se extrajeron constantes para valores magicos como calidad minima, calidad maxima y dias de bonificacion.
- Se redujo el anidamiento de condicionales.
- Se separo la logica de actualizacion por tipo de item.
- Se limpio el recorrido de la lista de items para hacerlo mas simple.
- Se uso una fabrica para decidir que actualizador corresponde a cada item.

Con estos cambios, `Shop` quedo mas ligera y la logica de negocio se movio a clases especificas:

- `NormalItemUpdater`
- `AgedBrieItemUpdater`
- `BackstagePassItemUpdater`
- `SulfurasItemUpdater`
- `ItemUpdaterFactory`

## **3. Verificacion**
Despues de cada cambio se ejecuto la suite de pruebas para confirmar que el comportamiento se mantenia igual. El resultado siguio siendo:

- `14 tests passed`
- `1 test suite passed`

Esto confirmo que la refactorizacion se hizo de forma segura y que no se altero la logica del sistema.

## **4. Commit realizado**
El avance del modulo 2 se fue guardando con commits pequenos para que el historial quedara claro y facil de revisar. El ultimo cambio del refactor quedo registrado con un mensaje similar a este:

```bash
refactor(js): usar comparaciones estrictas y un recorrido mas limpio para actualizar los items
```

## **5. Estado actual**
El proyecto quedo en una mejor posicion para seguir con los siguientes pasos:

- el codigo esta mas ordenado;
- la responsabilidad de cada item esta mas clara;
- los tests siguen protegiendo el comportamiento;
- ya es mas sencillo agregar o ajustar reglas despues.

## **6. Evidencias**
[Insertar captura 1: `npm test` pasando en la carpeta `js-jest`]

[Insertar captura 2: `git log --oneline -1` o el commit del ultimo cambio]

[Insertar captura 3: archivo `js-jest/src/gilded_rose.js` mostrando la separacion por clases]

## **Conclusion**
El modulo 2 sirvio para convertir un metodo largo y cargado de condiciones en una estructura mas clara y mantenible. Todavia no se cambio el comportamiento del sistema, pero si se redujo la complejidad del codigo y se dejo lista la base para el siguiente modulo.

