import {Component} from 'react'
import Header from '../Header'
import JobsProfileSection from '../JobsProfileSection'
import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg">
          <JobsProfileSection />
        </div>
      </>
    )
  }
}

export default Jobs
