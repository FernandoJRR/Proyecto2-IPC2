/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.ControlUsuarios;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "ShowFile", urlPatterns = {"/show-file"})
public class ShowFile extends HttpServlet {

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
		String usuario = request.getParameter("username");
		if(usuario != null){
			showImage(response, usuario);
		}
	}
	
	private void showImage(HttpServletResponse response, String usuario)
		throws ServletException, IOException {


		try {
			final String fotoPath = ControlUsuarios.obtenerPathFotoDePerfil(usuario);
			final String homePath = System.getProperty("user.home");
			final String PATH = homePath+fotoPath;
			
			if (fotoPath != null) {
				try (BufferedInputStream fileStream = new BufferedInputStream(new FileInputStream(PATH))) {
					response.setContentType("image/png");
					int data = fileStream.read();
					while (data > -1) {
						response.getOutputStream().write(data);
						data = fileStream.read();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
