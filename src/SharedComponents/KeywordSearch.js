import {Input, Button} from 'antd';
import '../styles/Search.css';
const Search = Input.Search;

const KeywordSearch = () => {
    return (
        <div className="search-input">
            <Search
                placeholder="input search text"
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
            />
            <Button type="primary" icon="search">Search</Button>
        </div>
    )
}

export default KeywordSearch
