import styles from './SubmitButton.module.css';

function SubmitButton({ btnText }) {
  return (
    <div>
      <button className={styles.btn}>{btnText}</button>
    </div>
  );
}

export default SubmitButton;
