import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, InputNumber, Rate, Row, Spin } from 'antd';

import { SubHeader } from '../../components';
import { AppRoutes, getGraphQLErrorMessage } from '../../helpers';
import { UserProductDocument, useUserProductQuery } from '../../graphql/queries/userProduct.generated';
import { numberWithDots, showNotification } from '../../utils';
import { CartIcon, HeartIcon } from '../../assets/icon';
import { useStoreDetailQuery } from '../../graphql/queries/storeDetail.generated';
import { OperatingUnitEnum, PartnerEntity, ProductEntity, StarInfo } from '../../graphql/type.interface';
import {
  ProductExistInCartDocument,
  useProductExistInCartQuery,
} from '../../graphql/queries/productExistInCart.generated';
import { useAddCartItemsMutation } from '../../graphql/mutations/addCartItems.generated';
import { useUserAddFavoriteProductMutation } from '../../graphql/mutations/userAddFavoriteProduct.generated';
import { useUserRemoveFavoriteProductMutation } from '../../graphql/mutations/userRemoveFavoriteProduct.generated';

import { ActionHeader, CreateQuotation, ProductReview, ProductsHome, StoreItem } from './components';

import './style.css';
const minQuantity = 1;

const RowItem = ({ label, value }: { label: string; value?: any }) => {
  return (
    <div className="flex items-center py-[10px]">
      <span className="text-14px leading-20px text-grayscale-gray basis-1/12">{label}</span>
      <span className="text-14px leading-20px flex-1 ">{value}</span>
    </div>
  );
};

