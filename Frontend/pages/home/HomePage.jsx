import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function getData() {
    axios.get("http://localhost:3000/cars/").then((res) => {
      setData(res.data);
    });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/cars/${id}`)
      .then(() => setData([...data].filter((car) => car._id != id)));
  }

  useEffect(() => {
    getData();
  }, [setData]);

  return (
    <>
      <table>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
        {data.map((car) => (
          <tr
            style={{
              backgroundColor: car.isNew ? "green" : "red",
              color: "white",
            }}
            key={car._id}
          >
            <td>{car.brandName}</td>
            <td>{car.modelName}</td>
            <td>{car.year}</td>
            <td>{car.color}</td>
            <td className="d-flex gap-3">
              <Button
                variant="info"
                onClick={() => navigate(`/details/${car._id}`)}
              >
                Details
              </Button>
              <Button variant="danger" onClick={() => handleDelete(car._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
