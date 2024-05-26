import { memo } from 'react';
import { Upload, UploadFile, message } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';

interface UploadListMediaProps {
  multiple?: boolean;
  files?: UploadFile[];
  onUpload: (files: UploadFile[]) => void;
  disabled?: boolean;
  onRemove?: UploadProps['onRemove'];
}

export const UploadListMedia = memo((uploadListMediaProps: UploadListMediaProps) => {
  const { multiple = false, files, onUpload, disabled, onRemove } = uploadListMediaProps;

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onUpload(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const props: UploadProps = {
    listType: 'picture-card',
    accept: 'image/*,video/*',
    onChange: onChange,
    beforeUpload: (file: RcFile) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'video/mp4'];
      const isAllowedType = allowedTypes.includes(file.type);
      if (!isAllowedType) {
        message.error('Vui lòng chọn ảnh/video thuộc các định dạng JPG/JPEG/PNG/GIF/MP4 !');
        return Upload.LIST_IGNORE;
      }
      const maxSizeInMB = 100;
      const isAllowedSize = file.size / 1024 / 1024 < maxSizeInMB;
      if (!isAllowedSize) {
        message.error(`Dung lượng ảnh/video tối đa là ${maxSizeInMB} MB`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onPreview,
    multiple,
    showUploadList: true,
    disabled,
    maxCount: multiple ? 5 : 1,
    onRemove,
  };

  return (
    <div>
      <Upload {...props} fileList={files}>
        <div className="mt-2">Tải ảnh lên</div>
      </Upload>
    </div>
  );
});
