import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
} from 'react-admin';

export const ListQuestion = (props) => (
  <List title={'Questions'} {...props}>
    <Datagrid>
      <TextField source="id" label="ID" sortable={true} />
      <TextField source="question_value" label="Question" />

      <TextField source="type.type_name" label="Type" />

      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ListQuestion;
