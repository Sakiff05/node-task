import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function DetailPage() {
  const { id } = useParams("id");
  const [car, setCar] = useState({});
  const navigate = useNavigate();

  function getDetails() {
    axios.get(`http://localhost:3000/cars/${id}`).then((res) => {
      setCar(res.data.cars);
    });
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{car.brandName}</Card.Title>
          <Card.Text>{car.modelName}</Card.Text>
          <Card.Text>{car.year}</Card.Text>
          <Button variant="primary" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
