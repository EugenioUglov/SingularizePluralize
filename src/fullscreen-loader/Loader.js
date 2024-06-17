import './loader.css';

function Loader() {
    return (
        <div id="fullscreenLoader">
            <div id="foregroundOverlay">
                <div className='sk-spinner'>
                    <div className='sk-spinner-pulse'></div>    
                </div>
            </div>
        </div>
    );
}

export default Loader;