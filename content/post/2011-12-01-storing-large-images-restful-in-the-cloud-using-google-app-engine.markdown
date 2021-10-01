---
author: admin
date: 2011-12-01 17:27:36+00:00
draft: false
title: Storing large images RESTful in the cloud using Google App Engine
type: post
url: /2011/12/01/storing-large-images-restful-in-the-cloud-using-google-app-engine/
categories:
- Other
---

In my last article I showed [how to store files in the cloud using Google app engine](/2011/12/storing-files-restful-in-the-cloud-using-google-app-engine/). 
Problem there was that the maximum size of the files was 1MB. Not that much for images.

To improve the situation, we just shrink the images with this very simple algorithm by factor 0.9 until the size is less than 1MB:


    
    
    public class FileTransformer {
    	
    	public static final Logger log = Logger.getLogger(FileTransformer.class.getName());
    
    	private static final int JPEG_QUALITY = 90;
    	private static final int MAX_FILE_SIZE = 1024*1024;
    
    	public byte[] transform(byte[] ba, String mediaType) {
    		if(mediaType.equalsIgnoreCase("image/jpeg")
    				|| mediaType.equalsIgnoreCase("image/jpg")) {
    			return imageTransform(ba);
    		}
    		throw new IllegalArgumentException("Unsupported media type: " + mediaType + " for this transformer");
    	}
    
    	private byte[] imageTransform(final byte[] ba) {
    		byte[] result = ba;
    		while(result.length>MAX_FILE_SIZE) {
    			final Image origImage = ImagesServiceFactory.makeImage(result);
    			final Image newImage = shrinkImage(origImage, 0.9f);
    			result = newImage.getImageData();
    		}
    		return result;
    	}
    
    	private Image shrinkImage(final Image origImage, final float percent) {
    		final ImagesService imagesService = ImagesServiceFactory.getImagesService();
    		log.fine("orig dimensions is " + origImage.getWidth() + " X " + origImage.getHeight());
    		final OutputSettings settings = new OutputSettings(OutputEncoding.JPEG);
    		settings.setQuality(JPEG_QUALITY);
    		
    		final Transform resize = ImagesServiceFactory.makeResize(Math.round(origImage.getWidth()*percent), Math.round(origImage.getHeight()*percent));
    		final Image newImage = imagesService.applyTransform(resize, origImage, settings);
    		return newImage;
    	}
    
    }
    



This `FileTransformer` class is then just called in the `storeFile` method of the `FileServerResource` in the case the file size is large than 1MB:


    
    
    if (ba.length > 1024 * 1024) {
        ba = new FileTransformer().transform(ba, mediaType);
    }
    



Remark: So far this only works with JPEG media types, otherwise an exception is raised. Feel free to add different compression cases for other media types (e.g. using GZIP on texts). As I said, it is a good idea to store
the media type ;)
