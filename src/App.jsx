import { useState } from 'react';
import './styles/App.css';
import PersonalInfo from './components/PersonalInfo';

function App() {
  const [isEditing, setIsEditing] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Your name',
    email: 'Email',
    phone: 'Phone',
    location: 'Address',
  });

  const handleSubmitPersonalInfo = (data) => {
    setPersonalInfo({
      ...personalInfo,
      ...data,
    });
  };

  const toggleIsEditing = (id) => {
    if (isEditing === null) {
      setIsEditing(id);
    } else if (isEditing === id) {
      setIsEditing(null);
    }
  };

  return (
    <div className="container">
      <div>
        <PersonalInfo
          personalInfo={personalInfo}
          handleSubmit={handleSubmitPersonalInfo}
          isEditing={isEditing === 0}
          toggleIsEditing={() => toggleIsEditing(0)}
        />
      </div>
    </div>
  );
}

export default App;
