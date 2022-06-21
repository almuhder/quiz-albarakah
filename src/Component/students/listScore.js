import React from 'react';

import {
  List,
  Datagrid,
  TextField,
  ArrayField,
  SingleFieldList,
  ChipField,
} from 'react-admin';

export const ListScore = (props) => (
  <List title={'Resultes'} {...props}>
    <Datagrid>
      <TextField source="student_number" label="Student Number" />
      <TextField source="student_code" label="Student Code" />
      <ArrayField source="results" label="Results">
        <SingleFieldList>
          <ChipField source="score" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);

export default ListScore;
