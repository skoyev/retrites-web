import React from "react";
import { withLocalize } from "react-localize-redux";
import './style/LanguageToggle.css'

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
  <ul className="navbar navbar-light bg-light inline-buttons">
    {languages.map(lang => (
      <li key={lang.code}>
        <a href="#" className="btn btn-outline-primary" onClick={() => setActiveLanguage(lang.code)}>
          {lang.name}
        </a>
      </li>
    ))}
  </ul>
);

export default withLocalize(LanguageToggle);