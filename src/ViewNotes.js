import React from 'react'
import AddNotes from './AddNotes';
import './App.css';

export const ViewContext= React.createContext();
function ViewNotes() {
    let data = [];
    let WithoutFilteredData=[];
    if (localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
    }
    else {
        data = null
    }
    let dataObj=[];
    if(data){
        for(let i=0;i<data.length;i++){
            dataObj.push(JSON.parse(data[i]));
        }
        WithoutFilteredData=dataObj;
    }
    else{
        dataObj=null
    }
    function deleteHandler(d1){
        dataObj.splice(dataObj.indexOf(d1),1);       
        
        if(dataObj && dataObj.length>0){
            let tempDb=[];
            for(let i=0;i<dataObj.length;i++){
                tempDb.push(JSON.stringify(dataObj[i]))
            }
            localStorage.setItem('data', JSON.stringify(tempDb));
        }
        else{
            localStorage.clear();
        }
        window.location.reload();
    }

    function editHandler(d1){      

    }

    function taskDate(dateMilli) {
        console.log(dateMilli)
        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';
    
        return [d[0], d[1], d[2], d[3]].join(' ');
    }

    function sortResult(prop,asc){
        console.log(prop)
        dataObj=WithoutFilteredData.filter(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0)
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<[prop])?-1:0)
            }
        })
    }

    return (
        <div className='container my-3'>
            <h1 className="viewNoteHead">Your Notes</h1>
            <div className="btn-box">
                <button className="btn btn-secondary m-1" onClick={()=>sortResult(WithoutFilteredData,false)}>Newest <i className="fas fa-sort-amount-up"></i></button>
                <button className="btn btn-secondary m-1" onClick={()=>sortResult(WithoutFilteredData.filter(a=>a.date),true)}>Oldest <i className="fas fa-sort-amount-down"></i></button>
            </div>
            <div className="row container-fluid" id="notes">
                {
                    dataObj ?
                         dataObj.map(( d, index) => (
                             
                            <div key={index} className="noteCard my-2 mx-2 card" style={{ "width": "18rem" }}>
                                <div className="card-body">
                                    <span className="noteCardDate">{taskDate(d.date)}</span>
                                    <h5 className="card-title">{d.title}</h5>
                                    <p className="card-text">{d.content}</p>
                                    <button onClick={()=>deleteHandler(d)} className="btn btn-primary m-1">Delete Note</button>
                                    {/* <button onClick={()=>editHandler(d)} className="btn btn-primary m-1">Edit Note</button> */}
                                </div>
                            </div>
                        )
                    ) : <div>Nothing to show! Please add a Note to populate the list</div>
                }
            </div>
        </div>
    )
}

export default ViewNotes
