var configV = require('../credentials/credentialsApis')
var sql = require("mssql");
var validCi = require('../services/validarCedula');
var moment= require("moment");
var consultas={}
// config for your database
var config = {
    user: configV.sqlServer.user,
    password: configV.sqlServer.password,
    server: configV.sqlServer.ipserver,
    database: configV.sqlServer.database,
    //port:1434,
    options: {
        enableArithAbort: true,
        encrypt: false
    }
};

consultas.consultarCliente=async function (cedula){
    //conectarse a sql
    let cliente;

    try {
        let cedulaValida = validCi.validarCedula(cedula)
        if (cedulaValida == "Cedula Correcta") {
            await sql.connect(config)
            const result = await sql.query`Select *from clientes where numero_cedula=${cedula}`
            cliente = result;
            if(result.recordset.length==0){
                return "No tiene Deuda";
            }
            return cliente.recordset;
        } else {
            return cedulaValida;
        }
    } catch (err) {
        return err
    }

}
 consultas.consultarPrestamo=async function(cedula) {
    //conectarse a sql
    let data;
    try {
            await sql.connect(config)
            const result = await sql.query`Select b.numero_cedula, a.id_banco,a.nombre_banco, a.tasa_mora,a.numero_cuota,a.total_cuotas,a.monto_total,a.valor_cuota,a.fecha_pago,a.tasa_prestamo from prestamos a, clientes b where a.id_cliente = b.id_cliente and b.numero_cedula=${cedula}`
            data = result;
            var resultado={"respuesta":[]};
            console.log(data.recordset);
            for(var i in  data.recordset){
                /**
               * Interes por mora
               * valor=  Monto*tasaMora/30 dias comerciales
               * total=valor*diasRetraso
               */
                var obj={cedula:null,id:null,label:null,value:{numeroCuota:null}};
                   obj.cedula=data.recordset[i].numero_cedula;
                   obj.id=data.recordset[i].id_banco;    
                   obj.label=data.recordset[i].nombre_banco;  
                   obj.value.tasaMora=data.recordset[i].tasa_mora; 
                   obj.value.numeroCuota=data.recordset[i].numero_cuota;
                   obj.value.totalCuotas=data.recordset[i].total_cuotas;
                   obj.value.valorCuota=parseFloat(data.recordset[i].valor_cuota).toFixed(2);
                   obj.value.montoTotal=data.recordset[i].monto_total;
                   obj.value.fechaPago=moment(data.recordset[i].fecha_pago).format("yyyy-MM-DD");
                   obj.value.fechaPromesa=moment(Date.now()).format("yyyy-MM-DD");
                   obj.value.tasaPrestamo=data.recordset[i].tasa_prestamo
                   obj.value.dias=diasMora(obj.value.fechaPago, obj.value.fechaPromesa);
                   var interesxCuota=(data.recordset[i].valor_cuota*data.recordset[i].tasa_mora)/30;
                   obj.value.interesValorCuota=parseFloat((interesxCuota*obj.value.dias)+data.recordset[i].valor_cuota).toFixed(2);
                   resultado.respuesta.push(obj);
                   console.log(obj.value);
            }
            return resultado;

    } catch (err) {
        return err
    }

}

function diasMora(fechaI,fechaF){
    var fechaInicio = new Date(fechaI).getTime();
    var fechaFin    = new Date(fechaF).getTime();
    var diff = fechaFin - fechaInicio;
    return diff/(1000*60*60*24); 
}

module.exports.consultas = consultas;