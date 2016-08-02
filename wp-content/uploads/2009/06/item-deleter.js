/**
 * @author schiesser
 */
Ext.onReady(function(){
    // creates an Person class - instances of that class
    // will be stored in the data store
    var Person = Ext.data.Record.create([{
        name: 'firstName'
    }, {
        name: 'lastName'
    }]);
    
    var peopleProxy = new Ext.data.MemoryProxy({
        root: [{
            firstName: 'Homer',
            lastName: 'Simpson'
        }]
    });
    
    var people = new Ext.data.Store({
        reader: new Ext.data.JsonReader({
            root: "root"
        }, Person),
        proxy: peopleProxy
    });
    people.load();
    
	var itemDeleter = new Extensive.grid.ItemDeleter();

    var grid = new Ext.grid.GridPanel({
        store: people,
        cm: new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
            header: 'First name',
            width: 100,
            dataIndex: 'firstName'
        }, {
            header: 'Last name',
            width: 555,
            dataIndex: 'lastName'
        }, itemDeleter]),
		selModel: itemDeleter,
        autoHeight: true
    });
	
    grid.addButton('Add Person', function(){
        if (Math.random() < 0.5) {
            people.add(new Person({
                firstName: 'Ned',
                lastName: 'Flanders'
            }));
        }
        else {
            people.add(new Person({
                firstName: 'C.M.',
                lastName: 'Burns'
            }));
        }
    });
    
    var element = Ext.query('script[src$=item-deleter.js]')[0];
    var renderElement = element.parentNode;
    grid.render(renderElement);
});
