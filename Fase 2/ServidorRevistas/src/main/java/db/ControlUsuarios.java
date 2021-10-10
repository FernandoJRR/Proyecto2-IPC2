package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import objetos.Editor;
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
        Connection conexion = ConexionDB.getConnection();
        try {
            conexion.setAutoCommit(false);
            PreparedStatement registroUsuario = conexion.prepareStatement("INSERT INTO usuario(username,`password`,tipo) VALUES(?,?,?)");
            registroUsuario.setString(1, usuario.getUsername());
            registroUsuario.setString(2, Encriptador.encriptarPassword(usuario.getPassword()));
            registroUsuario.setString(3, "USUARIO");
            registroUsuario.executeUpdate();
            PreparedStatement registroPerfilUsuario = conexion.prepareStatement("INSERT INTO perfil(usuario,descripcion,hobbies,genero) VALUES(?,?,?,?)");
            registroPerfilUsuario.setString(1, usuario.getUsername());
            registroPerfilUsuario.setString(2, usuario.getDescripcion());
            registroPerfilUsuario.setString(3, usuario.getHobbies());
            registroPerfilUsuario.setObject(4, usuario.getGenero());
            registroPerfilUsuario.executeUpdate();
            for (int i = 0; i < usuario.getEtiquetas().size(); i++) {
                PreparedStatement registroEtiquetasUsuario = conexion.prepareStatement("INSERT INTO etiqueta_usuario(usuario,etiqueta) VALUES(?,?)");
                registroEtiquetasUsuario.setString(1, usuario.getUsername());
                registroEtiquetasUsuario.setString(2, usuario.getEtiquetas().get(i).getNombre());
                registroEtiquetasUsuario.executeUpdate();
            }
            conexion.commit();
        } catch (SQLException e) {
            conexion.rollback();
            throw new SQLException();
        } catch (Exception e) {
            conexion.rollback();
            throw new SQLException();
        } finally {
            conexion.setAutoCommit(true);
        }
    }
    
    public static void registrarEditor(Editor editor) throws SQLException{
        Connection conexion = ConexionDB.getConnection();
        try {
            conexion.setAutoCommit(false);
            PreparedStatement registroUsuario = conexion.prepareStatement("INSERT INTO usuario(username,`password`,tipo) VALUES(?,?,?)");
            registroUsuario.setString(1, editor.getUsername());
            registroUsuario.setString(2, Encriptador.encriptarPassword(editor.getPassword()));
            registroUsuario.setString(3, "EDITOR");
            registroUsuario.executeUpdate();
            PreparedStatement registroPerfilUsuario = conexion.prepareStatement("INSERT INTO perfil(usuario,descripcion,hobbies,genero) VALUES(?,?,?,?)");
            registroPerfilUsuario.setString(1, editor.getUsername());
            registroPerfilUsuario.setString(2, editor.getDescripcion());
            registroPerfilUsuario.setString(3, editor.getHobbies());
            registroPerfilUsuario.setObject(4, editor.getGenero());
            registroPerfilUsuario.executeUpdate();
            conexion.commit();
        } catch (SQLException e) {
            conexion.rollback();
            throw new SQLException();
        } catch (Exception e) {
            conexion.rollback();
            throw new SQLException();
        } finally {
            conexion.setAutoCommit(true);
        }
    }
}
