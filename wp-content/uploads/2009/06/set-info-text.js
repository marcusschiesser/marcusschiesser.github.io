/**
 * @author schiesser
 */

Ext.onReady(function(){
    var element = Ext.query('script[src$=set-info-text.js]')[0];
	var inputElement = Ext.DomHelper.append(element.parentNode, {tag: 'input', type: 'text', size: 35}, true);
    Extensive.behaviours.setInfoText(inputElement, 'Your email like max@mustermann.de');
});