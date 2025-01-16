import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  // Fetch the user details using the userId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit User: {user.firstName} {user.lastName}</h2>
      {/* Render a form here to edit user details */}
    </div>
  );
};

export default EditUser;
