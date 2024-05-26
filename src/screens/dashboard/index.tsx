import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
import { RcFile } from 'antd/es/upload';

import { useUploadImageMutation } from '../../services';

export default function Dashboard() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutateAsync, data, isLoading } = useUploadImageMutation({
    onSuccess: () => {
      setFileList([]);
    },
  });

  const handleUpload = () => {
    const formData = new FormData();

    formData.append('file', fileList[0] as RcFile);
    // You can use any AJAX library you like

    mutateAsync(formData);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    multiple: false,
    fileList,
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={isLoading}
        style={{ marginTop: 16 }}>
        {isLoading ? 'Uploading' : 'Start Upload'}
      </Button>
      {data?.fullOriginalUrl && <img src={data.fullOriginalUrl} />}{' '}
      {data?.fullThumbUrl && <img src={data.fullThumbUrl} />}
    </div>
  );
}
