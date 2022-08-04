/**
 * @swagger
 * components:
 *  schemas:
 *      departamentos:
 *          type: object
 *          properties:
 *              codigo:
 *                  type: string
 *                  description: código de los departamentos
 *              nombre:
 *                  type: string
 *                  description: códico de los departamentos 
 *              presupuesto:
 *                  type: string
 *                  description: presupuestos de los departamentos  
 *          required: 
 *                  - codigo:
 *                  - nombre:
 *                  - presupuesto:
 *      empleados:
 *          type: object
 *          properties:
 *              codigo:
 *                  type: string
 *                  description: código de los empleados 
 *              nit:
 *                  type: string
 *                  description: nit de los empleados
 *              nombre:
 *                  type: string
 *                  description: nombre de los empleados
 *              apellido1:
 *                  type: string
 *                  description: primer apellido del empleado
 *              apellido2:
 *                  type: string
 *                  description: segundo apellido del empleado
 *              codigo_departamento:
 *                  type: string
 *                  description: código del departamento que corresponde el empleado
 *          required: 
 *                  - codigo:
 *                  - nit
 *                  - nombre:
 *                  - apellido1:
 *                  - apellido2:
 *                  - codigo_departamento
 *          
 * 
*/
/**
 * @swagger
 * /api/departamento:
 *  get:
 *      summary: Trae todas los departamentos
 *      tags: [departamentos]
 *      responses:
 *          200:
 *              description: Lista de todos los departamentos
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/departamentos'
 *
 */
/**
 * @swagger
 * /api/departamento/{codigo}:
 *  get:
 *      summary: Consulta los departamentos por su id 
 *      tags: [departamentos]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: codigo Identificador de los departamentos
 *      responses:
 *          200:
 *              description: Se consultó departamentos por su Codigo
 *          500:
 *              description: Error en el servidor
 */
/**
 * @swagger
 * /api/departamento/{codigo}:
 *  put:
 *      summary: Edita un departamentos pasándole el codigo como parámetro
 *      tags: [departamentos]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de los departamentos
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/codigo'
 *      responses:
 *          200:
 *              description: Se editó de manera correcta 
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/users'
 *          400:
 *              description: Error en envío de datos por parte del cliente 
 *          500:
 *              description: Error en el servidor
 */
/** 
 * @swagger
 * /api/departamento/{codigo}:
 *  delete:
 *      summary: Elimina los departamentos pasándole el ID como parámetro
 *      tags: [departamentos]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de la departamentos
 *      responses:
 *          200:
 *              description: departamentos eliminada
 *          500:
 *              description: Error en el servidor
 *
 */

/**
 * @swagger
 * /api/departamento:
 *  post:
 *      summary: Crea un nuevo departamentos
 *      tags: [departamentos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/departamentos'
 *      responses:
 *          200:
 *              description: departamentos creado
 *          400:
 *              description: departamento no creada por error en el envío de datos
 *          500:
 *              description: Error en el servidor
*/
/**
 * @swagger
 * /api/empleados:
 *  get:
 *      summary: Trae todas los empleados
 *      tags: [empleados]
 *      responses:
 *          200:
 *              description: Lista de todos los empleados
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/empleados'
 *
 */
/**
 * @swagger
 * /api/empleados/{codigo}:
 *  get:
 *      summary: Consulta los empleados por su código 
 *      tags: [empleados]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de los empleados
 *      responses:
 *          200:
 *              description: Se consultó empleados por su código
 *          500:
 *              description: Error en el servidor
 */
/** 
 * @swagger
 * /api/empleados/{codigo}:
 *  delete:
 *      summary: Elimina los empleados pasándole el codigo como parámetro
 *      tags: [empleados]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de los empleados
 *      responses:
 *          200:
 *              description: empleados eliminados
 *          500:
 *              description: Error en el servidor
 *
 */
/**
 * @swagger
 * /api/empleados:
 *  post:
 *      summary: Crea un nuevo empleado
 *      tags: [empleados]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/empleados'
 *      responses:
 *          200:
 *              description: empleado creado
 *          400:
 *              description: empleado no creada por error en el envío de datos
 *          500:
 *              description: empleado no creada por error en el servidor
*/

/**
 * @swagger
 * /api/empleados/{codigo}:
 *  put:
 *      summary: Edita un empleado pasándole el código como parámetro
 *      tags: [empleados]
 *      parameters:
 *        - in: path
 *          name: codigo
 *          schema:
 *              type: string
 *          required: true
 *          description: Identificador de los empleados
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/codigo'
 *      responses:
 *          200:
 *              description: Se editó de manera correcta 
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/users'
 *          400:
 *              description: Error en envío de datos por parte del cliente 
 *          500:
 *              description: Error en el servidor
 */