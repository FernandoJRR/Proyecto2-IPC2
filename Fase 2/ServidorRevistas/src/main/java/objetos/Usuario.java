/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objetos;

import java.util.ArrayList;

/**
 *
 * @author fernanrod
 */
public class Usuario {
    private String username;
    private String password;
    private String descripcion;
    private String hobbies;
    private String genero;
    private ArrayList<Etiqueta> etiquetas;
    
    public Usuario(String username,String password,String descripcion,String hobbies,String genero,ArrayList<Etiqueta> etiquetas){
        this.username = username;
        this.password = password;
        this.descripcion = descripcion;
        this.hobbies = hobbies;
        this.genero = genero;
        this.etiquetas = etiquetas;
    }
    
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getHobbies() {
        return hobbies;
    }

    public String getGenero() {
        return genero;
    }

    public ArrayList<Etiqueta> getEtiquetas() {
        return etiquetas;
    }
}
