import styles from "./input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className={styles.container}>
      {label && <label htmlFor="password">{label}</label>}
      <input
        className={styles.container__input}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
