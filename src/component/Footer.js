import React from 'react'
import "./footer.css"
 const Footer = () => {
  return (
   <footer id='footer' className='footer'>
    <div className='copyright'>
        &copy:Copyright{' '}
        <strong>
            <span>
              AqarGo
            </span>
        </strong>
        . All Rights Reversed
    </div>
    <div className='credits'>
        Designed by AmrBu company
    </div>
   </footer>
  )
}
export default Footer;