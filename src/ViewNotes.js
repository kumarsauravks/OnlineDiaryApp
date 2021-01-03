import React, { useEffect, useState } from 'react'
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export const ViewContext = React.createContext();
function ViewNotes() {
    let [newData, setNewData] = useState([]);
    useEffect(() => {
        let tempData = [];
        if (localStorage.getItem('data')) {
            tempData = JSON.parse(localStorage.getItem('data'));
        }
        else {
            tempData = null;
        }
        setNewData(tempData);
        console.log(newData);
    }, [localStorage.getItem('data')]);

    let [showData, setShowData] = useState([newData]);
    useEffect(() => {
        let tempData = [];
        if (newData) {
            for (let i = 0; i < newData.length; i++) {
                tempData.push(JSON.parse(newData[i]))
            }
            setShowData(tempData);
            console.log(tempData)
        }
        else {
            setShowData(null);
        }

    }, [newData]);

    function deleteHandler(d1) {
        showData.splice(showData.indexOf(d1), 1);

        if (showData && showData.length > 0) {
            let tempDb = [];
            for (let i = 0; i < showData.length; i++) {
                tempDb.push(JSON.stringify(showData[i]))
            }
            localStorage.setItem('data', JSON.stringify(tempDb));
        }
        else {
            localStorage.clear();
        }
        setShowData(newData);
    }
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let dateStr = (year + "-" + month + 1 + "-" + day);
    let [fromDate, setFromDate] = useState(new Date(dateStr));
    let [toDate, setToDate] = useState(new Date());

    function editHandler(d1) {

    }

    function taskDate(dateMilli) {
        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';

        return [d[0], d[1], d[2], d[3]].join(' ');
    }
    function filterHandler() {
        let tempData = [];
        let tempData1 = [];
        for (let i = 0; i < newData.length; i++) {
            tempData.push(JSON.parse(newData[i]));
        }
        tempData.filter((x) => {
            let tempComingDate = new Date(x.date.split("T")[0]).getTime();
            console.log(fromDate.getTime())
            console.log(tempComingDate)
            console.log(toDate.getTime())
            if (tempComingDate >= fromDate.getTime() && tempComingDate <= toDate.getTime()) {
                console.log("inside If")
                tempData1.push(x);
            }
        })
        console.log(tempData);
        console.log(tempData1);
        setShowData(tempData1);
    }

    return (
        <div className='container my-3'>
            <h1 className="viewNoteHead">Your Notes</h1>
            <div className="btn-box">
                <label className="mx-2">From Date <DatePicker showYearDropdown scrollableMonthYearDropdown dateFormat="dd/MM/yyyy" selected={fromDate} onChange={date => { setFromDate(date) }} /></label>
                <label className="mx-2">To Date <DatePicker showYearDropdown scrollableMonthYearDropdown dateFormat="dd/MM/yyyy" selected={toDate} onChange={date => setToDate(date)} /></label>
                <button onClick={() => filterHandler()} className="btn btn-secondary m-1 d-inline-block" >Filter</button>
            </div>
            <div className="row container-fluid" id="notes">
                {
                    showData ?
                        showData.map((d, index) => (
                            <div key={index} className="noteCard my-2 mx-2 card" style={{ "width": "18rem" }}>
                                <div className="card-body">
                                    <span className="noteCardDate">{taskDate(d.date)}</span>
                                    <h5 className="card-title">{d.title}</h5>
                                    <p className="card-text">{d.content}</p>
                                    <button onClick={() => deleteHandler(d)} className="btn btn-primary m-1">Delete Note</button>
                                </div>
                            </div>
                        )
                        ) : <div className="noData">Nothing to show! Please add a Note to populate the list</div>
                }
            </div>
        </div>
    )
}

export default ViewNotes
