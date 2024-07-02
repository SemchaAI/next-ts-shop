import { IClassName } from './props';

export default function BurgerMenu({ className, width, height }: IClassName) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 3.75C0 3.33579 0.335786 3 0.75 3L15.25 3C15.6642 3 16 3.33579 16 3.75C16 4.16421 15.6642 4.5 15.25 4.5L0.75 4.5C0.335786 4.5 0 4.16421 0 3.75ZM0 8C0 7.58579 0.335786 7.25 0.75 7.25L15.25 7.25C15.6642 7.25 16 7.58579 16 8C16 8.41421 15.6642 8.75 15.25 8.75L0.75 8.75C0.335786 8.75 0 8.41421 0 8ZM0.75 11.5C0.335786 11.5 0 11.8358 0 12.25C0 12.6642 0.335786 13 0.75 13L15.25 13C15.6642 13 16 12.6642 16 12.25C16 11.8358 15.6642 11.5 15.25 11.5L0.75 11.5Z"
        fill="#DBDBF8"
      />
    </svg>
  );
}
