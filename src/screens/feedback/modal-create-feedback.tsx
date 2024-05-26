import { Form, Radio, Typography, UploadFile, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { memo, useCallback } from 'react';
import { RcFile } from 'antd/es/upload';

import { ModalCustomize } from '../../components/modal-customize';
import { ServiceFeedbackTypeEnum } from '../../graphql/type.interface';
import { Messages, feedbackTypeText } from '../../utils/messages';
import { useCreateServiceFeedbackMutation } from '../../graphql/mutations/createServiceFeedback.generated';
import { useUploadImageMutation } from '../../services';
import { UploadListMedia } from '../../components/upload-image/upload-list-media';

import { icons } from './tab-feedback-component';

export const ModalCreateFeedback = memo(
  ({ open, onClose, handleRefetch }: { open: boolean; onClose: () => void; handleRefetch: () => void }) => {
    const [createForm] = Form.useForm();

    const onCloseModal = useCallback(() => {
      createForm.resetFields();
      handleRefetch();
      onClose();
    }, [createForm, handleRefetch, onClose]);

    const [createFeedback, { loading: creating }] = useCreateServiceFeedbackMutation({
      onError(error) {
        notification.error({ message: 'Gửi phản hồi thất bại', description: error?.message });
      },
      onCompleted() {
        notification.success({ message: 'Gửi phản hồi thành công' });
        onCloseModal();
      },
    });

    const { mutateAsync: mutateImg, isLoading: imgLoading } = useUploadImageMutation({
      onError(error) {
        notification.error({ message: Messages.upload.fail('ảnh/video'), description: error?.message });
      },
    });

    const onFinish = useCallback(
      async (values: any) => {
        const handleUploadImages = async (imgs: UploadFile[]) => {
          const uploadData = imgs.filter((img) => img.status !== 'done');
          return Promise.all(
            uploadData.map((data) => {
              const formData = new FormData();
              formData.append('file', data.originFileObj as RcFile);
              return mutateImg(formData);
            }),
          ).then((values: any) => values.map((v: any) => v.id));
        };
        const imagesIds =
          values.imagesIds && values.imagesIds.length !== 0 ? await handleUploadImages(values.imagesIds) : [];
        createFeedback({ variables: { input: { ...values, imagesIds } } });
      },
      [createFeedback, mutateImg],
    );

    return (
      <ModalCustomize
        open={open}
        title="Tạo phản hồi mới"
        okText="Gửi đi"
        cancelText="Hủy"
        onOk={() => createForm.submit()}
        onCancel={onCloseModal}
        okButtonProps={{ loading: creating }}>
        <Form form={createForm} onFinish={onFinish}>
          <Typography.Paragraph className="font-medium text-base">Loại phản hồi</Typography.Paragraph>
          <Form.Item name="type" rules={[{ required: true, message: Messages.required('Loại phản hồi') }]}>
            <Radio.Group className="flex flex-col">
              {Object.values(ServiceFeedbackTypeEnum).map((option) => (
                <Radio.Button key={option} className="mb-2 rounded" value={option}>
                  {icons({ width: 16.67, height: 16.67, className: 'mr-3' })[option]}
                  {feedbackTypeText(option)}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          <Typography.Paragraph className="font-medium text-base mt-5">Nội dung phản hồi</Typography.Paragraph>
          <Form.Item name="content" rules={[{ required: true, message: Messages.required('Nội dung phản hồi') }]}>
            <TextArea autoSize={{ minRows: 4, maxRows: 10 }} placeholder={`Nhập nội dung`} maxLength={1000} showCount />
          </Form.Item>
          <Typography.Paragraph className="font-medium text-base mt-5">Ảnh/ Video</Typography.Paragraph>
          <Form.Item name="imagesIds" valuePropName="files">
            <UploadListMedia
              multiple
              disabled={imgLoading}
              onUpload={(files) => createForm.setFieldValue('imagesIds', files)}
              onRemove={() => createForm.setFieldValue('imagesIds', [])}
            />
          </Form.Item>
        </Form>
      </ModalCustomize>
    );
  },
);
