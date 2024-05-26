import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Modal, Upload, UploadFile, UploadProps, message, notification } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

import { useUploadImageMutation } from '../../services';

type Props = {
  fullThumbUrl?: string;
  multiple?: boolean;
  files?: UploadFile[];
  onChange?: (id: string[] | string) => void;
  maxImages?: number;
  listType?: 'picture-card' | 'picture-circle';
};

export type UploadImageRef = {
  upload(): Promise<string | undefined>;
  uploads(): Promise<string[] | undefined>;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const UploadImage = forwardRef<UploadImageRef, Props>((uploadProps, ref) => {
  const { multiple = false, onChange, files, listType = 'picture-card', maxImages } = uploadProps;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { mutateAsync, isLoading } = useUploadImageMutation({
    onError(error) {
      notification.error({ message: 'Tải ảnh lên thất bại.', description: error?.message });
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      upload: async () => {
        if (fileList.length > 0) {
          const formData = new FormData();
          const imageDone = fileList[0]?.status === 'done';
          if (imageDone) return fileList[0]?.uid;
          formData.append('file', fileList[0] as RcFile);

          const res = await mutateAsync(formData);

          return res.id;
        }
      },
      // mutiples
      uploads: async () => {
        if (fileList.length > 0) {
          const images = await Promise.all(
            fileList.map(async (file) => {
              const imageDone = file?.status === 'done';
              if (imageDone) return { id: file?.uid };
              const formData = new FormData();
              formData.append('file', file as RcFile);
              return await mutateAsync(formData);
            }),
          );
          return (images || []).map((image) => image?.id as string);
        }
      },
    }),
    [fileList, mutateAsync],
  );

  useEffect(() => {
    if (files && files?.length > 0) {
      setFileList(files);
    }
  }, [files]);

  const props: UploadProps = {
    listType,
    onChange: undefined,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      onChange?.([...(newFileList ?? []).map((item) => item.uid)]);
      if (!multiple) return;
      return Promise.resolve(false);
    },
    beforeUpload: async (file: RcFile) => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const isAllowedType = allowedTypes.includes(file.type);
      if (!isAllowedType) {
        message.error('Vui lòng chọn ảnh thuộc các định dạng JPG/JPEG/PNG/GIF !');
        return false;
      }
      const maxSizeInMB = 10;
      const isAllowedSize = file.size / 1024 / 1024 < maxSizeInMB;
      if (!isAllowedSize) {
        message.error(`Dung lượng ảnh tối đa là ${maxSizeInMB} MB`);
        return false;
      }

      const url = await getBase64(file);
      (file as any).url = url;

      onChange?.(multiple ? [...(fileList ?? []).map((item) => item.uid), file?.uid] : file?.uid);
      const updatedFileList = multiple ? [...fileList, file] : [file];
      setFileList(updatedFileList);
      return false;
    },
    onPreview: async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    },
    multiple: multiple,
    showUploadList: multiple,
  };

  const handleCancel = useCallback(() => setPreviewOpen(false), []);

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-2">Tải ảnh lên</div>
    </div>
  );

  if (multiple)
    return (
      <div className="flex items-center">
        <Upload {...props} fileList={fileList}>
          {fileList.length !== maxImages ? uploadButton : null}
        </Upload>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="Ảnh xem trước" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );

  return (
    <>
      <Upload {...props} fileList={fileList} showUploadList={false}>
        {fileList.length && fileList[0].url ? (
          <img src={fileList[0].url} alt="avatar" className="w-[125px] h-[125px] bg-cover" />
        ) : (
          uploadButton
        )}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="Ảnh xem trước" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
});
