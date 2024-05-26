export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export enum ActiveCodeEnum {
  ACTIVATE = 'ACTIVATE',
  FORGOT = 'FORGOT',
}

export enum ActorTypeEnum {
  ADMIN = 'ADMIN',
  PARTNER = 'PARTNER',
  USER = 'USER',
}

export type AddressEntity = Node & {
  __typename?: 'AddressEntity';
  addressDetail?: Maybe<Scalars['String']>;
  addressName: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type AdminChangePasswordInput = {
  currentPassword: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
};

export type AdminCreateNotificationInput = {
  body: Scalars['String'];
  executeTime: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type AdminCreateStoreInput = {
  address: Scalars['String'];
  avatarId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  partnerId: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type AdminCreateStoreProductHistoryInput = {
  inputDate: Scalars['String'];
  partnerId: Scalars['String'];
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  storeId: Scalars['String'];
  type: StoreProductTypeEnum;
};

export type AdminDeleteStoreInput = {
  id: Scalars['String'];
  partnerId: Scalars['String'];
};

export type AdminEntity = Node & {
  __typename?: 'AdminEntity';
  address?: Maybe<Scalars['String']>;
  addressMoreInfo?: Maybe<Scalars['String']>;
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AdminForgotPasswordInput = {
  email: Scalars['String'];
};

export type AdminHomePage = {
  __typename?: 'AdminHomePage';
  countBooking: Scalars['Float'];
  countMaintenance: Scalars['Float'];
  countOrder: Scalars['Float'];
  listBooking: Array<BookingEntity>;
  listMaintenance: Array<MaintenanceEntity>;
  revenue: Scalars['Float'];
};

export type AdminKickPartnerOutOfCourseInput = {
  courseId: Scalars['ID'];
  partnerId: Scalars['ID'];
};

export type AdminLoginInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AdminUpdateNotificationInput = {
  body?: InputMaybe<Scalars['String']>;
  executeTime?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateServiceFeedbackInput = {
  answer: Scalars['String'];
  id: Scalars['String'];
  imagesAnswerIds?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<ServiceFeedbacksStatusEnum>;
};

export type AdminUpdateStatusMaintenanceInput = {
  id: Scalars['String'];
  status: MaintenanceStatusEnum;
};

export type AdminUpdateStoreInput = {
  address?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  partnerId?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateUserStatusInput = {
  id: Scalars['String'];
  status: Scalars['Boolean'];
};

export type AdminUserPaginationInput = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type AgencyCreateTechnicianInput = {
  addressMoreInfo: Scalars['String'];
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday: Scalars['String'];
  cardNumber?: InputMaybe<Scalars['String']>;
  citizenId: Scalars['String'];
  education?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullname: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  latitude: Scalars['Float'];
  level?: InputMaybe<Scalars['String']>;
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  phone: Scalars['String'];
  qualifications: Array<Scalars['String']>;
};

export type AgencyDeleteTechnicianInput = {
  id: Scalars['String'];
};

export type AgencyUpdateTechnicianInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  cardNumber?: InputMaybe<Scalars['String']>;
  citizenId?: InputMaybe<Scalars['String']>;
  education?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['Float']>;
  level?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['Float']>;
  mapAddress?: InputMaybe<Scalars['String']>;
  qualifications?: InputMaybe<Array<Scalars['String']>>;
};

export enum AnswerType {
  CHECKBOX = 'CHECKBOX',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export type ApproximateAddressUnits = {
  __typename?: 'ApproximateAddressUnits';
  district: DistrictOutput;
  province: ProvinceOutput;
  ward: WardOutput;
};

export type ApproximateAddressUnitsArgs = {
  fullAddress: Scalars['String'];
};

export type AssignBookingInput = {
  bookingId: Scalars['String'];
  technicianId: Scalars['String'];
};

/** AuthAdminConnection */
export type AuthAdminConnection = {
  __typename?: 'AuthAdminConnection';
  accessToken: Scalars['String'];
  admin: AdminEntity;
  refreshToken: Scalars['String'];
};

export type AuthBiometricEntity = {
  __typename?: 'AuthBiometricEntity';
  biometricId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

/** AuthConnection */
export type AuthConnection = {
  __typename?: 'AuthConnection';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: UserEntity;
};

export type AuthSocialInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  socialToken: Scalars['String'];
  socialType: SocialAccountTypeEnum;
};

export type BasePaginationMeta = {
  __typename?: 'BasePaginationMeta';
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type BiometricLoginInput = {
  biometricId: Scalars['String'];
  deviceId?: InputMaybe<Scalars['String']>;
};

export type BookingConnection = {
  __typename?: 'BookingConnection';
  items?: Maybe<Array<BookingEntity>>;
  meta: BasePaginationMeta;
};

export type BookingEntity = Node & {
  __typename?: 'BookingEntity';
  addressMoreInfo?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress?: Maybe<Scalars['String']>;
  medias: Array<Media>;
  partner: PartnerEntity;
  partnerId: Scalars['String'];
  problemTexts?: Maybe<Array<Scalars['String']>>;
  problems?: Maybe<Array<CategoryEntity>>;
  quotationAccepted?: Maybe<QuotationEntity>;
  scheduleReason?: Maybe<Scalars['String']>;
  scheduleTime?: Maybe<Scalars['DateTime']>;
  settlementAccepted?: Maybe<SettlementEntity>;
  status: BookingStatusEnum;
  statusDetail?: Maybe<BookingStatusEntity>;
  technician?: Maybe<PartnerEntity>;
  technicianCanReviewUser: Scalars['Boolean'];
  technicianId?: Maybe<Scalars['String']>;
  technicianReviewUser?: Maybe<ReviewEntity>;
  transportDistance: Scalars['Float'];
  transportDuration: Scalars['Float'];
  transportFee: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userCanReviewAgency: Scalars['Boolean'];
  userCanReviewTechnician: Scalars['Boolean'];
  userId: Scalars['String'];
  userReviewAgency?: Maybe<ReviewEntity>;
  userReviewTechnician?: Maybe<ReviewEntity>;
  vehicle: VehicleEntity;
  vehicleId: Scalars['String'];
};

export type BookingStatusEntity = Node & {
  __typename?: 'BookingStatusEntity';
  bookingId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  partnerId?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<CategoryEntity>>;
  scheduleReason?: Maybe<Scalars['String']>;
  scheduleTime?: Maybe<Scalars['DateTime']>;
  status: BookingStatusEnum;
  userId?: Maybe<Scalars['String']>;
};

export enum BookingStatusEnum {
  ASSIGNED_TECHNICIAN = 'ASSIGNED_TECHNICIAN',
  CANCEL = 'CANCEL',
  COMPLETE = 'COMPLETE',
  QUOTATION_ACCEPTED = 'QUOTATION_ACCEPTED',
  QUOTATION_REJECTED = 'QUOTATION_REJECTED',
  QUOTATION_REQUESTED = 'QUOTATION_REQUESTED',
  RESCHEDULED = 'RESCHEDULED',
  SETTLEMENT_ACCEPTED = 'SETTLEMENT_ACCEPTED',
  SETTLEMENT_REJECTED = 'SETTLEMENT_REJECTED',
  SETTLEMENT_REQUESTED = 'SETTLEMENT_REQUESTED',
  TECHNICIAN_ARRIVED = 'TECHNICIAN_ARRIVED',
  TECHNICIAN_ARRIVING = 'TECHNICIAN_ARRIVING',
  WAIT_FOR_CONFIRM = 'WAIT_FOR_CONFIRM',
}

export type CancelBookingInput = {
  bookingId: Scalars['String'];
  note: Scalars['String'];
  reasons: Array<Scalars['String']>;
};

export type CancelMaintenanceInput = {
  maintenanceId: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  reasons: Array<Scalars['String']>;
};

export type CancelOrderInput = {
  note?: InputMaybe<Scalars['String']>;
  orderId: Scalars['String'];
  reasons: Array<Scalars['String']>;
};

export type CartEntity = Node & {
  __typename?: 'CartEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  items: Array<CartItemEntity>;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type CartItemEntity = Node & {
  __typename?: 'CartItemEntity';
  cartId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  product: ProductEntity;
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  store?: Maybe<PartnerEntity>;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CartItemInput = {
  productId: Scalars['String'];
  quantity: Scalars['Float'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  items?: Maybe<Array<CategoryEntity>>;
  meta: BasePaginationMeta;
};

export type CategoryEntity = Node & {
  __typename?: 'CategoryEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  type: CategoryTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export enum CategoryTypeEnum {
  CANCEL_MAINTENANCE_REASON = 'CANCEL_MAINTENANCE_REASON',
  CANCEL_ORDER_REASON_BY_PARTNER = 'CANCEL_ORDER_REASON_BY_PARTNER',
  CANCEL_ORDER_REASON_BY_USER = 'CANCEL_ORDER_REASON_BY_USER',
  CANCEL_QUOTATION_REASON = 'CANCEL_QUOTATION_REASON',
  CANCEL_REASON = 'CANCEL_REASON',
  CANCEL_REASON_BY_PARTNER = 'CANCEL_REASON_BY_PARTNER',
  EDUCATION = 'EDUCATION',
  LEVEL = 'LEVEL',
  MANUFACTURER = 'MANUFACTURER',
  MODEL = 'MODEL',
  ORIGIN = 'ORIGIN',
  PART_OF_PRODUCT = 'PART_OF_PRODUCT',
  PROBLEM = 'PROBLEM',
  PRODUCT_UNIT = 'PRODUCT_UNIT',
  QUALIFICATION = 'QUALIFICATION',
  QUOTATION_PRICE_LIST = 'QUOTATION_PRICE_LIST',
  STORE_PRODUCT = 'STORE_PRODUCT',
  VEHICLE_TYPE = 'VEHICLE_TYPE',
}

export type ConnectSocialAccountInput = {
  socialToken: Scalars['String'];
  socialType: SocialAccountTypeEnum;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  items?: Maybe<Array<CourseEntity>>;
  meta: BasePaginationMeta;
};

export type CourseEnrollmentEntity = Node & {
  __typename?: 'CourseEnrollmentEntity';
  courseId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  partner: PartnerEntity;
  partnerId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CourseEntity = Node & {
  __typename?: 'CourseEntity';
  address: Scalars['String'];
  banner?: Maybe<Media>;
  bannerId?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  enrolledCount?: Maybe<Scalars['Float']>;
  enrollments: Array<CourseEnrollmentEntity>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isEnrolled?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  openDate: Scalars['DateTime'];
  price?: Maybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  teacher: Scalars['String'];
  teacherDescription?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type CreateAccessaryInput = {
  avatarId: Scalars['String'];
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isFixedCost: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  modelId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  originId?: InputMaybe<Scalars['String']>;
  partId: Scalars['String'];
  partNumber?: InputMaybe<Scalars['String']>;
  productDevices?: InputMaybe<Array<ProductDeviceInput>>;
  productUnitId: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber?: InputMaybe<Scalars['String']>;
  type: ProductTypeEnum;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type CreateAddressInput = {
  addressDetail?: InputMaybe<Scalars['String']>;
  addressName: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  isDefault?: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
};

export type CreateAgentInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname: Scalars['String'];
  hotline?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  phone: Scalars['String'];
  qualifications?: InputMaybe<Array<Scalars['String']>>;
  suggestionPoint?: InputMaybe<Scalars['Float']>;
};

export type CreateBookingInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  mediaIds?: InputMaybe<Array<Scalars['String']>>;
  partnerId: Scalars['String'];
  problems?: InputMaybe<Array<Scalars['String']>>;
  transportDistance: Scalars['Float'];
  transportDuration: Scalars['Float'];
  transportFee: Scalars['Float'];
  vehicle?: InputMaybe<QuickAddVehicleInput>;
  vehicleId?: InputMaybe<Scalars['String']>;
};

export type CreateCartInput = {
  cartItems: Array<CartItemInput>;
};

export type CreateCategoryInput = {
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  type?: InputMaybe<CategoryTypeEnum>;
};

export type CreateCourseInput = {
  address: Scalars['String'];
  bannerId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  openDate: Scalars['DateTime'];
  price?: InputMaybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  teacher: Scalars['String'];
  teacherDescription?: InputMaybe<Scalars['String']>;
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type CreateDiscountCodeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  limitPerAccount?: InputMaybe<Scalars['Float']>;
  minOrderValue?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  productIds?: InputMaybe<Array<Scalars['String']>>;
  startDate: Scalars['DateTime'];
  unit?: InputMaybe<DiscountCodeUnitEnum>;
  value: Scalars['Float'];
};

export type CreateDocumentInput = {
  fileIds: Array<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  referenceId: Scalars['String'];
};

export type CreateFeedbackInput = {
  content: Scalars['String'];
  feedbackType: FeedbackType;
  medias?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateGuideInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type CreateInstructionInput = {
  description: Scalars['String'];
  guideId: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type CreateMaintenanceInput = {
  accessories?: InputMaybe<Array<MaintenanceAccessoryInput>>;
  addressMoreInfo: Scalars['String'];
  endDate: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  maintenanceLevel: MaintenanceLevelEnum;
  mapAddress: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  routineLevel?: InputMaybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  vehicleId: Scalars['String'];
};

export type CreateOrderReviewInput = {
  orderId: Scalars['String'];
  partnerReview?: InputMaybe<CreatePartnerReviewInput>;
  productReviews?: InputMaybe<Array<CreateProductReviewInput>>;
};

export type CreateOrdersInput = {
  addressId: Scalars['String'];
  orders: Array<OrderInput>;
  totalPayment: Scalars['Float'];
};

export type CreatePartnerReviewInput = {
  comment: Scalars['String'];
  partnerId: Scalars['String'];
  star: Scalars['Float'];
};

export type CreatePasswordRegisterInput = {
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type CreateProductReviewInput = {
  comment: Scalars['String'];
  productId: Scalars['String'];
  star: Scalars['Float'];
};

export type CreateProductVehicleInput = {
  avatarId: Scalars['String'];
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isFixedCost: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  manufacturerId: Scalars['String'];
  modelId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId?: InputMaybe<Scalars['String']>;
  productUnitId: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber?: InputMaybe<Scalars['String']>;
  type: ProductTypeEnum;
  unitPrice?: InputMaybe<Scalars['Float']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId: Scalars['String'];
  vinNumber: Scalars['String'];
  yearOfManufacture?: InputMaybe<Scalars['Float']>;
};

export type CreateQuestionInput = {
  answerType?: InputMaybe<AnswerType>;
  answers: Array<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  question: Scalars['String'];
};

export type CreateQuotationInput = {
  accessories: Array<QuotationAccessoryInput>;
  additionalFees?: InputMaybe<Array<QuotationAdditionalFeeInput>>;
  bookingId: Scalars['String'];
  diagnosisFee: Scalars['Float'];
  diagnosisNote?: InputMaybe<Scalars['String']>;
  diagnostics: Array<QuotationDiagnosticInput>;
  estimatedCompleteAt?: InputMaybe<Scalars['DateTime']>;
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  repairFee: Scalars['Float'];
  transportFee: Scalars['Float'];
};

export type CreateQuotationPriceListInput = {
  accessoriesName: Scalars['String'];
  diagnosticCode: Scalars['String'];
  expense: Scalars['Float'];
  fixable: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  vehicleType: Scalars['String'];
  workingCode: Scalars['String'];
  workingHour: Scalars['Float'];
};

export type CreateReferenceInput = {
  description?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type CreateReviewInput = {
  bookingId?: InputMaybe<Scalars['String']>;
  comment: Scalars['String'];
  orderId?: InputMaybe<Scalars['String']>;
  personEvaluatedId?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  reviewType?: InputMaybe<ReviewTypeEnum>;
  star: Scalars['Float'];
};

export type CreateServiceFeedbackInput = {
  content: Scalars['String'];
  imagesIds?: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ServiceFeedbackTypeEnum>;
};

export type CreateSettlementInput = {
  additionalFees: Array<SettlementAdditionalFeeInput>;
  quotationId: Scalars['String'];
};

export type CreateStoreInput = {
  address: Scalars['String'];
  avatarId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateStoreProductHistoryInput = {
  inputDate: Scalars['String'];
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  storeId: Scalars['String'];
  type: StoreProductTypeEnum;
};

export type CreateSurveyHistoryInput = {
  results: Array<SurveyResultInput>;
  surveyId: Scalars['String'];
};

export type CreateSurveyInput = {
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  questions: Array<CreateQuestionInput>;
};

export type CreateTechnicianInput = {
  addressMoreInfo: Scalars['String'];
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday: Scalars['String'];
  cardNumber?: InputMaybe<Scalars['String']>;
  citizenId: Scalars['String'];
  education?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullname: Scalars['String'];
  latitude: Scalars['Float'];
  level?: InputMaybe<Scalars['String']>;
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  qualifications: Array<Scalars['String']>;
  suggestionPoint?: InputMaybe<Scalars['Float']>;
};

export type CreateTodoInput = {
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
};

export type CreateVehicleInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  manufacturerId: Scalars['String'];
  mapAddress: Scalars['String'];
  modelId: Scalars['String'];
  name: Scalars['String'];
  operatingNumber: Scalars['Float'];
  operatingUnit?: OperatingUnitEnum;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId: Scalars['String'];
  serialNumber?: InputMaybe<Scalars['String']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId: Scalars['String'];
  vinNumber: Scalars['String'];
  yearOfManufacture: Scalars['Float'];
};

export type DeleteCartItemsInput = {
  cartItems: Array<Scalars['String']>;
};

export type DeleteCategoryInput = {
  id: Scalars['String'];
};

export type DeleteCourseInput = {
  id: Scalars['String'];
};

export type DeleteDiscountCodeInput = {
  id: Scalars['String'];
};

export type DeleteDocumentInput = {
  id: Scalars['String'];
};

export type DeleteGuideInput = {
  id: Scalars['String'];
};

export type DeleteInstructionInput = {
  id: Scalars['String'];
};

export type DeleteMaintenanceInput = {
  id: Scalars['String'];
};

export type DeleteNotificationInput = {
  id: Scalars['String'];
};

export type DeletePartnerInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type DeleteQuotationPriceListInput = {
  id: Scalars['String'];
};

export type DeleteReferenceInput = {
  id: Scalars['String'];
};

export type DeleteStoreInput = {
  id: Scalars['String'];
};

export type DeleteSurveyInput = {
  id: Scalars['String'];
};

export type DeleteUserInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type DisconnectSocialAccountInput = {
  socialType: SocialAccountTypeEnum;
};

export type DiscountCodeConnection = {
  __typename?: 'DiscountCodeConnection';
  items?: Maybe<Array<DiscountCodeEntity>>;
  meta: BasePaginationMeta;
};

export type DiscountCodeEntity = Node & {
  __typename?: 'DiscountCodeEntity';
  admin?: Maybe<AdminEntity>;
  adminId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAssignAllProduct: Scalars['Boolean'];
  limit?: Maybe<Scalars['Float']>;
  limitPerAccount?: Maybe<Scalars['Float']>;
  minOrderValue: Scalars['Float'];
  name: Scalars['String'];
  partner?: Maybe<PartnerEntity>;
  partnerId?: Maybe<Scalars['String']>;
  products?: Maybe<Array<ProductEntity>>;
  startDate: Scalars['DateTime'];
  unit: DiscountCodeUnitEnum;
  updatedAt: Scalars['DateTime'];
  usedCount: Scalars['Float'];
  value: Scalars['Float'];
};

export enum DiscountCodeUnitEnum {
  PERCENTAGE = 'PERCENTAGE',
  VND = 'VND',
}

export type DiscountStatusAndEachStatusCount = {
  __typename?: 'DiscountStatusAndEachStatusCount';
  isActivities: Scalars['Boolean'];
  totalItem: Scalars['Float'];
};

export type DistrictOutput = {
  __typename?: 'DistrictOutput';
  code: Scalars['String'];
  codename: Scalars['String'];
  divisionType: Scalars['String'];
  name: Scalars['String'];
  shortCodename: Scalars['String'];
};

export type DocumentConnection = {
  __typename?: 'DocumentConnection';
  items?: Maybe<Array<DocumentEntity>>;
  meta: BasePaginationMeta;
};

export type DocumentEntity = Node & {
  __typename?: 'DocumentEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileIds: Array<Scalars['String']>;
  files: Array<Media>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  reference: ReferenceEntity;
  referenceId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Expense = {
  __typename?: 'Expense';
  cost?: Maybe<Scalars['Float']>;
  distance?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Float']>;
};

export type ExportUserInput = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type FeedbackEntity = Node & {
  __typename?: 'FeedbackEntity';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  feedbackMedias?: Maybe<Array<FeedbackMediaEntity>>;
  feedbackType: FeedbackType;
  id: Scalars['ID'];
  status: FeedbackStatus;
  updatedAt: Scalars['DateTime'];
  updatedStatusAt?: Maybe<Scalars['DateTime']>;
  user: UserEntity;
};

export type FeedbackMediaEntity = Node & {
  __typename?: 'FeedbackMediaEntity';
  Feedback: FeedbackEntity;
  id: Scalars['ID'];
  media: Media;
  ordinal: Scalars['Float'];
};

export enum FeedbackStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  NONE = 'NONE',
}

export enum FeedbackType {
  COMPLAIN = 'COMPLAIN',
  QNA = 'QNA',
  SUPPORT = 'SUPPORT',
}

export enum FileType {
  EXCEL = 'EXCEL',
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  INVOICE = 'INVOICE',
  VIDEO = 'VIDEO',
}

export type GuideConnection = {
  __typename?: 'GuideConnection';
  items?: Maybe<Array<GuideEntity>>;
  meta: BasePaginationMeta;
};

export type GuideEntity = Node & {
  __typename?: 'GuideEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instructions?: Maybe<Array<InstructionEntity>>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type InstructionConnection = {
  __typename?: 'InstructionConnection';
  items?: Maybe<Array<InstructionEntity>>;
  meta: BasePaginationMeta;
};

export type InstructionEntity = Node & {
  __typename?: 'InstructionEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  guide: GuideEntity;
  guideId: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LatLng = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type MaintenanceAccessory = {
  __typename?: 'MaintenanceAccessory';
  id: Scalars['Float'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  unit: Scalars['String'];
};

export type MaintenanceAccessoryEntity = Node & {
  __typename?: 'MaintenanceAccessoryEntity';
  accessoryId: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  maintenanceId: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  unit: Scalars['String'];
};

export type MaintenanceAccessoryInput = {
  id: Scalars['Float'];
  isAvailable: Scalars['Boolean'];
};

export type MaintenanceConnection = {
  __typename?: 'MaintenanceConnection';
  items?: Maybe<Array<MaintenanceEntity>>;
  meta: BasePaginationMeta;
};

export type MaintenanceEntity = Node & {
  __typename?: 'MaintenanceEntity';
  accessories?: Maybe<Array<MaintenanceAccessoryEntity>>;
  addressMoreInfo?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  maintenanceLevel: MaintenanceLevelEnum;
  mapAddress: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  routineLevel?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['DateTime']>;
  status: MaintenanceStatusEnum;
  statusDetail?: Maybe<MaintenanceStatusEntity>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<UserEntity>;
  userId: Scalars['String'];
  vehicle?: Maybe<VehicleEntity>;
  vehicleId: Scalars['String'];
};

export enum MaintenanceLevelEnum {
  INCURRED = 'INCURRED',
  ROUTINE = 'ROUTINE',
}

export type MaintenanceStatusAndItemCount = {
  __typename?: 'MaintenanceStatusAndItemCount';
  status: Scalars['String'];
  totalItem: Scalars['Float'];
};

export type MaintenanceStatusCategoryEntity = Node & {
  __typename?: 'MaintenanceStatusCategoryEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  maintenanceStatusId: Scalars['String'];
  name: Scalars['String'];
  type: CategoryTypeEnum;
};

export type MaintenanceStatusEntity = Node & {
  __typename?: 'MaintenanceStatusEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  maintenanceId: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<MaintenanceStatusCategoryEntity>>;
  status: MaintenanceStatusEnum;
  userId?: Maybe<Scalars['String']>;
};

export enum MaintenanceStatusEnum {
  ACCEPTED = 'ACCEPTED',
  CANCEL = 'CANCEL',
  DENY = 'DENY',
  NEW = 'NEW',
}

export type Media = Node & {
  __typename?: 'Media';
  createdAt: Scalars['DateTime'];
  fileSize?: Maybe<Scalars['Int']>;
  fullOriginalUrl?: Maybe<Scalars['String']>;
  fullThumbUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  mimeType?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  originalUrl: Scalars['String'];
  ownerId?: Maybe<Scalars['String']>;
  thumbUrl?: Maybe<Scalars['String']>;
  type: FileType;
  updatedAt: Scalars['DateTime'];
  videoUrl?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress: AddressEntity;
  addCartItems: CartEntity;
  addFeedback: FeedbackEntity;
  adminAddAgency: PartnerEntity;
  adminAddProductForStore: Scalars['Boolean'];
  adminCancelOrder: Scalars['Boolean'];
  adminChangePassword: Scalars['Boolean'];
  adminCreateCategory: Scalars['Boolean'];
  adminCreateCourse: Scalars['Boolean'];
  adminCreateDiscountCode: Scalars['Boolean'];
  adminCreateDocument: Scalars['Boolean'];
  adminCreateFreelancerTechnician: PartnerEntity;
  adminCreateGuide: Scalars['Boolean'];
  adminCreateInstruction: Scalars['Boolean'];
  adminCreateNotification: Scalars['Boolean'];
  adminCreateProductAccessary: ProductEntity;
  adminCreateProductVehicle: ProductEntity;
  adminCreateReference: Scalars['Boolean'];
  adminCreateStore: Scalars['Boolean'];
  adminCreateSurvey: Scalars['Boolean'];
  adminCreateTechnician: PartnerEntity;
  adminDeleteCategory: Scalars['Boolean'];
  adminDeleteCourse: Scalars['Boolean'];
  adminDeleteDiscountCode: Scalars['Boolean'];
  adminDeleteDocument: Scalars['Boolean'];
  adminDeleteGuide: Scalars['Boolean'];
  adminDeleteInstruction: Scalars['Boolean'];
  adminDeleteNotification: Scalars['Boolean'];
  adminDeleteReference: Scalars['Boolean'];
  adminDeleteStore: Scalars['Boolean'];
  adminDeleteSurvey: Scalars['Boolean'];
  adminForgotPassword: Scalars['Boolean'];
  adminKickPartnerOutOfCourse: Scalars['Boolean'];
  adminLogin: AuthAdminConnection;
  adminRemoveAgency: Scalars['Boolean'];
  adminRemoveProduct: Scalars['Boolean'];
  adminRemoveTechnician: Scalars['Boolean'];
  adminRespondProductQuotation: Scalars['Boolean'];
  adminUpdateAccessary: ProductEntity;
  adminUpdateAgency: PartnerEntity;
  adminUpdateAgencyStatus: PartnerEntity;
  adminUpdateCategory: CategoryEntity;
  adminUpdateCourse: CourseEntity;
  adminUpdateCourseStatus: CourseEntity;
  adminUpdateDiscountCode: DiscountCodeEntity;
  adminUpdateDiscountCodeStatus: DiscountCodeEntity;
  adminUpdateDocument: DocumentEntity;
  adminUpdateDocumentStatus: DocumentEntity;
  adminUpdateGuide: GuideEntity;
  adminUpdateGuideStatus: GuideEntity;
  adminUpdateInstruction: InstructionEntity;
  adminUpdateInstructionStatus: InstructionEntity;
  adminUpdateNotification: NotificationEntity;
  adminUpdateNotificationStatus: NotificationEntity;
  adminUpdateOrderStatus: Scalars['Boolean'];
  adminUpdateProductStatus: ProductEntity;
  adminUpdateProductVehicle: ProductEntity;
  adminUpdateReference: ReferenceEntity;
  adminUpdateReferenceStatus: ReferenceEntity;
  adminUpdateServiceFeedback: ServiceFeedbackEntity;
  adminUpdateStatusMaintenance: Scalars['Boolean'];
  adminUpdateStore: StoreEntity;
  adminUpdateStorePassword: PartnerEntity;
  adminUpdateSurvey: SurveyEntity;
  adminUpdateSurveyStatus: SurveyEntity;
  adminUpdateTechnician: PartnerEntity;
  adminUpdateTechnicianApproveStatus: PartnerEntity;
  adminUpdateTechnicianStatus: PartnerEntity;
  adminUpdateUserStatus: Scalars['Boolean'];
  agencyAssignBooking: Scalars['Boolean'];
  agencyCreateTechnician: PartnerEntity;
  agencyDeleteTechnician: Scalars['Boolean'];
  agencyUpdateTechnician: PartnerEntity;
  agencyUpdateTechnicianStatus: PartnerEntity;
  biometricLogin: AuthConnection;
  cancelBookingByUser: Scalars['Boolean'];
  cancelMaintenance: Scalars['Boolean'];
  cancelOrder: Scalars['Boolean'];
  completeBookingByUser: Scalars['Boolean'];
  connectSocialAccount: SocialAccount;
  createBooking: BookingEntity;
  createMaintenance: MaintenanceEntity;
  createOrders: Array<OrderEntity>;
  createPasswordNewUser: Scalars['Boolean'];
  createQuotation: QuotationEntity;
  createQuotationPriceList: QuotationPriceListEntity;
  createServiceFeedback: ServiceFeedbackEntity;
  createSettlement: SettlementEntity;
  createTodo: TodoEntity;
  createVehicle: VehicleEntity;
  deleteCartItems: Scalars['Boolean'];
  deleteMaintenance: Scalars['Boolean'];
  deletePartner: Scalars['Boolean'];
  deleteQuotationPriceList: Scalars['Boolean'];
  deleteTodo: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  disconnectSocialAccount: Scalars['Boolean'];
  enrollCourse: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  partnerAddProductForStore: Scalars['Boolean'];
  partnerCancelBooking: Scalars['Boolean'];
  partnerCancelOrder: Scalars['Boolean'];
  partnerCreateDiscountCode: Scalars['Boolean'];
  partnerCreateProductAccessary: ProductEntity;
  partnerCreateProductVehicle: ProductEntity;
  partnerCreateReview: Scalars['Boolean'];
  partnerCreateServiceFeedback: ServiceFeedbackEntity;
  partnerCreateStore: Scalars['Boolean'];
  partnerDeleteDiscountCode: Scalars['Boolean'];
  partnerDeleteStore: Scalars['Boolean'];
  partnerEndDiscount: Scalars['Boolean'];
  partnerForgotPassword: Scalars['Boolean'];
  partnerLogin: PartnerAuthConnection;
  partnerRemoveProduct: Scalars['Boolean'];
  partnerRemoveServiceFeedback: Scalars['Boolean'];
  partnerRescheduleBooking: Scalars['Boolean'];
  partnerRespondProductQuotation: Scalars['Boolean'];
  partnerSubmitSurvey: Scalars['Boolean'];
  partnerUpdateAccessary: ProductEntity;
  partnerUpdateDiscountCode: DiscountCodeEntity;
  partnerUpdateDiscountCodeStatus: DiscountCodeEntity;
  partnerUpdateMenuConfigs: PartnerEntity;
  partnerUpdateOrderStatus: Scalars['Boolean'];
  partnerUpdatePassword: Scalars['Boolean'];
  partnerUpdateProductStatus: ProductEntity;
  partnerUpdateProductVehicle: ProductEntity;
  partnerUpdateProfile: PartnerEntity;
  partnerUpdateServiceFeedback: ServiceFeedbackEntity;
  partnerUpdateStore: StoreEntity;
  reCreateBooking: BookingEntity;
  reCreateQuotation: QuotationEntity;
  reCreateSettlement: SettlementEntity;
  recreateOrder: Scalars['Boolean'];
  registerBiometricLogin: AuthBiometricEntity;
  registerFreelancerTechnician: PartnerEntity;
  removeAddress: Scalars['Boolean'];
  removeMedia: Media;
  removeServiceFeedback: Scalars['Boolean'];
  removeVehicle: Scalars['Boolean'];
  resendOtp: Scalars['Boolean'];
  seenNotification: Scalars['Boolean'];
  socialLogin: AuthConnection;
  technicianArrivedBooking: Scalars['Boolean'];
  technicianArrivingBooking: Scalars['Boolean'];
  testPubSub: Scalars['Boolean'];
  unregisterBiometricLogin: Scalars['Boolean'];
  updateAddress: AddressEntity;
  updateAdmin: AdminEntity;
  updateMaintenance: MaintenanceEntity;
  updateQuotationPriceList: QuotationPriceListEntity;
  updateServiceFeedback: ServiceFeedbackEntity;
  updateTodo: TodoEntity;
  updateUserInfo: Scalars['Boolean'];
  updateUserSetting: UserSettingEntity;
  updateVehicle: VehicleEntity;
  userAcceptQuotation: Scalars['Boolean'];
  userAcceptSettlement: Scalars['Boolean'];
  userAddFavoriteProduct: Scalars['Boolean'];
  userAddMultipleFavoriteProduct: Scalars['Boolean'];
  userChangePassword: Scalars['Boolean'];
  userCreateOrderReview: Scalars['Boolean'];
  userCreateProductQuotation: ProductQuotationEntity;
  userCreateReview: Scalars['Boolean'];
  userForgotPassword: Scalars['Boolean'];
  userLogin: AuthConnection;
  userRegister: Scalars['Float'];
  userRejectQuotation: Scalars['Boolean'];
  userRejectSettlement: Scalars['Boolean'];
  userRemoveFavoriteProduct: Scalars['Boolean'];
  userRemoveMultiFavoriteProduct: Scalars['Boolean'];
  userSubmitSurvey: Scalars['Boolean'];
  userUpdateOrderStatus: Scalars['Boolean'];
  verifyOtp: Scalars['Boolean'];
};

export type MutationAddAddressArgs = {
  input: CreateAddressInput;
};

export type MutationAddCartItemsArgs = {
  input: CreateCartInput;
};

export type MutationAddFeedbackArgs = {
  input: CreateFeedbackInput;
};

export type MutationAdminAddAgencyArgs = {
  input: CreateAgentInput;
};

export type MutationAdminAddProductForStoreArgs = {
  input: AdminCreateStoreProductHistoryInput;
};

export type MutationAdminCancelOrderArgs = {
  input: CancelOrderInput;
};

export type MutationAdminChangePasswordArgs = {
  input: AdminChangePasswordInput;
};

export type MutationAdminCreateCategoryArgs = {
  input: CreateCategoryInput;
};

export type MutationAdminCreateCourseArgs = {
  input: CreateCourseInput;
};

export type MutationAdminCreateDiscountCodeArgs = {
  input: CreateDiscountCodeInput;
};

export type MutationAdminCreateDocumentArgs = {
  input: CreateDocumentInput;
};

export type MutationAdminCreateFreelancerTechnicianArgs = {
  input: NewFreelancerTechnicianInput;
};

export type MutationAdminCreateGuideArgs = {
  input: CreateGuideInput;
};

export type MutationAdminCreateInstructionArgs = {
  input: CreateInstructionInput;
};

export type MutationAdminCreateNotificationArgs = {
  input: AdminCreateNotificationInput;
};

export type MutationAdminCreateProductAccessaryArgs = {
  input: CreateAccessaryInput;
};

export type MutationAdminCreateProductVehicleArgs = {
  input: CreateProductVehicleInput;
};

export type MutationAdminCreateReferenceArgs = {
  input: CreateReferenceInput;
};

export type MutationAdminCreateStoreArgs = {
  input: AdminCreateStoreInput;
};

export type MutationAdminCreateSurveyArgs = {
  input: CreateSurveyInput;
};

export type MutationAdminCreateTechnicianArgs = {
  input: CreateTechnicianInput;
};

export type MutationAdminDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};

export type MutationAdminDeleteCourseArgs = {
  input: DeleteCourseInput;
};

export type MutationAdminDeleteDiscountCodeArgs = {
  input: DeleteDiscountCodeInput;
};

export type MutationAdminDeleteDocumentArgs = {
  input: DeleteDocumentInput;
};

export type MutationAdminDeleteGuideArgs = {
  input: DeleteGuideInput;
};

export type MutationAdminDeleteInstructionArgs = {
  input: DeleteInstructionInput;
};

export type MutationAdminDeleteNotificationArgs = {
  input: DeleteNotificationInput;
};

export type MutationAdminDeleteReferenceArgs = {
  input: DeleteReferenceInput;
};

export type MutationAdminDeleteStoreArgs = {
  input: AdminDeleteStoreInput;
};

export type MutationAdminDeleteSurveyArgs = {
  input: DeleteSurveyInput;
};

export type MutationAdminForgotPasswordArgs = {
  input: AdminForgotPasswordInput;
};

export type MutationAdminKickPartnerOutOfCourseArgs = {
  input: AdminKickPartnerOutOfCourseInput;
};

export type MutationAdminLoginArgs = {
  input: AdminLoginInput;
};

export type MutationAdminRemoveAgencyArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationAdminRemoveProductArgs = {
  id: Scalars['String'];
};

export type MutationAdminRemoveTechnicianArgs = {
  id: Scalars['String'];
};

export type MutationAdminRespondProductQuotationArgs = {
  input: RespondProductQuotationInput;
};

export type MutationAdminUpdateAccessaryArgs = {
  input: UpdateAccessaryInput;
};

export type MutationAdminUpdateAgencyArgs = {
  input: UpdateAgentInput;
};

export type MutationAdminUpdateAgencyStatusArgs = {
  input: UpdateAgentStatusInput;
};

export type MutationAdminUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};

export type MutationAdminUpdateCourseArgs = {
  input: UpdateCourseInput;
};

export type MutationAdminUpdateCourseStatusArgs = {
  input: UpdateCourseStatusInput;
};

export type MutationAdminUpdateDiscountCodeArgs = {
  input: UpdateDiscountCodeInput;
};

export type MutationAdminUpdateDiscountCodeStatusArgs = {
  input: UpdateDiscountStatusInput;
};

export type MutationAdminUpdateDocumentArgs = {
  input: UpdateDocumentInput;
};

export type MutationAdminUpdateDocumentStatusArgs = {
  input: UpdateDocumentStatusInput;
};

export type MutationAdminUpdateGuideArgs = {
  input: UpdateGuideInput;
};

export type MutationAdminUpdateGuideStatusArgs = {
  input: UpdateGuideStatusInput;
};

export type MutationAdminUpdateInstructionArgs = {
  input: UpdateInstructionInput;
};

export type MutationAdminUpdateInstructionStatusArgs = {
  input: UpdateInstructionStatusInput;
};

export type MutationAdminUpdateNotificationArgs = {
  input: AdminUpdateNotificationInput;
};

export type MutationAdminUpdateNotificationStatusArgs = {
  input: UpdateNotificationStatusInput;
};

export type MutationAdminUpdateOrderStatusArgs = {
  input: UpdateOrderInput;
};

export type MutationAdminUpdateProductStatusArgs = {
  input: UpdateProductStatusInput;
};

export type MutationAdminUpdateProductVehicleArgs = {
  input: UpdateProductVehicleInput;
};

export type MutationAdminUpdateReferenceArgs = {
  input: UpdateReferenceInput;
};

export type MutationAdminUpdateReferenceStatusArgs = {
  input: UpdateReferenceStatusInput;
};

export type MutationAdminUpdateServiceFeedbackArgs = {
  input: AdminUpdateServiceFeedbackInput;
};

export type MutationAdminUpdateStatusMaintenanceArgs = {
  input: AdminUpdateStatusMaintenanceInput;
};

export type MutationAdminUpdateStoreArgs = {
  input: AdminUpdateStoreInput;
};

export type MutationAdminUpdateStorePasswordArgs = {
  input: UpdatePartnerPasswordInput;
};

export type MutationAdminUpdateSurveyArgs = {
  input: UpdateSurveyInput;
};

export type MutationAdminUpdateSurveyStatusArgs = {
  input: UpdateSurveyStatusInput;
};

export type MutationAdminUpdateTechnicianArgs = {
  input: UpdateTechnicianInput;
};

export type MutationAdminUpdateTechnicianApproveStatusArgs = {
  input: UpdateTechnicianApproveInput;
};

export type MutationAdminUpdateTechnicianStatusArgs = {
  input: UpdateAgentStatusInput;
};

export type MutationAdminUpdateUserStatusArgs = {
  input: AdminUpdateUserStatusInput;
};

export type MutationAgencyAssignBookingArgs = {
  input: AssignBookingInput;
};

export type MutationAgencyCreateTechnicianArgs = {
  input: AgencyCreateTechnicianInput;
};

export type MutationAgencyDeleteTechnicianArgs = {
  input: AgencyDeleteTechnicianInput;
};

export type MutationAgencyUpdateTechnicianArgs = {
  input: AgencyUpdateTechnicianInput;
};

export type MutationAgencyUpdateTechnicianStatusArgs = {
  input: UpdateAgentStatusInput;
};

export type MutationBiometricLoginArgs = {
  input: BiometricLoginInput;
};

export type MutationCancelBookingByUserArgs = {
  input: CancelBookingInput;
};

export type MutationCancelMaintenanceArgs = {
  input: CancelMaintenanceInput;
};

export type MutationCancelOrderArgs = {
  input: CancelOrderInput;
};

export type MutationCompleteBookingByUserArgs = {
  input: UpdateBookingStatusInput;
};

export type MutationConnectSocialAccountArgs = {
  input: ConnectSocialAccountInput;
};

export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};

export type MutationCreateMaintenanceArgs = {
  input: CreateMaintenanceInput;
};

export type MutationCreateOrdersArgs = {
  input: CreateOrdersInput;
};

export type MutationCreatePasswordNewUserArgs = {
  input: CreatePasswordRegisterInput;
};

export type MutationCreateQuotationArgs = {
  input: CreateQuotationInput;
};

export type MutationCreateQuotationPriceListArgs = {
  input: CreateQuotationPriceListInput;
};

export type MutationCreateServiceFeedbackArgs = {
  input: CreateServiceFeedbackInput;
};

export type MutationCreateSettlementArgs = {
  input: CreateSettlementInput;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationCreateVehicleArgs = {
  input: CreateVehicleInput;
};

export type MutationDeleteCartItemsArgs = {
  input: DeleteCartItemsInput;
};

export type MutationDeleteMaintenanceArgs = {
  input: DeleteMaintenanceInput;
};

export type MutationDeletePartnerArgs = {
  input: DeletePartnerInput;
};

export type MutationDeleteQuotationPriceListArgs = {
  input: DeleteQuotationPriceListInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};

export type MutationDisconnectSocialAccountArgs = {
  input: DisconnectSocialAccountInput;
};

export type MutationEnrollCourseArgs = {
  id: Scalars['String'];
};

export type MutationLogoutArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};

export type MutationPartnerAddProductForStoreArgs = {
  input: CreateStoreProductHistoryInput;
};

export type MutationPartnerCancelBookingArgs = {
  input: CancelBookingInput;
};

export type MutationPartnerCancelOrderArgs = {
  input: CancelOrderInput;
};

export type MutationPartnerCreateDiscountCodeArgs = {
  input: PartnerCreateDiscountCodeInput;
};

export type MutationPartnerCreateProductAccessaryArgs = {
  input: PartnerCreateAccessaryInput;
};

export type MutationPartnerCreateProductVehicleArgs = {
  input: PartnerCreateProductVehicleInput;
};

export type MutationPartnerCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationPartnerCreateServiceFeedbackArgs = {
  input: CreateServiceFeedbackInput;
};

export type MutationPartnerCreateStoreArgs = {
  input: CreateStoreInput;
};

export type MutationPartnerDeleteDiscountCodeArgs = {
  input: DeleteDiscountCodeInput;
};

export type MutationPartnerDeleteStoreArgs = {
  input: DeleteStoreInput;
};

export type MutationPartnerEndDiscountArgs = {
  id: Scalars['String'];
};

export type MutationPartnerForgotPasswordArgs = {
  input: PartnerForgotPasswordInput;
};

export type MutationPartnerLoginArgs = {
  input: PartnerLoginInput;
};

export type MutationPartnerRemoveProductArgs = {
  id: Scalars['String'];
};

export type MutationPartnerRemoveServiceFeedbackArgs = {
  id: Scalars['String'];
};

export type MutationPartnerRescheduleBookingArgs = {
  input: ScheduleBookingInput;
};

export type MutationPartnerRespondProductQuotationArgs = {
  input: RespondProductQuotationInput;
};

export type MutationPartnerSubmitSurveyArgs = {
  input: CreateSurveyHistoryInput;
};

export type MutationPartnerUpdateAccessaryArgs = {
  input: PartnerUpdateAccessaryInput;
};

export type MutationPartnerUpdateDiscountCodeArgs = {
  input: PartnerUpdateDiscountCodeInput;
};

export type MutationPartnerUpdateDiscountCodeStatusArgs = {
  input: UpdateDiscountStatusInput;
};

export type MutationPartnerUpdateMenuConfigsArgs = {
  input: PartnerUpdateMenuConfigsInput;
};

export type MutationPartnerUpdateOrderStatusArgs = {
  input: UpdateOrderInput;
};

export type MutationPartnerUpdatePasswordArgs = {
  input: UpdatePartnerPasswordInput;
};

export type MutationPartnerUpdateProductStatusArgs = {
  input: UpdateProductStatusInput;
};

export type MutationPartnerUpdateProductVehicleArgs = {
  input: PartnerUpdateProductVehicleInput;
};

export type MutationPartnerUpdateProfileArgs = {
  input: UpdatePartnerBasicInfoInput;
};

export type MutationPartnerUpdateServiceFeedbackArgs = {
  input: UpdateServiceFeedbackInput;
};

export type MutationPartnerUpdateStoreArgs = {
  input: UpdateStoreInput;
};

export type MutationReCreateBookingArgs = {
  input: ReCreateBookingInput;
};

export type MutationReCreateQuotationArgs = {
  input: CreateQuotationInput;
};

export type MutationReCreateSettlementArgs = {
  input: CreateSettlementInput;
};

export type MutationRecreateOrderArgs = {
  input: ReCreateOrderInput;
};

export type MutationRegisterFreelancerTechnicianArgs = {
  input: NewFreelancerTechnicianInput;
};

export type MutationRemoveAddressArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationRemoveMediaArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type MutationRemoveServiceFeedbackArgs = {
  id: Scalars['String'];
};

export type MutationRemoveVehicleArgs = {
  id: Scalars['String'];
};

export type MutationResendOtpArgs = {
  input: ResendOtpInput;
};

export type MutationSeenNotificationArgs = {
  id: Scalars['String'];
};

export type MutationSocialLoginArgs = {
  input: AuthSocialInput;
};

export type MutationTechnicianArrivedBookingArgs = {
  input: UpdateBookingStatusInput;
};

export type MutationTechnicianArrivingBookingArgs = {
  input: UpdateBookingStatusInput;
};

export type MutationUnregisterBiometricLoginArgs = {
  biometricId: Scalars['String'];
};

export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};

export type MutationUpdateAdminArgs = {
  input: UpdateAdminInput;
};

export type MutationUpdateMaintenanceArgs = {
  input: UpdateMaintenanceInput;
};

export type MutationUpdateQuotationPriceListArgs = {
  input: UpdateQuotationPriceListInput;
};

export type MutationUpdateServiceFeedbackArgs = {
  input: UpdateServiceFeedbackInput;
};

export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInput;
};

export type MutationUpdateUserSettingArgs = {
  input: UpdateUserSettingInput;
};

export type MutationUpdateVehicleArgs = {
  input: UpdateVehicleInput;
};

export type MutationUserAcceptQuotationArgs = {
  quotationId: Scalars['String'];
};

export type MutationUserAcceptSettlementArgs = {
  settlementId: Scalars['String'];
};

export type MutationUserAddFavoriteProductArgs = {
  productId: Scalars['String'];
};

export type MutationUserAddMultipleFavoriteProductArgs = {
  input: UserAddMultiFavoriteProductInput;
};

export type MutationUserChangePasswordArgs = {
  input: UserChangePasswordInput;
};

export type MutationUserCreateOrderReviewArgs = {
  input: CreateOrderReviewInput;
};

export type MutationUserCreateProductQuotationArgs = {
  input: ProductQuotationInput;
};

export type MutationUserCreateReviewArgs = {
  input: CreateReviewInput;
};

export type MutationUserForgotPasswordArgs = {
  input: UserForgotPasswordInput;
};

export type MutationUserLoginArgs = {
  input: UserLoginInput;
};

export type MutationUserRegisterArgs = {
  input: RegisterInput;
};

export type MutationUserRejectQuotationArgs = {
  input: RejectQuotationInput;
};

export type MutationUserRejectSettlementArgs = {
  input: RejectSettlementInput;
};

export type MutationUserRemoveFavoriteProductArgs = {
  productId: Scalars['String'];
};

export type MutationUserRemoveMultiFavoriteProductArgs = {
  input: UserRemoveMultiFavoriteProductInput;
};

export type MutationUserSubmitSurveyArgs = {
  input: CreateSurveyHistoryInput;
};

export type MutationUserUpdateOrderStatusArgs = {
  input: UpdateOrderInput;
};

export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type NewFreelancerTechnicianInput = {
  addressMoreInfo: Scalars['String'];
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday: Scalars['String'];
  cardNumber?: InputMaybe<Scalars['String']>;
  citizenId: Scalars['String'];
  education?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  fullname: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  qualifications: Array<Scalars['String']>;
  suggestionPoint?: InputMaybe<Scalars['Float']>;
};

/** Node */
export type Node = {
  id: Scalars['ID'];
};

export enum NotificationActionUserEnum {
  ADMIN = 'ADMIN',
  AGENCY = 'AGENCY',
  TECHNICIAN = 'TECHNICIAN',
  USER = 'USER',
}

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  items?: Maybe<Array<NotificationEntity>>;
  meta: BasePaginationMeta;
};

export type NotificationEntity = Node & {
  __typename?: 'NotificationEntity';
  body: Scalars['String'];
  booking?: Maybe<BookingEntity>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  executeTime?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  maintenance?: Maybe<MaintenanceEntity>;
  objectId?: Maybe<Scalars['String']>;
  objectType: NotificationTypeEnum;
  seen: Scalars['Boolean'];
  sourceId?: Maybe<Scalars['String']>;
  sourcePartner?: Maybe<PartnerEntity>;
  sourceType?: Maybe<NotificationActionUserEnum>;
  sourceUser?: Maybe<UserEntity>;
  targetId?: Maybe<Scalars['String']>;
  targetPartner?: Maybe<PartnerEntity>;
  targetType?: Maybe<NotificationActionUserEnum>;
  targetUser?: Maybe<UserEntity>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum NotificationTypeEnum {
  BOOKING = 'BOOKING',
  MAINTENANCE = 'MAINTENANCE',
  ORDER = 'ORDER',
  OTHER = 'OTHER',
  SYSTEM = 'SYSTEM',
}

export type NotificationTypeUnSeenCount = {
  __typename?: 'NotificationTypeUnSeenCount';
  count: Scalars['Float'];
  type: NotificationTypeEnum;
};

export enum OperatingUnitEnum {
  HOURS = 'HOURS',
  KM = 'KM',
}

export type OrderAddressEntity = Node & {
  __typename?: 'OrderAddressEntity';
  addressDetail?: Maybe<Scalars['String']>;
  addressName: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  items?: Maybe<Array<OrderEntity>>;
  meta: BasePaginationMeta;
};

export type OrderDiscountCodeEntity = Node & {
  __typename?: 'OrderDiscountCodeEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discountCodeId: Scalars['String'];
  id: Scalars['ID'];
  isAssignAllProduct: Scalars['Boolean'];
  name: Scalars['String'];
  unit: DiscountCodeUnitEnum;
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type OrderEntity = Node & {
  __typename?: 'OrderEntity';
  address?: Maybe<OrderAddressEntity>;
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount: Scalars['Float'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  partner?: Maybe<OrderPartner>;
  partnerId?: Maybe<Scalars['String']>;
  product: Array<OrderProductEntity>;
  shippingFee: Scalars['Float'];
  status: OrderStatusEnum;
  statusDetail?: Maybe<OrderStatusEntity>;
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userCanReview?: Maybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};

export type OrderInput = {
  cartItemIds: Array<Scalars['String']>;
  discountCodeId?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  shippingFee?: InputMaybe<Scalars['Float']>;
  /** Amount including shipping fee, before applying discount code */
  total: Scalars['Float'];
  /** Amount to pay, discount code has been applied */
  totalPayment: Scalars['Float'];
};

export type OrderPartner = Node & {
  __typename?: 'OrderPartner';
  addressMoreInfo?: Maybe<Scalars['String']>;
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  bank: Scalars['String'];
  birthday?: Maybe<Scalars['DateTime']>;
  canReviewPartner: Scalars['Boolean'];
  cardNumber: Scalars['String'];
  citizenId?: Maybe<Scalars['String']>;
  countProduct?: Maybe<Scalars['Int']>;
  countTechnician?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  education?: Maybe<CategoryEntity>;
  email?: Maybe<Scalars['String']>;
  expenseInfo?: Maybe<Expense>;
  fullname?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isApproved?: Maybe<Scalars['Boolean']>;
  latitude?: Maybe<Scalars['Float']>;
  level?: Maybe<CategoryEntity>;
  longitude?: Maybe<Scalars['Float']>;
  mapAddress?: Maybe<Scalars['String']>;
  menus?: Maybe<Array<PartnerMenuEnum>>;
  parentId?: Maybe<Scalars['String']>;
  parentInfo?: Maybe<PartnerEntity>;
  phone: Scalars['String'];
  qualifications?: Maybe<Array<CategoryEntity>>;
  reviewSummary?: Maybe<ReviewSummary>;
  star: Scalars['Float'];
  starInfo: Array<StarInfo>;
  storeReviewSummary?: Maybe<ReviewSummary>;
  storeStar?: Maybe<Scalars['Float']>;
  storeStarInfo?: Maybe<Array<StarInfo>>;
  suggestionPoint: Scalars['Float'];
  type: PartnerTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export type OrderProductEntity = Node & {
  __typename?: 'OrderProductEntity';
  avatar?: Maybe<Media>;
  avatarId: Scalars['String'];
  canReviewProduct?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descriptionImageIds?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  isNew: Scalars['Boolean'];
  name: Scalars['String'];
  operatingNumber?: Maybe<Scalars['Float']>;
  operatingUnit?: Maybe<OperatingUnitEnum>;
  orderId: Scalars['String'];
  ordinalNumber?: Maybe<Scalars['Float']>;
  partNumber?: Maybe<Scalars['String']>;
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber?: Maybe<Scalars['String']>;
  total: Scalars['Float'];
  type: ProductTypeEnum;
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  vehicleRegistrationPlate?: Maybe<Scalars['String']>;
  vinNumber?: Maybe<Scalars['String']>;
  yearOfManufacture?: Maybe<Scalars['Float']>;
};

export type OrderStatusAndItemCount = {
  __typename?: 'OrderStatusAndItemCount';
  status: OrderStatusEnum;
  totalItem: Scalars['Float'];
};

export type OrderStatusCategoryEntity = Node & {
  __typename?: 'OrderStatusCategoryEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  orderStatusId: Scalars['String'];
  type: CategoryTypeEnum;
};

export type OrderStatusEntity = Node & {
  __typename?: 'OrderStatusEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  orderId: Scalars['String'];
  partnerId?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<OrderStatusCategoryEntity>>;
  status: OrderStatusEnum;
  userId?: Maybe<Scalars['String']>;
};

export enum OrderStatusEnum {
  CANCEL = 'CANCEL',
  COMPLETE = 'COMPLETE',
  DELIVERED = 'DELIVERED',
  SHIPPING = 'SHIPPING',
  WAIT_FOR_CONFIRM = 'WAIT_FOR_CONFIRM',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPrevPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** PartnerAuthConnection */
export type PartnerAuthConnection = {
  __typename?: 'PartnerAuthConnection';
  accessToken: Scalars['String'];
  partner: PartnerEntity;
  refreshToken: Scalars['String'];
};

export type PartnerCheckEmailOrPasswordIsUsedInput = {
  email?: InputMaybe<Scalars['String']>;
  partnerId?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type PartnerConnection = {
  __typename?: 'PartnerConnection';
  items?: Maybe<Array<PartnerEntity>>;
  meta: BasePaginationMeta;
};

export type PartnerCreateAccessaryInput = {
  avatarId: Scalars['String'];
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isFixedCost: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  modelId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  originId?: InputMaybe<Scalars['String']>;
  partId: Scalars['String'];
  partNumber?: InputMaybe<Scalars['String']>;
  productDevices?: InputMaybe<Array<ProductDeviceInput>>;
  productUnitId: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber?: InputMaybe<Scalars['String']>;
  type: ProductTypeEnum;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type PartnerCreateDiscountCodeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  limitPerAccount?: InputMaybe<Scalars['Float']>;
  minOrderValue?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  productIds?: InputMaybe<Array<Scalars['String']>>;
  startDate: Scalars['DateTime'];
  unit?: InputMaybe<DiscountCodeUnitEnum>;
  value: Scalars['Float'];
};

export type PartnerCreateProductVehicleInput = {
  avatarId: Scalars['String'];
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isFixedCost: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  manufacturerId: Scalars['String'];
  modelId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId?: InputMaybe<Scalars['String']>;
  productUnitId: Scalars['String'];
  quantity: Scalars['Float'];
  serialNumber?: InputMaybe<Scalars['String']>;
  type: ProductTypeEnum;
  unitPrice?: InputMaybe<Scalars['Float']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId: Scalars['String'];
  vinNumber: Scalars['String'];
  yearOfManufacture?: InputMaybe<Scalars['Float']>;
};

export type PartnerEntity = Node & {
  __typename?: 'PartnerEntity';
  addressMoreInfo?: Maybe<Scalars['String']>;
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  bank: Scalars['String'];
  birthday?: Maybe<Scalars['DateTime']>;
  cardNumber: Scalars['String'];
  citizenId?: Maybe<Scalars['String']>;
  countProduct?: Maybe<Scalars['Int']>;
  countTechnician?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  education?: Maybe<CategoryEntity>;
  email?: Maybe<Scalars['String']>;
  expenseInfo?: Maybe<Expense>;
  fullname?: Maybe<Scalars['String']>;
  hotline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isApproved?: Maybe<Scalars['Boolean']>;
  latitude?: Maybe<Scalars['Float']>;
  level?: Maybe<CategoryEntity>;
  longitude?: Maybe<Scalars['Float']>;
  mapAddress?: Maybe<Scalars['String']>;
  menus?: Maybe<Array<PartnerMenuEnum>>;
  parentId?: Maybe<Scalars['String']>;
  parentInfo?: Maybe<PartnerEntity>;
  phone: Scalars['String'];
  qualifications?: Maybe<Array<CategoryEntity>>;
  reviewSummary?: Maybe<ReviewSummary>;
  star: Scalars['Float'];
  starInfo: Array<StarInfo>;
  storeReviewSummary?: Maybe<ReviewSummary>;
  storeStar?: Maybe<Scalars['Float']>;
  storeStarInfo?: Maybe<Array<StarInfo>>;
  suggestionPoint: Scalars['Float'];
  type: PartnerTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export type PartnerForgotPasswordInput = {
  emailOrPhone: Scalars['String'];
};

export type PartnerLoginInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export enum PartnerMenuEnum {
  COURSE = 'COURSE',
  DISCOUNT = 'DISCOUNT',
  DOCUMENT = 'DOCUMENT',
  ORDER = 'ORDER',
  PRODUCT = 'PRODUCT',
  REPAIR = 'REPAIR',
  TECHNICIAN = 'TECHNICIAN',
}

export type PartnerReportBooking = {
  __typename?: 'PartnerReportBooking';
  dailySettlementReport?: Maybe<Array<ReportHistoryResDto>>;
  settlementDetails?: Maybe<Array<SettlementEntity>>;
  settlementTotal: Scalars['Float'];
};

export type PartnerReportOrder = {
  __typename?: 'PartnerReportOrder';
  dailyOrderReport?: Maybe<Array<ReportHistoryResDto>>;
  orderDetails?: Maybe<Array<OrderEntity>>;
  orderTotal: Scalars['Float'];
};

export type PartnerReportSummary = {
  __typename?: 'PartnerReportSummary';
  histories: Array<ReportHistoryResDto>;
  totalRevenue: Scalars['Float'];
  totalRevenueOrder: Scalars['Float'];
  totalRevenueSettlement: Scalars['Float'];
};

export type PartnerSummary = {
  __typename?: 'PartnerSummary';
  totalBooking: Scalars['Float'];
  totalOrder: Scalars['Float'];
  totalProduct: Scalars['Float'];
  totalRevenue: Scalars['Float'];
  totalReview: Scalars['Float'];
  totalTechnician: Scalars['Float'];
};

export enum PartnerTypeEnum {
  AGENCY = 'AGENCY',
  FREELANCER_TECHNICIAN = 'FREELANCER_TECHNICIAN',
  TECHNICIAN = 'TECHNICIAN',
}

export type PartnerUpdateAccessaryInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isFixedCost?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  modelId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  originId?: InputMaybe<Scalars['String']>;
  partId?: InputMaybe<Scalars['String']>;
  partNumber?: InputMaybe<Scalars['String']>;
  productDevices?: InputMaybe<Array<ProductDeviceInput>>;
  productUnitId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  serialNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProductTypeEnum>;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type PartnerUpdateDiscountCodeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  limitPerAccount?: InputMaybe<Scalars['Float']>;
  minOrderValue?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  productIds?: InputMaybe<Array<Scalars['String']>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  unit?: InputMaybe<DiscountCodeUnitEnum>;
  value?: InputMaybe<Scalars['Float']>;
};

export type PartnerUpdateMenuConfigsInput = {
  menus: Array<PartnerMenuEnum>;
};

export type PartnerUpdateProductVehicleInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isFixedCost?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  manufacturerId?: InputMaybe<Scalars['String']>;
  modelId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId?: InputMaybe<Scalars['String']>;
  productUnitId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  serialNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProductTypeEnum>;
  unitPrice?: InputMaybe<Scalars['Float']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId?: InputMaybe<Scalars['String']>;
  vinNumber?: InputMaybe<Scalars['String']>;
  yearOfManufacture?: InputMaybe<Scalars['Float']>;
};

export type PartnersForBookingSortBy = {
  createdAt?: InputMaybe<SortDirectionEnum>;
  distance?: InputMaybe<SortDirectionEnum>;
  star?: InputMaybe<SortDirectionEnum>;
  suggestionPoint?: InputMaybe<SortDirectionEnum>;
};

export type PeriodAndItemCount = {
  __typename?: 'PeriodAndItemCount';
  periodType: Scalars['String'];
  totalItem: Scalars['Float'];
};

export enum PeriodTypeEnum {
  MONTHLY = 'MONTHLY',
  RANGE = 'RANGE',
  WEEKLY = 'WEEKLY',
  YEARLY = 'YEARLY',
}

export type PlaceDetailOutput = {
  __typename?: 'PlaceDetailOutput';
  address: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  place_id: Scalars['String'];
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  items?: Maybe<Array<ProductEntity>>;
  meta: BasePaginationMeta;
};

export type ProductDevice = {
  __typename?: 'ProductDevice';
  manufacturer: CategoryEntity;
  model: CategoryEntity;
  vehicleType: CategoryEntity;
};

export type ProductDeviceInput = {
  manufacturerId: Scalars['String'];
  modelId: Scalars['String'];
  vehicleTypeId: Scalars['String'];
};

export type ProductEntity = Node & {
  __typename?: 'ProductEntity';
  avatar?: Maybe<Media>;
  avatarId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descriptionImageIds?: Maybe<Array<Scalars['String']>>;
  descriptionImages: Array<Media>;
  detail?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isFavorite?: Maybe<Scalars['Boolean']>;
  isFixedCost: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  manufacturer?: Maybe<CategoryEntity>;
  model?: Maybe<CategoryEntity>;
  name: Scalars['String'];
  numberOrder?: Maybe<Scalars['Float']>;
  numberSold: Scalars['Float'];
  operatingNumber?: Maybe<Scalars['Float']>;
  operatingUnit?: Maybe<OperatingUnitEnum>;
  ordinalNumber?: Maybe<Scalars['Float']>;
  origin?: Maybe<CategoryEntity>;
  partNumber?: Maybe<Scalars['String']>;
  partOfProduct?: Maybe<CategoryEntity>;
  partner?: Maybe<PartnerEntity>;
  partnerId?: Maybe<Scalars['String']>;
  productDevices: Array<ProductDevice>;
  productType?: Maybe<CategoryEntity>;
  productUnit?: Maybe<CategoryEntity>;
  quantity: Scalars['Float'];
  reviewSummary?: Maybe<ReviewSummary>;
  serialNumber?: Maybe<Scalars['String']>;
  star: Scalars['Float'];
  starInfo?: Maybe<Array<StarInfo>>;
  type: ProductTypeEnum;
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  vehicleRegistrationPlate?: Maybe<Scalars['String']>;
  vinNumber?: Maybe<Scalars['String']>;
  yearOfManufacture?: Maybe<Scalars['Float']>;
};

export type ProductExistInCart = {
  __typename?: 'ProductExistInCart';
  cartItem?: Maybe<CartItemEntity>;
  exist: Scalars['Boolean'];
};

export type ProductQuotationConnection = {
  __typename?: 'ProductQuotationConnection';
  items?: Maybe<Array<ProductQuotationEntity>>;
  meta: BasePaginationMeta;
};

export type ProductQuotationEntity = Node & {
  __typename?: 'ProductQuotationEntity';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  detail: Scalars['String'];
  id: Scalars['ID'];
  medias: Array<Media>;
  partner: PartnerEntity;
  partnerId: Scalars['String'];
  product: ProductEntity;
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  response?: Maybe<Scalars['String']>;
  status: ProductQuotationStatusEnum;
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userId: Scalars['String'];
};

export type ProductQuotationInput = {
  detail: Scalars['String'];
  productId: Scalars['String'];
  quantity: Scalars['Float'];
};

export type ProductQuotationStatusAndItemCount = {
  __typename?: 'ProductQuotationStatusAndItemCount';
  status: ProductQuotationStatusEnum;
  totalItem: Scalars['Float'];
};

export enum ProductQuotationStatusEnum {
  RESPONDED = 'RESPONDED',
  SENT = 'SENT',
}

export enum ProductTypeEnum {
  ACCESSARY = 'ACCESSARY',
  VEHICLE = 'VEHICLE',
}

export type ProvinceOutput = {
  __typename?: 'ProvinceOutput';
  code: Scalars['String'];
  codename: Scalars['String'];
  divisionType: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<AddressEntity>;
  addresses?: Maybe<Array<AddressEntity>>;
  adminAgencies?: Maybe<PartnerConnection>;
  adminBooking: BookingEntity;
  adminBookingSettlements: Array<SettlementEntity>;
  adminBookings: BookingConnection;
  adminCountProductQuotationForEachStatus: Array<ProductQuotationStatusAndItemCount>;
  adminDetailPartner?: Maybe<PartnerEntity>;
  adminExportAgencies: Scalars['String'];
  adminExportBookingInvoices: Scalars['String'];
  adminExportCourse: Scalars['String'];
  adminExportDiscountCode: Scalars['String'];
  adminExportDocuments: Scalars['String'];
  adminExportGuides: Scalars['String'];
  adminExportInstructions: Scalars['String'];
  adminExportProducts: Scalars['String'];
  adminExportQuotationPrice: Scalars['String'];
  adminExportQuotations: Scalars['String'];
  adminExportReferences: Scalars['String'];
  adminExportSettlements: Scalars['String'];
  adminExportTechnicians: Scalars['String'];
  adminExportUsers: Scalars['String'];
  adminGetBookingInvoice: BookingEntity;
  adminGetBookingInvoices: BookingConnection;
  adminGetCourse: CourseEntity;
  adminGetCourses: CourseConnection;
  adminGetDiscountCode: DiscountCodeEntity;
  adminGetDiscountCodes: DiscountCodeConnection;
  adminGetDocument: DocumentEntity;
  adminGetDocuments: DocumentConnection;
  adminGetGuide: GuideEntity;
  adminGetGuides: GuideConnection;
  adminGetHomePageInfo: AdminHomePage;
  adminGetInstruction: InstructionEntity;
  adminGetInstructions: InstructionConnection;
  adminGetInvoice: Media;
  adminGetNotification: NotificationEntity;
  adminGetNotifications: NotificationConnection;
  adminGetPartnersSubmitSurvey: PartnerConnection;
  adminGetReference: ReferenceEntity;
  adminGetReferences: ReferenceConnection;
  adminGetReportDetailOrder: ReportResDto;
  adminGetReportSettlementOrder: ReportResDto;
  adminGetReportSummary: ReportSummary;
  adminGetReview: ReviewEntity;
  adminGetReviews: ReviewConnection;
  adminGetServiceFeedback: ServiceFeedbackEntity;
  adminGetServiceFeedbacks: ServiceFeedbackConnection;
  adminGetStore: StoreEntity;
  adminGetStoreHistory: StoreProductHistoryConnection;
  adminGetStoreProduct: StoreProductConnection;
  adminGetStores: StoreConnection;
  adminGetSubmitResult: SurveyHistoryEntity;
  adminGetSurvey: SurveyEntity;
  adminGetSurveys: SurveyConnection;
  adminGetUserBookings: BookingConnection;
  adminGetUserMaintenances: MaintenanceConnection;
  adminGetUserOrders: OrderConnection;
  adminGetUserVehicles: VehicleConnection;
  adminGetUsersSubmitSurvey: UserConnection;
  adminMaintenance: MaintenanceEntity;
  adminMaintenances: MaintenanceConnection;
  adminOrder: OrderEntity;
  adminOrders: OrderConnection;
  adminPartner?: Maybe<PartnerEntity>;
  adminProduct: ProductEntity;
  adminProductQuotation: ProductQuotationEntity;
  adminProductQuotations: ProductQuotationConnection;
  adminProducts: ProductConnection;
  adminQuotation: QuotationEntity;
  adminQuotationHistories: Array<QuotationEntity>;
  adminQuotations: QuotationConnection;
  adminSettlement: SettlementEntity;
  adminSettlements: SettlementConnection;
  adminTechnician?: Maybe<PartnerEntity>;
  adminTechnicians?: Maybe<PartnerConnection>;
  /** Require `LIST_ROLE` permission */
  adminUser?: Maybe<UserEntity>;
  adminUsers: UserConnection;
  agencyGetDetailTechnician: PartnerEntity;
  agencyGetTechnicians: PartnerConnection;
  agencyTechnicians?: Maybe<PartnerConnection>;
  booking: BookingEntity;
  bookingHistoriesOfTechnician: BookingConnection;
  bookingStatusHistory: Array<BookingStatusEntity>;
  /** Get a list of category, support pagination, can access by client role */
  categories: CategoryConnection;
  /** Get a single instance of category, can access by client role */
  category: CategoryEntity;
  checkAgencyExisted: Scalars['Boolean'];
  checkProductOrdinalNumberExist: Scalars['Boolean'];
  checkProductPartNumberExist: Scalars['Boolean'];
  checkProductSerialExist: Scalars['Boolean'];
  checkProductVehicleRegistrationPlateExist: Scalars['Boolean'];
  checkProductVinExist: Scalars['Boolean'];
  checkSerialExist: Scalars['Boolean'];
  checkTechnicianExisted: Scalars['Boolean'];
  checkVehicleRegistrationPlateExist: Scalars['Boolean'];
  checkVinExist: Scalars['Boolean'];
  countActiveBooking: Scalars['Float'];
  countActiveMaintenance: Scalars['Float'];
  countMaintenanceItemForEachStatus: Array<MaintenanceStatusAndItemCount>;
  countOrderItemForEachStatus: Array<OrderStatusAndItemCount>;
  currentRoutineLevel: Scalars['Float'];
  /** List all districts by province code name */
  districts?: Maybe<Array<DistrictOutput>>;
  feedback?: Maybe<FeedbackEntity>;
  getApproximateAddressUnits: ApproximateAddressUnits;
  getConnectedSocialAccounts: Array<SocialAccount>;
  getCountStatusServiceFeedback: Array<ServiceFeedbackStatusAndItemCount>;
  getMediaById: Media;
  getPlaceDetail: PlaceDetailOutput;
  getServiceFeedback: ServiceFeedbackEntity;
  getServiceFeedbacks: ServiceFeedbackConnection;
  invoice: BookingEntity;
  listTodo: Array<TodoEntity>;
  maintenance: MaintenanceEntity;
  maintenanceAccessories: Array<MaintenanceAccessory>;
  meAdmin: AdminEntity;
  mePartner: PartnerEntity;
  meUser: UserEntity;
  myBookings: BookingConnection;
  myCart: CartEntity;
  myFeedback?: Maybe<Array<FeedbackEntity>>;
  myOrders: OrderConnection;
  mySetting?: Maybe<UserSettingEntity>;
  order: OrderEntity;
  partnerBooking: BookingEntity;
  partnerBookingQuotations: Array<QuotationEntity>;
  partnerBookingSettlement: Array<SettlementEntity>;
  partnerBookingStatusHistory: Array<BookingStatusEntity>;
  partnerBookings: BookingConnection;
  partnerCheckEmailOrPasswordIsUsed: Scalars['Boolean'];
  partnerCountDiscountCode: Array<DiscountStatusAndEachStatusCount>;
  partnerCountItemByEachPeriod: Array<PeriodAndItemCount>;
  partnerCountItemForEachStatus: Array<StatusAndItemCount>;
  partnerCountOrderItemForEachStatus: Array<OrderStatusAndItemCount>;
  partnerCountProductQuotationForEachStatus: Array<ProductQuotationStatusAndItemCount>;
  partnerGetCountStatusServiceFeedback: Array<ServiceFeedbackStatusAndItemCount>;
  partnerGetCourse: CourseEntity;
  partnerGetCourses: CourseConnection;
  partnerGetDiscountCode: DiscountCodeEntity;
  partnerGetDiscountCodes: DiscountCodeConnection;
  partnerGetDocument: DocumentEntity;
  partnerGetInvoice: Media;
  partnerGetLatestQuotationOfBooking?: Maybe<QuotationEntity>;
  partnerGetLatestSettlementOfBooking: SettlementEntity;
  partnerGetReference: ReferenceEntity;
  partnerGetReferences: ReferenceConnection;
  partnerGetReportDetailBooking: PartnerReportBooking;
  partnerGetReportDetailOrder: PartnerReportOrder;
  partnerGetReportSummary: PartnerReportSummary;
  partnerGetServiceFeedback: ServiceFeedbackEntity;
  partnerGetServiceFeedbacks: ServiceFeedbackConnection;
  partnerGetStartInfo: Array<StarInfo>;
  partnerGetStore: StoreEntity;
  partnerGetStoreHistory: StoreProductHistoryConnection;
  partnerGetStoreProduct: StoreProductConnection;
  partnerGetStores: StoreConnection;
  partnerGetSummaryReview: ReviewSummary;
  partnerGetSurvey: SurveyEntity;
  partnerGetSurveys: SurveyConnection;
  partnerListReview: ReviewConnection;
  partnerNotificationTypeUnSeenCount: Array<NotificationTypeUnSeenCount>;
  partnerNotifications: NotificationConnection;
  partnerOrder: OrderEntity;
  partnerOrders: OrderConnection;
  partnerProduct: ProductEntity;
  partnerProductQuotation: ProductQuotationEntity;
  partnerProductQuotations: ProductQuotationConnection;
  partnerProducts: ProductConnection;
  partnerQuotation: QuotationEntity;
  partnerSettlement: SettlementEntity;
  partnerSummary: PartnerSummary;
  partnersForBooking?: Maybe<PartnerConnection>;
  productExistInCart: ProductExistInCart;
  /** List all provinces */
  provinces?: Maybe<Array<ProvinceOutput>>;
  quotationPriceList: QuotationPriceListEntity;
  quotationPriceLists: QuotationPriceListConnection;
  reverseGeocoding: Array<ReverseGeocoding>;
  reviewsOfPartner: ReviewConnection;
  reviewsOfProduct: ReviewConnection;
  searchPlacesAutocomplete: Array<SearchPlace>;
  searchStore: PartnerConnection;
  settlementsOfTechnician: SettlementConnection;
  storeDetail: PartnerEntity;
  technician?: Maybe<PartnerEntity>;
  technicianGetBookings: BookingConnection;
  technicianGetSettlements: SettlementConnection;
  testPartnerNotification: Scalars['Boolean'];
  testUserNotification: Scalars['Boolean'];
  userBookingQuotations: Array<QuotationEntity>;
  userBookingSettlements: Array<SettlementEntity>;
  userCheckEmailOrPhoneIsUsed: Scalars['Boolean'];
  userCountFavoriteProducts: Scalars['Float'];
  userCountItemForEachStatus: Array<StatusAndItemCount>;
  userCountProductQuotationForEachStatus: Array<ProductQuotationStatusAndItemCount>;
  userFavoriteProducts: ProductConnection;
  userGetAgencyTechnicians: PartnerConnection;
  userGetDiscountCodes: DiscountCodeConnection;
  userGetGuide: GuideEntity;
  userGetGuides: GuideConnection;
  userGetInvoice: Media;
  userGetLatestQuotationOfBooking?: Maybe<QuotationEntity>;
  userGetLatestSettlementOfBooking: SettlementEntity;
  userGetReference: ReferenceEntity;
  userGetReferences: ReferenceConnection;
  userGetSurvey: SurveyEntity;
  userGetSurveys: SurveyConnection;
  userMaintenances: MaintenanceConnection;
  userNotificationTypeUnSeenCount: Array<NotificationTypeUnSeenCount>;
  userNotifications: NotificationConnection;
  userPartnerDetail: PartnerEntity;
  userProduct: ProductEntity;
  userProductQuotation: ProductQuotationEntity;
  userProductQuotations: ProductQuotationConnection;
  userProducts: ProductConnection;
  userQuotation: QuotationEntity;
  userSearchSuggestions: Array<Scalars['String']>;
  userSettlement: SettlementEntity;
  userSummary: UserSummary;
  vehicle: VehicleEntity;
  vehicles: VehicleConnection;
  /** List all wards by province code and district code */
  wards?: Maybe<Array<WardOutput>>;
};

export type QueryAddressArgs = {
  id: Scalars['String'];
};

export type QueryAdminAgenciesArgs = {
  agencyId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminBookingArgs = {
  id: Scalars['String'];
};

export type QueryAdminBookingSettlementsArgs = {
  bookingId: Scalars['String'];
};

export type QueryAdminBookingsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<BookingStatusEnum>>;
};

export type QueryAdminDetailPartnerArgs = {
  id: Scalars['String'];
};

export type QueryAdminExportAgenciesArgs = {
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportBookingInvoicesArgs = {
  search?: InputMaybe<Scalars['String']>;
};

export type QueryAdminExportCourseArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<StatusEnum>;
  openDate?: InputMaybe<Scalars['DateTime']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminExportDiscountCodeArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportDocumentsArgs = {
  isActive?: InputMaybe<StatusEnum>;
  referenceId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportGuidesArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportInstructionsArgs = {
  guideId?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportProductsArgs = {
  isActive?: InputMaybe<StatusEnum>;
  manufacturerId?: InputMaybe<Scalars['String']>;
  modelId?: InputMaybe<Scalars['String']>;
  originId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type?: InputMaybe<ProductTypeEnum>;
  vehicleTypeId?: InputMaybe<Scalars['String']>;
};

export type QueryAdminExportQuotationPriceArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportQuotationsArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<QuotationStatusEnum>>;
};

export type QueryAdminExportReferencesArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportSettlementsArgs = {
  isActive?: InputMaybe<StatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<SettlementStatusEnum>>;
};

export type QueryAdminExportTechniciansArgs = {
  agencyId?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminExportUsersArgs = {
  input: ExportUserInput;
};

export type QueryAdminGetBookingInvoiceArgs = {
  bookingId: Scalars['String'];
};

export type QueryAdminGetBookingInvoicesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetCourseArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetCoursesArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  openDate?: InputMaybe<Scalars['DateTime']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetDiscountCodeArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetDiscountCodesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetDocumentArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetDocumentsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  referenceId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetGuideArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetGuidesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetInstructionArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetInstructionsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  guideId?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetInvoiceArgs = {
  settlementId: Scalars['String'];
};

export type QueryAdminGetNotificationArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetNotificationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetPartnersSubmitSurveyArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  surveyId: Scalars['String'];
};

export type QueryAdminGetReferenceArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetReferencesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetReportDetailOrderArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetReportSettlementOrderArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetReportSummaryArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetReviewArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetReviewsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  star?: InputMaybe<Scalars['Float']>;
  type: ReviewTypeEnum;
};

export type QueryAdminGetServiceFeedbackArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetServiceFeedbacksArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ServiceFeedbacksStatusEnum>;
  type?: InputMaybe<ServiceFeedbackTypeEnum>;
};

export type QueryAdminGetStoreArgs = {
  partnerId: Scalars['String'];
  storeId: Scalars['String'];
};

export type QueryAdminGetStoreHistoryArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  storeId: Scalars['String'];
  type: StoreProductTypeEnum;
};

export type QueryAdminGetStoreProductArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  storeId: Scalars['String'];
};

export type QueryAdminGetStoresArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminGetSubmitResultArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  surveyId: Scalars['String'];
  type: SurveyHistoryType;
  userId: Scalars['String'];
};

export type QueryAdminGetSurveyArgs = {
  id: Scalars['String'];
};

export type QueryAdminGetSurveysArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  openDate?: InputMaybe<Scalars['DateTime']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetUserBookingsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  userId: Scalars['String'];
};

export type QueryAdminGetUserMaintenancesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  userId: Scalars['String'];
};

export type QueryAdminGetUserOrdersArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  userId: Scalars['String'];
};

export type QueryAdminGetUserVehiclesArgs = {
  excludeActiveBooking?: InputMaybe<Scalars['Boolean']>;
  excludeActiveMaintenance?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  userId: Scalars['String'];
  vehicleTypeId?: InputMaybe<Scalars['String']>;
};

export type QueryAdminGetUsersSubmitSurveyArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  surveyId: Scalars['String'];
};

export type QueryAdminMaintenanceArgs = {
  id: Scalars['String'];
};

export type QueryAdminMaintenancesArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<MaintenanceStatusEnum>>;
};

export type QueryAdminOrderArgs = {
  id: Scalars['String'];
};

export type QueryAdminOrdersArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<OrderStatusEnum>>;
};

export type QueryAdminProductArgs = {
  id: Scalars['String'];
};

export type QueryAdminProductQuotationArgs = {
  id: Scalars['String'];
};

export type QueryAdminProductQuotationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  productQuotationCode?: InputMaybe<Scalars['String']>;
  productQuotationId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ProductQuotationStatusEnum>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QueryAdminProductsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  manufacturerId?: InputMaybe<Scalars['String']>;
  modelId?: InputMaybe<Scalars['String']>;
  originId?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type?: InputMaybe<ProductTypeEnum>;
  vehicleTypeId?: InputMaybe<Scalars['String']>;
};

export type QueryAdminQuotationArgs = {
  id: Scalars['String'];
};

export type QueryAdminQuotationHistoriesArgs = {
  bookingId: Scalars['String'];
};

export type QueryAdminQuotationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<QuotationStatusEnum>>;
};

export type QueryAdminSettlementArgs = {
  id: Scalars['String'];
};

export type QueryAdminSettlementsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<SettlementStatusEnum>>;
};

export type QueryAdminTechnicianArgs = {
  id: Scalars['String'];
};

export type QueryAdminTechniciansArgs = {
  agencyId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAdminUserArgs = {
  id: Scalars['String'];
};

export type QueryAdminUsersArgs = {
  input: AdminUserPaginationInput;
};

export type QueryAgencyGetDetailTechnicianArgs = {
  id: Scalars['String'];
};

export type QueryAgencyGetTechniciansArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryAgencyTechniciansArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryBookingArgs = {
  id: Scalars['String'];
};

export type QueryBookingHistoriesOfTechnicianArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  technicianId: Scalars['String'];
};

export type QueryBookingStatusHistoryArgs = {
  bookingId: Scalars['String'];
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type: CategoryTypeEnum;
};

export type QueryCategoryArgs = {
  id: Scalars['String'];
};

export type QueryCheckAgencyExistedArgs = {
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type QueryCheckProductOrdinalNumberExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  ordinalNumber: Scalars['Float'];
};

export type QueryCheckProductPartNumberExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  partNumber: Scalars['String'];
};

export type QueryCheckProductSerialExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  serialNumber: Scalars['String'];
};

export type QueryCheckProductVehicleRegistrationPlateExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  vehicleRegistrationPlate: Scalars['String'];
};

