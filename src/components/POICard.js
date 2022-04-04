import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'

export default function POICard(props) {
  return (
    <Card style={{ width: '18rem', marginTop: '50px' }}>
      <Card.Img variant="top" src={props.poiFields[4]} />
      <Card.Body>
        <Card.Title>{props.poiFields[0]}</Card.Title>
        <Card.Text>
          {props.poiFields[1]}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{props.poiFields[2]}</ListGroupItem>
        <ListGroupItem>{props.poiFields[3]}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Text className="distance-box">
            A localização escolhida está a
            <span className="second"> {props.distancia} </span>
            de distancia
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
