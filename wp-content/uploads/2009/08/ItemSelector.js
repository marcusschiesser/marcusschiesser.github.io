/**
 * @author marcus
 */
YUI().use('node', 'selector-css3', function(Y){
    Y.on('domready', function(event){
        var element = Y.get('script[src$=itemselector.js]').get('parentNode');
        var clickNode = Y.Node.create('<a class="item-selector-clickme" href="#">Click me</a>');
        element.appendChild(clickNode);
		ms.ItemSelector.setHeader("<div class='item-selector-header'>Which one is your favorite character?</div>");
        clickNode.on('click', function(e){
            ms.ItemSelector.selectItem(['Bart', 'Lisa', 'Homer', 'Marge', 'Maggie', 'Ned', 'Barney', 'Bob'], function(item){
                alert(item + ' is your favorite character.');
            });
        });
    });
});
