---
author: admin
date: 2011-11-18 14:36:15+00:00
draft: false
title: Let the user change the column order in Java/Swing
type: post
url: /2011/11/18/let-the-user-change-the-column-order-in-javaswing/
categories:
- Java
- Technology
tags:
- Java
- model
- swing
- tablecolumnmodel
---

Do you have the requirement to let the user of your application change the order
of his columns and your app is based on Swing?

Then you should read further. Below you find a `[TableColumnModel](http://download.oracle.com/javase/1.4.2/docs/api/javax/swing/table/TableColumnModel.html)` that has
two states: `STANDARD` and `USERDEFINED`.
In the `STANDARD` state the user may not change the order of the columns by drag'n'drop,
in `USERDEFINED` he may. The good thing: If you toogle the state the column order is restored. 

Just a hint: If you want to store the column order, first get it by calling `getColumnMap()`.

Before you ask you to use it. Try `setModel` of your `JTable`[](http://download.oracle.com/javase/1.4.2/docs/api/javax/swing/JTable.html) class ;)

Have fun!


    
    
    public class StatefulTableColumnModel extends DefaultTableColumnModel {
    
        public enum Mode {
            STANDARD, USERDEFINED;
        }
        
        private int columnMap[];
        private Mode mode = Mode.STANDARD; 
    
        public StatefulTableColumnModel(Mode mode, int[] columnMap) {
            this.columnMap = columnMap;
            if(mode!=null) 
                setMode(mode);
            else
                setMode(Mode.STANDARD);
        }
        
        public void setMode(Mode mode) {
            this.mode = mode;
            refresh();
        }
        
        public Mode getMode() {
            return this.mode;
        }
        
        public int[] getColumnMap() {
            return columnMap;
        }
        
        /* (non-Javadoc)
         * @see javax.swing.table.DefaultTableColumnModel#fireColumnMoved(javax.swing.event.TableColumnModelEvent)
         */
        @Override
        protected void fireColumnMoved(TableColumnModelEvent e) {
            switch(mode) {
            case USERDEFINED:
                // if columns have been moved there might have been Drag'n'Drop operations,
                // so update the state 
                columnMap = getColumnPositions();
                break;
            case STANDARD:
                // in standard mode drag'n'drop operations are not permitted, so reset the order
                resetColumnPositions();
                break;
            }
            super.fireColumnMoved(e);
        }
    
        /**
         * re-order table columns depending on their model index (this resets the original order), don't update view
         */
        private void resetColumnPositions() {
            Collections.sort(tableColumns, new Comparator<tablecolumn>() {
                public int compare(TableColumn o1, TableColumn o2) {
                    return new Integer(o1.getModelIndex()).compareTo(o2.getModelIndex());
                }
            });
        }
    
        /**
         * set the visible column positions (independent of state), don't update view
         */
        private void setColumnPositions(final int columnMap[]) {
            resetColumnPositions();
            if(columnMap!=null) {
                Vector<tablecolumn> newOrder = new Vector<tablecolumn>(tableColumns.capacity());
                newOrder.setSize(tableColumns.size());
                int i=0;
                for(TableColumn column: tableColumns) {
                    // lookup new position in newOrder
                    int newPos = columnMap[i++];
                    newOrder.set(newPos, column);
                }
                tableColumns = newOrder;
            }
        }
    
        /**
         * @return the visible column positions (independent of state)
         */
        private int[] getColumnPositions() {
            int result[] = new int[tableColumns.size()];
            int i=0;
            for(TableColumn column: tableColumns) {
                int modelIndex = column.getModelIndex();
                result[modelIndex] = i++;
            }
            return result;
        }
    
        /**
         * 
         */
        public void refresh() {
            switch(mode) {
            case STANDARD:
                // reset position
                resetColumnPositions();
                break;
            case USERDEFINED:
                setColumnPositions(columnMap);
                break;
            }        
            // inform view that column order has changed (seems to be sufficient to just tell 0 has moved to 1)
            super.fireColumnMoved(new TableColumnModelEvent(this, 0, 1));        
        }
    
    }
    
