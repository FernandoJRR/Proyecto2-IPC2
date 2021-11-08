/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author fernanrod
 */
public class SingletonDB {
    
	private final static String url = "jdbc:mariadb://localhost:3306/pagina_revistas";
	private final static String user = "fernanrod";
	private final static String pwd = "0contraSeQueL2";

    private static SingletonDB connectionSingleton = null;
    private Connection connection = null;

    private SingletonDB() {
        try{
	    Class.forName("org.mariadb.jdbc.Driver");
            connection = DriverManager.getConnection(url, user, pwd); 
        } catch(SQLException|ClassNotFoundException e){
            e.printStackTrace();  
        }
    }

    public static SingletonDB getDBConnectionSingleton() {
        if (connectionSingleton == null) {
            connectionSingleton = new SingletonDB();
        }
        return connectionSingleton;
    }
    
    public Connection getConnection() {
        return connection;
    }
}
