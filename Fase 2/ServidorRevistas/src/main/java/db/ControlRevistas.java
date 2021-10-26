/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import objetos.Comentario;
import objetos.Etiqueta;
import objetos.NumeroRevista;
import objetos.PrecioSuscripcion;
import objetos.Revista;

/**
 *
 * @author fernanrod
 */
public class ControlRevistas {
    public static void publicarRevista(Revista revista, Float precioSuscripcion, String editorUsername) throws SQLException {
        Connection connection = ConexionDB.getConnection();
        try {
            connection.setAutoCommit(false);
            
            //Se publican los datos de la revista
            PreparedStatement publicarRevista = connection.prepareStatement("INSERT INTO revista (editor,nombre,descripcion, "+
                                                                                            "fecha_publicacion,categoria) "+
                                                                                            "VALUES(?,?,?,?,?)",
                                                                            Statement.RETURN_GENERATED_KEYS); //Se obtiene el id de la revista creada
            publicarRevista.setString(1, editorUsername);
            publicarRevista.setString(2, revista.getNombre());
            publicarRevista.setString(3, revista.getDescripcion());
            publicarRevista.setObject(4,  revista.getFechaPublicacion());
            publicarRevista.setString(5, revista.getCategoria());
            publicarRevista.executeUpdate();

            //Guardamos el id de la revista creada
            int idRevistaCreada;
            ResultSet idRevista = publicarRevista.getGeneratedKeys();
            if (idRevista.next()) {
                idRevistaCreada = idRevista.getInt(1);
            } else {
                throw new SQLException();
            }

            PreparedStatement agregarPrecioSuscripcion = connection.prepareStatement("INSERT INTO precio_suscripcion(revista,fecha,precio_suscripcion) "+
                                                                                     "VALUES (?,?,?)");
            agregarPrecioSuscripcion.setInt(1, idRevistaCreada);
            agregarPrecioSuscripcion.setObject(2, revista.getFechaPublicacion());
            agregarPrecioSuscripcion.setFloat(3, precioSuscripcion);
            agregarPrecioSuscripcion.executeUpdate();

            for (int i = 0; i < revista.getEtiquetas().size(); i++) {
                PreparedStatement registroEtiquetasUsuario = connection.prepareStatement("INSERT INTO etiqueta_revista(revista,etiqueta) VALUES(?,?)");
                registroEtiquetasUsuario.setInt(1, idRevistaCreada);
                registroEtiquetasUsuario.setString(2, revista.getEtiquetas().get(i).getNombre());
                registroEtiquetasUsuario.executeUpdate();
            }
            
            connection.commit();
        } catch (SQLException e) {
            connection.rollback();
            throw new SQLException();
        } finally {
            connection.setAutoCommit(true);
        }

    }
    
    public static ArrayList<Revista> obtenerRevistasPublicadas(String editorUsername) throws SQLException {
        ArrayList<Revista> revistasPublicadas = new ArrayList<>();
        PreparedStatement obtenerRevistas = ConexionDB.getConnection().prepareStatement("SELECT * FROM revista WHERE editor = ?");
        obtenerRevistas.setString(1, editorUsername);
        ResultSet revistas = obtenerRevistas.executeQuery();
        while (revistas.next()) {
            PreparedStatement obtenerEtiquetas = ConexionDB.getConnection().prepareStatement("SELECT etiqueta FROM etiqueta_revista WHERE revista = ?");
            obtenerEtiquetas.setInt(1, revistas.getInt("id"));
            ResultSet etiquetas = obtenerEtiquetas.executeQuery();
            ArrayList<Etiqueta> etiquetasRevista = new ArrayList<>();
            while (etiquetas.next()) {
                etiquetasRevista.add(new Etiqueta(etiquetas.getString("etiqueta")));
            }
            
            Revista revistaActual =
            new Revista(revistas.getInt("id"), revistas.getString("nombre"), revistas.getString("descripcion"), 
            revistas.getDate("fecha_publicacion"), revistas.getString("categoria"), etiquetasRevista, revistas.getString("estado_suscripciones"));
            
            revistasPublicadas.add(revistaActual);
        }
        return revistasPublicadas;
    }
    
