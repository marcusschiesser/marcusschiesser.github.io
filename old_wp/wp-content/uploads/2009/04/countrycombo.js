/**
 * @author schiesser
 */
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
