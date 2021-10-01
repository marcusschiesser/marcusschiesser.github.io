---
author: admin
date: 2009-06-13 19:53:56+00:00
draft: false
title: Add a delete button in each row of an ExtJS data grid
type: post
url: /2009/06/13/add-a-delete-button-in-each-row-of-an-extjs-data-grid/
categories:
- Component
- ExtJS
tags:
- button
- data grid
- delete
- ExtJS
- row
---

For usability reasons it is usually a good idea to add a delete button to each row of a data grid. If the user clicks on such a button, the whole row that contained the button will be deleted.

The data grid of [ExtJS](http://www.extjs.com) does not contain such a feature by default, but it could be implemented by adding a special column to the column model. Using [this extension](http://www.marcusschiesser.de/wp-content/uploads/2009/06/ItemDeleter.js), it could be easily done like this:


    
    	
    var itemDeleter = new Extensive.grid.ItemDeleter();
    
    var grid = new Ext.grid.GridPanel({
            store: people,
            cm: new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
                header: 'First name',
                width: 100,
                dataIndex: 'firstName'
            }, {
                header: 'Last name',
                width: 150,
                dataIndex: 'lastName'
            }, itemDeleter]),
            selModel: itemDeleter,
            autoHeight: true
    });
    


Note that the `itemDeleter` instance must be added to the `ColumnModel` and set as `selModel` to work properly.
