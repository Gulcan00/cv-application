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

  const handleAddEducation = (data) => {
    setEducation([...education, data]);
  };

  const handleEditEducation = (data) => {
    const newEducation = education.map((item) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });

    setEducation(newEducation);
  };

  const handleDeleteEducation = (id) => {
    setEducation(education.filter((item) => item.id !== id));
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
      <div className="flex-1 max-w-[500px] grid grid-cols-1 gap-y-8">
        <PersonalInfo
          personalInfo={personalInfo}
          handleSubmit={handleSubmitPersonalInfo}
          isEditing={isEditing === 0}
          toggleIsEditing={() => toggleIsEditing(0)}
        />
        <Education
          education={education}
          handleAdd={handleAddEducation}
          handleEdit={handleEditEducation}
          handleDelete={handleDeleteEducation}
          isEditing={isEditing === 1}
          toggleIsEditing={(id) => toggleIsEditing(id)}
        />
      </div>
      <CV personalInfo={personalInfo} />
    </div>
  );
}

export default App;
