interface IIsChecked {
  option: string;
  checked: string[];
}

export const isChecked = ({ option, checked }: IIsChecked): boolean => {
  return checked.includes(option);
};

interface ICheckboxClick {
  option: string;
  checked: string[];
  expanded: boolean;
  setChecked: (value: string[]) => void;
}

export const checkboxClick = ({ option, checked, expanded, setChecked }: ICheckboxClick) => {
  if (expanded && isChecked({ option, checked })) {
    setChecked(checked.filter((opt) => opt !== option));
  } else {
    setChecked([...checked, option]);
  }
};

interface ICheckboxClasses {
  invert: number;
  option: string;
  checked: string[];
  s: { readonly [key: string]: string };
}

export const checkboxClasses = ({ invert, option, checked, s }: ICheckboxClasses) => {
  if (!!invert) {
    if (isChecked({ option, checked })) {
      return `${s.checkbox} ${s.checkbox__denial} ${s.checkbox__denial_unchecked}`;
    } else {
      return `${s.checkbox} ${s.checkbox__denial}`;
    }
  } else {
    if (isChecked({ option, checked })) {
      return `${s.checkbox} ${s.checkbox__check} ${s.checkbox__check_checked}`;
    } else {
      return `${s.checkbox} ${s.checkbox__check}`;
    }
  }
};
