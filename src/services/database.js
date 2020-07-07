var configV = require('../credentials/credentialsApis')
var MongoClient = require('mongodb').MongoClient;
var validCi = require('../services/validarCedula');
var moment= require("moment");
var consultas={}

async function consultaBD(cedula){
    var collectUser="clientes"
    var conn=(await MongoClient.connect(configV.mongo.url,{useNewUrlParser: true,
        useUnifiedTopology: true}));
    var data=await conn.db(configV.mongo.bd).collection(collectUser).find({numero_cedula:cedula}).toArray();
    conn.close();
    return data;
}
consultas.consultarCliente=async function (cedula){
    //conectarse a sql
    let cliente;
    try {
        let cedulaValida = validCi.validarCedula(cedula)
        if (cedulaValida == "Cedula Correcta") {
            const result = await consultaBD(cedula);
            cliente = result;
            console.log(cliente)
            if(result.length==0){
                return "No tiene Deuda";
            }
            return cliente;
        } else {
            return cedulaValida;
        }
    } catch (err) {
        return err
    }

}
 consultas.consultarPrestamo=async function(cedula) {
    //conectarse a sql
    try {
            var data= await consultaBD(cedula);
            var resultado={"respuesta":[]};
            for(var i in data[0].prestamos){
                /**
               * Interes por mora
               * valor=  Monto*tasaMora/30 dias comerciales
               * total=valor*diasRetraso
               */
                var obj={cedula:null,id:null,label:null,value:{numeroCuota:null}};

                   obj.cedula=cedula;
                   obj.id=data[0].prestamos[i].id_banco;    
                   obj.label=data[0].prestamos[i].nombre_banco;  
                   obj.value.tasaMora=data[0].prestamos[i].tasa_mora; 
                   obj.value.numeroCuota=data[0].prestamos[i].numero_cuota;
                   obj.value.totalCuotas=data[0].prestamos[i].total_cuotas;
                   obj.value.valorCuota=parseFloat(data[0].prestamos[i].valor_cuota).toFixed(2);
                   obj.value.montoTotal=data[0].prestamos[i].monto_total;
                   obj.value.fechaPago=moment(data[0].prestamos[i].fecha_pago).format("yyyy-MM-DD");
                   obj.value.tasaPrestamo=data[0].prestamos[i].tasa_prestamo
                   obj.value.fechaPromesa=moment(Date.now()).format("yyyy-MM-DD");
                   obj.value.dias=diasMora(obj.value.fechaPago, obj.value.fechaPromesa);
                   var interesxCuota=(data[0].prestamos[i].valor_cuota*data[0].prestamos[i].tasa_mora)/30;
                   obj.value.interesValorCuota=parseFloat((interesxCuota*obj.value.dias)+data[0].prestamos[i].valor_cuota).toFixed(2);


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