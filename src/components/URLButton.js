const URLButton = (props) => {

    function openURL() {
        window.open(props.url, "_blank");
    }

    return (
        <div className={props.className} onClick={openURL}>
            {props.label}
        </div>
    )
}

export default URLButton;