export type QueryCheckProductVinExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  vinNumber: Scalars['String'];
};

export type QueryCheckSerialExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  serialNumber: Scalars['String'];
};

export type QueryCheckTechnicianExistedArgs = {
  citizenId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type QueryCheckVehicleRegistrationPlateExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  vehicleRegistrationPlate: Scalars['String'];
};

export type QueryCheckVinExistArgs = {
  id?: InputMaybe<Scalars['String']>;
  serialNumber: Scalars['String'];
};

export type QueryCountActiveMaintenanceArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type QueryCurrentRoutineLevelArgs = {
  vehicleId: Scalars['String'];
};

export type QueryDistrictsArgs = {
  provinceCodeName: Scalars['String'];
};

export type QueryFeedbackArgs = {
  id: Scalars['String'];
};

export type QueryGetApproximateAddressUnitsArgs = {
  input: ApproximateAddressUnitsArgs;
};

export type QueryGetMediaByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetPlaceDetailArgs = {
  place_id: Scalars['String'];
};

export type QueryGetServiceFeedbackArgs = {
  id: Scalars['String'];
};

export type QueryGetServiceFeedbacksArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ServiceFeedbacksStatusEnum>;
  type?: InputMaybe<ServiceFeedbackTypeEnum>;
};

