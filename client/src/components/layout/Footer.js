import React from 'react';

export default function Footer() {
  return (
    <footer className="page-footer bg-dark mt-4 py-3 text-white">
      <div className="container">
        <i className="far fa-copyright" /> Games Trade{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}
