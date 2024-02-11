import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CV({ personalInfo }) {
  return (
    <div className="flex-1 flex flex-col gap-2 bg-white dark:bg-gray-800 py-6 font-serif">
      <h1 className="sr-only">CV</h1>
      <p className="text-center text-2xl">{personalInfo.fullName}</p>
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
    </div>
  );
}
