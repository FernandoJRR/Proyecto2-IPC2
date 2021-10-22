/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import db.ControlUsuarios;
import objetos.GeneroEnum;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "GuardarGenero", urlPatterns = {"/guardar-genero"})
public class GuardarGenero extends HttpServlet {
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
		String username = request.getParameter("username");
		String genero = request.getParameter("genero");
		String eliminacion = request.getParameter("eliminacion");
		
		try {
			if (eliminacion == null) {
				ControlUsuarios.guardarGenero(username, GeneroEnum.valueOf(genero));
				Gson gson = new Gson();
				response.getWriter().append(gson.toJson(true));
			} else {
				ControlUsuarios.eliminarInformacion(username, "genero");
				Gson gson = new Gson();
				response.getWriter().append(gson.toJson(true));
			}
		} catch (SQLException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}
}
