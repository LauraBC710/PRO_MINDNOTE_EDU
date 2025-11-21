Proceso Personal de Software (PSP) – Versión adaptada a mi proyecto MindNote.EDU

El Proceso Personal de Software (PSP) es un método estructurado que me permitió mejorar mi forma de desarrollar software durante el proyecto MindNote.EDU, aprendiendo a planear mejor, estimar mejor y entregar productos con menos errores.

El PSP fue creado por Watts Humphrey y está diseñado para que un desarrollador, trabajando de manera individual, pueda mejorar continuamente su rendimiento usando datos reales y comparando estimaciones contra resultados.

Objetivos del PSP aplicados a MindNote.EDU

Durante el desarrollo de mi proyecto, el PSP me ayudó a:

✔ Mejorar mis estimaciones

Aprendí a calcular cuántas líneas de código tendría un módulo y cuánto tiempo me tardaría, basándome en mis proyectos anteriores.

✔ Cumplir mejor mis compromisos

Al tener mis fases definidas (requisitos, diseño, desarrollo, pruebas), pude planear avances realistas.

✔ Gestionar la calidad

Registré errores, en qué fase aparecían y en qué fase los arreglaba.
Esto me ayudó a entender dónde fallaba más (por ejemplo, la integración frontend-backend).

✔ Reducir defectos

Al revisar diseño y código antes de ejecutar, evité varios errores que normalmente hubiera detectado mucho más tarde.

Estructura del PSP y cómo la apliqué en MindNote.EDU

El PSP avanza por niveles (PSP0, PSP1, PSP2…), y cada nivel agrega más disciplina.
Este es el resumen de cómo apliqué cada nivel en mi proyecto:

📌 PSP0 y PSP0.1 – Medición y disciplina básica

En esta fase, trabajé así:

✔ Medí:

El tiempo que tardaba en cada tarea.

Los defectos encontrados y corregidos.

El tamaño del código (LOC) de cada módulo.

Esto me permitió crear una línea base sobre mi productividad para estimar mejor.

✔ Apliqué estándares:

Una forma uniforme de nombrar variables y archivos.

Una estructura consistente en NestJS (módulos, controladores, servicios).

Una estructura consistente en React Native (pantallas, componentes, navegación).

✔ Creé mi plan personal de mejoras (PIP)

Incluyendo:

Revisar requisitos antes de programar.

Hacer pruebas por módulo, no solo al final.

Reutilizar más componentes.

Esta fase me dio el control de mis datos.

📌 PSP1 y PSP1.1 – Estimación y planificación

Aquí comencé a estimar seriamente:

✔ Estimé el tamaño de cada módulo

Por ejemplo, en MindNote.EDU:

Autenticación: ~220 LOC

CRUD de tareas: ~200 LOC

API: ~250 LOC

UI y pantallas: ~180 LOC

✔ Usé el método PROBE

Comparé MindNote.EDU con proyectos previos que había hecho para obtener estimaciones más realistas.

✔ Planifiqué el tiempo

Dividiendo el proyecto por semanas, según complejidad del módulo.

Esta fase mejoró muchísimo mi habilidad de cumplir cronogramas.

📌 PSP2 y PSP2.1 – Enfoque en la calidad

Aquí comencé a prevenir errores antes de que ocurrieran:

✔ Hice revisiones de diseño

Antes de programar un módulo, revisé:

Diagramas UML

Flujo del usuario

Endpoints del backend

Campos y reglas necesarias en la base de datos

✔ Hice revisiones de código...

Antes de ejecutar:

Revisé imports

Revisé lógica condicional

Revisé manejo de estados en React Native

Revisé las validaciones del backend

✔ Apliqué checklists

Por ejemplo, antes de probar un endpoint siempre revisaba:

DTO correcto

Validaciones

Autenticación / token

Respuesta del servidor

Esto redujo muchos errores que solían aparecer en integración.

Importancia de los datos en mi proyecto

El PSP se basa en datos, y yo registré:

✔ Tamaño (LOC)

Para medir productividad y estimar futuros módulos.

✔ Tiempo

Cada fase: diseño, codificación, pruebas, correcciones.

✔ Defectos

Dónde se introdujeron y dónde los corregí.

Estos datos me ayudaron a:

Identificar que mis mayores errores estaban en integración.

Detectar que mi fase más lenta era pruebas.

Mejorar mis estimaciones en un 10–15%.

Mediciones derivadas que pude analizar

Con los datos del proyecto, pude obtener:

Productividad: 4.42 LOC/hora

Densidad de defectos: 0.034 defectos por LOC

Diferencia entre tiempo estimado y real: 13%

Distribución de tiempo por fase (diseño/desarrollo/pruebas)

Esto me permitió entender cómo trabajo realmente como desarrolladora.

Planificación y seguimiento en MindNote.EDU

El PSP me enseñó a:

Planear con tiempo realista

Registrar mis avances

Comparar lo estimado vs. lo ejecutado

Ajustar mi trabajo según mis propios datos

Utilicé:

PROBE para estimaciones

Earned Value para seguimiento (versión simplificada)

Calidad en mi desarrollo

El PSP da mucha importancia a la calidad.
Al aplicar revisiones tempranas:

✔ Reduje errores grandes en el backend
✔ Detecté fallos antes de pasar al frontend
✔ Evité retrabajo
✔ Mejoré la estabilidad del sistema

Conclusión personal

El PSP me permitió trabajar MindNote.EDU como una desarrolladora profesional, midiendo mis datos, mejorando mis estimaciones y entendiendo dónde fallaba más.
Aprendí que la calidad no es algo que se revisa al final, sino durante todo el proceso.

Este método me ayudó a:

Conocer mi estilo de trabajo

Mejorar mis tiempos

Tener menos errores

Entregar un producto sólido

Y seguiré aplicándolo en futuros proyectos.