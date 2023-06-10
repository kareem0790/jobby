import {AiFillStar} from 'react-icons/ai'
import {BiCurrentLocation} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-jobs-list-item">
      <div className="similar-jobs-company-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-logo-img"
        />
        <div className="similar-job-title-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <AiFillStar className="similar-job-rating-icon" />
            <p className="similar-job-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description-content">{jobDescription}</p>
      <div className="similar-job-location-employement-icon-container">
        <div className="similar-job-location-icon-container">
          <BiCurrentLocation className="similar-job-location-icon" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-employement-icon-container">
          <BsBriefcaseFill className="similar-job-employement-type-icon" />
          <p className="similar-job-employement-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
