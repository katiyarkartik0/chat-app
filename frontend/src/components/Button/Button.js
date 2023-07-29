import "./Button.css";

const Button = ({ type, text, onClickEvent }) => {
  return (
    <button type={type} className="app-button-component" onClick={onClickEvent}>
      {text}
    </button>
  );
};

export default Button;
