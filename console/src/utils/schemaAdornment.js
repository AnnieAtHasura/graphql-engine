/*
Much of the console codebase depends on raw arrays of schemas,
and locating tables by schemas.find(x => x.table_name === y)

If we call adornSchemas to add proper accessors to the raw schemas array
and then use these accessors instead, we will have better control of state.

adornSchemas is idempotic, you can always safely apply it
*/

function adornSchemas(schemas) {
  if (typeof schemas.getTable === 'undefined') {
    schemas.getTable = getTable.bind(schemas);
    schemas.getTables = getTables.bind(schemas);
    schemas.getColumn = getColumn.bind(schemas);
    schemas.getColumns = getColumns.bind(schemas);
  }
}

function getTable(name) {
  const tbl = this.find(x => x.table_name === name);

  if (typeof tbl === 'undefined') {
    throw new Error('No table named ' + name);
  }
  return tbl;
}

// not a good idea - provide iterators?
// react wants the whole thing though
function getTables() {
  return this;
}

function getColumn(table, column) {
  const col = this.getColumns(table).find(y => y.column_name === column);

  if (typeof col === 'undefined') {
    throw new Error('No column named ' + column + ' in table ' + table);
  }
}

// not a good idea
function getColumns(table) {
  this.getTable(table).columns;
}
