import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import CV from './components/CV';

function App() {
  const [isEditing, setIsEditing] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
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
    <div className="flex flex-wrap gap-16 p-8">
      <div className="grid grid-cols-1">
        <PersonalInfo
          personalInfo={personalInfo}
          handleSubmit={handleSubmitPersonalInfo}
          isEditing={isEditing === 0}
          toggleIsEditing={() => toggleIsEditing(0)}
        />
      </div>
      <CV personalInfo={personalInfo} />
    </div>
  );
}

export default App;
