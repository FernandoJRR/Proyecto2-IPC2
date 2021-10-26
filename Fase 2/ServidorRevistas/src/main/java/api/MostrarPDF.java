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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.ControlRevistas;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "MostrarPDF", urlPatterns = {"/mostrar-pdf"})
public class MostrarPDF extends HttpServlet {

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
		Integer numeroRevista = Integer.valueOf(request.getParameter("numeroRevista"));
		if(numeroRevista != null){
			show(response, numeroRevista);
		}
	}
	
	private void show(HttpServletResponse response, Integer numeroRevista)
		throws ServletException, IOException {
		try {
			final String pdfPath = ControlRevistas.obtenerPathPDF(numeroRevista);
			final String homePath = System.getProperty("user.home");
			final String PATH = homePath+pdfPath;
			
			System.out.println(PATH);
			
			if (pdfPath != null) {
				try (BufferedInputStream fileStream = new BufferedInputStream(new FileInputStream(PATH))) {
					response.setContentType("application/pdf");
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
