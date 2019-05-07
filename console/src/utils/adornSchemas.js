/*
Much of the console codebase depends on raw arrays of schemas,
and locating tables by schemas.find(x => x.table_name === y)

If we call adornSchemas to add proper accessors to the raw schemas array
and then use these accessors instead, we will have better control of state.

adornSchemas is idempotic, you can always safely apply it
*/

export function getTable(name) {
  const tbl = this.find(x => x.table_name === name);

  if (typeof tbl === 'undefined') {
    throw new Error('No table named ' + name);
  }
  return tbl;
}

// not a good idea - provide iterators?
// react wants the whole thing though
export function getTables() {
  return this;
}

export function getColumn(table, column) {
  const col = this.getColumns(table).find(y => y.column_name === column);

  if (typeof col === 'undefined') {
    throw new Error('No column named ' + column + ' in table ' + table);
  }

  return col;
}

// not a good idea
export function getColumns(table) {
  return this.getTable(table).columns;
}

/* This does NOT copy the data structure, it only adds
the accessor methods */
export function adornSchemas(schemas) {
  if (typeof schemas.getTable === 'undefined') {
    schemas.getTable = getTable.bind(schemas);
    schemas.getTables = getTables.bind(schemas);
    schemas.getColumn = getColumn.bind(schemas);
    schemas.getColumns = getColumns.bind(schemas);
  }

  return schemas;
}
