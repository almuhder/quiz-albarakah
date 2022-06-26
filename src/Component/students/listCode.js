import React from 'react';
import axios from 'axios';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  TextInput,
  useRecordContext,
} from 'react-admin';
import { Switch } from 'antd';

export const ListCode = (props) => {
  // search input
  const customFilter = [
    <TextInput label="Search" source="student_number" alwaysOn />,
  ];

  // edit status student
  const editStatus = async (id) => {
    const token = localStorage.getItem('tokenA');
    await axios({
      method: 'put',
      url: `http://127.0.0.1:8000/api/student-code/edit-status/${id}`,

      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {});
  };

  // activation status switch
  const Status = () => {
    const record = useRecordContext();
    let value = true;
    if (record.status === 0) {
      value = true;
    }
    if (record.status === 1) value = false;
    return (
      <Switch
        defaultChecked={value}
        onClick={() => editStatus(record.id)}
        checkedChildren="Active"
        unCheckedChildren="Non Avtive"
      />
    );
  };

  return (
    <List
      title={'Students Codes'}
      {...props}
      filters={customFilter}
      sort={{ field: 'student_number', order: 'DESC' }}
    >
      <Datagrid>
        <TextField
          source="student_number"
          label="Student Number"
          sortable={true}
        />
        <TextField
          source="student_code"
          label="Student Code"
          sortable={false}
        />
        <Status />
        <EditButton />
        <DeleteWithConfirmButton
          confirmTitle="Delete Student"
          confirmContent="هل انت متأكد تريد الحذف ؟"
        />
      </Datagrid>
    </List>
  );
};

export default ListCode;
