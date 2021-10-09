package db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import objetos.Usuario;
import utilidades.Encriptador;

public class ControlUsuarios {
    public static String obtenerValidezUsername(String username) throws SQLException {
        PreparedStatement obtencionUsername = ConexionDB.getConnection().prepareStatement("SELECT username FROM usuario WHERE username = ?");
        obtencionUsername.setString(1, username);
        ResultSet usernameDB = obtencionUsername.executeQuery();
        
        if (usernameDB.next()) {
            return usernameDB.getString("username");
        } else {
            return null;
        }
    }
    
    public static void registrarUsuario(Usuario usuario) throws SQLException {
        PreparedStatement registroUsuario = ConexionDB.getConnection().prepareStatement("INSERT INTO usuario(username,`password`,tipo) VALUES(?,?,?)");
        registroUsuario.setString(1, usuario.getUsername());
        registroUsuario.setString(2, Encriptador.encriptarPassword(usuario.getPassword()));
        registroUsuario.setString(3, "USUARIO");
    }
}
