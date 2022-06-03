import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
} from 'react-admin';
// const filters = [<TextInput label="Search" source="q" size="small" alwaysOn />];
export const ListQuestion = (props) => (
  <List title={'Questions'} {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="question_value" label="Question" />

      <TextField source="type.id" label="Type Id" />
      <TextField source="type.type_name" label="Type" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ListQuestion;
