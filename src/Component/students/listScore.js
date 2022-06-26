import React from 'react';
import { List, Datagrid, TextField, useRecordContext } from 'react-admin';
import { Table, Tag } from 'antd';

const { Column } = Table;

// expand table resultes
const CustomExpand = () => {
  const record = useRecordContext();
  return (
    <Table dataSource={record.results} pagination={false}>
      <Column title="Date" dataIndex="created_at" key="created_at" />
      <Column title="Score" dataIndex="score" key="score" />
    </Table>
  );
};

// last result and number of all resultes
const LengthResult = () => {
  const record = useRecordContext();
  const length = record.results.length;
  return (
    <span>
      {length > 0 ? (
        <Tag color="#2db7f5">{record.results[length - 1].score}</Tag>
      ) : (
        ''
      )}
      {length > 0 ? ' and ' + (length - 1) + ' other ' : 'no results'}
    </span>
  );
};

export const ListScore = (props) => (
  <List title={'Resultes'} {...props}>
    <Datagrid expand={<CustomExpand />}>
      <TextField
        source="student_number"
        label="Student Number"
        sortable={true}
      />
      <TextField source="student_code" label="Student Code" sortable={false} />
      <LengthResult />
    </Datagrid>
  </List>
);

export default ListScore;
