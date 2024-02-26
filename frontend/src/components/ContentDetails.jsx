import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ENDPOINT, URLPOSTER } from "../config/constants"
import { useEffect, useState } from "react";

const ContentDetail = ({ show, handleClose, content}) => {
    const [contentDetails, setContentDetails] = useState(null)
    const [crewDetails, setCrewDetails] = useState(null)

    const payload = !content.media_type || content.media_type === 'movie' ? {
        media_type:'movie', content_id: content.id } : {
        media_type:'tv', content_id: content.id
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
            <Modal show={show} onHide={handleClose} style={{width: '90vw'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{contentDetails?.title ? contentDetails?.title : contentDetails?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxWidth: '100%' }}>
                    <div className="card mb-3" style={{maxWidth: '540px'}}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={`${URLPOSTER}${contentDetails?.poster_path}`} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <small className="card-text">{`${contentDetails?.overview}`} <br/></small>
                                {contentDetails?.genres.map((genre) => (<small key={genre.id}>{genre.name}<br/></small>))}
                                <small>{`Calificaciones: ${contentDetails?.vote_average}/10`}</small>
                                <p className="card-text"><small className="text-body-secondary">{`Fecha de lanzamiento: ${contentDetails?.release_date ? contentDetails?.release_date : contentDetails?.first_air_date}`}</small></p>
                                <p>Reparto</p>
                                <ul>
                                    {crewDetails?.cast.map((actor) => (<li key={actor.id}>{actor.name}</li>))}
                                </ul>
                                <p>Produccion</p>
                                <ul>
                                    {crewDetails?.crew.map((member) => (<li key={member.id}>{member.name}</li>))}
                                </ul>
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