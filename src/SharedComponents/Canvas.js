import '../styles/Canvas.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';
import SearchResult from './SearchResult';

function Canvas() {
    return (
        <div className="site-drawer-render-in-current-wrapper">
            <KeywordSearch />
            <SearchResult />
            <Map 
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtVxnLGqwly8qiErGo1wKya8yKYri6GIY&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
            
        </div>
    )
}

export default Canvas
