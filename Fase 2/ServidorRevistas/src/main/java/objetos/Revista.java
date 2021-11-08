/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

import java.util.ArrayList;
import java.util.Date;


/**
 *
 * @author fernanrod
 */
public class Revista {
    private Integer id;
    private String nombre;
    private String descripcion;
    private Date fechaPublicacion;
    private String categoria;
    private ArrayList<Etiqueta> etiquetas;
    private String estadoSuscripciones;
    
    public Revista(Integer id, String nombre, String descripcion, Date fechaPublicacion, String categoria, ArrayList<Etiqueta> etiquetas, String estadoSuscripciones) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaPublicacion = fechaPublicacion;
        this.categoria = categoria;
        this.etiquetas = etiquetas;
        this.estadoSuscripciones = estadoSuscripciones;
    }
    
    public Integer getId() {
        return this.id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNombre() {
        return this.nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getDescripcion() {
        return this.descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Date getFechaPublicacion() {
        return this.fechaPublicacion;
    }
    public void setFechaPublicacion(Date fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }
    public String getCategoria() {
        return this.categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public void setEtiquetas(ArrayList<Etiqueta> etiquetas) {
        this.etiquetas = etiquetas;
    }  
    public ArrayList<Etiqueta> getEtiquetas() {
        return etiquetas;
    }
    public String getEstadoSuscripciones() {
        return this.estadoSuscripciones;
    }
    public void setEstadoSuscripciones(String estadoSuscripciones) {
        this.estadoSuscripciones = estadoSuscripciones;
    }
}
