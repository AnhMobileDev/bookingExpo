import { Education, Qualification } from '../constants/enum';

export const getListQualification = () => {
  return Object.entries(Qualification).map(([value, label]) => ({ value, label }));
};

export const getListEducation = () => {
  return Object.entries(Education).map(([value, label]) => ({ value, label }));
};
