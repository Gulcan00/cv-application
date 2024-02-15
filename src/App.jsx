import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import CV from './components/CV';
import Education from './components/Education';
import Work from './components/Work';

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
  const [workExperience, setWorkExperience] = useState([]);

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

  const handleAddWorkExperience = (data) => {
    const newWorkExperience = sortByEndDate([...workExperience, data]);
    setWorkExperience(newWorkExperience);
  };

  const handleEditWorkExperience = (data) => {
    let newWorkExperience = workExperience.map((item) => {
      if (item.id === data.id) {
        return { ...data };
      }
      return item;
    });

    newWorkExperience = sortByEndDate(newWorkExperience);

    setWorkExperience(newWorkExperience);
  };

  const handleDeleteWorkExperience = (id) => {
    setWorkExperience(workExperience.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-screen-2xl p-4 md:p-8 mx-auto">
      <div className="flex flex-wrap gap-y-8 md:justify-around">
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
          <Work
            workExperience={workExperience}
            handleAdd={handleAddWorkExperience}
            handleEdit={handleEditWorkExperience}
            handleDelete={handleDeleteWorkExperience}
            isEditing={isEditing === 2}
            toggleIsEditing={(id) => toggleIsEditing(id)}
          />
        </div>
        <CV
          personalInfo={personalInfo}
          education={education}
          workExperience={workExperience}
        />
      </div>
    </div>
  );
}

export default App;
