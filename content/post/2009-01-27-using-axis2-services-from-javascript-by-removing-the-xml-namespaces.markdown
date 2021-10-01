---
author: admin
date: 2009-01-27 17:15:13+00:00
draft: false
title: Using Axis2 services from Javascript (by removing the XML namespaces)
type: post
url: /2009/01/27/using-axis2-services-from-javascript-by-removing-the-xml-namespaces/
categories:
- Java
tags:
- axis2
- formatter
- Java
- javascript
- message
- namespaces
- service
- xml
---

If you want to call an [Axis2](http://ws.apache.org/axis2/) service from Javascript you will face the problem that the XML response of an Axis2 service call contains XML namespaces - something Javascript doesn't like in cross-browser-friendly way.
The idea to fix this issue is to make an XSLT transformation directly from Axis2 that removes the unnecessary namespaces.

First we need an [XSLT transformation](http://wiki.tei-c.org/index.php/Remove-Namespaces.xsl) that will do the job:


    
    
    <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output indent="no" method="xml"></xsl:output>
    
    <xsl:template match="/|comment()|processing-instruction()">
        <xsl:copy>
          <xsl:apply-templates></xsl:apply-templates>
        </xsl:copy>
    </xsl:template>
    
    <xsl:template match="*">
        <xsl:element name="{local-name()}">
          <xsl:apply-templates select="@*|node()"></xsl:apply-templates>
        </xsl:element>
    </xsl:template>
    
    <xsl:template match="@*">
        <xsl:attribute name="{local-name()}">
          <xsl:value-of select="."></xsl:value-of>
        </xsl:attribute>
    </xsl:template>
    </xsl:stylesheet>
    



Then we'll need a hand-made Axis2 conform [MessageFormatter](http://ws.apache.org/axis2/1_3/api/org/apache/axis2/transport/MessageFormatter.html) that uses the standard formatter for XML and performs the XSLT transformation on the result:


    
    
    package de.marcusschiesser.axis2;
    
    import java.io.ByteArrayInputStream;
    import java.io.ByteArrayOutputStream;
    import java.io.File;
    import java.io.OutputStream;
    
    import javax.xml.transform.Transformer;
    import javax.xml.transform.TransformerConfigurationException;
    import javax.xml.transform.TransformerException;
    import javax.xml.transform.TransformerFactory;
    import javax.xml.transform.stream.StreamResult;
    import javax.xml.transform.stream.StreamSource;
    
    import org.apache.axiom.om.OMOutputFormat;
    import org.apache.axis2.AxisFault;
    import org.apache.axis2.context.MessageContext;
    import org.apache.axis2.transport.http.ApplicationXMLFormatter;
    
    public class NamespaceLessXMLFormatter extends ApplicationXMLFormatter {
    	private Transformer transformer;
    	private AxisFault fault; 
    	
    	public NamespaceLessXMLFormatter() {
    		super();
    		TransformerFactory tFactory = TransformerFactory.newInstance();
    		try {
    			transformer = tFactory.newTransformer(new StreamSource(new File("removeNamespaces.xsl")));
    		} catch (TransformerConfigurationException e) {
    			fault = AxisFault.makeFault(e);
    		}
    	}
    	
    	@Override
    	public void writeTo(MessageContext messageContext, OMOutputFormat format, OutputStream outputStream,
    			boolean preserve) throws AxisFault {
    		if(fault!=null) throw fault;
    		try {
    			ByteArrayOutputStream os = new ByteArrayOutputStream();
    			super.writeTo(messageContext, format, os, preserve);
    			ByteArrayInputStream is = new ByteArrayInputStream(os.toByteArray());
    			transformer.transform(new StreamSource(is), new StreamResult(outputStream));
    		} catch (TransformerException e) {
    			throw AxisFault.makeFault(e);
    		}
    	}
    
    }
    



(Don't forget to adjust the path of `removeNamespaces.xsl`, so the formatter can find the .xsl!)

Finally just put the class of the newly created formatter in `WEB-INF/classes` of your Axis2 deployment and replace the reference in the axis2.xml configuration file.
For this just exchange the line:


    
    
    <messageformatter contenttype="application/xml" class="org.apache.axis2.transport.http.ApplicationXMLFormatter"></messageformatter> 
    



with:


    
    
    <messageformatter contenttype="application/xml" class="de.marcusschiesser.axis2.NamespaceLessXMLFormatter"></messageformatter> 
    



After a restart of your application server you should be able to use your Axis2 services from Javascript - Have fun!
