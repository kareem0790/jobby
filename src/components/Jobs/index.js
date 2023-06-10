import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const initialConstants = {
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileList: {},
    jobsList: [],
    searchInput: '',
    employementType: [],
    salaryRange: [],
    isLoading: initialConstants.inProgress,
    profileLoding: initialConstants.inProgress,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getPostDetails()
  }

  getPostDetails = async () => {
    const {employementType, salaryRange, searchInput} = this.state
    const updateEmploye = employementType.join(',')
    const updateSalaryRange = salaryRange.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${updateEmploye}&minimum_package=${updateSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const jobResponse = await fetch(jobApiUrl, options)
    if (jobResponse.ok === true) {
      const jobData = await jobResponse.json()
      const updatedJobsData = jobData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employementType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        isLoading: initialConstants.success,
      })
    } else {
      this.setState({isLoading: initialConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(profileApiUrl, options)
    const profileData = await response.json()

    if (response.ok === true) {
      const updatedProfileDetails = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }
      this.setState({
        profileList: updatedProfileDetails,
        profileLoding: initialConstants.success,
      })
    } else {
      this.setState({profileLoding: initialConstants.failure})
    }
  }

  onChangeSalary = event => {
    const {salaryRange} = this.state
    if (salaryRange === '') {
      return this.setState(
        {salaryRange: event.target.value},
        this.getPostDetails,
      )
    }
    return this.setState(
      prevState => ({
        salaryRange: [...prevState.salaryRange, event.target.value],
      }),
      this.getPostDetails,
    )
  }

  onEnterKey = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter' && searchInput !== '') {
      this.getPostDetails()
    }
  }

  onChangeEmployment = event => {
    const {employementType} = this.state
    const {value} = event.target
    if (employementType === '') {
      return this.setState(
        {employementType: event.target.value},
        this.getPostDetails,
      )
    }

    return this.setState(
      prevState => ({employementType: [...prevState.employementType, value]}),
      this.getPostDetails,
    )
  }

  onSearchIcon = () => {
    this.getPostDetails()
  }

  jobsView = () => {
    const {searchInput, jobsList} = this.state
    return (
      <div className="job-profile-container">
        <div className="search-lg-container">
          <input
            type="search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            placeholder="Search"
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            className="button"
            data-testid="searchButton"
            onClick={this.onSearchIcon}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list-container">
          {jobsList.map(each => (
            <JobItem key={each.id} jobDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobs = () => {
    const {jobsList} = this.state

    if (jobsList.length !== 0) {
      return this.jobsView()
    }
    return this.noJobsView()
  }

  loader = () => (
    <div className="loader-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  noJobsView = () => (
    <div className="nojobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-content">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  jobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-failure-btn"
        onClick={this.refreshThePage}
      >
        Retry
      </button>
    </div>
  )

  refreshThePage = () => {
    this.getPostDetails()
  }

  getResults = () => {
    const {isLoading} = this.state

    switch (isLoading) {
      case initialConstants.success:
        return this.renderJobs()
      case initialConstants.failure:
        return this.jobsFailureView()
      case initialConstants.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  renderProfile = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-content">{shortBio}</p>
      </div>
    )
  }

  refreshProfile = () => {
    this.getProfileDetails()
  }

  profileFailureView = () => (
    <div className="profile-failure-container">
      <button
        className="profile-btn"
        type="button"
        onClick={this.refreshProfile}
      >
        Retry
      </button>
    </div>
  )

  getProfileResults = () => {
    const {profileLoding} = this.state

    switch (profileLoding) {
      case initialConstants.inProgress:
        return this.loader()
      case initialConstants.success:
        return this.renderProfile()
      case initialConstants.failure:
        return this.profileFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onKeyDown={this.onEnterKey}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.getProfileResults()}
            <hr />
            <div className="types-of-employment-container">
              <h1 className="employment-heading">Type Of Employment</h1>
              <ul className="employment-type-list-container">
                {employmentTypesList.map(eachType => (
                  <li
                    className="employement-list-item"
                    key={eachType.employmentTypeId}
                  >
                    <input
                      type="checkbox"
                      id={eachType.employmentTypeId}
                      onChange={this.onChangeEmployment}
                      className="checkbox-input"
                      value={eachType.employmentTypeId}
                    />
                    <label
                      htmlFor={eachType.employmentTypeId}
                      className="label-input"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="salary-range-container">
              <h1 className="salary-range-heading">Salary Range</h1>
              <ul className="salary-range-list-container">
                {salaryRangesList.map(eachSalary => (
                  <li
                    className="salary-range-list-item"
                    key={eachSalary.salaryRangeId}
                  >
                    <input
                      onChange={this.onChangeSalary}
                      type="radio"
                      name="salary"
                      value={eachSalary.salaryRangeId}
                      id={eachSalary.salaryRangeId}
                      className="salary-range-input"
                    />
                    <label
                      htmlFor={eachSalary.salaryRangeId}
                      className="salary-label-input"
                    >
                      {eachSalary.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {this.getResults()}
        </div>
      </>
    )
  }
}

export default Jobs
