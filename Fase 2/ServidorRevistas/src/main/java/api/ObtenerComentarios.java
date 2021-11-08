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

import db.ControlRevistas;
import objetos.Comentario;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "ObtenerComentarios", urlPatterns = {"/obtener-comentarios"})
public class ObtenerComentarios extends HttpServlet {

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
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		Integer idRevista = Integer.parseInt(request.getParameter("id"));
		Integer numeroRevista = Integer.parseInt(request.getParameter("numero"));
		
		try {
			ArrayList<Comentario> comentariosNumero = ControlRevistas.obtenerComentarios(idRevista, numeroRevista);

			Gson gson = new Gson();
			
			String comentariosJSON = gson.toJson(comentariosNumero);
			
			PrintWriter out = response.getWriter();
			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out.print(comentariosJSON);
			out.flush();
		} catch (SQLException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}
}
