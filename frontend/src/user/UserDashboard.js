import React,{useEffect, useState} from 'react';
import Base from '../core/Base';
import { showhistory } from './helper/userapicalls';

const UserDashboard = () => {

    const [historyTable, setHistoryTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [managePages, setManagePages] = useState({
        next: null,
        previous: null
    })

    useEffect(() => {
        setLoading(true)
        showhistory()
            .then(resp => {
                const {results,next,previous} = resp.data;
                console.log({results,next,previous});
                setHistoryTable(results || []);
                setManagePages({...managePages, next: next, previous: previous});
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    },[]);


    const showNextPrev = (link) => {
        setLoading(true)
        showhistory(link)
            .then(resp => {
                const {results,next,previous} = resp.data;
                console.log({results,next,previous});
                setHistoryTable(results || []);
                setManagePages({...managePages, next: next, previous: previous});
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }


    return (
        <Base
            title="User Dashboard"
            description="your dashboard"
        >
            <table 
            className="table table-light table-striped text-center table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Purchase Date</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Transaction ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? (
                            <tr>
                                <td style={{height: '500px'}} colspan="5"><h3 className="text-center display-4">Loading...</h3></td>
                            </tr>
                        ) 
                        : 
                        (
                            
                                historyTable.length > 0 && historyTable.map((row,index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{row.product_name}</td>
                                        <td>{row.date}</td>
                                        <td>${row.price}</td>
                                        <td>{row.transaction_id}</td>
                                    </tr>
                                ))
                            
                        )
                        
                    }
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${managePages.previous? '' : 'disabled' }`}>
                        <button 
                        onClick={() => {showNextPrev(managePages.previous)}}
                        className="page-link">&lt;&lt;&lt;</button>
                    </li>
                    <li className={`page-item ${managePages.next? '' : 'disabled' }`}>
                        <button 
                        onClick={() => {showNextPrev(managePages.next)}}
                        className="page-link">&gt;&gt;&gt;</button>
                    </li>
                </ul>
            </nav>
            
        </Base>
    );
};

export default UserDashboard;