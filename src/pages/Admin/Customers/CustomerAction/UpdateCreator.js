import React from 'react';

export const UpdateCreator = () => {
  //pushApi
  const updateData = async (id, data) => {
    const url = `https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/creator/update/${id}?status=${data}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  return <div>UpdateCreator</div>;
};
