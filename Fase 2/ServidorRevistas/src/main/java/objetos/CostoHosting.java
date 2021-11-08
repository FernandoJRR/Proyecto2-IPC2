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
public class CostoHosting {
    private Date fechaInicio;
    private Float porcentaje;

    public CostoHosting(Date fechaInicio, Float porcentaje) {
        this.fechaInicio = fechaInicio;
        this.porcentaje = porcentaje;
    }
    public Date getFechaInicio() {
        return fechaInicio;
    }
    public Float getPorcentaje() {
        return porcentaje;
    }
}
