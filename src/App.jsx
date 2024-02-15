import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import CV from './components/CV';
import Education from './components/Education';

const sortByEndDate = (list) =>
  list.sort((a, b) => {
    if (a.endDate === 'Present') {
      return -1;
    }

    if (b.endDate === 'Present') {
      return 1;
    }

    const yearMonth1 = a.endDate.split('-');
    const yearMonth2 = b.endDate.split('-');

    return yearMonth1[0] - yearMonth2[0] || yearMonth1[1] - yearMonth2[1];
  });

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
    const newEducation = sortByEndDate([...education, data]);
    setEducation(newEducation);
  };

  const handleEditEducation = (data) => {
    let newEducation = education.map((item) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });

    newEducation = sortByEndDate(newEducation);

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
    <div className="max-w-screen-2xl p-8 mx-auto">
      <div className="flex flex-wrap justify-evenly">
        <div className="w-[30%] max-w-md flex flex-col gap-y-8">
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
        <CV personalInfo={personalInfo} education={education} />
      </div>
    </div>
  );
}

export default App;
