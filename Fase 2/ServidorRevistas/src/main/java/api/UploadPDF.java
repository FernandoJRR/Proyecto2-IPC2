/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import db.ControlRevistas;
import objetos.NumeroRevista;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "UploadPDF", urlPatterns = {"/upload-pdf"})
@MultipartConfig(location = "/tmp")
public class UploadPDF extends HttpServlet {
	
	public static final String homePath = System.getProperty("user.home");
	public static final String pathPDF = "/ServidorRevistas/pdf-revistas";
    public static final String PATH_PDF = homePath+pathPDF;

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {

		Integer numeroRevista = Integer.parseInt(request.getParameter("numero"));
		Part filePart = request.getPart("datafile");
		String fileName = filePart.getHeader("Content-Type");
        InputStream fileStream = filePart.getInputStream();

        try (BufferedReader in = new BufferedReader(new InputStreamReader(fileStream))) {
            String line = in.readLine();
            while (line != null) {
                line = in.readLine();
            }
			File prueba = new File(PATH_PDF);
			if (!(prueba.exists() && prueba.isDirectory())) {
				prueba.mkdirs();
			}

			NumeroRevista revista = ControlRevistas.obtenerNumeroRevista(numeroRevista);

            String filePath = PATH_PDF+"/"+revista.getIdRevista();

			File pruebaDirectorioPDFRevista = new File(filePath);
			if (!(pruebaDirectorioPDFRevista.exists() && pruebaDirectorioPDFRevista.isDirectory())) {
				pruebaDirectorioPDFRevista.mkdirs();
			}

            filePart.write(filePath+"/"+numeroRevista);
			
			ControlRevistas.guardarPDFRevista(revista.getIdRevista(), numeroRevista, pathPDF);
			
			Gson gson = new Gson();
			response.getWriter().append(gson.toJson(true));
        } catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
        }
	}
}
