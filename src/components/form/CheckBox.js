const CheckBox = (props) => {
    return (
        <div className="form-check">
            <input
                id={props.name}
                name={props.name}
                type="checkbox"
                className="form-check-input"
                checked={props.checked}
                onChange={props.onChange}
                value={props.value}
            />
            <label className="form-check-label" htmlFor={props.name}>{props.title}</label>
        </div>
    )
}

export default CheckBox