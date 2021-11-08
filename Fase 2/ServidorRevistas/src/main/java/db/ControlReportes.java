/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import objetos.GananciaRevista;
import objetos.GananciaSuscripcion;
import objetos.GeneracionReporteAdministradorModel;
import objetos.GeneracionReporteModel;
import objetos.Revista;

/**
 *
 * @author fernanrod
 */
public class ControlReportes {
    
    private Connection connection;
    
    public ControlReportes(Connection connection) {
        this.connection = connection;
    }
    
    public void generarReporteComentarios(GeneracionReporteModel dataReporte, OutputStream streamSalida) throws JRException {
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();       
        Integer revista = dataReporte.getRevista();
        String editor = dataReporte.getEditor();
        
        InputStream reporteCompilado = getClass().getResourceAsStream("../ReporteEditorComentarios.jasper");

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("FechaDesde", fechaDesde);
        parametros.put("FechaHasta", fechaHasta);
        parametros.put("Revista", revista==null? 0 : revista);
        parametros.put("Editor", editor);
        JasperPrint printer = JasperFillManager.fillReport(reporteCompilado, parametros, connection);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }
    
    public void generarReporteSuscripciones(GeneracionReporteModel dataReporte, OutputStream streamSalida) throws JRException {
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();       
        Integer revista = dataReporte.getRevista();
        String editor = dataReporte.getEditor();
        
        InputStream reporteCompilado = getClass().getResourceAsStream("../ReporteEditorSuscripciones.jasper");
        InputStream subreporteCompilado = getClass().getResourceAsStream("../SubreporteEditorSuscripciones.jasper");

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("subreportParameter", subreporteCompilado);
        parametros.put("FechaDesde", fechaDesde);
        parametros.put("FechaHasta", fechaHasta);
        parametros.put("Revista", revista==null? 0 : revista);
        parametros.put("Editor", editor);
        JasperPrint printer = JasperFillManager.fillReport(reporteCompilado, parametros, connection);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }
    
    public void generarReporteMeGusta(GeneracionReporteModel dataReporte, OutputStream streamSalida) throws JRException {
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();       
        Integer revista = dataReporte.getRevista();
        String editor = dataReporte.getEditor();
        
        InputStream reporteCompilado = getClass().getResourceAsStream("../ReporteEditorMeGusta.jasper");
        InputStream subreporteCompilado = getClass().getResourceAsStream("../SubreporteEditorMeGusta.jasper");
        InputStream subSubreporteCompilado = getClass().getResourceAsStream("../SubSubreporteEditorMeGusta.jasper");

        Map<String,Object> parametrosSubreporte = new HashMap<>();
        parametrosSubreporte.put("subreportParameter", subSubreporteCompilado);
        
        Map<String, Object> parametros = new HashMap<>();
        parametros.put("subreportParameter", subreporteCompilado);
        parametros.put("FechaDesde", fechaDesde);
        parametros.put("FechaHasta", fechaHasta);
        parametros.put("Revista", revista==null? 0 : revista);
        parametros.put("Editor", editor);
        JasperPrint printer = JasperFillManager.fillReport(reporteCompilado, parametros, connection);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }
    
    public void generarReporteGanancias(GeneracionReporteModel dataReporte, OutputStream streamSalida) throws SQLException, JRException {
        List<GananciaRevista> gananciaRevistas = new ArrayList<>();

        String editor = dataReporte.getEditor();
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();
        Integer idRevista = dataReporte.getRevista();
        Map<Revista, ArrayList<GananciaSuscripcion>> ganancias = new HashMap<>();
        if (idRevista!=null) {
            if (fechaDesde!=null || fechaHasta!=null) {
                ganancias = ControlSuscripciones.obtenerGananciasSuscripcionesRevista(editor, idRevista.intValue(), fechaDesde, fechaHasta);
            } else {
                ganancias = ControlSuscripciones.obtenerGananciasSuscripcionesRevista(editor, idRevista.intValue());
            }
        } else {
            if (fechaDesde!=null || fechaHasta!=null) {
                ganancias = ControlSuscripciones.obtenerGananciasSuscripcionesRevistas(editor, fechaDesde, fechaHasta);
            } else {
                ganancias = ControlSuscripciones.obtenerGananciasSuscripcionesRevistas(editor);
            }
        }
        
        for (Map.Entry<Revista, ArrayList<GananciaSuscripcion>> entry : ganancias.entrySet()) {
            Revista revistaActual = entry.getKey();
            ArrayList<GananciaSuscripcion> ganancia = entry.getValue();
            
            gananciaRevistas.add(new GananciaRevista(fechaDesde, fechaHasta, revistaActual, ganancia));
        }

        JasperDesign jasperDesign = JRXmlLoader.load(getClass().getResourceAsStream("../ReporteEditorGanancias.jrxml"));
        JasperReport jasperCompilado = JasperCompileManager.compileReport(jasperDesign);
        JasperDesign subJasperDesign = JRXmlLoader.load(getClass().getResourceAsStream("../SubreporteEditorGanancias.jrxml"));
        JasperReport subJasperCompilado = JasperCompileManager.compileReport(subJasperDesign);

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("subreportParameter", subJasperCompilado);

        JRDataSource source = new JRBeanCollectionDataSource(gananciaRevistas);

        JasperPrint printer = JasperFillManager.fillReport(jasperCompilado, parametros, source);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }
    
    public void generarReporteTopSuscripciones(GeneracionReporteAdministradorModel dataReporte, OutputStream streamSalida) throws JRException {
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();       
        Integer revista = dataReporte.getRevista();
        
        InputStream reporteCompilado = getClass().getResourceAsStream("../ReporteTopSuscripciones.jasper");
        InputStream subreporteCompilado = getClass().getResourceAsStream("../SubreporteTopSuscripciones.jasper");

        Map<String,Object> parametrosSubreporte = new HashMap<>();
        parametrosSubreporte.put("subreportParameter", subreporteCompilado);
        
        Map<String, Object> parametros = new HashMap<>();
        parametros.put("subreportParameter", subreporteCompilado);
        parametros.put("FechaDesde", fechaDesde);
        parametros.put("FechaHasta", fechaHasta);
        parametros.put("Revista", revista==null? 0 : revista);
        JasperPrint printer = JasperFillManager.fillReport(reporteCompilado, parametros, connection);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }

    public void generarReporteTopComentarios(GeneracionReporteAdministradorModel dataReporte, OutputStream streamSalida) throws JRException {
        Date fechaDesde = dataReporte.getFechaDesde();
        Date fechaHasta = dataReporte.getFechaHasta();       
        Integer revista = dataReporte.getRevista();
        
        InputStream reporteCompilado = getClass().getResourceAsStream("../ReporteTopComentarios.jasper");

        Map<String, Object> parametros = new HashMap<>();
        parametros.put("FechaDesde", fechaDesde);
        parametros.put("FechaHasta", fechaHasta);
        parametros.put("Revista", revista==null? 0 : revista);
        JasperPrint printer = JasperFillManager.fillReport(reporteCompilado, parametros, connection);
        
        JasperExportManager.exportReportToPdfStream(printer, streamSalida);
    }
}
