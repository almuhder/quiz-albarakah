import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const ListCode = (props) => (
  <List title={'Students Codes'} {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="student_code" label="Student Code" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ListCode;
