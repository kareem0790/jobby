import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {BiCurrentLocation} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdOpenInNew} from 'react-icons/md'

import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const initialConstant = {
  isProcess: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItem: {},
    similarJobsList: [],
    skills: [],
    lifeAtCompany: {},
    isLoading: initialConstant.isProcess,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobItemApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobItemResponse = await fetch(jobItemApiUrl, options)

    if (jobItemResponse.ok === true) {
      const jobItemData = await jobItemResponse.json()

      const updatedJobDetails = {
        companyLogoUrl: jobItemData.job_details.company_logo_url,
        companyWebsiteUrl: jobItemData.job_details.company_website_url,
        employmentType: jobItemData.job_details.employment_type,
        id: jobItemData.job_details.id,
        jobDescription: jobItemData.job_details.job_description,
        location: jobItemData.job_details.location,
        packagePerAnnum: jobItemData.job_details.package_per_annum,
        rating: jobItemData.job_details.rating,
        title: jobItemData.job_details.title,
      }
      const skill = jobItemData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const lifeAtCompany = {
        imageUrl: jobItemData.job_details.life_at_company.image_url,
        description: jobItemData.job_details.life_at_company.description,
      }

      const updatedSimilarJobsList = jobItemData.similar_jobs.map(eachjob => ({
        companyLogoUrl: eachjob.company_logo_url,
        employmentType: eachjob.employment_type,
        id: eachjob.id,
        jobDescription: eachjob.job_description,
        location: eachjob.location,
        rating: eachjob.rating,
        title: eachjob.title,
      }))
      this.setState({
        jobItem: updatedJobDetails,
        similarJobsList: updatedSimilarJobsList,
        skills: skill,
        lifeAtCompany,
        isLoading: initialConstant.success,
      })
    } else if (jobItemResponse.status === 400) {
      this.setState({isLoading: initialConstant.failure})
    }
  }

  renderJobItemDetails = () => {
    const {
      jobItem,
      lifeAtCompany,
      skills,
      similarJobsList,
      isLoading,
    } = this.state
    const {
      location,
      companyLogoUrl,
      title,
      rating,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobItem
    const {imageUrl, description} = lifeAtCompany
    return (
      <div className="job-details-bg-container">
        <div className="job-details-container">
          <div className="company-job-details-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-job-details-logo-img"
            />
            <div className="job-details-title-container">
              <p className="job-details-title">{title}</p>
              <div className="job-details-rating-container">
                <AiFillStar className="job-details-rating-icon" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-location-container">
            <div className="job-details-location-employement-icon-container">
              <div className="job-details-location-icon-container">
                <BiCurrentLocation className="job-details-location-icon" />
                <p className="job-details-location">{location}</p>
              </div>
              <div className="job-details-employement-icon-container">
                <BsBriefcaseFill className="job-details-employement-type-icon" />
                <p className="job-details-employement-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="job-details-description-container">
            <h1 className="job-details-description-heading">Description</h1>
            <div className="anchor-container">
              <a href={companyWebsiteUrl} className="website-url">
                Visit
              </a>
              <MdOpenInNew className="anchor-icon" />
            </div>
          </div>
          <p className="job-details-description-content">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>
          <div>
            <ul className="skills-container">
              {skills.map(each => (
                <SkillCard key={each.name} skillDetails={each} />
              ))}
            </ul>
            <div className="life-at-company-container">
              <div>
                <h1 className="life-at-company-heading">Life at Company</h1>
                <p className="life-at-company-description">{description}</p>
              </div>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-img"
              />
            </div>
          </div>
        </div>
        <div className="similar-job-container">
          <h1 className="similiar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-list-container">
            {similarJobsList.map(each => (
              <SimilarJobs
                key={each.id}
                similarJobDetails={each}
                isLoading={isLoading}
                refreshThePage={this.refreshThePage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  refreshThePage = () => {
    this.getJobItemDetails()
  }

  getFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-details-failure-img"
      />
      <h1 className="job-item-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-btn"
        onClick={this.refreshThePage}
      >
        Retry
      </button>
    </div>
  )

  getResult = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case initialConstant.success:
        return this.renderJobItemDetails()
      case initialConstant.isProcess:
        return this.loader()
      case initialConstant.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  loader = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        {this.getResult()}
      </>
    )
  }
}

export default JobItemDetails
