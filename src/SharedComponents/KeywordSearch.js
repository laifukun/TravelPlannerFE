import {useState} from 'react'
import {Input, message} from 'antd';
import '../styles/Search.css';
import SearchResult from './SearchResult';
import {searchByKeyword} from '../Utils/searchUtils';
const {Search} = Input;


const SearchInput = ({onSearch}) => {
    
   
    return (
        <div className='search-input'>
             <Search
                placeholder="input keyword"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
        </div>
    )
}


const KeywordSearch = ({searchKeyword}) => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState();
    const onSearch = (keyword) => {
        setLoading(true);
        searchByKeyword(keyword).then((data) => {
            setResults(data);  
        }).catch((err) => message.error(err.message))
          .finally(() => {
            setLoading(false);
        });
    }


    return (
        <div style={{position: 'absolute', height: '100%'}}>
            <SearchInput onSearch={onSearch}/>
            <SearchResult searchData={results}/>
        </div>
    )
}

export default KeywordSearch
