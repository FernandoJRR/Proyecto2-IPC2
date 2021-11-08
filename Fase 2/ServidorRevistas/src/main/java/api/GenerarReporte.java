/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import db.ControlReportes;
import db.ControlSuscripciones;
import db.SingletonDB;
import net.sf.jasperreports.engine.JRException;
import objetos.GananciaSuscripcion;
import objetos.GeneracionReporteModel;
import objetos.Revista;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "GenerarReporte", urlPatterns = {"/generar-reporte"})
public class GenerarReporte extends HttpServlet {

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		String tipoReporte = request.getParameter("tipo");

		response.setContentType("application/pdf");
		response.setHeader("Content-disposition", "attachment; filename=reporte.pdf");

		BufferedReader reader = request.getReader();

		String body = "";
		String line = reader.readLine();
		while (line != null) {
			body = body + line;
			line = reader.readLine();
		}
		
		Gson gson = new Gson();
		GeneracionReporteModel generacionReporteModel = gson.fromJson(body, GeneracionReporteModel.class);
		ControlReportes controlReportes = null;
		switch (tipoReporte) {
			case "COMENTARIOS":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteComentarios(generacionReporteModel, response.getOutputStream());
				} catch (JRException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			case "SUSCRIPCIONES":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteSuscripciones(generacionReporteModel, response.getOutputStream());
				} catch (JRException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			case "MEGUSTA":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteMeGusta(generacionReporteModel, response.getOutputStream());
				} catch (JRException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			case "GANANCIAS":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteGanancias(generacionReporteModel, response.getOutputStream());
				} catch (JRException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
		
			default:
				break;
		}
	}
}
