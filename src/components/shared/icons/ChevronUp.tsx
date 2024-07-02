interface IProps {
  className: string;
}
export default function ChevronUp({ className }: IProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z"
      />
    </svg>
  );
}
