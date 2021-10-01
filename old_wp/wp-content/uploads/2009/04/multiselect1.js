/**
 * @author schiesser
 */
Ext.ns('Extreme.components');

Extreme.components.MultiSelectWindow = Ext.extend(Ext.Window, {
    constructor: function(config){
    
        var that = this;
        
        that.selector = new Ext.ux.ItemSelector({
            dataFields: [config.valueField, config.displayField],
            toData: [],
            msWidth: 250,
            msHeight: 200,
            valueField: config.valueField,
            displayField: config.displayField,
            imagePath: "../lib/extreme/images/ext",
            toLegend: config.toLegend,
            fromLegend: config.fromLegend,
            fromStore: config.store,
            toTBar: [{
                text: config.deleteText,
                handler: function(){
                    that.selector.reset();
                }
            }]
        });
        
        Extreme.components.MultiSelect.superclass.constructor.call(this, Ext.apply({
            closable: false,
            items: that.selector,
            buttons: [{
                text: 'Ok',
                handler: function(){
                    that.fireEvent('ok');
                    that.hide();
                }
            }, {
                text: 'Abbrechen',
                handler: function(){
                    that.hide();
                }
            }],
            width: 550
        }, config));
        that.addEvents('ok');
    }
});

Extreme.components.MultiSelect = Ext.extend(Ext.form.TriggerField, {
    constructor: function(config){
    
        var that = this;
        
        var window = new Extreme.components.MultiSelectWindow(config);

        that.getResultStore = function(){
            return window.selector.toStore;
        };
        
        Extreme.components.MultiSelect.superclass.constructor.call(this, Ext.apply({
            onTriggerClick: function(){
				if (!that.storeLoaded && config.mode !== 'local') {
					config.store.load();
					that.storeLoaded = true;
				}
                window.show();
                window.on('ok', function(){
                    var displayValue = '';
                    that.getResultStore().each(function(record){
                        displayValue += record.get(config.displayField) + ', ';
                    });
                    that.setValue(displayValue.substring(0, displayValue.length-2));
                });
            },
            triggerClass: 'x-form-ellipsis-trigger'
        }, config));
    },
   onRender : function(ct, position){
        Ext.form.ComboBox.superclass.onRender.call(this, ct, position);
        this.el.dom.setAttribute('readOnly', true);
        this.el.on('mousedown', this.onTriggerClick,  this);
	},
    getValue: function(){
		var that = this;
        var result = [];
        if (that.getResultStore()) {
            that.getResultStore().each(function(record){
                var value = record.get(that.valueField);
                result.push(value);
            });
        }
        return result;
    }
});
Ext.reg('singleLineMultiSelect', Extreme.components.MultiSelect);
