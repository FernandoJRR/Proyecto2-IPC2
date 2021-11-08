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
public class Suscripcion {
    private Integer id;
    private String usuario;
    private Integer revista;
    private Date fechaSuscripcion;
    private Date fechaCancelacion;
    
    public Suscripcion(Integer id, String usuario, Integer revista, Date fechaSuscripcion, Date fechaCancelacion) {
        this.id = id;
        this.usuario = usuario;
        this.revista = revista;
        this.fechaSuscripcion = fechaSuscripcion;
        this.fechaCancelacion = fechaCancelacion;
    }
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    public Integer getRevista() {
        return revista;
    }
    public void setRevista(Integer revista) {
        this.revista = revista;
    }
    public Date getFechaSuscripcion() {
        return fechaSuscripcion;
    }
    public void setFechaSuscripcion(Date fechaSuscripcion) {
        this.fechaSuscripcion = fechaSuscripcion;
    }
    public Date getFechaCancelacion() {
        return fechaCancelacion;
    }
    public void setFechaCancelacion(Date fechaCancelacion) {
        this.fechaCancelacion = fechaCancelacion;
    }
}
