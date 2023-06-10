import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {BiCurrentLocation} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="list-item-link">
      <li className="job-list-item-container">
        <div className="company-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-img"
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-employement-icon-container">
            <div className="location-icon-container">
              <BiCurrentLocation className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="employement-icon-container">
              <BsBriefcaseFill className="employement-type-icon" />
              <p className="employement-type">{employementType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description-content">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
