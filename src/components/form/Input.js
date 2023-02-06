import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return(
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <input
            type={props.type}
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            className={props.className}
            onChange={props.onChange}
            value={props.value}
            ref={ref}
            autoComplete={props.autoComplete}
            />
            <div className={props.errorDiv}>{props.errorMsg}</div>
        </div>
    )
})

export default Input;