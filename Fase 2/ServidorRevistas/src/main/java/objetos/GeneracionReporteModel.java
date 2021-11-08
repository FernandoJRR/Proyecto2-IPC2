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
public class GeneracionReporteModel extends GeneracionReporteAdministradorModel{
    private String editor;
    
    public GeneracionReporteModel(Date fechaDesde, Date fechaHasta, Integer revista, String editor) {
        super(fechaDesde, fechaHasta, revista);
        this.editor = editor;
    }
    
    public String getEditor() {
        return editor;
    }
}
