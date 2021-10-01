Ext.onReady(function(){
    Ext.form.Checkbox.prototype.validate = function(){
        if (this.validateField) {
            // other values as 'under' did not work
            this.msgTarget = 'under';
            if (this.checked) {
                Ext.form.Field.prototype.clearInvalid.call(this);
            }
            else {
                Ext.form.Field.prototype.markInvalid.call(this, this.validateMessage);
            }
        }
    };
    var panel = new Ext.FormPanel({
        hideLabels: true,
        border: false,
        header: false,
        width: 200,
        
        items: [{
            xtype: 'checkbox',
            boxLabel: 'Yes, I like to do it',
            validateMessage: 'You really should do it.',
            validateField: true
        }]
    });
    panel.addButton('Check', function(){
        panel.getForm().isValid();
    });
	var element = Ext.query('script[src$=ext-checkbox-validator.js]')[0];
	var renderElement = element.parentNode;
    panel.render(renderElement);
});
