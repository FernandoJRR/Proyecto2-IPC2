/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import db.ControlRevistas;
import objetos.CostoHosting;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "AgregarCosto", urlPatterns = {"/agregar-costo"})
public class AgregarCosto extends HttpServlet {

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
		BufferedReader reader = request.getReader();

		String body = "";
		String line = reader.readLine();
		while (line != null) {
			body = body + line;
			line = reader.readLine();
		}
		
		Gson gson = new Gson();
		CostoHosting costoHosting = gson.fromJson(body, CostoHosting.class);
		try {
			ControlRevistas.agregarCosto(costoHosting.getFechaInicio(), costoHosting.getPorcentaje());
			gson = new Gson();
			response.getWriter().append(gson.toJson(true));
		} catch (SQLException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		} 
	}
}
