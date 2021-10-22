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
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ResourceBundle.Control;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import db.ControlUsuarios;

/**
 *
 * @author fernanrod
 */
@WebServlet(name = "UploadFile", urlPatterns = {"/upload-file"})
@MultipartConfig(location = "/tmp")
public class UploadFile extends HttpServlet {

	public static final String homePath = System.getProperty("user.home");
	public static final String pathFotos = "/ServidorRevistas/fotos-perfil";
    public static final String PATH = homePath+pathFotos;


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

		try {
			File archivo = new File(PATH+"/"+username);
			if (archivo.delete()) {
				ControlUsuarios.eliminarFotoDePerfil(username);

				Gson gson = new Gson();
				response.getWriter().append(gson.toJson(true));
			}
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
		}
	}

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

		String username = request.getParameter("username");
		Part filePart = request.getPart("datafile");
		String fileName = filePart.getHeader("Content-Type");
        InputStream fileStream = filePart.getInputStream();

        try (BufferedReader in = new BufferedReader(new InputStreamReader(fileStream))) {
            String line = in.readLine();
            while (line != null) {
                line = in.readLine();
            }
			File prueba = new File(PATH);
			if (!(prueba.exists() && prueba.isDirectory())) {
				prueba.mkdirs();
			}

            String filePath = PATH+"/"+username;

            filePart.write(filePath);
			
			ControlUsuarios.guardarFotoPerfil(username, pathFotos);
			
			Gson gson = new Gson();
			response.getWriter().append(gson.toJson(true));
        } catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			e.printStackTrace();
        }
	}

}
