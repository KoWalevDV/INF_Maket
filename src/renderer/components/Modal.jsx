// src/renderer/components/Modal.jsx
import React from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-auto mx-4 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
