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
public class Revista {
    private Integer id;
    private String nombre;
    private String descripcion;
    private Float precioSuscripcion;
    private Date fechaPublicacion;
    private String categoria;
    
    public Revista(Integer id, String nombre, String descripcion, Float precioSuscripcion, Date fechaPublicacion, String categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioSuscripcion = precioSuscripcion;
        this.fechaPublicacion = fechaPublicacion;
        this.categoria = categoria;
    }
    
    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Float getPrecioSuscripcion() {
        return precioSuscripcion;
    }

    public Date getFechaPublicacion() {
        return fechaPublicacion;
    }

    public String getCategoria() {
        return categoria;
    }
}
