package utilidades;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

public class Servlets {
    public static String getBody(HttpServletRequest request) throws IOException {
        BufferedReader reader = request.getReader();

        String body = "";
        String line = reader.readLine();
        while (line != null) {
            body = body + line;
            line = reader.readLine();
        }
        return body;
    }
}
