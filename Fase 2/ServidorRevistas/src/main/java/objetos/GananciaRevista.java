/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

import java.util.Date;
import java.util.List;

/**
 *
 * @author fernanrod
 */
public class GananciaRevista {
    private Date fechaDesde;
    private Date fechaHasta;
    private Revista revista;
    private List<GananciaSuscripcion> gananciaSuscricpiones;
    private float gananciasTotales = 0;
    
    public GananciaRevista(Date fechaDesde, Date fechaHasta, Revista revista, List<GananciaSuscripcion> gananciaSuscripciones) {
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.revista = revista;
        this.gananciaSuscricpiones = gananciaSuscripciones;
        for (GananciaSuscripcion gananciaSuscripcion : gananciaSuscripciones) {
            gananciasTotales += gananciaSuscripcion.getGanancias();
        }
    }
    
    public Date getFechaDesde() {
        return fechaDesde;
    }
    public Date getFechaHasta() {
        return fechaHasta;
    }
    public List<GananciaSuscripcion> getGananciaSuscricpiones() {
        return gananciaSuscricpiones;
    }
    public Revista getRevista() {
        return revista;
    }
    public void setFechaHasta(Date fechaHasta) {
        this.fechaHasta = fechaHasta;
    }
    public void setFechaDesde(Date fechaDesde) {
        this.fechaDesde = fechaDesde;
    }
    public void setGananciaSuscricpiones(List<GananciaSuscripcion> gananciaSuscricpiones) {
        this.gananciaSuscricpiones = gananciaSuscricpiones;
    }
    public void setRevista(Revista revista) {
        this.revista = revista;
    }
    public float getGananciasTotales() {
        return gananciasTotales;
    }
    public void setGananciasTotales(float gananciasTotales) {
        this.gananciasTotales = gananciasTotales;
    }
}
