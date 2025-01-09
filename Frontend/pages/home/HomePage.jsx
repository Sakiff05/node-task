import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";

export default function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function getData() {
    axios.get("http://localhost:3000/cars/").then((res) => {
      setData(res.data);
    });
  }

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/cars/${id}`)
          .then(() => setData([...data].filter((car) => car._id != id)));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  useEffect(() => {
    getData();
  }, [setData]);

  return (
    <div className="d-flex align-items-center flex-column gap-5">
      <Button
        variant="danger"
        onClick={() => navigate(`/add`)}
        className="mt-5 w-25 "
      >
        ADD
      </Button>
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
    </div>
  );
}
