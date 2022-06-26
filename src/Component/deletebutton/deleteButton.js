import React from 'react';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { DeleteButton } from 'react-admin';
const CustomDeleteButton = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Popconfirm
      title="Title"
      visible={visible}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
    >
      <DeleteButton onClick={showPopconfirm} />
    </Popconfirm>
  );
};

export default CustomDeleteButton;
