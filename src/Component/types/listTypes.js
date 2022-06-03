import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const ListType = (props) => (
  <List title={'Types'} {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="type_name" label="Type " />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ListType;
