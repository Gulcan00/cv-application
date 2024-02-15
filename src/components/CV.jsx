import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/cv.css';

export default function CV({ personalInfo, education, workExperience }) {
  return (
    <div className="w-[65%] w-[210mm] h-[297mm] bg-white dark:bg-gray-800 py-6 font-serif">
      <div className="w-[80%] m-auto grid grid-cols-1 gap-y-2">
        <h1 className="sr-only">CV</h1>
        <h1 className="text-center text-2xl font-900 text-gray-900 dark:text-white">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center gap-6">
          {personalInfo.email && (
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              <p>{personalInfo.email}</p>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faPhone} className="text-sm" />
              <p>{personalInfo.phone}</p>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
              <p>{personalInfo.location}</p>
            </span>
          )}
        </div>
        {education.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-2">
            <h2 className="section-title">Education</h2>
            {education.map((item) => (
              <div className="grid grid-cols-2 text-sm" key={item.id}>
                <p className="font-semibold">{item.degree}</p>
                <p className="justify-self-end font-light text-gray-700 dark:text-slate-300">{`${item.startDate.replace(
                  '-',
                  '/'
                )} - ${item.endDate.replace('-', '/')}`}</p>
                <p className="font-light italic text-gray-700 dark:text-slate-300">
                  {item.school}
                </p>
                <p className="justify-self-end font-light text-gray-700 dark:text-slate-300">{`${item.city}, ${item.country}`}</p>
              </div>
            ))}
          </div>
        )}
        {workExperience.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-2">
            <h2 className="section-title">Professional Experience</h2>
            {workExperience.map((item) => (
              <div className="grid grid-cols-2 text-sm" key={item.id}>
                <p className="font-semibold">{item.jobTitle}</p>
                <p className="justify-self-end font-light text-gray-700 dark:text-slate-300">{`${item.startDate.replace(
                  '-',
                  '/'
                )} - ${item.endDate.replace('-', '/')}`}</p>
                <p className="font-light italic text-gray-700 dark:text-slate-300">
                  {item.employer}
                </p>
                <p className="justify-self-end font-light text-gray-700 dark:text-slate-300">{`${item.city}, ${item.country}`}</p>
                <ul className="list-disc pl-4">
                  {item.description.split('\n').map((listItem, index) => (
                    <li key={index}>{listItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
