import React from 'react'

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand" >Online Diary App <span className="far fa-book"></span></div>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 ml-auto">
                        <input id="searchText" className="form-control mr-sm-2" placeholder="Search"></input>
                        <button id="searchBtn" className="btn btn-outline-success my-2 my-sm-0">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header
