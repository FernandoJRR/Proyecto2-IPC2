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
public class Pago {
    private String usuario;
    private Integer suscripcion;
    private Date fechaPago;
    private String periodo;
    private Integer tiempoPagado;

    public Pago(String usuario, Integer suscripcion, Date fechaPago, String periodo, Integer tiempoPagado) {
        this.usuario = usuario;
        this.suscripcion = suscripcion;
        this.fechaPago = fechaPago;
        this.periodo = periodo;
        this.tiempoPagado = tiempoPagado;
    }
    
    public String getUsuario() {
        return usuario;
    }
    public Integer getSuscripcion() {
        return suscripcion;
    }
    public Date getFechaPago() {
        return fechaPago;
    }
    public String getPeriodo() {
        return periodo;
    }
    public Integer getTiempoPagado() {
        return tiempoPagado;
    }
}
