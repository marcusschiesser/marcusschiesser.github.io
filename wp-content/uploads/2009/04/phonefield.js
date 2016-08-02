/**
 * @author schiesser
 */
Ext.ns('Extreme.components');

Extreme.components.PhoneField = Ext.extend(Ext.Panel, {
    constructor: function(config){
    
		var numberField = new Ext.form.TextField({
                    emptyText: config.emptyText,
                    name: config.numberField,
                    maskRe: config.maskRe || /[0-9 ]/,
                    anchor: '90%',
					allowBlank: config.allowBlank,
					blankText: config.blankText
                });
				
        Extreme.components.CountryCombo.superclass.constructor.call(this, Ext.apply({
            layout: 'column',
            border: false,
            isFormField: true,
            validate: function(){
                return numberField.isValid();
            },
            items: [{
                width: 90,
                layout: 'form',
                border: false,
                hideLabels: true,
                items: {
                    xtype: 'countrycombo',
                    value: '+'+config.defaultCountryCode,
                    phoneLabels: true,
                    name: config.countryField,
                    anchor: '90%',
					allowBlank: config.allowBlank
                }
            }, {
                columnWidth: 1,
                layout: 'form',
                border: false,
                hideLabels: true,
                items: numberField
            }]
        }, config));
    }
});
Ext.reg('phonefield', Extreme.components.PhoneField);
