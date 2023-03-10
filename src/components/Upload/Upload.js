import { message } from 'antd';
import React from 'react';

const Upload = () => {
  const uploadProps = {
    name: 'file',
    action: 'https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/image',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return <div>Upload</div>;
};

export default Upload();