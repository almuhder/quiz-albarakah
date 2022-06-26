import React from 'react';
import { Popconfirm } from 'antd';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
} from 'react-admin';

import CustomDeleteButton from '../deletebutton/deleteButton';
export const ListType = (props) => (
  <List title={'Types'} {...props}>
    <Datagrid>
      <TextField source="type_name" label="Type " sortable={false} />
      <EditButton />
      <DeleteWithConfirmButton
        confirmTitle="Delete type"
        confirmContent="هل انت متأكد تريد الحذف ؟"
      />
    </Datagrid>
  </List>
);

export default ListType;
