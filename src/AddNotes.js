import React, { useState } from 'react'
import ViewNotes from './ViewNotes';

function AddNotes() {
    let [note, setNote] = useState({title: '', content: '', date: new Date() });
    function clickHandler() {
        if(note.title==="" && note.content===""){
            alert("Please add text to your notes");
        }
        else{
            setNote({ ...note, date: new Date() })

            let notes = [];
            if (localStorage.getItem('data')) {
                notes = JSON.parse(localStorage.getItem('data'));
            }
            if(note){
                notes.push(JSON.stringify(note));
            }
            console.log(notes)
            localStorage.setItem('data', JSON.stringify(notes));
            clearText();
        }
    }
    function clearText(){
        let title=document.getElementById('addTitle');
        let body=document.getElementById('addTxt');
        title.value="";
        body.value="";
    }
    return (
        <div className="container my-3">
            <h3>Welcome to Online Diary App</h3>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <h5 className="card-title">Add Title</h5>
                        <input type="text" className="form-control"
                            id="addTitle" placeholder="Enter a Note title"
                            onChange={e => setNote({ ...note, title: e.target.value })} />
                    </div>
                    <h5 className="card-title">Add a Note to Your Diary</h5>
                    <div className="form-group">
                        <textarea placeholder="Enter Note Body"
                            className="form-control" id="addTxt" rows="3"
                            onChange={e => setNote({ ...note, content: e.target.value })}
                        ></textarea>
                    </div>
                    <button id="addBtn" onClick={clickHandler} className="btn btn-primary">Add Note</button>
                </div>
            </div>
            <ViewNotes />
        </div>
        
    )
}

export default AddNotes
