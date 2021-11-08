/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import objetos.CostoHosting;
import objetos.GananciaSuscripcion;
import objetos.Pago;
import objetos.Revista;
import objetos.Suscripcion;

/**
 *
 * @author fernanrod
 */
public class ControlSuscripciones {
    public static void crearSuscripcion(Suscripcion suscripcion, String periodoPagado, Integer tiempoPagado) throws SQLException {
        Connection conexion = ConexionDB.getConnection();
        try {
            conexion.setAutoCommit(false);
            PreparedStatement crearSuscripcion = conexion.prepareStatement("INSERT INTO "+ 
                                                                           "suscripcion(usuario,revista,fecha_suscripcion,fecha_cancelacion) "+
                                                                           "VALUES(?,?,?,?)",
                                                                            Statement.RETURN_GENERATED_KEYS); //Se obtiene el id de la revista creada
            crearSuscripcion.setString(1, suscripcion.getUsuario());
            crearSuscripcion.setInt(2, suscripcion.getRevista());
            crearSuscripcion.setObject(3, suscripcion.getFechaSuscripcion());
            crearSuscripcion.setObject(4, suscripcion.getFechaCancelacion());
            crearSuscripcion.executeUpdate();
            
            
            int idSuscripcionCreada;
            ResultSet idSuscripcion = crearSuscripcion.getGeneratedKeys();
            if (idSuscripcion.next()) {
                idSuscripcionCreada = idSuscripcion.getInt(1);
            } else {
                throw new SQLException();
            }
            
            PreparedStatement crearPago = conexion.prepareStatement("INSERT INTO "+
                                                                    "pago(usuario,suscripcion,fecha_pago,periodo,tiempo_pagado) "+
                                                                    "VALUES(?,?,?,?,?)");
            crearPago.setString(1, suscripcion.getUsuario());
            crearPago.setInt(2, idSuscripcionCreada);
            crearPago.setObject(3, suscripcion.getFechaSuscripcion());
            crearPago.setString(4, periodoPagado);
            crearPago.setInt(5, tiempoPagado);
            crearPago.executeUpdate();
            conexion.commit();
            crearSuscripcion.close();
            crearPago.close();
        } catch (SQLException e) {
            conexion.rollback();
            throw new SQLException();
        } finally {
            conexion.setAutoCommit(true);
        }
    }
    
    public static Suscripcion obtenerSuscripcion(Integer idRevista, String username) throws SQLException {
        PreparedStatement obtenerSuscripcion = ConexionDB.getConnection().prepareStatement("SELECT * FROM suscripcion WHERE usuario=? AND revista=? AND fecha_cancelacion IS NULL");
        obtenerSuscripcion.setString(1, username);
        obtenerSuscripcion.setInt(2, idRevista);
        ResultSet suscripcion = obtenerSuscripcion.executeQuery();
        if (suscripcion.next()) {
            Suscripcion suscripcionRetorno = 
            new Suscripcion(
                suscripcion.getInt("id"), 
                suscripcion.getString("usuario"), 
                suscripcion.getInt("revista"), 
                suscripcion.getDate("fecha_suscripcion"), 
                suscripcion.getDate("fecha_cancelacion"));
        obtenerSuscripcion.close();
        return suscripcionRetorno;
            
        } else {
            obtenerSuscripcion.close();
            throw new SQLException();
        }
    }
    
    public static void agregarPago(Pago pago) throws SQLException {
        PreparedStatement agregarPago = ConexionDB.getConnection().prepareStatement("INSERT INTO pago(usuario,suscripcion,fecha_pago,periodo,tiempo_pagado) "+
                                                                                    "VALUES(?,?,?,?,?)");
        agregarPago.setString(1, pago.getUsuario());
        agregarPago.setInt(2, pago.getSuscripcion());
        agregarPago.setObject(3, pago.getFechaPago());
        agregarPago.setString(4, pago.getPeriodo());
        agregarPago.setInt(5, pago.getTiempoPagado());
        agregarPago.executeUpdate();
        agregarPago.close();
    }
    
    public static ArrayList<Pago> obtenerPagos(Suscripcion suscripcion) throws SQLException {
        ArrayList<Pago> pagos = new ArrayList<>();
        PreparedStatement obtenerPagos = ConexionDB.getConnection().prepareStatement("SELECT * FROM pago WHERE suscripcion = ? ORDER BY fecha_pago DESC");
        obtenerPagos.setInt(1, suscripcion.getId());
        ResultSet pagosObtenidos = obtenerPagos.executeQuery();
        while (pagosObtenidos.next()) {
            pagos.add(
                new Pago(
                    pagosObtenidos.getString("usuario"), 
                    pagosObtenidos.getInt("suscripcion"), 
                    pagosObtenidos.getDate("fecha_pago"), 
                    pagosObtenidos.getString("periodo"), 
                    pagosObtenidos.getInt("tiempo_pagado")));
        }
        obtenerPagos.close();
        return pagos;
    }
    
