const ChessButton = (props) => {
    return (
        <div className="button" onClick={props.onClick }>
            {props.label}
        </div>
    )
}

export default ChessButton;