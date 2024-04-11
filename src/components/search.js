import './header/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    return (
        <>
            <input type = "text" className = 'search-input' placeholder="Search KMHb"/>
            <button type ="button" className = 'search-btn'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </>
    );
}