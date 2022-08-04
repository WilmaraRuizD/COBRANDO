const express =require("express");
const router = express.Router();
const { pool } = require ("../db/config");
const validator = require('express-joi-validation').createValidator({})
const { empleadosShema } = require("../schemas-joi/company")


router.get('/', (req, res) => {
    res.send('Hello world')
  })

router.get('/empleados',async(req,res)=>{
    let cliente = await pool.connect()
    try{
        let result =await cliente.query('SELECT * FROM empleados')
        res.json(result.rows)
    } catch(err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal error server' })
}
})


router.get('/empleados/:codigo_empleados', async(req,res)=>{
    let cliente = await pool.connect()
    const { codigo_empleados } = req.params  
    try{
        let result =await cliente.query(`SELECT * FROM empleados WHERE codigo_empleados = $1`,
        [codigo_empleados])
       if(result.rows.length>0){
        res.json(result.rows)
       }else{
           res.send('NO EXISTE EMPLEADOS')
       }
    } catch(err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal error server' })
}
})

router.post('/empleados',validator.body(empleadosShema),async(req,res)=>{
    try{
       
        const{
            nit,
            nombre,
            apellido1,
            apellido2,
            fk_departamento
        }= req.body
        const cliente=await pool.connect()
        const response=await cliente.query( `INSERT INTO empleados(nit,nombre,apellido1,apellido2,fk_departamento)VALUES($1,$2,$3,$4,$5)RETURNING codigo_empleados`,
        [
            nit,
            nombre,
            apellido1,
            apellido2,
            fk_departamento
        ])
        if (response.rowCount > 0) {res.send ('Se crea empleado correctamente')
    }
    else{  res.json({ message: 'No se pudo crear el usuario' })}
    }catch(err){console.log(err)
        res.status(500).json({ error: 'Internal error server' })
    }
 } )

 router.put('/empleados/:codigo_empleados',validator.body(empleadosShema),async(req,res)=>{
    let cliente=await pool.connect()
    const{ codigo_empleados }=req.params
    const{ 
        nit,
        nombre,
        apellido1,
        apellido2,
        fk_departamento
    }= req.body
  
    try{
        const result=await cliente.query(`UPDATE empleados SET nit = $1,nombre = $2, apellido1=$3,apellido2=$4,fk_departamento=$5 WHERE codigo_empleados = $6`,
    [
        nit,
        nombre,
        apellido1,
        apellido2,
        fk_departamento,
        codigo_empleados
    ])
    if (result.rowCount > 0) {
        res.json({ message: 'Actualización realizada correctamente' })
      } else { res.status(503)
        .json({ message: 'Ocurrio un envento inesperado, intente de nuevo' })}
    }
catch (err) {
    console.log({ err })
    res.status(500).json({ error: 'Internal error server' })
}
})


router.delete('/empleados/:codigo_empleados', async (req, res) => {
    let cliente = await pool.connect()
    const {codigo_empleados } = req.params
    console.log(codigo_empleados)
    try {
      const result= await cliente.query(
        `SELECT * FROM empleados WHERE codigo_empleados = $1`,
        [codigo_empleados]
      )
      if (result.rows.length > 0) {
        const result = await cliente.query(`DELETE FROM empleados WHERE codigo_empleados= $1`, [
            codigo_empleados
        ])
        if (result.rowCount > 0) res.send('Empleado eliminado exitosamente')
        else res.send('No se eliminó, ocurrió un evento inesperado')
      } else {
        res.status(409).json({ message: 'Error en dato en dato enviado' })
      }
    } catch (err) {
      if (err.code == 23503) {
        res
          .status(417)
          .json({ error: 'No se puede eliminar desde aquí este dato' })
      }
      res.status(500).json({ error: 'Error server' })
    } finally {
      cliente.release(true)
    }

})


module.exports = router