    public static ArrayList<PrecioSuscripcion> obtenerPrecioSuscripcions(Integer idRevista) throws SQLException {
        ArrayList<PrecioSuscripcion> precioSuscripciones = new ArrayList<>();
        PreparedStatement obtenerPrecios = ConexionDB.getConnection().prepareStatement("SELECT * FROM precio_suscripcion WHERE revista = ? ORDER BY fecha DESC");
        obtenerPrecios.setInt(1, idRevista);
        ResultSet preciosObtenidos = obtenerPrecios.executeQuery();
        while (preciosObtenidos.next()) {
            precioSuscripciones.add(new PrecioSuscripcion(preciosObtenidos.getDate("fecha"), preciosObtenidos.getFloat("precio_suscripcion"), preciosObtenidos.getInt("revista")));
        }
        return precioSuscripciones;
    }
    
    public static void cambiarEstadoSuscripciones(Integer idRevista, String estado) throws SQLException {
        PreparedStatement cambiarEstado = ConexionDB.getConnection().prepareStatement("UPDATE revista SET estado_suscripciones = ? WHERE id = ?");
        cambiarEstado.setString(1, estado);
        cambiarEstado.setInt(2, idRevista);
        cambiarEstado.executeUpdate();
    }

    public static void cambiarEstadoMeGusta(Integer idRevista, Integer numeroRevista, String estado) throws SQLException {
        PreparedStatement cambiarEstado = ConexionDB.getConnection().prepareStatement("UPDATE numero_revista SET restriccion_me_gusta = ? WHERE numero = ? AND revista = ?");
        cambiarEstado.setString(1, estado);
        cambiarEstado.setInt(2, numeroRevista);
        cambiarEstado.setInt(3, idRevista);
        cambiarEstado.executeUpdate();
    }
    
    public static boolean cambiarMeGusta(Integer numeroRevista, String username) throws SQLException {
        PreparedStatement obtenerMeGusta = ConexionDB.getConnection().prepareStatement("SELECT * FROM me_gusta WHERE numero_revista=? AND usuario=?");
        obtenerMeGusta.setInt(1, numeroRevista);
        obtenerMeGusta.setString(2, username);
        ResultSet meGusta = obtenerMeGusta.executeQuery();
        if (meGusta.next()) {
            PreparedStatement borrarMeGusta = ConexionDB.getConnection().prepareStatement("DELETE FROM me_gusta WHERE numero_revista=? AND usuario=?");
            borrarMeGusta.setInt(1, numeroRevista);
            borrarMeGusta.setString(2, username);
            borrarMeGusta.executeUpdate();
            return false;
        } else {
            PreparedStatement agregarMeGusta = ConexionDB.getConnection().prepareStatement("INSERT INTO me_gusta(numero_revista,usuario) VALUES(?,?)");
            agregarMeGusta.setInt(1, numeroRevista);
            agregarMeGusta.setString(2, username);
            agregarMeGusta.executeUpdate();
            return true;
        }
    }
    
    public static void cambiarEstadoComentarios(Integer idRevista, Integer numeroRevista, String estado) throws SQLException {
        PreparedStatement cambiarEstado = ConexionDB.getConnection().prepareStatement("UPDATE numero_revista SET restriccion_comentarios = ? WHERE numero = ? AND revista = ?");
        cambiarEstado.setString(1, estado);
        cambiarEstado.setInt(2, numeroRevista);
        cambiarEstado.setInt(3, idRevista);
        cambiarEstado.executeUpdate();
    }

