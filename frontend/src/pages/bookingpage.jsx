import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    busId: '',
    seatNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings/create',
        formData,
        { withCredentials: true } 
      );
      alert('Booking successful!');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert('Booking failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Bus ID:</label>
        <input
          type="text"
          name="busId"
          value={formData.busId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Seat Number:</label>
        <input
          type="number"
          name="seatNumber"
          value={formData.seatNumber}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Book Seat</button>
    </form>
  );
};

export default BookingForm;