    public static ArrayList<Suscripcion> obtenerSuscripciones(Integer idRevista) throws SQLException {
        ArrayList<Suscripcion> suscripciones = new ArrayList<>();
        PreparedStatement obtenerSuscripciones = ConexionDB.getConnection().prepareStatement("SELECT * FROM suscripcion WHERE revista = ? ORDER BY fecha_suscripcion DESC");
        obtenerSuscripciones.setInt(1, idRevista);
        ResultSet suscripcionesObtenidas = obtenerSuscripciones.executeQuery();
        while (suscripcionesObtenidas.next()) {
            suscripciones.add(
                new Suscripcion(
                    suscripcionesObtenidas.getInt("id"), 
                    suscripcionesObtenidas.getString("usuario"), 
                    suscripcionesObtenidas.getInt("revista"), 
                    suscripcionesObtenidas.getDate("fecha_suscripcion"), 
                    suscripcionesObtenidas.getDate("fecha_cancelacion"))
            );
        }
        suscripcionesObtenidas.close();
        return suscripciones;
    }
    
    public static Map<Date,Date> crearPeriodosPago(Suscripcion suscripcion) throws SQLException {
        Map<Date, Date> periodosPago = new HashMap<>();
        ArrayList<Pago> pagosDeSuscripcion = obtenerPagos(suscripcion);
        
        String periodo = pagosDeSuscripcion.get(0).getPeriodo();
        int mesesAgregar = periodo.equals("MENSUAL")? pagosDeSuscripcion.get(0).getTiempoPagado() : pagosDeSuscripcion.get(0).getTiempoPagado()*12;
        Date fechaFinalPeriodo = agregarMesesFecha(suscripcion.getFechaSuscripcion(), mesesAgregar);
        Date fechaInicioPeriodo = suscripcion.getFechaSuscripcion();
        pagosDeSuscripcion.remove(0);
        periodosPago.put(fechaInicioPeriodo, fechaFinalPeriodo);
        
	
        int cantidadPagos = pagosDeSuscripcion.size();
        
        Date periodoActual = suscripcion.getFechaSuscripcion();
        for (int i = 0; i < cantidadPagos; i++) {
            if (periodosPago.get(periodoActual).after(pagosDeSuscripcion.get(i).getFechaPago())) {
                periodo = pagosDeSuscripcion.get(i).getPeriodo();
                mesesAgregar = periodo.equals("MENSUAL")? pagosDeSuscripcion.get(i).getTiempoPagado() : pagosDeSuscripcion.get(i).getTiempoPagado()*12;
                
                periodosPago.replace(periodoActual, agregarMesesFecha(periodosPago.get(periodoActual), mesesAgregar));
            } else {
                periodo = pagosDeSuscripcion.get(i).getPeriodo();
                mesesAgregar = periodo.equals("MENSUAL")? pagosDeSuscripcion.get(i).getTiempoPagado() : pagosDeSuscripcion.get(i).getTiempoPagado()*12;
                
                periodosPago.put(pagosDeSuscripcion.get(i).getFechaPago(), agregarMesesFecha(pagosDeSuscripcion.get(i).getFechaPago(), mesesAgregar));
            }
        }
        return periodosPago;
    }

    /**
     * 
     * @param fecha
     * @param cantidadMeses
     * @return Date con los meses agregados a la fecha ingresada
     */
    public static Date agregarMesesFecha(Date fecha, Integer cantidadMeses) {
        java.util.Date date = fecha;
        Calendar myCal = Calendar.getInstance();
        myCal.setTime(date);
        myCal.add(Calendar.MONTH, + cantidadMeses);
        date = myCal.getTime();
        return date;
    }
    
    public static Float buscarCostoVigente(Date fecha) throws SQLException {
        PreparedStatement obtenerCostoVigente = ConexionDB.getConnection().prepareStatement("SELECT * FROM costo_hosting WHERE fecha_inicio <= ?");
        obtenerCostoVigente.setObject(1, fecha);
        ResultSet costoObtenido = obtenerCostoVigente.executeQuery();
        if (costoObtenido.next()) {
            Float costoRetorno = costoObtenido.getFloat("porcentaje_costo");
            obtenerCostoVigente.close();
            return costoRetorno;
        } else {
            obtenerCostoVigente.close();
            return null;
        }
    }
    
