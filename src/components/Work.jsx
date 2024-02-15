import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import EditButton from './EditButton';

function WorkForm({ onCancel, onSubmit, onDelete, defaultValues }) {
  const [isPresent, setIsPresent] = useState(
    defaultValues?.endDate === 'Present'
  );

  return (
    <>
      <h2>{defaultValues ? 'Edit' : 'Create'} Professional Experience</h2>
      <form
        action="#"
        className="grid grid-cols-1 gap-y-3 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.target);
          const job = Object.fromEntries(data.entries());
          if (!defaultValues) {
            job.id = crypto.randomUUID();
          } else {
            job.id = defaultValues.id;
          }
          job.endDate = job.present ? 'Present' : job.endDate;
          onSubmit(job);
        }}
      >
        <label>
          Job Title
          <input
            name="jobTitle"
            type="text"
            defaultValue={defaultValues?.jobTitle}
            placeholder="Enter job title"
          />
        </label>
        <label>
          Employer
          <input
            name="employer"
            type="text"
            defaultValue={defaultValues?.employer}
            placeholder="Enter employer"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label>
            City
            <input
              name="city"
              type="text"
              defaultValue={defaultValues?.city}
              placeholder="Enter City"
            />
          </label>
          <label>
            Country
            <input
              name="country"
              type="text"
              defaultValue={defaultValues?.country}
              placeholder="Enter Country"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label>
            Start Date
            <input
              type="month"
              name="startDate"
              id="startDate"
              defaultValue={defaultValues?.startDate}
            />
          </label>
          {!isPresent && (
            <label>
              End Date
              <input
                type="month"
                name="endDate"
                id="endDate"
                defaultValue={defaultValues?.endDate}
              />
            </label>
          )}
          <div className={`col-start-2 ${isPresent ? 'row-start-1' : ''}`}>
            {isPresent && 'End Date'}
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="present"
                id="present"
                value={isPresent}
                onChange={(e) => setIsPresent(e.target.checked)}
                defaultChecked={defaultValues?.endDate === 'Present'}
                className="h-4 w-4"
              />
              Present (Current)
            </label>
          </div>
        </div>
        <label>
          Description
          <textarea
            name="description"
            id="description"
            rows="10"
            placeholder="Describe your role & acheivements"
            defaultValue={defaultValues?.description}
          ></textarea>
        </label>
        <div className="flex justify-between mt-4 items-center">
          <button
            type="button"
            className="secondary"
            onClick={() => onDelete(defaultValues?.id)}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="mr-2"
              aria-hidden="true"
            />
            Delete
          </button>
          <div className="flex justify-end gap-4">
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button>Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default function Work({
  workExperience,
  handleAdd,
  handleEdit,
  handleDelete,
  isEditing,
  toggleIsEditing,
}) {
  const [editingId, setEditingId] = useState(null);
  const [isNewJob, setIsNewJob] = useState(false);

  const showForm = isNewJob || !!editingId;

  return (
    <section className="card">
      {isEditing ? (
        <></>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faBriefcase}
              fontSize={'1.25rem'}
              aria-hidden="true"
            />{' '}
            <h2>Professional Experience</h2>
          </div>
          {showForm ? (
            <WorkForm
              key={editingId || 0}
              defaultValues={workExperience.find(
                (item) => item.id === editingId
              )}
              onCancel={() => {
                if (isNewJob) {
                  setIsNewJob(false);
                } else {
                  setEditingId(null);
                }
              }}
              onSubmit={(data) => {
                if (isNewJob) {
                  handleAdd(data);
                  setIsNewJob(false);
                } else {
                  handleEdit(data);
                  setEditingId(null);
                }
              }}
              onDelete={(id) => {
                handleDelete(id);
                setEditingId(null);
              }}
            />
          ) : (
            <>
              {workExperience.map((job) => (
                <div key={job.id} className="grid grid-cols-1">
                  <div className="flex">
                    <div className="flex-1 text-sm flex flex-col">
                      <div>
                        <span className="font-bold">{job.jobTitle}</span>,{' '}
                        <span className="italic font-light">
                          {job.employer}
                        </span>
                      </div>
                      <p className="m-0 text-xs">
                        {`${job.startDate.replace(
                          '-',
                          '/'
                        )} - ${job.endDate.replace('-', '/')}`}
                        <span className="mx-2.5">|</span>
                        {`${job.city}, ${job.country}`}
                      </p>
                    </div>
                    <EditButton
                      onClick={() => {
                        setEditingId(job.id);
                        toggleIsEditing(job.id);
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="secondary border-2 border-gray-300 dark:border-cyan-800 max-w-max self-center"
                onClick={() => setIsNewJob(true)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2"
                  aria-label="Add"
                />{' '}
                Professional Experience
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}
