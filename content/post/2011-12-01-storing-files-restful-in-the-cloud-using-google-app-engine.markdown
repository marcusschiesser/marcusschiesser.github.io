---
author: admin
date: 2011-12-01 17:09:27+00:00
draft: false
title: Storing files RESTful in the cloud using Google App Engine
type: post
url: /2011/12/01/storing-files-restful-in-the-cloud-using-google-app-engine/
categories:
- Java
---

Do you want to store files RESTful in the cloud? Why not use the Google App Engine for it?

Firstly you will need a entity class that is storing the file in the data store:

    
    
    @Entity
    public class FileEntity {
    	@Id
    	@GeneratedValue(strategy = GenerationType.IDENTITY)
    	private Long key;
    	
    	private Blob content;
    	private String mediaType;
    
    	public Long getKey() {
    		return key;
    	}
    
    	public Blob getContent() {
    		return content;
    	}
    
    	public void setContent(Blob content) {
    		this.content = content;
    	}
    
    	public String getMediaType() {
    		return mediaType;
    	}
    
    	public void setMediaType(String mediaType) {
    		this.mediaType = mediaType;
    	}	
    }
    


Beside the actual content of the file, this entity also stores the media type (you never know, it might be good to know...).
As I just like standards, you also might mention that I used JPA as much as possible (`Blob` is a Google specific thing, as unfortunately `byte[]` can not store large amounts. BTW: `Blob` is also limited by 1MB, so you can not store larger files than 1MB using this approach).

Secondly you will need a JAX-RS resource class that is handling the GET and PUT requests from clients: 

    
    
    @Path("/file")
    public class FileServerResource {
    
    	public static final Logger log = Logger.getLogger(FileServerResource.class.getName());
    
    	@Context
    	UriInfo uriInfo;
    	@Context
    	HttpHeaders headers;
    	@Context
    	HttpServletResponse response;
    
    	@PUT
    	@Path("/store")
    	@Consumes({ MediaType.TEXT_PLAIN, "image/jpeg", "image/png", "image/gif", "application/zip" })
    	@Produces({ MediaType.TEXT_PLAIN })
    	public String storeFile(final byte[] b) {
    		FileEntity file = EMF.doTransaction(new EMF.Closure<fileentity>() {
    			public FileEntity doit(EntityManager em) {
    				byte[] ba = b;
    				String mediaType = headers.getMediaType().toString();
    				FileEntity file = new FileEntity();
    				file.setContent(new Blob(ba));
    				file.setMediaType(mediaType);
    				em.persist(file);
    				return file;
    			}
    		});
    		UriBuilder ub = uriInfo.getBaseUriBuilder();
    		URI link = ub.path("/file/get/" + file.getKey().toString()).build();
    		return link.toString();
    	}
    
    	@GET
    	@Path("/get/{id}")
    	@Produces("*/*")
    	public Response getFile(@PathParam("id") final long id) {
    		return EMF.doTransaction(new EMF.Closure<response>() {
    			public Response doit(EntityManager em) {
    				FileEntity entity = em.find(FileEntity.class, id);
    				if (entity == null)
    					throw new WebApplicationException(404);
    				return Response.ok(entity.getContent().getBytes(), entity.getMediaType()).build();
    			}
    		});
    	}
    }
    



At last you just need a small helper class ([EMF.java](/wp-content/uploads/2011/12/EMF.java)) that is handling the transactions and of course an JAX-RS implementation (I used [Jersey 1.6](http://jersey.java.net/) - works perfectly with App Engine).

To test the file store, just call:
`curl --upload-file mypic.jpg -H "Content-Type: image/jpeg" http://localhost:8888/rest/file/store`

This request returns the URL of the file that is stored. Just request this URL to retrieve your file back from the storage.

Have fun and let me know, if you are using this code for some of your projects.

