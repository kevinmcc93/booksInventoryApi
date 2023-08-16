import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Built by Kevin McCarthy</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a  href="https://github.com/kevinmcc93" target="_blank"><img src='/github.svg' alt="githubIcon" className='githubIcon'/>GitHub</a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.linkedin.com/in/kevin-mccarthy-21697711a/" target="_blank"><img src='/linkedin.svg' alt="linkedInIcon" className='linkedInIcon'/>LinkedIn</a>
              </li>
              <li className="list-inline-item">
                <a href="mailto:kevinmcc93@gmail.com"><img src='/email.svg' alt="emailIcon" className='emailIcon'/>Email</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
