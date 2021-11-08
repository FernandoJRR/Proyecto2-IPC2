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
public class GananciaSuscripcion {
    private Suscripcion suscripcion;
    private Float ganancias;
    
    public GananciaSuscripcion(Suscripcion suscripcion, Float ganancia) {
        this.suscripcion = suscripcion;
        this.ganancias = ganancia;
    }
    
    public Suscripcion getSuscripcion() {
        return suscripcion;
    }
    public Float getGanancias() {
        return ganancias;
    }
}
