import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import './index.css'
import JobCard from '../JobCard'
import JobsFilterGroup from '../JobsFilterGroup'

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

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class JobsProfileSection extends Component {
  state = {
    jobsList: [],
    apiStatus: status.initial,
    employmentType: [],
    minimumPackage: 0,
    search: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: status.inProcess,
    })

    const {employmentType, search, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: formattedData,
        apiStatus: status.success,
      })
    } else {
      this.setState({
        apiStatus: status.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <div className="input-box">
        <input
          type="search"
          className="search-ip"
          placeholder="search"
          onChange={this.getInput}
          onKeyDown={this.onKeyDown}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-btn"
          onClick={this.getJobsList}
        >
          .<BsSearch className="search-icon" />
        </button>
      </div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getInput = event =>
    this.setState({
      search: event.target.value,
    })

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  displayJobs = () => {
    const {jobsList} = this.state
    const jobsListLength = jobsList.length > 0

    return jobsListLength ? (
      <div className="jobs-container">
        <div className="input-box">
          <input
            type="search"
            className="search-ip"
            placeholder="search"
            onChange={this.getInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-btn"
            onClick={this.getJobsList}
          >
            .<BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-list-container">
          {jobsList.map(each => (
            <JobCard job={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="jobs-container">
        <div className="input-box">
          <input
            type="search"
            className="search-ip"
            placeholder="search"
            onChange={this.getInput}
            onKeyDown={this.onKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-btn"
            onClick={this.getJobsList}
          >
            .<BsSearch className="search-icon" />
          </button>
        </div>
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 className="no-jobs-h1">No Jobs Found</h1>
          <p className="no-jobs-desc">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </div>
    )
  }

  displayfailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-button"
        onClick={this.getJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderJobsDisplay = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case status.inProcess:
        return this.renderLoader()
      case status.success:
        return this.displayJobs()
      case status.failure:
        return this.displayfailure()
      default:
        return null
    }
  }

  changeSalaryRange = salary => {
    this.setState({minimumPackage: salary}, this.getJobsList)
  }

  changeEmploymentType = type => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, type]}),
      this.getJobsList,
    )
  }

  render() {
    return (
      <div className="jobs-container-all">
        <div className="jobs-filters-section">
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
          />
        </div>
        <div className="jobs-section">{this.renderJobsDisplay()}</div>
      </div>
    )
  }
}

export default JobsProfileSection