export type QueryInvoiceArgs = {
  id: Scalars['String'];
};

export type QueryMaintenanceArgs = {
  id: Scalars['String'];
};

export type QueryMaintenanceAccessoriesArgs = {
  routineLevel: Scalars['Float'];
};

export type QueryMePartnerArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};

export type QueryMeUserArgs = {
  deviceId?: InputMaybe<Scalars['String']>;
};

export type QueryMyBookingsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<BookingStatusEnum>>;
};

export type QueryMyFeedbackArgs = {
  status: Scalars['String'];
};

export type QueryMyOrdersArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<OrderStatusEnum>>;
};

export type QueryOrderArgs = {
  id: Scalars['String'];
};

export type QueryPartnerBookingArgs = {
  id: Scalars['String'];
};

export type QueryPartnerBookingQuotationsArgs = {
  bookingId: Scalars['String'];
};

export type QueryPartnerBookingSettlementArgs = {
  bookingId: Scalars['String'];
};

export type QueryPartnerBookingStatusHistoryArgs = {
  bookingId: Scalars['String'];
};

export type QueryPartnerBookingsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  statuses?: InputMaybe<Array<BookingStatusEnum>>;
};

export type QueryPartnerCheckEmailOrPasswordIsUsedArgs = {
  input: PartnerCheckEmailOrPasswordIsUsedInput;
};

export type QueryPartnerGetCourseArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetCoursesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isOwner?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryPartnerGetDiscountCodeArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetDiscountCodesArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isActivities: Scalars['Boolean'];
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryPartnerGetDocumentArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetInvoiceArgs = {
  settlementId: Scalars['String'];
};

export type QueryPartnerGetLatestQuotationOfBookingArgs = {
  bookingId: Scalars['String'];
};

export type QueryPartnerGetLatestSettlementOfBookingArgs = {
  bookingId: Scalars['String'];
};

export type QueryPartnerGetReferenceArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetReferencesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryPartnerGetReportDetailBookingArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryPartnerGetReportDetailOrderArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryPartnerGetReportSummaryArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  partnerId: Scalars['String'];
  periodType: PeriodTypeEnum;
  startDate?: InputMaybe<Scalars['String']>;
};

export type QueryPartnerGetServiceFeedbackArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetServiceFeedbacksArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ServiceFeedbacksStatusEnum>;
  type?: InputMaybe<ServiceFeedbackTypeEnum>;
};

export type QueryPartnerGetStartInfoArgs = {
  reviewObject: Scalars['String'];
};

export type QueryPartnerGetStoreArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetStoreHistoryArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  storeId: Scalars['String'];
  type: StoreProductTypeEnum;
};

export type QueryPartnerGetStoreProductArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  storeId: Scalars['String'];
};

export type QueryPartnerGetStoresArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryPartnerGetSummaryReviewArgs = {
  reviewObject: Scalars['String'];
};

export type QueryPartnerGetSurveyArgs = {
  id: Scalars['String'];
};

export type QueryPartnerGetSurveysArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryPartnerListReviewArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  reviewObject: ReviewObjectEnum;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  star?: InputMaybe<Scalars['Float']>;
};

export type QueryPartnerNotificationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isSeen?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type: NotificationTypeEnum;
};

export type QueryPartnerOrderArgs = {
  id: Scalars['String'];
};

export type QueryPartnerOrdersArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<OrderStatusEnum>>;
};

export type QueryPartnerProductArgs = {
  id: Scalars['String'];
};

export type QueryPartnerProductQuotationArgs = {
  id: Scalars['String'];
};

export type QueryPartnerProductQuotationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  productQuotationCode?: InputMaybe<Scalars['String']>;
  productQuotationId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ProductQuotationStatusEnum>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QueryPartnerProductsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isFixedCost?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type?: InputMaybe<ProductTypeEnum>;
};

export type QueryPartnerQuotationArgs = {
  quotationId: Scalars['String'];
};

export type QueryPartnerSettlementArgs = {
  settlementId: Scalars['String'];
};

