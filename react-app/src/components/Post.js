import React from 'react'

export default function Post(props) {
  return (
    <div className="col-md-4">
        <div className="card text-start">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.time}</p>
            </div>
            <img src={props.img} className="card-img-bottom" alt="..." />
            <div className="d-flex justify-content-between p-3">
                <button className="btn btn-light bi bi-hand-thumbs-up"></button>
                <button className="btn btn-light bi bi-chat-right"></button>
                <button className="btn btn-light bi bi-share"></button>
            </div>
        </div>
    </div>
  )
}
