export const RowItem = ({
  label,
  value,
  valueColor,
  wrapperStyle,
}: {
  label?: string;
  value?: any;
  valueColor?: string;
  wrapperStyle?: string;
}) => {
  return (
    <div className={`flex justify-between items-baseline ${wrapperStyle}`}>
      <span className="text-14px leading-20px font-normal text-grayscale-gray">{label}</span>
      <span className={'text-14px leading-20px font-normal ' + valueColor}>{value}</span>
    </div>
  );
};
