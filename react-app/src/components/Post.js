import React from 'react'

export default function Post() {
  return (
    <div className="col-md-4">
        <div className="card text-start">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <img src="https://dummyimage.com/400x400/eee/333" className="card-img-bottom" alt="..." />
            <div className="d-flex justify-content-between p-3">
                <button className="btn btn-light bi bi-hand-thumbs-up"></button>
                <button className="btn btn-light bi bi-chat-right"></button>
                <button className="btn btn-light bi bi-share"></button>
            </div>
        </div>
    </div>
  )
}
