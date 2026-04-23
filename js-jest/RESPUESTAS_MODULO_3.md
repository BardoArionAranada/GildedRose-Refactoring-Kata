# **Taller Refactorizacion Gilded Rose - Modulo 3**

**Universidad La Salle Bajio**  
**Facultad de Ingenieria - Ingenieria en Software**

**Materia:** Reingenieria de Software  
**Profesor:** Javier Ivan Manzanares Cuadros

**Alumno:** Bardo Arion Aranda  
**Fecha:** 23 de abril de 2026

## **Introduccion**
En este modulo se agrego la nueva funcionalidad de **Conjured** sobre el codigo ya refactorizado en el modulo 2. La idea fue continuar con cambios pequenos y seguros, apoyandose en las pruebas que ya protegen el comportamiento del sistema.

## **1. Objetivo del modulo**
El objetivo principal fue implementar Conjured sin romper lo que ya funcionaba. Para eso primero se escribieron pruebas que describieran el comportamiento esperado y despues se ajusto el codigo para cumplirlas.

## **2. Cambios realizados**
Se agregaron casos de prueba para Conjured y luego se incluyo una clase especifica para su comportamiento dentro de `js-jest/src/gilded_rose.js`.

Los cambios principales fueron:

- nueva constante para el item Conjured;
- nueva clase `ConjuredItemUpdater`;
- integracion de Conjured en `ItemUpdaterFactory`;
- validacion de que la calidad baja al doble de velocidad;
- mantenimiento del limite inferior de calidad en 0.

## **3. Verificacion**
Despues de implementar la logica, se ejecuto la suite completa de pruebas y el resultado fue:

- `17 tests passed`
- `1 test suite passed`

Esto confirma que Conjured funciona y que el resto del sistema sigue estable.

## **4. Commit realizado**
El cambio se guardara con un commit descriptivo en español, por ejemplo:

```bash
feat(js): agregar el comportamiento de Conjured sin romper los demas items
```

## **5. Evidencias**
[Insertar captura 1: `npm test` con los 17 tests pasando]

[Insertar captura 2: archivo `js-jest/src/gilded_rose.js` mostrando la clase `ConjuredItemUpdater`]

[Insertar captura 3: `git log --oneline -1` con el commit del modulo 3]

## **Conclusion**
El modulo 3 sirvio para agregar una regla nueva sobre una base ya mas limpia y segura. Gracias a la refactorizacion previa, la funcionalidad de Conjured se pudo integrar de forma directa y con menos riesgo para el resto del sistema.

