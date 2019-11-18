import React from "react";

const SortOptions = ({ handleSort, sortValue }) => {

    const handleChange = event => {
        handleSort(event.target.value)
    }

    return (
        <div>
            <select value={sortValue} onChange={handleChange}>
                <option value="sort options">select sort</option>
                <option value="creation date">creation date</option>
                <option value="alphabeticaly">alphabeticaly</option>
            </select>
        </div>
    )
}

export default SortOptions