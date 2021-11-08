/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import db.ControlReportes;
import db.SingletonDB;
import net.sf.jasperreports.engine.JRException;
import objetos.GeneracionReporteAdministradorModel;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "GenerarReporteAdministrador", urlPatterns = {"/generar-reporte-administrador"})
public class GenerarReporteAdministrador extends HttpServlet {

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
		GeneracionReporteAdministradorModel generacionReporteModel = gson.fromJson(body, GeneracionReporteAdministradorModel.class);
		ControlReportes controlReportes = null;
		switch (tipoReporte) {
			case "TOPSUSCRIPCIONES":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteTopSuscripciones(generacionReporteModel, response.getOutputStream());
				} catch (JRException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}
				break;
			case "TOPCOMENTARIOS":
				controlReportes = new ControlReportes(SingletonDB.getDBConnectionSingleton().getConnection());
				try {
					controlReportes.generarReporteTopComentarios(generacionReporteModel, response.getOutputStream());
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
