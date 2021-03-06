/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import objetos.Etiqueta;

/**
 *
 * @author fernanrod
 */
public class ControlEtiquetas {
    public static ArrayList<Etiqueta> obtenerEtiquetas() throws SQLException{
        ArrayList<Etiqueta> etiquetas = new ArrayList<>();
        PreparedStatement obtencionEtiquetas = ConexionDB.getConnection().prepareStatement("SELECT * FROM etiqueta");
        
        ResultSet etiquetasObtenidas = obtencionEtiquetas.executeQuery();
        
        while (etiquetasObtenidas.next()) {
            etiquetas.add(new Etiqueta(etiquetasObtenidas.getString("nombre")));
        }
        obtencionEtiquetas.close();
        return etiquetas;
    }
    
    public static ArrayList<Etiqueta> obtenerEtiquetas(Integer idRevista) throws SQLException {
        ArrayList<Etiqueta> etiquetas = new ArrayList<>();
        PreparedStatement obtencionEtiquetas = ConexionDB.getConnection().prepareStatement("SELECT * FROM etiqueta_revista WHERE revista = ?");
        obtencionEtiquetas.setInt(1, idRevista);
        
        ResultSet etiquetasObtenidas = obtencionEtiquetas.executeQuery();
        
        while (etiquetasObtenidas.next()) {
            etiquetas.add(new Etiqueta(etiquetasObtenidas.getString("etiqueta")));
        }
        obtencionEtiquetas.close();
        return etiquetas;
    }
    
    public static void agregarEtiqueta(String nombreEtiqueta) throws SQLException {
        PreparedStatement agregar = ConexionDB.getConnection().prepareStatement("INSERT INTO etiqueta(nombre) VALUES(?)");
        agregar.setString(1, nombreEtiqueta);
        agregar.executeUpdate();
        agregar.close();
    }
}