export type QueryPartnersForBookingArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isAgency?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isTechnician?: InputMaybe<Scalars['Boolean']>;
  latitude: Scalars['Float'];
  limit?: InputMaybe<Scalars['Int']>;
  longitude: Scalars['Float'];
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  sortBy?: InputMaybe<PartnersForBookingSortBy>;
};

export type QueryProductExistInCartArgs = {
  productId: Scalars['String'];
};

export type QueryQuotationPriceListArgs = {
  id: Scalars['String'];
};

export type QueryQuotationPriceListsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  productName?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryReverseGeocodingArgs = {
  input: LatLng;
};

export type QueryReviewsOfPartnerArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  star?: InputMaybe<Scalars['Float']>;
  type: ReviewTypeEnum;
};

export type QueryReviewsOfProductArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  productId: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  star?: InputMaybe<Scalars['Float']>;
  type: ReviewTypeEnum;
};

export type QuerySearchPlacesAutocompleteArgs = {
  input: SearchPlacesArgs;
};

export type QuerySearchStoreArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId?: InputMaybe<Scalars['String']>;
  search: Scalars['String'];
  sort?: InputMaybe<SortInput>;
  type?: InputMaybe<ProductTypeEnum>;
};

export type QuerySettlementsOfTechnicianArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  technicianId: Scalars['String'];
};

