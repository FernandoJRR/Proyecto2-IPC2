/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import objetos.Revista;

/**
 *
 * @author fernanrod
 */
public class ControlRevistas {
    public static void publicarRevista(Revista revista, String editorUsername) throws SQLException {
        PreparedStatement publicarRevista = ConexionDB.getConnection().prepareStatement("INSERT INTO revista (editor,nombre,descripcion, "+
                                                                                        "precio_suscripcion,fecha_publicacion,categoria) "+
                                                                                        "VALUES(?,?,?,?,?,?)");
        publicarRevista.setString(1, editorUsername);
        publicarRevista.setString(2, revista.getNombre());
        publicarRevista.setString(3, revista.getDescripcion());
        publicarRevista.setFloat(4, revista.getPrecioSuscripcion());
        publicarRevista.setObject(5,  revista.getFechaPublicacion());
        publicarRevista.setString(6, revista.getCategoria());
        publicarRevista.executeUpdate();
    }
    
    public static ArrayList<Revista> obtenerRevistasPublicadas(String editorUsername) throws SQLException {
        ArrayList<Revista> revistasPublicadas = new ArrayList<>();
        PreparedStatement obtenerRevistas = ConexionDB.getConnection().prepareStatement("SELECT * FROM revista WHERE editor = ?");
        obtenerRevistas.setString(1, editorUsername);
        ResultSet revistas = obtenerRevistas.executeQuery();
        while (revistas.next()) {
            Revista revistaActual =
            new Revista(revistas.getInt("id"), revistas.getString("nombre"), revistas.getString("descripcion"), 
            revistas.getFloat("precio_suscripcion"), revistas.getDate("fecha_publicacion"), revistas.getString("categoria"));
            
            revistasPublicadas.add(revistaActual);
        }
        return revistasPublicadas;
    }
}
