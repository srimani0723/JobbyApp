import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg">
      <div className="home-container">
        <h1 className="home-h1">Find The Job That Fits Your Life</h1>
        <p className="home-p">
          Millons of people are searching for jobs, salary information, company
          reviews. find the job that fits your abilities and potential
        </p>
        <button className="find-jobs-btn" type="button">
          Find Jobs
        </button>
      </div>
    </div>
  </>
)

export default Home
