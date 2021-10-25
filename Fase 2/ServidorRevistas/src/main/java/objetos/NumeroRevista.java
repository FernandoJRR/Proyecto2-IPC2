/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

import java.util.Date;

/**
 *
 * @author fernanrod
 */
public class NumeroRevista {
    private Integer numero;
    private Integer idRevista;
    private String nombre;
    private String descripcion;
    private Date fechaPublicacion;
    private String PDF;
    private Float costoHosting;
    private String restriccionMeGusta;
    private String restriccionComentarios;
    
    public NumeroRevista(Integer numero, Integer idRevista, String nombre, String descripcion, 
                        Date fechaPublicacion, String PDF, Float costoHosting, String restriccionMeGusta, String restriccionComentarios) {
        this.numero = numero;
        this.idRevista = idRevista;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaPublicacion = fechaPublicacion;
        this.PDF = PDF;
        this.costoHosting = costoHosting;
        this.restriccionMeGusta = restriccionMeGusta;
        this.restriccionComentarios = restriccionComentarios;
    }
    
    public Integer getNumero() {
        return numero;
    }
    
    public Integer getIdRevista() {
        return idRevista;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Date getFechaPublicacion() {
        return fechaPublicacion;
    }

    public String getPDF() {
        return PDF;
    }

    public Float getCostoHosting() {
        return costoHosting;
    }
    
    public String getRestriccionMeGusta() {
        return restriccionMeGusta;
    }

    public String getRestriccionComentarios() {
        return restriccionComentarios;
    }
}
