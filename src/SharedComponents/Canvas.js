import '../styles/Canvas.css';
import KeywordSearch from './KeywordSearch';
import Map from './Map';
import SearchResult from './SearchResult';

function Canvas() {
    return (
        <div className="site-drawer-render-in-current-wrapper">
            <KeywordSearch />
            <SearchResult />
            <Map />
            
        </div>
    )
}

export default Canvas

