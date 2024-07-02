import { IClassName } from './props';

export default function BtnPlus({ className, width, height }: IClassName) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
      />
    </svg>
  );
}
