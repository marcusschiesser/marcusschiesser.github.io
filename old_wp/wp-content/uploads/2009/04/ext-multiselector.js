Ext.onReady(function(){
    var model = new Ext.data.SimpleStore({
        fields: ['label', 'value'],
        data: [['Homer', 1], ['Marge', 2], ['Maggie', 3], ['Bart', 4], ['Lisa', 4]]
    });
    var panel = new Ext.FormPanel({
		frame: true,
		labelWidth: 50,
        width: 300,
        
        items: [{
            fieldLabel: 'I like',
            xtype: 'singleLineMultiSelect',
            store: model,
            anchor: '90%',
			mode: 'local',
            displayField: 'label',
			fromLegend: 'available',
			toLegend: 'selected',
            valueField: 'value',
			deleteText: 'delete',
            emptyText: 'Which Simpsons do you like?'
        }]
    });
    var element = Ext.query('script[src$=ext-multiselector.js]')[0];
    var renderElement = element.parentNode;
    panel.render(renderElement);
});
