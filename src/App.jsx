import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import CV from './components/CV';
import Education from './components/Education';

function App() {
  const [isEditing, setIsEditing] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  });
  const [education, setEducation] = useState([]);

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
      <div className="grid grid-cols-1 gap-y-8">
        <PersonalInfo
          personalInfo={personalInfo}
          handleSubmit={handleSubmitPersonalInfo}
          isEditing={isEditing === 0}
          toggleIsEditing={() => toggleIsEditing(0)}
        />
        <Education
          isEditing={isEditing === 1}
          toggleIsEditing={() => toggleIsEditing(1)}
        />
      </div>
      <CV personalInfo={personalInfo} />
    </div>
  );
}

export default App;
