/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import db.ControlEtiquetas;
import objetos.Etiqueta;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "ObtenerEtiquetas", urlPatterns = {"/obtener-etiquetas"})
public class ObtenerEtiquetas extends HttpServlet {

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		
		ArrayList<Etiqueta> listaEtiquetas;
		try {
			listaEtiquetas = ControlEtiquetas.obtenerEtiquetas();
		} catch (SQLException e) {
			listaEtiquetas = new ArrayList<>();
			e.printStackTrace();
		}
		Gson gson = new Gson();
		
		String JsonEtiquetas = gson.toJson(listaEtiquetas);
		
		PrintWriter out = response.getWriter();
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		out.print(JsonEtiquetas);
		out.flush();
	}
}
