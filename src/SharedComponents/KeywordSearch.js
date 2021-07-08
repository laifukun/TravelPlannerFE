import {useState} from 'react'
import {Input, message} from 'antd';
import '../styles/Search.css';
import SearchResult from './SearchResult';
import {searchByKeyword} from '../Utils/searchUtils';
import { SearchOutlined } from '@ant-design/icons';
const {Search} = Input;


const KeywordSearch = ({loadSearchResult, loadSelectedPOI}) => {
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
        setResults([]);
        loadSearchResult([]);
    }
    const onPickedPOI = (item)=> {
        loadSelectedPOI(item);
    }

    return (
        <>
            <div className='search-input'>
             <Search
                placeholder="input keyword"
                loading={loading}
                enterButton="Search"
                size="medium"
                onSearch={onSearch}
                icon={<SearchOutlined />}                
            />
            </div>
            <SearchResult 
                searchData={results}  
                visible={resultVisible} 
                onClose={onCloseResults}
                onSelectPOI={onPickedPOI}
            />
        </>
    )
}

export default KeywordSearch
