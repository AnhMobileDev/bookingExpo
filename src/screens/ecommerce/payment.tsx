import { memo, useCallback, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Spin } from 'antd';
import { useLocation } from 'react-router-dom';

import { AddressEntity, DiscountCodeEntity, ProductEntity } from '../../graphql/type.interface';
import { ModalCustomize } from '../../components/modal-customize';
import { numberWithDots } from '../../utils';
import { ChooseAddress, ChooseVoucher } from '../../components';
import { QuantityByProduct } from '../cart';

import { ConfirmInfomationOrder } from './components';

enum CreateOrderStep {
  chooseProducts = 'chooseProducts',
  chooseAddress = 'chooseAddress',
  chooseVoucher = 'chooseVoucher',
  confirmInfomation = 'confirmInfomation',
}

type FormDataBuy = {
  quantity: number;
  note?: string;
};

const minQuantity = 1;

const Payment = memo(() => {
  const { state } = useLocation();
  const { products, quantityByProduct, isCart, defaultQuantity = 1, product, totalPayment, carts } = state;

  const [step, setStep] = useState(CreateOrderStep.chooseProducts);

  const [open, setOpen] = useState(true);
  const [dataProduct, setDataProduct] = useState<QuantityByProduct>();

  const [openChooseAddress, setOpenChooseAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState<AddressEntity>();

  const [openChooseVoucher, setOpenChooseVoucher] = useState(false);
  const [voucherSelected, setVoucherSelected] = useState<DiscountCodeEntity>();

  const [form] = Form.useForm();
  const quantity = Form.useWatch('quantity', form);

  const resetModal = useCallback(() => {
    setOpen(false);
    setOpenChooseAddress(false);
    setOpenChooseVoucher(false);
  }, [setOpen]);

  const handleSaveProduct = useCallback(
    (values: FormDataBuy) => {
      setDataProduct({ ...values, productId: product?.id ?? products[0]?.id });
      setOpenChooseAddress(true);
      setStep(CreateOrderStep.chooseAddress);
    },
    [product?.id, products],
  );

  const handleRechooseAddress = useCallback(() => {
    setOpenChooseAddress(true);
    setStep(CreateOrderStep.chooseAddress);
  }, []);

  const handleRechooseVoucher = useCallback(() => {
    setOpenChooseVoucher(true);
    setStep(CreateOrderStep.chooseVoucher);
  }, []);

  const handleCancelChooseAddress = useCallback(() => {
    resetModal();
  }, [resetModal]);

  const handleSaveAddress = useCallback((value: AddressEntity) => {
    setAddressSelected(value);
    setOpenChooseAddress(false);
  }, []);

  const handleCancelChooseVoucher = useCallback(() => {
    resetModal();
  }, [resetModal]);

  const handleSaveVoucher = useCallback(
    (value: DiscountCodeEntity) => {
      setVoucherSelected(value);
      setOpenChooseVoucher(false);
      setStep(CreateOrderStep.confirmInfomation);
    },
    [setVoucherSelected],
  );

  const handleChangeQuantity = useCallback(
    (isIncrease = false) => {
      if (isIncrease) {
        form.setFieldValue('quantity', quantity + 1 > (product?.quantity ?? 1) ? product?.quantity ?? 1 : quantity + 1);
        return;
      }
      form.setFieldValue('quantity', quantity - 1 < minQuantity ? minQuantity : quantity - 1);
    },
    [form, product?.quantity, quantity],
  );
  useEffect(() => {
    if (isCart && step === CreateOrderStep.chooseProducts) {
      setOpen(false);
      setStep(CreateOrderStep.chooseAddress);
      setOpenChooseAddress(true);
    }
  }, [isCart, step]);

  return (
    <Spin spinning={false}>
      {step === CreateOrderStep.chooseProducts && !isCart && (
        <ModalCustomize
          title="Đặt mua"
          okButtonProps={{
            title: 'Gửi yêu cầu',
            form: 'form-create-quotation',
            //   loading: creating,
            htmlType: 'submit',
            //   disabled: !note,
          }}
          cancelButtonProps={{
            disabled: true,
          }}
          open={open}
          onCancel={resetModal}>
          <div className="flex gap-x-12px mb-16px">
            <img
              src={product?.avatar?.fullThumbUrl ?? ''}
              alt="ảnh sản phẩm"
              className="w-[56px] h-[56px] object-fill"
            />
            <div>
              <h5 className="line-clamp-2 text-grayscale-gray text-[13px] font-normal leading-18px">{product?.name}</h5>
              <span className="text-14px leading-20px font-normal text-grayscale-gray">Giá: </span>
              <span className="text-14px leading-20px font-semibold">
                {numberWithDots(product?.unitPrice ?? 0) + ' đ'}
              </span>
            </div>
          </div>
          <Form
            form={form}
            name="form-create-quotation"
            id="form-create-quotation"
            layout="vertical"
            onFinish={handleSaveProduct}
            initialValues={{
              quantity: defaultQuantity ?? 1,
            }}>
            <Form.Item label="Số lượng" name="quantity" className="mb-32px">
              <InputNumber
                id="quantity-cart"
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
                max={product?.quantity}
              />
            </Form.Item>

            <Form.Item label="Ghi chú đơn hàng" name="note" normalize={(e) => e.trimStart()}>
              <Input.TextArea rows={4} placeholder="Nhập nội dung" maxLength={1000} showCount />
            </Form.Item>

            <div className="flex justify-between items-center mt-[40px]">
              <div>
                <p className="text-14px leading-20px">Tổng giá trị</p>
                <p className="text-13px leading-18px">({quantity} sản phẩm)</p>
              </div>
              <div>{numberWithDots(quantity * product?.unitPrice) + ' đ'}</div>
            </div>
          </Form>
        </ModalCustomize>
      )}
      {step === CreateOrderStep.chooseAddress && openChooseAddress && (
        <ChooseAddress
          open={openChooseAddress}
          setOpen={setOpenChooseAddress}
          onCancel={handleCancelChooseAddress}
          onFinish={handleSaveAddress}
          defaultAddress={addressSelected}
        />
      )}
      {step === CreateOrderStep.chooseVoucher && openChooseVoucher && (
        <ChooseVoucher
          open={openChooseVoucher}
          setOpen={setOpenChooseVoucher}
          onCancel={handleCancelChooseVoucher}
          onFinish={handleSaveVoucher}
          productIds={(products ?? []).map((it: ProductEntity) => it?.id)}
          priceOfOrder={isCart ? totalPayment : (dataProduct?.quantity ?? 1) * product?.unitPrice}
          defaultVoucher={voucherSelected}
        />
      )}
      <ConfirmInfomationOrder
        productsBuy={isCart ? (quantityByProduct as QuantityByProduct[]) : ([dataProduct] as QuantityByProduct[])}
        address={addressSelected as AddressEntity}
        discount={voucherSelected as DiscountCodeEntity}
        products={products}
        onReChooseAddress={handleRechooseAddress}
        onReChooseVoucher={handleRechooseVoucher}
        isCart={!!isCart}
        carts={carts}
      />
    </Spin>
  );
});
export default Payment;