const EcommerceProductDetail = memo(() => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const { data, loading: loadingProduct } = useUserProductQuery({
    variables: { id },
    skip: !id,
  });

  const product = useMemo(() => data?.userProduct, [data]);

  const { data: dataStore, loading: loadingStore } = useStoreDetailQuery({
    variables: { id: product?.partnerId as string },
    skip: !product,
  });
  const store = useMemo(() => dataStore?.storeDetail, [dataStore]);

  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState(product?.avatar?.fullOriginalUrl);

  useEffect(() => {
    setImagePreview(product?.avatar?.fullOriginalUrl);
  }, [product]);

  const { data: dataProductExistInCart, loading: loadingExist } = useProductExistInCartQuery({
    variables: {
      productId: id,
    },
    skip: !id || !product?.unitPrice,
  });

  const productExistInCart = useMemo(() => dataProductExistInCart?.productExistInCart, [dataProductExistInCart]);

  const [open, setOpen] = useState(false);

  const handleChangeQuantity = useCallback(
    (isIncrease = false) => {
      if (isIncrease) {
        setQuantity(quantity + 1 > (product?.quantity ?? 1) ? product?.quantity ?? 1 : quantity + 1);
        return;
      }
      setQuantity(quantity - 1 < minQuantity ? minQuantity : quantity - 1);
    },
    [product?.quantity, quantity],
  );

  const [addProductFavorite, { loading: adding }] = useUserAddFavoriteProductMutation({
    onCompleted() {
      showNotification('success', 'Thêm sản phẩm vào danh sách yêu thích thành công ');
    },
    onError(e) {
      showNotification('error', 'Thêm sản phẩm vào danh sách yêu thích thất bại', getGraphQLErrorMessage(e));
    },
  });

  const [removeProductFavorite, { loading: removing }] = useUserRemoveFavoriteProductMutation({
    onCompleted() {
      showNotification('success', 'Xóa sản phẩm danh sách yêu thích thành công ');
    },
    onError(e) {
      showNotification('error', 'Xóa sản phẩm danh sách yêu thích thất bại', getGraphQLErrorMessage(e));
    },
  });

  const handleChangeProductToProductFavorite = useCallback(() => {
    if (product?.isFavorite) {
      removeProductFavorite({
        variables: {
          productId: product?.id as string,
        },
        refetchQueries: [UserProductDocument],
      });
      return;
    }
    addProductFavorite({
      variables: {
        productId: product?.id as string,
      },
      refetchQueries: [UserProductDocument],
    });
  }, [addProductFavorite, product?.id, product?.isFavorite, removeProductFavorite]);

  const renderActionFavorite = useCallback(() => {
    return (
      <Button
        type={product?.isFavorite ? 'primary' : 'default'}
        icon={<HeartIcon width={20} height={20} fill={'#202C38'} />}
        className={`basis-2/12 ${product?.isFavorite ? 'border border-solid border-primary' : ''}`}
        onClick={handleChangeProductToProductFavorite}
      />
    );
  }, [handleChangeProductToProductFavorite, product?.isFavorite]);

  const [addProductToCart, { loading: addingToCart }] = useAddCartItemsMutation({
    onCompleted() {
      showNotification('success', 'Thêm sản phẩm vào giỏ hàng thành công ');
    },
    onError(e) {
      showNotification('error', 'Thêm sản phẩm vào giỏ hàng thất bại', getGraphQLErrorMessage(e));
    },
  });

  const loading = useMemo(
    () => loadingProduct || loadingStore || addingToCart || removing || adding || loadingExist,
    [loadingProduct, loadingStore, addingToCart, removing, adding, loadingExist],
  );

  const hanldeAddToCart = useCallback(() => {
    addProductToCart({
      variables: {
        input: {
          cartItems: [
            {
              productId: product?.id as string,
              quantity: quantity,
            },
          ],
        },
      },
      refetchQueries: [ProductExistInCartDocument],
    });
  }, [addProductToCart, product?.id, quantity]);

  const renderActionsWithProduct = useCallback(() => {
    //TODO: handle add to cart or buy now
    if (product?.unitPrice) {
      return (
        <div className="flex items-center gap-x-16px mt-16px">
          {renderActionFavorite()}
          <Button className="border border-solid border-primary basis-5/12 w-full">
            {!productExistInCart?.exist ? (
              <div className="flex items-center gap-x-[8px] justify-center" onClick={hanldeAddToCart}>
                <CartIcon />
                <span className="text-primary text-[13px] font-semibold leading-18px">Thêm vào giỏ hàng</span>
              </div>
            ) : (
              <div className="flex items-center gap-x-[8px] justify-center hover:cursor-no-drop">
                <CartIcon />
                <span className="text-primary text-[13px] font-semibold leading-18px">Đã có trong giỏ hàng</span>
              </div>
            )}
          </Button>
          <Button
            type="primary"
            className="basis-5/12 w-full"
            onClick={() =>
              navigate(AppRoutes.shopping.payment.value, {
                state: {
                  products: [product],
                  quantityByProduct: [
                    {
                      productId: product?.id,
                      quantity: quantity,
                      note: '',
                    },
                  ],
                  product,
                  defaultQuantity: quantity,
                },
              })
            }>
            Đặt mua
          </Button>
        </div>
      );
    }
    //TODO: handle request product quotation
    return (
      <div className="flex items-center gap-x-16px mt-16px">
        {renderActionFavorite()}
        <Button type="primary" className="basis-10/12 w-full" onClick={() => setOpen(true)}>
          Gửi yêu cầu báo giá
        </Button>
      </div>
    );
  }, [hanldeAddToCart, navigate, product, productExistInCart?.exist, quantity, renderActionFavorite]);

  return (
    <Spin spinning={loading}>
      <div>
        <SubHeader
          items={[
            {
              title: 'Trang chủ',
              to: AppRoutes.home,
            },
            {
              title: AppRoutes.shopping.list.label,
              to: AppRoutes.shopping.list.value,
            },
            {
              title: 'Sản phẩm',
            },
          ]}
          title={product?.name ?? ''}
          rightContent={<ActionHeader />}
        />
        {/*  */}
        <div className="m-20px hidden-arrow-input">
          <Row className="bg-white">
            <Col md={24} lg={24} xl={12}>
              <div className="p-20px h-full w-full">
                <Row gutter={8}>
                  <Col span={2}>
                    <div className="overflow-x-auto flex flex-col h-[450px] custom-scroll">
                      <img
                        className={`w-full aspect-square object-fill mb-8px hover:cursor-pointer ${
                          imagePreview === product?.avatar?.fullOriginalUrl ? 'border border-solid border-primary' : ''
                        }`}
                        src={product?.avatar?.fullThumbUrl ?? ''}
                        key={'descriptionImages' + product?.avatar?.id}
                        onClick={() => setImagePreview(product?.avatar?.fullOriginalUrl ?? '')}
                      />
                      {(product?.descriptionImages ?? []).map((image) => (
                        <img
                          className={`w-full aspect-square object-fill mb-8px hover:cursor-pointer ${
                            imagePreview === image?.fullOriginalUrl ? 'border border-solid border-primary' : ''
                          }`}
                          src={image?.fullThumbUrl ?? ''}
                          key={'descriptionImages' + image?.id}
                          onClick={() => setImagePreview(image?.fullOriginalUrl ?? '')}
                        />
                      ))}
                    </div>
                  </Col>
                  <Col span={22}>
                    <div className="h-[450px]">
                      <img
                        src={imagePreview ?? product?.avatar?.fullOriginalUrl ?? ''}
                        alt="Ảnh sản phẩm"
                        className="w-full h-full object-fill"
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={24} lg={24} xl={12}>
              <div className="flex flex-col justify-between content-between h-[490px] p-20px">
                <div>
                  <span
                    className={`px-[8px] py-[4px] text-[9px] text-white rounded-full ${
                      product?.isNew ? ' bg-blue' : 'bg-grayscale-gray'
                    }`}>
                    {product?.isNew ? 'Mới' : 'Qua sử dụng'}
                  </span>
                  <h2 className="line-clamp-2 text-[17px] py-[4px]  leading-[22px]">{product?.name}</h2>
                  <div className="flex items-end text-12px mb-16px">
                    <Rate value={product?.reviewSummary?.starAverage} disabled />
                    <p className="text-[12px] px-[4px] pb-[3px]">{product?.reviewSummary?.starAverage ?? 0}</p>
                    <span className="text-[12px] inline text-grayscale-gray pb-[3px]">
                      {'(' + (product?.reviewSummary?.total ?? 0) + ' đánh giá)'}
                    </span>
                  </div>
                  <div className="p-[12px] bg-ghost-white">
                    <h4 className="text-primary font-normal">
                      {product?.unitPrice ? numberWithDots(product?.unitPrice ?? 0) + ' đ' : 'Thương lượng'}
                    </h4>
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <label htmlFor="quantity-cart" className="text-grayscale-gray text-[13px] leading-18px pr-[40px]">
                      Chọn số lượng:
                    </label>
                    <InputNumber
                      disabled={productExistInCart?.exist}
                      id="quantity-cart"
                      className="w-[140px] text-center"
                      addonBefore={
                        <span className={`px-6px py-[6px] hover:cursor-pointer`} onClick={() => handleChangeQuantity()}>
                          -
                        </span>
                      }
                      addonAfter={
                        <span
                          className={`px-6px py-[6px] hover:cursor-pointer`}
                          onClick={() => handleChangeQuantity(true)}>
                          +
                        </span>
                      }
                      value={quantity}
                      min={minQuantity}
                      max={product?.quantity}
                    />
                    <span className="text-grayscale-gray text-[13px] leading-18px inline pl-[12px]">
                      {numberWithDots(product?.quantity) ?? 0} sản phẩm có sẵn
                    </span>
                  </div>
                  {renderActionsWithProduct()}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* store preview */}
        <div className="m-20px bg-white mt-0px">
          <StoreItem store={store as PartnerEntity} />
        </div>
        {/* product infomation */}
        <div className="m-20px bg-white mt-0px p-20px">
          <h3 className="text-[19px] font-semibold leading-[24px] mb-24px">Chi tiết sản phẩm</h3>
          <RowItem label="Biển số" value={product?.vehicleRegistrationPlate} />
          <RowItem label="Số thứ tự" value={product?.ordinalNumber} />
          <RowItem label="Model" value={product?.model?.name} />
          <RowItem label="Số serial" value={product?.serialNumber} />
          <RowItem label="Số VIN" value={product?.vinNumber} />
          <RowItem label="Xuất xứ" value={product?.origin?.name} />
          <RowItem label="Năm sản xuất" value={product?.yearOfManufacture} />
          <RowItem
            label="Tình trạng"
            value={
              product?.isNew
                ? 'Mới'
                : `Đã sử dụng 
              ${
                numberWithDots(product?.operatingNumber ?? 0) +
                (product?.operatingUnit && product?.operatingUnit === OperatingUnitEnum.HOURS ? ' giờ' : ' km')
              }
            `
            }
          />
          <RowItem label="Chi tiết" value={product?.detail} />
        </div>
        {/* review */}
        <div className="mx-20px mb-20px">
          <ProductReview starInfo={product?.starInfo as StarInfo[]} starSummary={product?.reviewSummary} />
        </div>
        {/* products same */}
        <div className="mx-20px mb-20px">
          <ProductsHome />
        </div>
      </div>
      {open && product && (
        <CreateQuotation
          open={open}
          setOpen={setOpen}
          defaultQuantity={quantity}
          maxQuantity={product?.quantity}
          product={product as ProductEntity}
        />
      )}
    </Spin>
  );
});

export default EcommerceProductDetail;
