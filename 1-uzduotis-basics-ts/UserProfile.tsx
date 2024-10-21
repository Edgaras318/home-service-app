import React from 'react';

type User = {
    name: string;
    age: number;
}

const UserProfile: React.FC<User> = ({ user }) => {
    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
        </div>
    );
};

export default UserProfile;
