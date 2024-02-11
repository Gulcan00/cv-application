import { useState } from 'react';
import './styles/App.css';
import PersonalInfo from './components/PersonalInfo';

function App() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div>
        <PersonalInfo personalInfo={personalInfo} isEditing={false} />
      </div>
    </div>
  );
}

export default App;
