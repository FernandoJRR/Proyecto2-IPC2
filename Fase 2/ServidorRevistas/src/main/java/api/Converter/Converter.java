/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package api.Converter;

import com.google.gson.Gson;

/**
 *
 * @author fernanrod
 */
public abstract class Converter<T> {
    private Gson gson;
    private Class<T> converter;

    public Converter(Class<T> converter){
        this.gson = new Gson();
        this.converter = converter;
    }
    
    public T fromJSON(String json){
        return gson.fromJson(json, converter);
    }
    
    public String toJSON(T objeto){
        return gson.toJson(objeto, converter);
    }
}
