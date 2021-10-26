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

import objetos.Pago;
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
            return new Suscripcion(
                suscripcion.getInt("id"), 
                suscripcion.getString("usuario"), 
                suscripcion.getInt("revista"), 
                suscripcion.getDate("fecha_suscripcion"), 
                suscripcion.getDate("fecha_cancelacion"));
        } else {
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
    }
}
