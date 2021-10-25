/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

import java.sql.Date;

/**
 *
 * @author fernanrod
 */
public class PrecioSuscripcion {
    private Date fechaInicio;
    private Float precio;
    private Integer idRevista;
    
    public PrecioSuscripcion(Date fechaInicio, Float precio, Integer idRevista) {
        this.fechaInicio = fechaInicio;
        this.precio = precio;
        this.idRevista = idRevista;
    }
    
    public Date getFechaInicio() {
        return fechaInicio;
    }
    
    public Float getPrecio() {
        return precio;
    }
    
    public Integer getIdRevista() {
        return idRevista;
    }
}
