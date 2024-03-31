import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <>
      <Link to={`./jobs/${id}`} className="job-nav-link">
        <li className="job-card">
          <div className="top-section">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companylogo"
            />

            <div>
              <h1 className="companyname">{title}</h1>
              <div className="rating-box">
                <FaStar className="filled-star" />
                <p className="rating-txt">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-salary-box">
            <div className="loc-employ-box">
              <div className="align-box">
                <MdLocationOn className="icon" />
                <p className="loc-employ-txt">{location}</p>
              </div>

              <div className="align-box">
                <BsFillBriefcaseFill className="icon" />
                <p className="loc-employ-txt">{employmentType}</p>
              </div>
            </div>

            <p className="rating-txt package">{packagePerAnnum}</p>
          </div>

          <hr className="hr" />

          <div>
            <h1 className="des-h1">Description</h1>

            <p className="des-p">{jobDescription}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default JobCard
