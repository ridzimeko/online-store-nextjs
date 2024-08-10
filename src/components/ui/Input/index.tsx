import styles from "./input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;
  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label htmlFor="password" className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        className={styles.container__input}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