    public static Float buscarPrecioSuscripcionVigente(int idRevista, Date fecha) throws SQLException {
        PreparedStatement obtenerPrecioVigente = ConexionDB.getConnection().prepareStatement("SELECT * FROM precio_suscripcion WHERE revista = ? AND fecha <= ? ORDER BY fecha DESC");
        obtenerPrecioVigente.setInt(1, idRevista);
        obtenerPrecioVigente.setObject(2, fecha);
        ResultSet precioObtenido = obtenerPrecioVigente.executeQuery();
        if (precioObtenido.next()) {
            Float precioRetorno = precioObtenido.getFloat("precio_suscripcion");
            obtenerPrecioVigente.close();
            return precioRetorno;
        } else {
            obtenerPrecioVigente.close();
            return null;
        }
    }
    
    public static Float calcularGananciaSuscripcion(Suscripcion suscripcion) throws SQLException {
        Map<Date,Date> periodosPago = crearPeriodosPago(suscripcion);
        Float totalGanancias = Float.valueOf(0);

        for (Map.Entry<Date, Date> entry : periodosPago.entrySet()) {
            Date fechaInicioPeriodo = entry.getKey();
            Date fechaFinalPeriodo = entry.getValue();
            Integer mesesCalcular = mesesEntreFechas(fechaInicioPeriodo, fechaFinalPeriodo);
            
            for (int i = 0; i < mesesCalcular; i++) {
                Float precioVigente = buscarPrecioSuscripcionVigente(suscripcion.getRevista(), agregarMesesFecha(fechaInicioPeriodo,i))==null? 0: buscarPrecioSuscripcionVigente(suscripcion.getRevista(), agregarMesesFecha(fechaInicioPeriodo, i));
                Float costoVigente = buscarCostoVigente(agregarMesesFecha(fechaInicioPeriodo,i))==null? 0:buscarCostoVigente(agregarMesesFecha(fechaInicioPeriodo,i));
                totalGanancias += precioVigente - precioVigente * costoVigente/100;
            }
        }
        return totalGanancias;
    }
    
    public static Float calcularGananciaSuscripcion(Suscripcion suscripcion, Date fechaInicio, Date fechaFinal) throws SQLException {
        Map<Date,Date> periodosPago = crearPeriodosPago(suscripcion);
        Float totalGanancias = Float.valueOf(0);

        for (Map.Entry<Date, Date> entry : periodosPago.entrySet()) {
            Date fechaInicioPeriodo = entry.getKey();
            Date fechaFinalPeriodo = entry.getValue();
            Integer mesesCalcular = mesesEntreFechas(fechaInicioPeriodo, fechaFinalPeriodo);
            
            for (int i = 0; i < mesesCalcular; i++) {
                if ((agregarMesesFecha(fechaInicioPeriodo, i).after(fechaInicio) || agregarMesesFecha(fechaInicioPeriodo, i).equals(fechaInicio)) &&
                    (agregarMesesFecha(fechaInicioPeriodo, i).before(fechaFinal) || agregarMesesFecha(fechaInicioPeriodo, i).equals(fechaFinal))) {
                    Float precioVigente = buscarPrecioSuscripcionVigente(suscripcion.getRevista(), agregarMesesFecha(fechaInicioPeriodo,i))==null? 0: buscarPrecioSuscripcionVigente(suscripcion.getRevista(), agregarMesesFecha(fechaInicioPeriodo, i));
                    Float costoVigente = buscarCostoVigente(agregarMesesFecha(fechaInicioPeriodo,i))==null? 0:buscarCostoVigente(agregarMesesFecha(fechaInicioPeriodo,i));
                    totalGanancias += precioVigente - precioVigente * costoVigente/100;
                }
            }
        }
        return totalGanancias;
    }

    public static ArrayList<GananciaSuscripcion> gananciasDeRevista(Integer idRevista) throws SQLException {
        ArrayList<Suscripcion> suscripcionesRevista = obtenerSuscripciones(idRevista);
        ArrayList<GananciaSuscripcion> gananciasSuscripciones = new ArrayList<>();
        
        for (Suscripcion suscripcion : suscripcionesRevista) {
            gananciasSuscripciones.add(
                new GananciaSuscripcion(suscripcion, calcularGananciaSuscripcion(suscripcion))
            );
        }
        return gananciasSuscripciones;
    }