    public static Integer publicarNumeroRevista(NumeroRevista numeroRevista) throws SQLException {
        PreparedStatement publicarNumero = ConexionDB.getConnection().prepareStatement("INSERT INTO numero_revista(revista,nombre,descripcion,fecha_publicacion,costo_hosting,PDF) "+
                                                                                        "VALUES(?,?,?,?,?,?)",
                                                                                        Statement.RETURN_GENERATED_KEYS);
        
        publicarNumero.setInt(1, numeroRevista.getIdRevista());
        publicarNumero.setString(2, numeroRevista.getNombre());
        publicarNumero.setString(3, numeroRevista.getDescripcion());
        publicarNumero.setObject(4, numeroRevista.getFechaPublicacion());
        publicarNumero.setFloat(5, numeroRevista.getCostoHosting());
        publicarNumero.setString(6, "");
        publicarNumero.executeUpdate();
        
        ResultSet numero = publicarNumero.getGeneratedKeys();
        if (numero.next()) {
            return numero.getInt(1);
        } else {
            throw new SQLException();
        }
    }
    
    public static NumeroRevista obtenerNumeroRevista(Integer numeroRevista) throws SQLException {
        PreparedStatement obtenerNumeroRevista = ConexionDB.getConnection().prepareStatement("SELECT * FROM numero_revista WHERE numero = ?");
        obtenerNumeroRevista.setInt(1, numeroRevista);
        ResultSet numero = obtenerNumeroRevista.executeQuery();
        if (!numero.next()) {
            throw new SQLException();
        }
        return new NumeroRevista(numero.getInt("numero"), numero.getInt("revista"), numero.getString("nombre"), 
                                numero.getString("descripcion"), numero.getDate("fecha_publicacion"), numero.getString("PDF"), 
                                numero.getFloat("costo_hosting"), numero.getString("restriccion_me_gusta"), numero.toString());
    }
    
    public static ArrayList<NumeroRevista> obtenerNumerosPublicados(Integer idRevista) throws SQLException {
        ArrayList<NumeroRevista> numerosPublicados = new ArrayList<>();
        
        PreparedStatement obtenerNumeros = ConexionDB.getConnection().prepareStatement("SELECT * FROM numero_revista WHERE revista = ? ORDER BY fecha_publicacion DESC");
        obtenerNumeros.setInt(1, idRevista);
        ResultSet numerosObtenidos = obtenerNumeros.executeQuery();
        while (numerosObtenidos.next()) {
            NumeroRevista numeroActual =
            new NumeroRevista(
                numerosObtenidos.getInt("numero"), 
                numerosObtenidos.getInt("revista"), 
                numerosObtenidos.getString("nombre"), 
                numerosObtenidos.getString("descripcion"), 
                numerosObtenidos.getDate("fecha_publicacion"), 
                numerosObtenidos.getString("PDF"), 
                numerosObtenidos.getFloat("costo_hosting"), 
                numerosObtenidos.getString("restriccion_me_gusta"), 
                numerosObtenidos.getString("restriccion_comentarios")
            );       
            numerosPublicados.add(numeroActual);
        }
        return numerosPublicados;
    }
    
    public static void guardarPDFRevista(Integer idRevista, Integer numeroRevista, String pathPDF) throws SQLException {
        PreparedStatement guardarPathRevistas = ConexionDB.getConnection().prepareStatement("UPDATE numero_revista SET PDF = ? WHERE numero = ? AND revista = ?");
        guardarPathRevistas.setString(1, pathPDF+"/"+idRevista+"/"+numeroRevista);
        guardarPathRevistas.setInt(2, numeroRevista);
        guardarPathRevistas.setInt(3, idRevista);
        guardarPathRevistas.executeUpdate();
    }
    
    public static Integer obtenerMeGusta(Integer idRevista, Integer numeroRevista) throws SQLException { 
        PreparedStatement obtenerCantidadMeGusta = ConexionDB.getConnection().prepareStatement("SELECT COUNT(*) AS cantidad FROM me_gusta WHERE numero_revista=?");
        obtenerCantidadMeGusta.setInt(1, numeroRevista);
        ResultSet cantidad = obtenerCantidadMeGusta.executeQuery();
        if (cantidad.next()) {
            return cantidad.getInt("cantidad");
        } else {
            throw new SQLException();
        }
    
    }
    
