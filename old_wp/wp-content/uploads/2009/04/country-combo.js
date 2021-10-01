/**
 * @author schiesser
 */
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