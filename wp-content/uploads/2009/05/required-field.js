Ext.onReady(function(){
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'under';
	Extensive.components.RequiredFieldInfo.prototype.requiredFieldText = 'These are really important things';
	
    var panel = new Ext.FormPanel({
        frame: true,
        labelWidth: 130,
        width: 350,
        
        items: [{
			xtype: 'textfield',
            fieldLabel: 'This you might tell me',
            anchor: '100%'
        }, {
			xtype: 'textfield',
            fieldLabel: 'This I have to know',
			allowBlank: false,
            anchor: '100%',
            blankText: 'As said, I have to know this!'
        }, {
            xtype: 'reqFieldInfo'
        }]
    });
    var element = Ext.query('script[src$=required-field.js]')[0];
    var renderElement = element.parentNode;
    panel.render(renderElement);
});
