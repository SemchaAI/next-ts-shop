export interface IBtn {
  version?: TBtn;
  icon?: boolean;
  type?: 'submit' | 'button';
  disabled?: boolean;
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export type TBtn = 'text' | 'outline' | 'contain';
