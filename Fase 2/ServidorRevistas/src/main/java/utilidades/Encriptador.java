/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utilidades;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 *
 * @author fernanrod
 */
public class Encriptador {
    public static String encriptarPassword(String password) {
        return bytesAHash(digerir(password));
    }
    
    public static byte[] digerir(String password) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            return password.getBytes();
        }
        return digest.digest(password.getBytes(StandardCharsets.UTF_8));
    }
    
    public static String bytesAHash(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2*hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hexActual = Integer.toHexString(0xff&hash[i]);
            if (hexActual.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hexActual);
        }
        return hexString.toString();
    }
}
