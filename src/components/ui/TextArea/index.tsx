import styles from "./Textarea.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Textarea = (props: Proptypes) => {
  const {
    label,
    name,
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
      <textarea
        className={styles.container__input}
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

export default Textarea;
