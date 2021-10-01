---
author: admin
date: 2009-04-01 10:04:48+00:00
draft: false
title: Country selector with flag images in ExtJS
type: post
url: /2009/04/01/country-selector-with-flag-images-in-extjs/
categories:
- ExtJS
tags:
- box
- combo
- country
- ext
- flag
- selector
---

Based on the [ExtJS-Tutorial on how to build a combo box with an icon](http://extjs.com/learn/Tutorial:Extending_Ext_Class), I built a component that can be used as a country selector in ExtJS.

Here you can find the code of the component: 


    
    
    Ext.ns('Extreme.components');
    
    Extreme.components.CountryCombo = Ext.extend(Ext.form.ComboBox, {
        constructor: function(config){
            var data;
            if (config.phoneLabels) {
                data = [['+49', '+49', 'ux-flag-de'], ['+43', '+43', 'ux-flag-at'], ['+41', '+41', 'ux-flag-ch'], ['+352', '+352', 'ux-flag-lu'], ['+432', '+432', 'ux-flag-li']];
            }
            else {
                data = [['DE', 'Deutschland', 'ux-flag-de'], ['AT', 'Österreich', 'ux-flag-at'], ['CH', 'Schweiz', 'ux-flag-ch'], ['LU', 'Luxemburg', 'ux-flag-lu'], ['LI', 'Lichtenstein', 'ux-flag-li']];
            }
            
            Extreme.components.CountryCombo.superclass.constructor.call(this, Ext.apply({
                store: new Ext.data.SimpleStore({
                    fields: ['countryCode', 'countryName', 'countryFlag'],
                    data: data
                }),
                plugins: new Ext.ux.plugins.IconCombo(),
                valueField: 'countryCode',
                displayField: 'countryName',
                iconClsField: 'countryFlag',
                triggerAction: 'all',
                mode: 'local'
            }, config));
        }
    });
    Ext.reg('countrycombo', Extreme.components.CountryCombo);
    



It's basically just a `ComboBox `using the `IconCombo `plugin with a predefined `Store`. The `Store `is in fact a `SimpleStore `which contains the country codes, labels and css classes for the icons for each country. 
(If you wonder about the `Extreme `namespace, I am right now building a little component library for ExtJS).
The country selector is registered under the xtype of 'countrycombo'. So here's a small example of how to use it:


    
    
    Ext.onReady(function(){
    	
        var form = new Ext.FormPanel({
    		items: [{
    			xtype: 'countrycombo',
    			fieldLabel: 'Country',
                name: 'country',
    			anchor: '100%'
    		}],
    		frame: true,
    		style: 'padding: 10px;',
    		width: 250,
    		labelWidth: 50
    	});
        
    	var element = Ext.query('script[src$=country-combo.js]')[0];
    	var renderElement = element.parentNode;
    	form.render(renderElement);
    });
    



Thanks go also to [FamFamFam](http://www.famfamfam.com/lab/icons/flags/) where i retrieved the flag images.

**Update:** You can find this code and all my other ExtJS components bundled in [a library called 'extensive'](http://code.google.com/p/extensive/). Enjoy the code and feel free to support the project by participating.
