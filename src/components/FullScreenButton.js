const FullScreenButton = (props) => {

    function openURL() {
        document.body.requestFullscreen();
    }

    return (
        <div className="FSButton" onClick={openURL}>
            {props.label}
        </div>
    )
}

export default FullScreenButton;