import axios from 'axios';
import { useState, useEffect } from 'react';

const Get = () => {
    const [posts, setPosts] = useState([]);
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    const [tabledark, setTabledark] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setPosts(posts.filter((post) => post._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/${id}`, updatedData);
            const updatedPost = response.data;
            const updatedPosts = posts.map((post) => {
                if (post._id === updatedPost._id) {
                    return updatedPost;
                }
                return post;
            });
            setPosts(updatedPosts);
        } catch (error) {
            console.log(error);
        }
    };

    const filterPosts = () => {
        let filteredPosts = [...posts];

        if (searchStartDate) {
            filteredPosts = filteredPosts.filter((post) => post.startDate.includes(searchStartDate));
        }

        if (searchEndDate) {
            filteredPosts = filteredPosts.filter((post) => post.endDate.includes(searchEndDate));
        }

        return filteredPosts;
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filterPosts().slice(indexOfFirstRecord, indexOfLastRecord);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filterPosts().length / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => (
        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(number)}>
                {number}
            </button>
        </li>
    ));


    return (
        <div className="div">
            <h1 className=' '>List of Tasks</h1>
            <div className="row mb-3">
                <div className="col-6">
                    <div className="input-group">
                        <span className="input-group-text" id="searchStartDate">Search by Start Date:</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="MM/DD/YYYY"
                            aria-label="Search by Start Date"
                            aria-describedby="searchStartDate"
                            value={searchStartDate}
                            onChange={(e) => setSearchStartDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-6">
                    <div className="input-group">
                        <span className="input-group-text" id="searchEndDate">Search by End Date:</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="MM/DD/YYYY"
                            aria-label="Search by End Date"
                            aria-describedby="searchEndDate"
                            value={searchEndDate}
                            onChange={(e) => setSearchEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        onClick={() => {
                            if (tabledark === "table-dark") setTabledark("");
                            else setTabledark("table-dark");
                        }}
                    />
                </div>
                <div className="div border border-3 border-dark">

                    <div>
                        <label htmlFor="recordsPerPage" className="me-2">
                            Records per Page:
                        </label>
                        <select
                            id="recordsPerPage"
                            className="form-select"
                            value={recordsPerPage}
                            onChange={(e) => setRecordsPerPage(parseInt(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                        </select>
                    </div>

                    <table className={`table ${tabledark}`}>
                        <thead>
                            <tr>
                                <th scope="col">slno</th>
                                <th scope="col">Taskname</th>
                                <th scope="col">StartDate</th>
                                <th scope="col">EndDate</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Action</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((eachData) => (
                                <tr key={eachData._id}>
                                    <td>{eachData._id}</td>
                                    <td>{eachData.taskName}</td>
                                    <td>{eachData.startDate}</td>
                                    <td>{eachData.endDate}</td>
                                    <td>{eachData.priority}</td>
                                    <td>
                                        <button className='btn btn-outline-warning' onClick={() => updateTask(eachData._id, { ...eachData, taskName: 'Updated task name' })}>
                                            {' '}
                                            edit
                                        </button>
                                    </td>

                                    <td>
                                        <button className='btn btn-outline-danger' onClick={() => deleteTask(eachData._id)}> delete</button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                    <nav>
                        <ul className="pagination">
                            {renderPageNumbers}
                        </ul>
                    </nav>


                </div>
            </div>

        </div>

    );
}



export default Get;