export type QueryStoreDetailArgs = {
  id: Scalars['String'];
};

export type QueryTechnicianArgs = {
  id: Scalars['String'];
};

export type QueryTechnicianGetBookingsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  technicianId: Scalars['String'];
};

export type QueryTechnicianGetSettlementsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  technicianId: Scalars['String'];
};

export type QueryUserBookingQuotationsArgs = {
  bookingId: Scalars['String'];
};

export type QueryUserBookingSettlementsArgs = {
  bookingId: Scalars['String'];
};

export type QueryUserCheckEmailOrPhoneIsUsedArgs = {
  input: UserCheckEmailOrPhoneIsUsed;
};

export type QueryUserFavoriteProductsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserGetAgencyTechniciansArgs = {
  filterTechniciansByAgencyId?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserGetDiscountCodesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isAvailable?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  productIds: Array<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserGetGuideArgs = {
  id: Scalars['String'];
};

export type QueryUserGetGuidesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserGetInvoiceArgs = {
  settlementId: Scalars['String'];
};

export type QueryUserGetLatestQuotationOfBookingArgs = {
  bookingId: Scalars['String'];
};

export type QueryUserGetLatestSettlementOfBookingArgs = {
  bookingId: Scalars['String'];
};

export type QueryUserGetReferenceArgs = {
  id: Scalars['String'];
};

export type QueryUserGetReferencesArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserGetSurveyArgs = {
  id: Scalars['String'];
};

export type QueryUserGetSurveysArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
};

export type QueryUserMaintenancesArgs = {
  endDate?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  startDate?: InputMaybe<Scalars['String']>;
  statuses?: InputMaybe<Array<MaintenanceStatusEnum>>;
};

export type QueryUserNotificationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isSeen?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type: NotificationTypeEnum;
};

export type QueryUserPartnerDetailArgs = {
  id: Scalars['String'];
};

export type QueryUserProductArgs = {
  id: Scalars['String'];
};

export type QueryUserProductQuotationArgs = {
  id: Scalars['String'];
};

export type QueryUserProductQuotationsArgs = {
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId?: InputMaybe<Scalars['String']>;
  productId?: InputMaybe<Scalars['String']>;
  productQuotationCode?: InputMaybe<Scalars['String']>;
  productQuotationId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  status?: InputMaybe<ProductQuotationStatusEnum>;
  userId?: InputMaybe<Scalars['String']>;
};

export type QueryUserProductsArgs = {
  excludeProductIds?: InputMaybe<Array<Scalars['String']>>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  manufacturerIds?: InputMaybe<Array<Scalars['String']>>;
  modelIds?: InputMaybe<Array<Scalars['String']>>;
  originIds?: InputMaybe<Array<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  partnerId?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  type?: InputMaybe<ProductTypeEnum>;
  vehicleTypeIds?: InputMaybe<Array<Scalars['String']>>;
};

export type QueryUserQuotationArgs = {
  quotationId: Scalars['String'];
};

export type QueryUserSearchSuggestionsArgs = {
  search?: InputMaybe<Scalars['String']>;
};

export type QueryUserSettlementArgs = {
  settlementId: Scalars['String'];
};

export type QueryUserSummaryArgs = {
  input: UserSummaryInput;
};

export type QueryVehicleArgs = {
  id: Scalars['String'];
};

export type QueryVehiclesArgs = {
  excludeActiveBooking?: InputMaybe<Scalars['Boolean']>;
  excludeActiveMaintenance?: InputMaybe<Scalars['Boolean']>;
  filters?: InputMaybe<Array<Scalars['JSONObject']>>;
  isActive?: InputMaybe<StatusEnum>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortInput>;
  vehicleTypeId?: InputMaybe<Scalars['String']>;
};

export type QueryWardsArgs = {
  districtCodeName: Scalars['String'];
  provinceCodeName: Scalars['String'];
};

