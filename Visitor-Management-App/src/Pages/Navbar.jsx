import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600"
        >
          Visitor App
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/AddVisitors"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="text-lg leading-none">+</span>
            Add Visitors
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar