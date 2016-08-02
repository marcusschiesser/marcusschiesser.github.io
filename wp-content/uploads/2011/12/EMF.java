package de.marcusschiesser.filecloud;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.ws.rs.WebApplicationException;

public final class EMF {
	
	public static final Logger log = Logger.getLogger(EMF.class.getName());
	
    public interface Closure<T> {
    	T doit(EntityManager em);
	}

	private static final EntityManagerFactory emfInstance =
        Persistence.createEntityManagerFactory("transactions-optional");

    private EMF() {}

	public static <T> T doTransaction(Closure<T> closure) {
		EntityManager em = emfInstance.createEntityManager();
		EntityTransaction tx = null;
		try {
			tx = em.getTransaction();
			tx.begin();
			T retVal = closure.doit(em);
			tx.commit();
			return retVal;
		} catch (RuntimeException e) {
		    if ( tx != null && tx.isActive() ) tx.rollback();
		    if(!(e instanceof WebApplicationException)) {
		    	log.log(Level.SEVERE, "error during transaction: " + closure.getClass().getName(), e);
		    } 
		    throw e; 
	    } finally {
	        em.close();
	    }
	}
}
