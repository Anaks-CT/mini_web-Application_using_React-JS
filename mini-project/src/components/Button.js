import className from 'classnames';

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  disable,
  onClick,
  ...rest
}) {
  const classes = className(
    rest.className,
    'd-flex items-center px-3 py-2 border',
    {
      'bg-primary text-white': primary,
      'bg-secondary text-white': secondary || disable,
      'bg-success text-white': success,
      'bg-warning text-white': warning,
      'bg-danger text-white': danger,
      'rounded': rounded,
      'bg-white': outline,
      'text-primary': outline && primary,
      'text-secondary': outline && secondary,
      'text-success': outline && success,
      'text-warning': outline && warning,
      'text-danger': outline && danger,
    }
  );

  return (
    <button {...rest} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};

export default Button;
