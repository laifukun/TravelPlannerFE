import {useState} from 'react'
import {Input, message} from 'antd';
import '../styles/Search.css';
import SearchResult from './SearchResult';
import {searchByKeyword} from '../Utils/searchUtils';
const {Search} = Input;


const KeywordSearch = ({loadSearchResult}) => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState();
    const [resultVisible, setResultVisible] = useState(false);
   // const [showResult, setShowResult] = useState(false);
    const onSearch = (keyword) => {
        setLoading(true);
        searchByKeyword(keyword).then((data) => {
            setResults(data);  
            setResultVisible(true);
            loadSearchResult(data);
        }).catch((err) => message.error(err.message))
          .finally(() => {
            setLoading(false);
        });
    }

    const onCloseResults = ()=>{
        setResultVisible(false);
    }

    return (
        <div style={{position: 'absolute', height: '100%'}}>
            <div className='search-input'>
             <Search
                placeholder="input keyword"
                loading={loading}
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            </div>
            <SearchResult searchData={results}  visible={resultVisible} onClose={onCloseResults}/>
        </div>
    )
}

export default KeywordSearch
