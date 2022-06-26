import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
} from 'react-admin';

export const ListQuestion = (props) => (
  <List title={'Questions'} {...props}>
    <Datagrid>
      <TextField source="question_value" label="Question" sortable={false} />
      <TextField source="type.type_name" label="Type" sortable={false} />
      <EditButton />
      <DeleteWithConfirmButton
        confirmTitle="Delete Qeustion"
        confirmContent="هل انت متأكد تريد الحذف ؟"
      />
    </Datagrid>
  </List>
);

export default ListQuestion;
