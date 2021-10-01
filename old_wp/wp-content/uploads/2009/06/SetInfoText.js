/**
 * @author schiesser
 */

Ext.ns('Extensive.behaviours');

Extensive.behaviours.setInfoText = function(element, infoText, infoClass){
    var value = '';
	infoClass = infoClass || 'extensive-info-text';
    element.dom.value = infoText;
	element.addClass(infoClass);
    
    var onBlur = function(e){
        value = e.target.value;
        if (value === '') {
            e.target.value = infoText;
            Ext.fly(e.target).addClass(infoClass);
        }
    };
    
    var onFocus = function(e){
        Ext.fly(e.target).removeClass(infoClass);
        if (value === '') {
            e.target.value = '';
        }
    };
    element.on('focus', onFocus);
    element.on('blur', onBlur);
};