    public static ArrayList<Comentario> obtenerComentarios(Integer idRevista, Integer numeroRevista) throws SQLException {
        ArrayList<Comentario> comentariosObtenidos = new ArrayList<>();
        PreparedStatement obtenerComentarios = ConexionDB.getConnection().prepareStatement("SELECT * FROM comentario WHERE revista=? AND numero_revista=?");
        obtenerComentarios.setInt(1, idRevista);
        obtenerComentarios.setInt(2, numeroRevista);
        ResultSet comentarios = obtenerComentarios.executeQuery();
        while (comentarios.next()) {
            Comentario comentarioActual =
            new Comentario(
                comentarios.getInt("id"), 
                comentarios.getString("usuario"), 
                comentarios.getInt("revista"), 
                comentarios.getInt("numero_revista"), 
                comentarios.getString("comentario")
            );
            
            comentariosObtenidos.add(comentarioActual);
        }
        return comentariosObtenidos;
    }
    
    //Las revistas recomendadas a un usuario son revistas, con match de etiquetas con el usuario,
    //en caso que no haya recomendaciones con las etiquetas las recomendadas seran random
    //Son revistas a las que el usuario no esta suscrito. 
    public static ArrayList<Revista> obtenerRevistasRecomendadas(String username) throws SQLException {
        ArrayList<Revista> revistas = new ArrayList<>();

        PreparedStatement obtenerRevistas = ConexionDB.getConnection().prepareStatement("SELECT * FROM revista WHERE id IN( "+
                                                                                        "SELECT revista FROM etiqueta_revista "+
                                                                                        "JOIN etiqueta_usuario ON "+
                                                                                        "etiqueta_revista.etiqueta = etiqueta_usuario.etiqueta "+
                                                                                        "AND etiqueta_usuario.usuario = ?) "+
                                                                                        "AND id NOT IN( "+
                                                                                        "SELECT revista FROM suscripcion WHERE usuario = ?)");
        
        obtenerRevistas.setString(1, username);
        obtenerRevistas.setString(2, username);
        ResultSet revistasObtenidas = obtenerRevistas.executeQuery();
        while (revistasObtenidas.next()) {
            Revista revistaActual =
            new Revista(
                revistasObtenidas.getInt("id"), 
                revistasObtenidas.getString("nombre"), 
                revistasObtenidas.getString("descripcion"), 
                revistasObtenidas.getDate("fecha_publicacion"), 
                revistasObtenidas.getString("categoria"), 
                ControlEtiquetas.obtenerEtiquetas(revistasObtenidas.getInt("id")), 
                revistasObtenidas.getString("estado_suscripciones")
            );
            
            revistas.add(revistaActual);
        }
        
        //En caso de que si hayan revistas recomendadas con las etiquetas del usuario se retornaran
        if (revistas.size()>0) {
            return revistas;
        } else { //Caso contrario se devolveran revistas no suscritas aunque no tengan las mismas etiquetas que el usuario
            PreparedStatement obtenerRevistasSinEtiquetas = ConexionDB.getConnection().prepareStatement("SELECT * FROM revista WHERE id NOT IN( "+
                                                                                            "SELECT revista FROM suscripcion WHERE usuario = ?)");
            
                                                                                            
            obtenerRevistasSinEtiquetas.setString(1, username);
            obtenerRevistasSinEtiquetas.setString(2, username);
            ResultSet revistasObtenidasSinEtiquetas = obtenerRevistasSinEtiquetas.executeQuery();
            while (revistasObtenidasSinEtiquetas.next()) {
                Revista revistaActual =
                new Revista(
                    revistasObtenidasSinEtiquetas.getInt("id"), 
                    revistasObtenidasSinEtiquetas.getString("nombre"), 
                    revistasObtenidasSinEtiquetas.getString("descripcion"), 
                    revistasObtenidasSinEtiquetas.getDate("fecha_publicacion"), 
                    revistasObtenidasSinEtiquetas.getString("categoria"), 
                    ControlEtiquetas.obtenerEtiquetas(revistasObtenidasSinEtiquetas.getInt("id")), 
                    revistasObtenidasSinEtiquetas.getString("estado_suscripciones")
                );
                
                revistas.add(revistaActual);
            }
            
            return revistas;
        }

    }
    
