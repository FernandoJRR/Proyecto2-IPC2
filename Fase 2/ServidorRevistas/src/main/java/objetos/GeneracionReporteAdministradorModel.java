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
public class GeneracionReporteAdministradorModel {
    private Date fechaDesde;
    private Date fechaHasta;
    private Integer revista;
    
    public GeneracionReporteAdministradorModel(Date fechaDesde, Date fechaHasta, Integer revista) {
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.revista = revista;
    }
    
    public Date getFechaDesde() {
        return fechaDesde;
    }
    public Date getFechaHasta() {
        return fechaHasta;
    }
    public Integer getRevista() {
        return revista;
    }
}
