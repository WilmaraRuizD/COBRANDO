const express =require("express");
const router = express.Router();
const { pool } = require ("../db/config");
const validator = require('express-joi-validation').createValidator({})
const { departamentoShema } = require("../schemas-joi/company")

router.get('/departamento',async(req,res)=>{
    let cliente = await pool.connect()
    try{
        let result =await cliente.query('SELECT * FROM departamento')
        res.json(result.rows)
    } catch(err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal error server' })
}
})

router.get('/departamento/:codigo_departamento', async(req,res)=>{
    let cliente = await pool.connect()
    const {  codigo_departamento } = req.params  
    try{
        let result =await cliente.query(`SELECT * FROM departamento WHERE  codigo_departamento = $1`,
        [ codigo_departamento])
       if(result.rows.length>0){
        res.json(result.rows)
       }else{
           res.send('NO EXISTE departamento')
       }
    } catch(err) {
        console.log({ err })
        res.status(500).json({ error: 'Internal error server' })
}
})

 router.post('/departamento',validator.body(departamentoShema),async(req,res)=>{
   try{
        const{
             nombre,
             presupuesto
         }= req.body
        const cliente=await pool.connect()
         const response=await cliente.query( `INSERT INTO departamento(nombre,presupuesto)VALUES($1,$2)RETURNING codigo_departamento`,
         [
             nombre,
            presupuesto
         ])
         if (response.rowCount > 0) {res.send ('Se crea departamento correctamente')
    }
     else{  res.json({ message: 'No se pudo crear el departamento' })}
     }catch(err){console.log(err)
         res.status(500).json({ error: 'Internal error server' })
     }
  } )

  router.put('/departamento/:codigo_departamento',validator.body(departamentoShema),async(req,res)=>{
 let cliente=await pool.connect()
  const{ codigo_departamento }=req.params
    const{ 
        nombre,
        presupuesto
     }= req.body
  
     try{
         const result=await cliente.query(`UPDATE departamento SET nombre = $1,presupuesto = $2 WHERE codigo_departamento = $3`,
     [
       nombre,
       presupuesto,
       codigo_departamento

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
  
 
router.delete('/departamento/:codigo_departamento', async (req, res) => {
    let cliente = await pool.connect()
    const {codigo_departamento } = req.params
    console.log(codigo_departamento)
    try {
      const result= await cliente.query(
        `SELECT * FROM departamento WHERE codigo_departamento = $1`,
        [codigo_departamento]
      )
      if (result.rows.length > 0) {
        const result = await cliente.query(`DELETE FROM departamento WHERE codigo_departamento= $1`, [
            codigo_departamento
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

