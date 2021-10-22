package db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import objetos.Editor;
import objetos.Etiqueta;
import objetos.GeneroEnum;
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
    
    public static Usuario obtenerUsuario(String username) throws SQLException {
        Connection conexion = ConexionDB.getConnection();
        try {
            conexion.setAutoCommit(false);
            PreparedStatement obtenerUsuario = conexion.prepareStatement("SELECT username,password FROM usuario WHERE username = ?");
            obtenerUsuario.setString(1, username);
            ResultSet userPass = obtenerUsuario.executeQuery();
            PreparedStatement obtenerPerfilUsuario = conexion.prepareStatement("SELECT * FROM perfil WHERE usuario = ?");
            obtenerPerfilUsuario.setString(1, username);
            ResultSet perfilUsuario = obtenerPerfilUsuario.executeQuery();
            PreparedStatement obtenerEtiquetas = conexion.prepareStatement("SELECT etiqueta FROM etiqueta_usuario WHERE usuario = ?");
            obtenerEtiquetas.setString(1, username);
            ResultSet etiquetasUsuario = obtenerEtiquetas.executeQuery();
            conexion.commit();
            ArrayList<Etiqueta> etiquetasUsuarioLista = new ArrayList<>();
            while (etiquetasUsuario.next()) {
                etiquetasUsuarioLista.add(new Etiqueta(etiquetasUsuario.getString("etiqueta")));
            }
            
            if (!userPass.next() || !perfilUsuario.next()) {
                throw new SQLException();
            }
            
            return new Usuario(
                                userPass.getString("username"), "", perfilUsuario.getString("descripcion"), 
                                perfilUsuario.getString("hobbies"), perfilUsuario.getString("genero"), 
                                etiquetasUsuarioLista
                                );
        } catch (SQLException e) {
            conexion.rollback();
            e.printStackTrace();
            throw new SQLException();
        } finally {
            conexion.setAutoCommit(true);
        }
    }
    
    public static boolean obtenerEstadoUsuario(String username) throws SQLException {
        PreparedStatement obtenerEstadoUsuario = ConexionDB.getConnection().prepareStatement("SELECT estado FROM usuario WHERE username = ?");
        obtenerEstadoUsuario.setString(1, username);
        ResultSet estadoUsuario = obtenerEstadoUsuario.executeQuery();
        if (estadoUsuario.next()) {
            String estado = estadoUsuario.getString("estado");
            if (estado.equals("ACTIVO")) {
                return true;
            } else {
                return false;
            }
        } else {
            if (obtenerValidezUsername(username) == null) {
                return false;
            } else {
                throw new SQLException();
            }
        }
    }

    public static boolean matchPassword(String username, String password) throws SQLException {
        PreparedStatement obtenerCoincidencias = ConexionDB.getConnection().prepareStatement("SELECT * FROM usuario WHERE username = ? AND password = ?");
        obtenerCoincidencias.setString(1, username);
        obtenerCoincidencias.setString(2, Encriptador.encriptarPassword(password));
        ResultSet coincidencias = obtenerCoincidencias.executeQuery();
        if (coincidencias.next()) {
            return true;
        } else {
            return false;
        }
    }
    
    public static String obtenerTipoUsuario(String username) throws SQLException {
        PreparedStatement obtenerTipoUsuario = ConexionDB.getConnection().prepareStatement("SELECT tipo FROM usuario WHERE username = ?");
        obtenerTipoUsuario.setString(1, username);
        ResultSet tipoUsuario = obtenerTipoUsuario.executeQuery();
        if (tipoUsuario.next()) {
            return tipoUsuario.getString("tipo");
        } else {
            throw new SQLException();
        }
    }
    
    public static void guardarFotoPerfil(String username, String pathFotos) throws SQLException {
        PreparedStatement guardarFoto = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET foto_perfil = ? WHERE usuario = ?");
        guardarFoto.setString(1, pathFotos+"/"+username);
        guardarFoto.setString(2, username);
        guardarFoto.executeUpdate();
    }
    
    public static String obtenerPathFotoDePerfil(String username) throws SQLException {
        PreparedStatement obtenerFoto = ConexionDB.getConnection().prepareStatement("SELECT foto_perfil FROM perfil WHERE usuario = ?");
        obtenerFoto.setString(1, username);
        ResultSet pathFoto = obtenerFoto.executeQuery();
        if (pathFoto.next()) {
            return pathFoto.getString("foto_perfil");
        } else {
            throw new SQLException();
        }
    }
    
    public static void eliminarFotoDePerfil(String username) throws SQLException {
        PreparedStatement borrarFoto = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET foto_perfil = null WHERE usuario = ?");
        borrarFoto.setString(1, username);
        borrarFoto.executeUpdate();
    }

    public static void guardarDescripcion(String username, String descripcion) throws SQLException {
        PreparedStatement guardarDescripcion = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET descripcion = ? WHERE usuario = ?");
        guardarDescripcion.setString(1, descripcion);
        guardarDescripcion.setString(2, username);
        guardarDescripcion.executeUpdate();
    }

    public static void guardarHobbies(String username, String hobbies) throws SQLException {
        PreparedStatement guardarHobbies = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET hobbies = ? WHERE usuario = ?");
        guardarHobbies.setString(1, hobbies);
        guardarHobbies.setString(2, username);
        guardarHobbies.executeUpdate();
    }

    public static void guardarGenero(String username, GeneroEnum genero) throws SQLException {
        PreparedStatement guardarGenero = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET genero = ? WHERE usuario = ?");
        guardarGenero.setString(1, genero.toString());
        guardarGenero.setString(2, username);
        guardarGenero.executeUpdate();
    }

    public static void eliminarInformacion(String username, String tipoInformacion) throws SQLException {
        PreparedStatement eliminarDescripcion = ConexionDB.getConnection().prepareStatement("UPDATE perfil SET "+tipoInformacion+" = null WHERE usuario = ?");
        eliminarDescripcion.setString(1, username);
        eliminarDescripcion.executeUpdate();
    }
}
