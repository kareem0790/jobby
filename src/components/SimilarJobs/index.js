import {AiFillStar} from 'react-icons/ai'
import {BiCurrentLocation} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails, isLoading, refreshThePage} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  const refreshPage = () => {
    refreshThePage()
  }

  const renderSimilarJobSuccessView = () => (
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

  const renderSimilarJobsFailureView = () => (
    <div className="similar-job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="similar-job-failure-img"
      />
      <h1 className="similar-job-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="similar-job-failure">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="similar-job-btn" onClick={refreshPage}>
        Retry
      </button>
    </div>
  )

  const result = isLoading
    ? renderSimilarJobSuccessView()
    : renderSimilarJobsFailureView()
  if (result === true) {
    return renderSimilarJobSuccessView()
  }
  return renderSimilarJobsFailureView()
}

export default SimilarJobs