    public static ArrayList<Revista> obtenerRevistasSuscritas(String username) throws SQLException {
        ArrayList<Revista> revistas = new ArrayList<>();
        
        PreparedStatement obtenerRevistas = ConexionDB.getConnection().prepareStatement("SELECT DISTINCT * FROM revista WHERE id IN( "+
                                                                                        "SELECT revista FROM suscripcion WHERE usuario = ?)");
        obtenerRevistas.setString(1, username);
        ResultSet revistasObtenidas = obtenerRevistas.executeQuery();
        while (revistasObtenidas.next()) {
            Revista revistaActual =
            new Revista(
                revistasObtenidas.getInt("id"), 
                revistasObtenidas.getString("nombre"), 
                revistasObtenidas.getString("descripcion"), 
                revistasObtenidas.getDate("fecha_publicacion"), 
                revistasObtenidas.getString("categoria"), 
                ControlEtiquetas.obtenerEtiquetas(revistasObtenidas.getInt("id")), 
                revistasObtenidas.getString("estado_suscripciones")
            );
            
            revistas.add(revistaActual);
        }
        return revistas;
    }
    
    public static void agregarComentario(Comentario comentario) throws SQLException {
        PreparedStatement agregarComentario = ConexionDB.getConnection().prepareStatement("INSERT INTO comentario(usuario,numero_revista,comentario,revista) "+
                                                                                          "VALUES(?,?,?,?)");   
        agregarComentario.setString(1, comentario.getUsuario());
        agregarComentario.setInt(2, comentario.getNumeroRevista());
        agregarComentario.setString(3, comentario.getComentario());
        agregarComentario.setInt(4, comentario.getRevista());
        agregarComentario.executeUpdate();
    }
    
    public static ArrayList<Revista> busqueda(String tipoBusqueda, String busqueda, String usuario) throws SQLException {
        ArrayList<Revista> revistas = new ArrayList<>();

        String filtroSuscripciones = "AND revista.id NOT IN(SELECT revista FROM suscripcion WHERE usuario = ?)";

        String statementCategoria = "SELECT * FROM revista WHERE categoria LIKE ? "+filtroSuscripciones;
        String statementEtiquetas = "SELECT DISTINCT revista.* FROM etiqueta_revista JOIN revista ON etiqueta_revista.revista = revista.id WHERE etiqueta_revista.etiqueta LIKE ? "+filtroSuscripciones;

        PreparedStatement realizarBusqueda = ConexionDB.getConnection().prepareStatement(tipoBusqueda.equals("CATEGORIA")? statementCategoria:statementEtiquetas);
        realizarBusqueda.setString(1, '%'+busqueda+'%');
        realizarBusqueda.setString(2, usuario);
        ResultSet revistasObtenidas = realizarBusqueda.executeQuery();
        while (revistasObtenidas.next()) {
            Revista revistaActual =
            new Revista(
                revistasObtenidas.getInt("id"), 
                revistasObtenidas.getString("nombre"), 
                revistasObtenidas.getString("descripcion"), 
                revistasObtenidas.getDate("fecha_publicacion"), 
                revistasObtenidas.getString("categoria"), 
                ControlEtiquetas.obtenerEtiquetas(revistasObtenidas.getInt("id")), 
                revistasObtenidas.getString("estado_suscripciones")
            );
            
            revistas.add(revistaActual);
        }
        return revistas;
    }
    
    public static String obtenerPathPDF(Integer numeroRevista) throws SQLException {
        PreparedStatement obtenerPathPDF = ConexionDB.getConnection().prepareStatement("SELECT PDF FROM numero_revista WHERE numero = ?");
        obtenerPathPDF.setInt(1, numeroRevista);
        ResultSet path = obtenerPathPDF.executeQuery();
        if (path.next()) {
            return path.getString("PDF");
        } else {
            throw new SQLException();
        }
        
    }
}
