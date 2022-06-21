import React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from '../myAppbar/myappbar';

// coustom Layout
const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

export default MyLayout;
