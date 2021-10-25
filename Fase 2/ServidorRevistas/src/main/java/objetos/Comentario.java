/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

/**
 *
 * @author fernanrod
 */
public class Comentario {
    private Integer id;
    private String usuario;
    private Integer revista;
    private Integer numeroRevista;
    private String comentario;
    
    public Comentario(Integer id, String usuario, Integer revista, Integer numeroRevista, String comentario) {
        this.id = id;
        this.usuario = usuario;
        this.revista = revista;
        this.numeroRevista = numeroRevista;
        this.comentario = comentario;
    }
    
    public Integer getId() {
        return id;
    }

    public String getUsuario() {
        return usuario;
    }

    public Integer getRevista() {
        return revista;
    }
    
    public Integer getNumeroRevista() {
        return numeroRevista;
    }

    public String getComentario() {
        return comentario;
    }
}
