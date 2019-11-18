import React from "react";

const SortOptions = ({ handleSort, sortValue }) => {

    const handleChange = event => {
        handleSort(event.target.value)
    }

    return (
        <div>
            <label>
                sort options
                <select value={sortValue} onChange={handleChange}>
                <option value="sort options">sort options</option>
                    <option value="creation date">creation date</option>
                    <option value="alphabeticaly">alphabeticaly</option>
                </select>
            </label>
        </div>
    )
}

export default SortOptions