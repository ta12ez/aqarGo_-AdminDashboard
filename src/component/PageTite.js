import React from 'react'
import "./pageTitle.css"
 const PageTitle = ({page}) => {
  return (
   <div className="pagetitle">
    <h2> لوحة تحكم الآدمن</h2>
    <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a href='/'>
                    <i className='bi bi-house-door'></i>
                </a>
            </li>
            <li className="breadcrumb-item active">{page}</li>
        </ol>
    </nav>

   </div>
  )
}
export default PageTitle;