export type QuestionEntity = Node & {
  __typename?: 'QuestionEntity';
  answerType: AnswerType;
  answers?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isRequired: Scalars['Boolean'];
  question: Scalars['String'];
  surveyId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QuickAddVehicleInput = {
  addressMoreInfo: Scalars['String'];
  hidden?: InputMaybe<Scalars['Boolean']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
  name: Scalars['String'];
};

export type QuotationAccessoryEntity = Node & {
  __typename?: 'QuotationAccessoryEntity';
  available: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  quotationId: Scalars['String'];
  unit: Scalars['String'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type QuotationAccessoryInput = {
  available: Scalars['Boolean'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
  unit: Scalars['String'];
  unitPrice: Scalars['Float'];
};

export type QuotationAdditionalFeeEntity = Node & {
  __typename?: 'QuotationAdditionalFeeEntity';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  quotationId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QuotationAdditionalFeeInput = {
  amount: Scalars['Float'];
  name: Scalars['String'];
};

export type QuotationConnection = {
  __typename?: 'QuotationConnection';
  items?: Maybe<Array<QuotationEntity>>;
  meta: BasePaginationMeta;
};

export type QuotationDiagnosticEntity = Node & {
  __typename?: 'QuotationDiagnosticEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  diagnosticCode: Scalars['String'];
  expense: Scalars['Float'];
  id: Scalars['ID'];
  quotationId: Scalars['String'];
  quotationPriceListId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  workingHour: Scalars['Float'];
};

export type QuotationDiagnosticInput = {
  description?: InputMaybe<Scalars['String']>;
  expense?: InputMaybe<Scalars['Float']>;
  quotationPriceListId: Scalars['String'];
  workingHour?: InputMaybe<Scalars['Float']>;
};

export type QuotationEntity = Node & {
  __typename?: 'QuotationEntity';
  accessories: Array<QuotationAccessoryEntity>;
  additionalFees: Array<QuotationAdditionalFeeEntity>;
  booking: BookingEntity;
  bookingId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  diagnosisFee: Scalars['Float'];
  diagnosisNote?: Maybe<Scalars['String']>;
  diagnostics: Array<QuotationDiagnosticEntity>;
  estimatedCompleteAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  operatingNumber: Scalars['Float'];
  operatingUnit: OperatingUnitEnum;
  reasons?: Maybe<Array<CategoryEntity>>;
  rejectReasons?: Maybe<Scalars['String']>;
  repairFee: Scalars['Float'];
  status: QuotationStatusEnum;
  technician: PartnerEntity;
  technicianId: Scalars['String'];
  total: Scalars['Float'];
  transportFee: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userId: Scalars['String'];
};

export type QuotationPriceListConnection = {
  __typename?: 'QuotationPriceListConnection';
  items?: Maybe<Array<QuotationPriceListEntity>>;
  meta: BasePaginationMeta;
};

export type QuotationPriceListEntity = Node & {
  __typename?: 'QuotationPriceListEntity';
  accessoriesName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  diagnosticCode: Scalars['String'];
  expense: Scalars['Float'];
  fixable: Scalars['Boolean'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  vehicleType: Scalars['String'];
  workingCode: Scalars['String'];
  workingHour: Scalars['Float'];
};

export enum QuotationStatusEnum {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export type ReCreateBookingInput = {
  bookingId: Scalars['String'];
  partnerId: Scalars['String'];
  transportDistance: Scalars['Float'];
  transportDuration: Scalars['Float'];
  transportFee: Scalars['Float'];
};

export type ReCreateOrderInput = {
  orderId: Scalars['String'];
};

export type ReferenceConnection = {
  __typename?: 'ReferenceConnection';
  items?: Maybe<Array<ReferenceEntity>>;
  meta: BasePaginationMeta;
};

export type ReferenceEntity = Node & {
  __typename?: 'ReferenceEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<DocumentEntity>>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RegisterInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};

export type RejectQuotationInput = {
  note?: InputMaybe<Scalars['String']>;
  quotationId: Scalars['String'];
  reasons?: InputMaybe<Array<Scalars['String']>>;
};

export type RejectSettlementInput = {
  reason: Scalars['String'];
  settlementId: Scalars['String'];
};

export type ReportHistoryResDto = {
  __typename?: 'ReportHistoryResDto';
  date: Scalars['String'];
  revenue: Scalars['Float'];
};

export type ReportResDto = {
  __typename?: 'ReportResDto';
  histories: Array<ReportHistoryResDto>;
  totalRevenue: Scalars['Float'];
};

export type ReportSummary = {
  __typename?: 'ReportSummary';
  totalRevenue: Scalars['Float'];
  totalRevenueOrder: Scalars['Float'];
  totalRevenueSettlement: Scalars['Float'];
};

export type ResendOtpInput = {
  actor: ActorTypeEnum;
  phone: Scalars['String'];
  type: ActiveCodeEnum;
};

export type RespondProductQuotationInput = {
  id: Scalars['String'];
  mediaIds?: InputMaybe<Array<Scalars['String']>>;
  response: Scalars['String'];
};

export type ReverseGeocoding = {
  __typename?: 'ReverseGeocoding';
  address: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  name: Scalars['String'];
  place_id: Scalars['String'];
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  items?: Maybe<Array<ReviewEntity>>;
  meta: BasePaginationMeta;
};

export type ReviewEntity = Node & {
  __typename?: 'ReviewEntity';
  assessorId: Scalars['String'];
  bookingId?: Maybe<Scalars['String']>;
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  orderId?: Maybe<Scalars['String']>;
  partnerAssessor?: Maybe<PartnerEntity>;
  personEvaluatedId?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  star: Scalars['Float'];
  type: ReviewTypeEnum;
  updatedAt: Scalars['DateTime'];
  userAssessor?: Maybe<UserEntity>;
};

export enum ReviewObjectEnum {
  BOOKING = 'BOOKING',
  ORDER = 'ORDER',
}

export type ReviewSummary = {
  __typename?: 'ReviewSummary';
  percent: Scalars['Float'];
  starAverage: Scalars['Float'];
  total: Scalars['Float'];
};

export enum ReviewTypeEnum {
  CLIENT_AGENCY = 'CLIENT_AGENCY',
  CLIENT_PRODUCT = 'CLIENT_PRODUCT',
  CLIENT_STORE = 'CLIENT_STORE',
  CLIENT_TECHNICIAN = 'CLIENT_TECHNICIAN',
  TECHNICIAN_CLIENT = 'TECHNICIAN_CLIENT',
}

export type ScheduleBookingInput = {
  bookingId: Scalars['String'];
  scheduleReason?: InputMaybe<Scalars['String']>;
  scheduleTime: Scalars['DateTime'];
};

export type SearchPlace = {
  __typename?: 'SearchPlace';
  address: Scalars['String'];
  name: Scalars['String'];
  place_id: Scalars['String'];
};

export type SearchPlacesArgs = {
  keyword: Scalars['String'];
  location?: InputMaybe<LatLng>;
};

export type SearchSuggestionEntity = Node & {
  __typename?: 'SearchSuggestionEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  keyword: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  weight: Scalars['Float'];
};

export type ServiceFeedbackConnection = {
  __typename?: 'ServiceFeedbackConnection';
  items?: Maybe<Array<ServiceFeedbackEntity>>;
  meta: BasePaginationMeta;
};

export type ServiceFeedbackEntity = Node & {
  __typename?: 'ServiceFeedbackEntity';
  answer?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  createAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  id: Scalars['ID'];
  images: Array<Media>;
  imagesAnswer: Array<Media>;
  imagesAnswerIds?: Maybe<Array<Scalars['String']>>;
  imagesIds?: Maybe<Array<Scalars['String']>>;
  partner?: Maybe<PartnerEntity>;
  partnerId?: Maybe<Scalars['String']>;
  status: ServiceFeedbacksStatusEnum;
  type: ServiceFeedbackTypeEnum;
  updateAt: Scalars['DateTime'];
  user?: Maybe<UserEntity>;
  userId?: Maybe<Scalars['String']>;
};

export type ServiceFeedbackStatusAndItemCount = {
  __typename?: 'ServiceFeedbackStatusAndItemCount';
  quantity: Scalars['String'];
  status: Scalars['String'];
};

export enum ServiceFeedbackTypeEnum {
  COMPLAIN = 'COMPLAIN',
  QUESTION = 'QUESTION',
  SUPPORT = 'SUPPORT',
}

export enum ServiceFeedbacksStatusEnum {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
}

export type SettlementAdditionalFeeEntity = Node & {
  __typename?: 'SettlementAdditionalFeeEntity';
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  settlementId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SettlementAdditionalFeeInput = {
  amount: Scalars['Float'];
  name: Scalars['String'];
};

export type SettlementConnection = {
  __typename?: 'SettlementConnection';
  items?: Maybe<Array<SettlementEntity>>;
  meta: BasePaginationMeta;
};

export type SettlementEntity = Node & {
  __typename?: 'SettlementEntity';
  additionalFees: Array<SettlementAdditionalFeeEntity>;
  booking: BookingEntity;
  bookingId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  invoiceId?: Maybe<Scalars['String']>;
  quotation: QuotationEntity;
  quotationId: Scalars['String'];
  status: SettlementStatusEnum;
  technician: PartnerEntity;
  technicianId: Scalars['String'];
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: UserEntity;
  userId: Scalars['String'];
  vatTax?: Maybe<Scalars['Float']>;
};

export enum SettlementStatusEnum {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export type SocialAccount = Node & {
  __typename?: 'SocialAccount';
  id: Scalars['ID'];
  socialEmail?: Maybe<Scalars['String']>;
  socialId: Scalars['String'];
  type: SocialAccountTypeEnum;
  userId: Scalars['String'];
};

export enum SocialAccountTypeEnum {
  APPLE = 'APPLE',
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
}

export enum SortDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type SortInput = {
  direction?: InputMaybe<SortDirectionEnum>;
  field: Scalars['String'];
};

export type StarInfo = {
  __typename?: 'StarInfo';
  star: Scalars['Float'];
  total: Scalars['Float'];
};

export type StatusAndItemCount = {
  __typename?: 'StatusAndItemCount';
  status: BookingStatusEnum;
  totalitems: Scalars['Float'];
};

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type StoreConnection = {
  __typename?: 'StoreConnection';
  items?: Maybe<Array<StoreEntity>>;
  meta: BasePaginationMeta;
};

export type StoreEntity = Node & {
  __typename?: 'StoreEntity';
  address: Scalars['String'];
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  partnerId: Scalars['String'];
  phoneNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StoreProductConnection = {
  __typename?: 'StoreProductConnection';
  items?: Maybe<Array<StoreProductEntity>>;
  meta: BasePaginationMeta;
};

export type StoreProductEntity = Node & {
  __typename?: 'StoreProductEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  product: ProductEntity;
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  storeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StoreProductHistoryConnection = {
  __typename?: 'StoreProductHistoryConnection';
  items?: Maybe<Array<StoreProductHistoryEntity>>;
  meta: BasePaginationMeta;
};

export type StoreProductHistoryEntity = Node & {
  __typename?: 'StoreProductHistoryEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  inputDate: Scalars['DateTime'];
  product: ProductEntity;
  productId: Scalars['String'];
  quantity: Scalars['Float'];
  storeId: Scalars['String'];
  type: StoreProductTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export enum StoreProductTypeEnum {
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
}

export type Subscription = {
  __typename?: 'Subscription';
  onBookingTimeout: BookingEntity;
  onCreateBooking: BookingEntity;
  onPartnerCancelBooking: BookingEntity;
};

export type SurveyConnection = {
  __typename?: 'SurveyConnection';
  items?: Maybe<Array<SurveyEntity>>;
  meta: BasePaginationMeta;
};

export type SurveyEntity = Node & {
  __typename?: 'SurveyEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  partnerIsSubmitSurvey: Scalars['Boolean'];
  partnerResultSurvey?: Maybe<SurveyHistoryEntity>;
  questions: Array<QuestionEntity>;
  updatedAt: Scalars['DateTime'];
  userIsSubmitSurvey: Scalars['Boolean'];
  userResultSurvey?: Maybe<SurveyHistoryEntity>;
};

export type SurveyHistoryEntity = Node & {
  __typename?: 'SurveyHistoryEntity';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  results: Array<SurveyResult>;
  surveyId: Scalars['String'];
  type: SurveyHistoryType;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export enum SurveyHistoryType {
  PARTNER = 'PARTNER',
  USER = 'USER',
}

export type SurveyResult = {
  __typename?: 'SurveyResult';
  answer: Array<Scalars['String']>;
  questionId: Scalars['String'];
};

export type SurveyResultInput = {
  answer: Array<Scalars['String']>;
  questionId: Scalars['String'];
};

export type TodoEntity = Node & {
  __typename?: 'TodoEntity';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateAccessaryInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isFixedCost?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  modelId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  originId?: InputMaybe<Scalars['String']>;
  partId?: InputMaybe<Scalars['String']>;
  partNumber?: InputMaybe<Scalars['String']>;
  productDevices?: InputMaybe<Array<ProductDeviceInput>>;
  productUnitId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  serialNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProductTypeEnum>;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type UpdateAddressInput = {
  addressDetail?: InputMaybe<Scalars['String']>;
  addressName: Scalars['String'];
  contactName: Scalars['String'];
  contactPhone: Scalars['String'];
  id: Scalars['ID'];
  isDefault?: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mapAddress: Scalars['String'];
};

export type UpdateAdminInput = {
  address?: InputMaybe<Scalars['String']>;
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};

export type UpdateAgentInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  hotline?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  mapAddress?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  qualifications?: InputMaybe<Array<Scalars['String']>>;
  suggestionPoint?: InputMaybe<Scalars['Float']>;
};

export type UpdateAgentStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateBookingStatusInput = {
  bookingId: Scalars['String'];
};

export type UpdateCategoryInput = {
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UpdateCourseInput = {
  address?: InputMaybe<Scalars['String']>;
  bannerId?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  openDate?: InputMaybe<Scalars['DateTime']>;
  price?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  teacher?: InputMaybe<Scalars['String']>;
  teacherDescription?: InputMaybe<Scalars['String']>;
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateDiscountCodeInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Float']>;
  limitPerAccount?: InputMaybe<Scalars['Float']>;
  minOrderValue?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  productIds?: InputMaybe<Array<Scalars['String']>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  unit?: InputMaybe<DiscountCodeUnitEnum>;
  value?: InputMaybe<Scalars['Float']>;
};

export type UpdateDiscountStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateDocumentInput = {
  fileIds?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  referenceId?: InputMaybe<Scalars['String']>;
};

export type UpdateDocumentStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateGuideInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateGuideStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateInstructionInput = {
  description?: InputMaybe<Scalars['String']>;
  guideId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateInstructionStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateMaintenanceInput = {
  accessories?: InputMaybe<Array<MaintenanceAccessoryInput>>;
  addressMoreInfo: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  maintenanceLevel: MaintenanceLevelEnum;
  mapAddress: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
  routineLevel?: InputMaybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  vehicleId: Scalars['String'];
};

export type UpdateNotificationStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateOrderInput = {
  orderId: Scalars['String'];
  status: OrderStatusEnum;
};

export type UpdatePartnerBasicInfoInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  cardNumber?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  education?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  hotline?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  mapAddress?: InputMaybe<Scalars['String']>;
  qualifications?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdatePartnerPasswordInput = {
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UpdateProductStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateProductVehicleInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  descriptionImageIds?: InputMaybe<Array<Scalars['String']>>;
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  isFixedCost?: InputMaybe<Scalars['Boolean']>;
  isNew?: InputMaybe<Scalars['Boolean']>;
  manufacturerId?: InputMaybe<Scalars['String']>;
  modelId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  operatingNumber?: InputMaybe<Scalars['Float']>;
  operatingUnit?: InputMaybe<OperatingUnitEnum>;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId?: InputMaybe<Scalars['String']>;
  productUnitId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  serialNumber?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProductTypeEnum>;
  unitPrice?: InputMaybe<Scalars['Float']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId?: InputMaybe<Scalars['String']>;
  vinNumber?: InputMaybe<Scalars['String']>;
  yearOfManufacture?: InputMaybe<Scalars['Float']>;
};

export type UpdateQuotationPriceListInput = {
  accessoriesName?: InputMaybe<Scalars['String']>;
  diagnosticCode?: InputMaybe<Scalars['String']>;
  expense?: InputMaybe<Scalars['Float']>;
  fixable?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  vehicleType?: InputMaybe<Scalars['String']>;
  workingCode?: InputMaybe<Scalars['String']>;
  workingHour?: InputMaybe<Scalars['Float']>;
};

export type UpdateReferenceInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateReferenceStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateServiceFeedbackInput = {
  content: Scalars['String'];
  id: Scalars['String'];
  imagesIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateStoreInput = {
  address?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateSurveyInput = {
  id: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<Array<CreateQuestionInput>>;
};

export type UpdateSurveyStatusInput = {
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
};

export type UpdateTechnicianApproveInput = {
  id: Scalars['ID'];
  isApproved: Scalars['Boolean'];
};

export type UpdateTechnicianInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  bank?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  cardNumber?: InputMaybe<Scalars['String']>;
  citizenId?: InputMaybe<Scalars['String']>;
  education?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  latitude?: InputMaybe<Scalars['Float']>;
  level?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['Float']>;
  mapAddress?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
  qualifications?: InputMaybe<Array<Scalars['String']>>;
  suggestionPoint?: InputMaybe<Scalars['Float']>;
};

export type UpdateTodoInput = {
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  title: Scalars['String'];
};

export type UpdateUserInput = {
  avatarId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type UpdateUserSettingInput = {
  allowAccessCamera: Scalars['Boolean'];
  allowAccessPhoto: Scalars['Boolean'];
  allowLocation: Scalars['Boolean'];
  allowNotification: Scalars['Boolean'];
};

export type UpdateVehicleInput = {
  addressMoreInfo?: InputMaybe<Scalars['String']>;
  avatarId?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  manufacturerId: Scalars['String'];
  mapAddress: Scalars['String'];
  modelId: Scalars['String'];
  name: Scalars['String'];
  operatingNumber: Scalars['Float'];
  operatingUnit?: OperatingUnitEnum;
  ordinalNumber?: InputMaybe<Scalars['Float']>;
  originId: Scalars['String'];
  serialNumber?: InputMaybe<Scalars['String']>;
  vehicleRegistrationPlate?: InputMaybe<Scalars['String']>;
  vehicleTypeId: Scalars['String'];
  vinNumber: Scalars['String'];
  yearOfManufacture: Scalars['Float'];
};

export type UserAddMultiFavoriteProductInput = {
  productIds: Array<Scalars['String']>;
};

export type UserChangePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UserCheckEmailOrPhoneIsUsed = {
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  items?: Maybe<Array<UserEntity>>;
  meta: BasePaginationMeta;
};

export type UserEntity = Node & {
  __typename?: 'UserEntity';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  certificate?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  numberBooking: Scalars['Float'];
  numberMaintenance: Scalars['Float'];
  numberOrder: Scalars['Float'];
  phone: Scalars['String'];
  star: Scalars['Float'];
  totalBookings: Scalars['Float'];
  totalMaintenanceRequests: Scalars['Float'];
  totalOrders: Scalars['Float'];
  totalPayment: Scalars['Float'];
  totalSpending: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userAddress?: Maybe<AddressEntity>;
};

export type UserForgotPasswordInput = {
  emailOrPhone: Scalars['String'];
};

export type UserLoginInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type UserRemoveMultiFavoriteProductInput = {
  productIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UserSettingEntity = Node & {
  __typename?: 'UserSettingEntity';
  allowAccessCamera: Scalars['Boolean'];
  allowAccessPhoto: Scalars['Boolean'];
  allowLocation: Scalars['Boolean'];
  allowNotification: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type UserSummary = {
  __typename?: 'UserSummary';
  activeBooking: Scalars['Float'];
  activeMaintenance: Scalars['Float'];
};

export type UserSummaryInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type VehicleConnection = {
  __typename?: 'VehicleConnection';
  items?: Maybe<Array<VehicleEntity>>;
  meta: BasePaginationMeta;
};

export type VehicleEntity = Node & {
  __typename?: 'VehicleEntity';
  addressMoreInfo?: Maybe<Scalars['String']>;
  avatar?: Maybe<Media>;
  avatarId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  detail?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  manufacturer?: Maybe<CategoryEntity>;
  mapAddress?: Maybe<Scalars['String']>;
  model?: Maybe<CategoryEntity>;
  name: Scalars['String'];
  operatingNumber: Scalars['Float'];
  operatingUnit: OperatingUnitEnum;
  ordinalNumber?: Maybe<Scalars['Float']>;
  origin?: Maybe<CategoryEntity>;
  serialNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  vehicleRegistrationPlate?: Maybe<Scalars['String']>;
  vehicleType?: Maybe<CategoryEntity>;
  vinNumber: Scalars['String'];
  yearOfManufacture?: Maybe<Scalars['Float']>;
};

export type VerifyOtpInput = {
  deviceId?: InputMaybe<Scalars['String']>;
  otpCode: Scalars['String'];
  phone: Scalars['String'];
  type: ActiveCodeEnum;
};

export type WardOutput = {
  __typename?: 'WardOutput';
  code: Scalars['String'];
  codename: Scalars['String'];
  divisionType: Scalars['String'];
  name: Scalars['String'];
  shortCodename: Scalars['String'];
};