    public static ArrayList<GananciaSuscripcion> gananciasDeRevista(Integer idRevista, Date fechaDesde, Date fechaHasta) throws SQLException {
        ArrayList<Suscripcion> suscripcionesRevista = obtenerSuscripciones(idRevista);
        ArrayList<GananciaSuscripcion> gananciasSuscripciones = new ArrayList<>();
        
        for (Suscripcion suscripcion : suscripcionesRevista) {
            gananciasSuscripciones.add(
                new GananciaSuscripcion(suscripcion, calcularGananciaSuscripcion(suscripcion, fechaDesde, fechaHasta))
            );
        }
        return gananciasSuscripciones;
    }

    /**
     * 
     * @param editor
     * @return HashMap mapeando cada revista con las ganancias por las suscripciones de estas
     * @throws SQLException
     */
    public static HashMap<Revista,ArrayList<GananciaSuscripcion>> obtenerGananciasSuscripcionesRevistas(String editor) throws SQLException {
        ArrayList<Revista> revistasDeEditor = ControlRevistas.obtenerRevistasPublicadas(editor);
        HashMap<Revista, ArrayList<GananciaSuscripcion>> gananciasRevistas = new HashMap<>();
        
        for (Revista revista : revistasDeEditor) {
            ArrayList<GananciaSuscripcion> gananciasRevista = gananciasDeRevista(revista.getId());
            if (gananciasRevista.size()>0) {
                gananciasRevistas.put(revista, gananciasRevista);
            }
        }
        return gananciasRevistas;
    }

    public static HashMap<Revista,ArrayList<GananciaSuscripcion>> obtenerGananciasSuscripcionesRevistas(String editor, Date fechaDesde, Date fechaHasta) throws SQLException {
        ArrayList<Revista> revistasDeEditor = ControlRevistas.obtenerRevistasPublicadas(editor);
        HashMap<Revista, ArrayList<GananciaSuscripcion>> gananciasRevistas = new HashMap<>();
        
        for (Revista revista : revistasDeEditor) {
            ArrayList<GananciaSuscripcion> gananciasRevista = gananciasDeRevista(revista.getId(), fechaDesde, fechaHasta);
            if (gananciasRevista.size()>0) {
                gananciasRevistas.put(revista, gananciasRevista);
            }
        }
        return gananciasRevistas;
    }

    /**
     * 
     * @param editor
     * @param idRevista
     * @return HashMap mapeando cada revista con las ganancias por las suscripciones de estas
     * @throws SQLException
     */
    public static HashMap<Revista,ArrayList<GananciaSuscripcion>> obtenerGananciasSuscripcionesRevista(String editor, int idRevista) throws SQLException {
        ArrayList<Revista> revistasDeEditor = ControlRevistas.obtenerRevistasPublicadas(editor);
        HashMap<Revista, ArrayList<GananciaSuscripcion>> gananciasRevistas = new HashMap<>();
        
        for (Revista revista : revistasDeEditor) {
            ArrayList<GananciaSuscripcion> gananciasRevista = gananciasDeRevista(revista.getId());
            if (gananciasRevista.size()>0 && revista.getId().intValue()==idRevista) {
                gananciasRevistas.put(revista, gananciasRevista);
            }
        }
        return gananciasRevistas;
    }
    
    public static HashMap<Revista,ArrayList<GananciaSuscripcion>> obtenerGananciasSuscripcionesRevista(String editor, int idRevista, Date fechaDesde, Date fechaHasta) throws SQLException {
        ArrayList<Revista> revistasDeEditor = ControlRevistas.obtenerRevistasPublicadas(editor);
        HashMap<Revista, ArrayList<GananciaSuscripcion>> gananciasRevistas = new HashMap<>();
        
        for (Revista revista : revistasDeEditor) {
            ArrayList<GananciaSuscripcion> gananciasRevista = gananciasDeRevista(revista.getId(), fechaDesde, fechaHasta);
            if (gananciasRevista.size()>0 && revista.getId().intValue()==idRevista) {
                gananciasRevistas.put(revista, gananciasRevista);
            }
        }
        return gananciasRevistas;
    }
    
    /**
     * 
     * @param primerFecha
     * @param segundaFecha
     * @return int con la cantidad de meses de diferencia entre dos fechas 
     */
    public static int mesesEntreFechas(Date primerFecha, Date segundaFecha) {
        if(primerFecha==null || segundaFecha==null){
            return -1;//Error
        }
        Calendar m_calendar=Calendar.getInstance();
        m_calendar.setTime(primerFecha);
        int nMonth1=12*m_calendar.get(Calendar.YEAR)+m_calendar.get(Calendar.MONTH);
        m_calendar.setTime(segundaFecha);
        int nMonth2=12*m_calendar.get(Calendar.YEAR)+m_calendar.get(Calendar.MONTH);
        return java.lang.Math.abs(nMonth2-nMonth1);
    }
}
