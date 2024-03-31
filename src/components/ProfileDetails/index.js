import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class ProfileDetails extends Component {
  state = {
    profileData: {},
    apiStatus: status.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: status.inProcess,
    })

    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const pd = data.profile_details
      const formattedData = {
        name: pd.name,
        profileImageUrl: pd.profile_image_url,
        shortBio: pd.short_bio,
      }
      this.setState({
        profileData: formattedData,
        apiStatus: status.success,
      })
    } else {
      this.setState({
        apiStatus: status.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container failure-btn-box" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  displayProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div>
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-desc">{shortBio}</p>
      </div>
    )
  }

  displayProfileFailure = () => (
    <div className="failure-btn-box">
      <button
        type="button"
        className="failure-btn"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  displayData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.inProcess:
        return this.renderLoader()
      case status.success:
        return this.displayProfile()
      case status.failure:
        return this.displayProfileFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-bg">{this.displayData()}</div>
  }
}

export default ProfileDetails
