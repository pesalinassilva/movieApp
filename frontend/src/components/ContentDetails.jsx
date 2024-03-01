import axios from "axios"
import { ENDPOINT, URLPOSTER } from "../config/constants"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Badge from 'react-bootstrap/Badge'

const ContentDetail = ({ show, handleClose, content}) => {
    const [contentDetails, setContentDetails] = useState(null)
    const [crewDetails, setCrewDetails] = useState(null)
    
    const payload = !content.media_type || content.media_type === 'movie' ? {
        media_type:'movie', content_id: content.id ? content.id : content.content_id } : {
        media_type:'tv', content_id: content.id ? content.id : content.content_id
        }

    const getDetails = async () => {
        try {
            const response = await axios.post(ENDPOINT.details, payload);
            setContentDetails(response.data[0])
            setCrewDetails(response.data[1])
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (show) {
            getDetails();
        }
    }, [show]);

    return(
        <>
            <Modal show={show} onHide={handleClose} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{contentDetails?.title ? contentDetails?.title : contentDetails?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${URLPOSTER}${contentDetails?.poster_path}`} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <small className="card-text">{`${contentDetails?.overview}`} <br/></small>
                                <br/>{contentDetails?.genres.map((genre) => (<Badge key={genre.id} bg="secondary">{genre.name}</Badge>))}
                                <small><br/>{`Calificaciones: ${Math.round(contentDetails?.vote_average*10)/10}/10`}</small>
                                <p className="card-text"><small className="text-body-secondary">{`Fecha de lanzamiento: ${contentDetails?.release_date ? contentDetails?.release_date : contentDetails?.first_air_date}`}</small></p>
                                <p><br/>Reparto</p>
                                {crewDetails?.cast.map((actor, index) => (<small key={index}>{actor.name}, </small>))}
                                <p><br/>Produccion</p>
                                {crewDetails?.crew.map((member, index) => (<small key={index}>{member.name},</small>))}
                            </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ContentDetail