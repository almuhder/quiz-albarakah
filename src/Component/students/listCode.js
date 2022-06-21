import React from 'react';
// import { useRef } from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ShowButton,
  BooleanField,
} from 'react-admin';

export const ListCode = (props) => {
  return (
    <List title={'Students Codes'} {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="student_number" label="Student Number" />
        <TextField source="student_code" label="Student Code" />

        <BooleanField
          source="status"
          valueLabelTrue="complete quiz"
          valueLabelFalse="not complete quiz"
          looseValue={true}
        />

        <ShowButton label="show" />
        <EditButton />

        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ListCode;
