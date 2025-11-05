import React from 'react'
import "./dashboardCard.css"
 const DashboardCard = ({name , icon , amount}) => {
  return (
   <div className="col-xxl-6 col-md-6">
    <div className="card info-card sales-card">
        <div className="card-body">
            <h5 className="card-title">
                {name}
            </h5>

            <div className='d-flex align-items-center'>
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className={icon}></i>
                </div>
                <div className="ps-3">
                    <h6>
                        {amount}
                    </h6>
                   
                </div>
            </div>
        </div>
    </div>

   </div>
  )
}
export default DashboardCard;