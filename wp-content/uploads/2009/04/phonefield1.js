Ext.onReady(function(){
    var panel = new Ext.FormPanel({
		style: 'padding: 10px;',
		frame: true,
		labelWidth: 50,
        width: 400,
        
        items: [{
            fieldLabel: 'Mobile',
            xtype: 'phonefield',
            anchor: '100%',
            emptyText: '(e.g.: 423-423-423)',
			defaultCountryCode: '49',
			maskRe: /[0-9 -]/
        }]
    });
    var element = Ext.query('script[src$=phonefield.js]')[0];
    var renderElement = element.parentNode;
    panel.render(renderElement);
});
