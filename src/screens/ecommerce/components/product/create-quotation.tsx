import { useCallback } from 'react';
import { Button, Form, Input, InputNumber, Spin } from 'antd';

import { ProductEntity, ProductQuotationInput } from '../../../../graphql/type.interface';
import { ModalCustomize } from '../../../../components/modal-customize';
import { getGraphQLErrorMessage, validationMessages } from '../../../../helpers';
import { useUserCreateProductQuotationMutation } from '../../../../graphql/mutations/userCreateProductQuotation.generated';
import { showNotification } from '../../../../utils';
import { UserCountProductQuotationForEachStatusDocument } from '../../../../graphql/queries/userCountProductQuotationForEachStatus.generated';

type Props = {
  product: ProductEntity;
  defaultQuantity?: number;
  maxQuantity?: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const minQuantity = 1;

const defaultOptions = [
  {
    label: 'Tôi có thể thương lượng giá không?',
    value: 'Tôi có thể thương lượng giá không?',
  },
  {
    label: 'Bạn có hỗ trợ phí vận chuyển không?',
    value: 'Bạn có hỗ trợ phí vận chuyển không?',
  },
];

export const CreateQuotation = ({ open, setOpen, maxQuantity, defaultQuantity, product }: Props) => {
  const [form] = Form.useForm();

  const quantity = Form.useWatch('quantity', form);
  const detail = Form.useWatch('detail', form);

  const handleChangeQuantity = useCallback(
    (isIncrease = false) => {
      if (isIncrease) {
        form.setFieldValue('quantity', quantity + 1 > (maxQuantity ?? 1) ? maxQuantity ?? 1 : quantity + 1);
        return;
      }
      form.setFieldValue('quantity', quantity - 1 < minQuantity ? minQuantity : quantity - 1);
    },
    [form, maxQuantity, quantity],
  );

  const [createProductQuotationMutation, { loading: creating }] = useUserCreateProductQuotationMutation({
    onCompleted() {
      showNotification('success', 'Gửi yêu cầu báo giá thành công ');
      setOpen(false);
    },
    onError(e) {
      showNotification('error', 'Gửi yêu cầu báo giá thất bại', getGraphQLErrorMessage(e));
    },
  });

  const handleCreateProductQuotation = useCallback(
    (values: ProductQuotationInput) => {
      createProductQuotationMutation({
        variables: {
          input: {
            ...values,
            productId: product?.id as string,
          },
        },
        refetchQueries: [UserCountProductQuotationForEachStatusDocument],
      });
    },
    [createProductQuotationMutation, product?.id],
  );

  return (
    <Spin spinning={creating}>
      <ModalCustomize
        title="Gửi yêu cầu báo giá"
        okButtonProps={{
          title: 'Gửi yêu cầu',
          form: 'form-create-quotation',
          loading: creating,
          htmlType: 'submit',
          disabled: !detail,
        }}
        cancelButtonProps={{
          loading: creating,
        }}
        open={open}
        onCancel={() => setOpen(false)}>
        <div className="flex gap-x-12px mb-16px">
          <img src={product?.avatar?.fullThumbUrl ?? ''} alt="ảnh sản phẩm" className="w-[56px] h-[56px] object-fill" />
          <div>
            <h5 className="line-clamp-2 text-grayscale-gray text-[13px] font-normal leading-18px">{product?.name}</h5>
            <span className="text-14px leading-20px font-semibold ">Thương lượng</span>
          </div>
        </div>
        <Form
          form={form}
          name="form-create-quotation"
          className="hidden-arrow-input"
          id="form-create-quotation"
          layout="vertical"
          onFinish={handleCreateProductQuotation}
          initialValues={{
            quantity: defaultQuantity ?? 1,
          }}>
          <Form.Item label="Số lượng" name="quantity" className="mb-32px">
            <InputNumber
              id="quantity-cart"
              className="flex justify-center text-center"
              addonBefore={
                <span className={`px-16px py-[8px] hover:cursor-pointer`} onClick={() => handleChangeQuantity()}>
                  -
                </span>
              }
              addonAfter={
                <span className={`px-16px py-[8px] hover:cursor-pointer`} onClick={() => handleChangeQuantity(true)}>
                  +
                </span>
              }
              min={1}
              max={maxQuantity}
            />
          </Form.Item>

          <Form.Item
            label="Yêu cầu chi tiết/Câu hỏi của bạn"
            name="detail"
            rules={[{ required: true, message: validationMessages.required }]}>
            <Input.TextArea rows={4} placeholder="Nhập nội dung" maxLength={1000} showCount />
          </Form.Item>
          <h4 className="text-grayscale-gray text-14px leading-20px font-normal mt-32px">
            Thêm vào Yêu cầu chi tiết/Câu hỏi của bạn
          </h4>
          {defaultOptions.map((it) => (
            <Button
              key={'defaultOptions' + it?.value}
              className="rounded-full border-grayscale-border border-solid w-full flex justify-center mt-8px"
              onClick={() => form.setFieldValue('detail', it?.value)}>
              {it?.label}
            </Button>
          ))}
        </Form>
      </ModalCustomize>
    </Spin>
  );
};
