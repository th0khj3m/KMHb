import '../header/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    return (
        <>
            <input type = "text" class = 'search-input' placeholder="Searh KMHb"/>
            <button type ="button" class = 'search-btn'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </>
    );
}