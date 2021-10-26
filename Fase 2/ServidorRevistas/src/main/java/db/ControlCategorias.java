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
import objetos.Categoria;
import objetos.Etiqueta;

/**
 *
 * @author fernanrod
 */
public class ControlCategorias {
	public static ArrayList<Categoria> obtenerCategorias() throws SQLException{
		ArrayList<Categoria> categorias = new ArrayList<>();
		PreparedStatement obtencionCategorias = ConexionDB.getConnection().prepareStatement("SELECT * FROM categoria");
        
		ResultSet categoriasObtenidas = obtencionCategorias.executeQuery();
        
		while (categoriasObtenidas.next()) {
		   categorias.add(new Categoria(categoriasObtenidas.getString("nombre")));
		}
		return categorias;
	}

    public static void agregarCategoria(String nombreCategoria) throws SQLException {
        PreparedStatement agregar = ConexionDB.getConnection().prepareStatement("INSERT INTO categoria(nombre) VALUES(?)");
        agregar.setString(1, nombreCategoria);
        agregar.executeUpdate();
    }
}
