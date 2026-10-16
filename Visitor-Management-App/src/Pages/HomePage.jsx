import React, { useState, useEffect } from 'react'
import { Link } from 'react-router';

function HomePage() {

  const [visitors, setVisitors] = useState([])

  useEffect(() => {

    const getAllVisitors = async () => {
      try {

        const res = await fetch("http://127.0.0.1:5000/allvisitors");
        const data = await res.json();
        console.log(data)

        setVisitors(data.visitor || [])
      } catch (err) {
        console.log(err)
      }
    }

    getAllVisitors()

  }, [])


  const VisitorDeleted = async (id) => {

    try {
      const res = await fetch(`http://127.0.0.1:5000/visitors/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json"
        },
      

      });

      const data = await res.json();
      console.log(data);
      setVisitors((prev)=>prev.filter((visitor)=>visitor._id !== id))
      alert("Visitor Deleted Successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl">

          {/* <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-medium text-slate-500 text-center">
            Total Visitors
          </p>
          <h2 className="mt-2 text-3xl font-bold text-indigo-600 text-center">
            {visitors.length}
          </h2>
        </div> */}





          {visitors.length === 0 && (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-slate-700">
                No visitors found
              </h2>
              <p className="mt-2 text-slate-500">
                Visitor data will appear here.
              </p>
            </div>
          )}


          {visitors.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visitors.map((visitor, index) => (
                <div
                  key={visitor._id || visitor.id || index}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm "
                >

                  <div className=" bg-violet-600 p-5">
                    <div className="flex items-center gap-4">

                      <div className="min-w-0">
                        <h2 className="truncate text-xl font-bold text-white mb-2">
                          {visitor.name || "N/A"}
                        </h2>
                        <p className="text-5 text-indigo-100">
                          Visitor Id: <span className='px-2 py-1 rounded bg-amber-50 text-black'>{visitor._id}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Mobile Number
                      </p>
                      <p className="mt-1 font-medium text-slate-700">
                        {visitor.mobileNo ?? "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Address
                      </p>
                      <p className="mt-1 font-medium text-slate-700">
                        {visitor.address || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Gender
                      </p>
                      <p className="mt-1 font-medium capitalize text-slate-700">
                        {visitor.gender || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Purpose
                      </p>
                      <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                        {visitor.purpose || "N/A"}
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Created At
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {visitor.created_at
                          ? new Date(visitor.created_at).toLocaleString()
                          : visitor.date_and_time
                            ? new Date(visitor.date_and_time).toLocaleString()
                            : "N/A"}
                      </p>
                    </div>

                    <div className='flex justify-evenly'>
                      <Link className='border px-5 py-0.5 rounded bg-indigo-800 text-white cursor-pointer'
                        to={`/AddVisitors?id=${visitor._id}&name=${visitor.name}&email=${visitor.email}&address=${visitor.address}&gender=${visitor.gender}&mobileNo=${visitor.mobileNo}&purpose=${visitor.purpose}&remarks=${visitor.remarks}&date_and_time=${visitor.date_and_time}`}>Edit</Link>
                      <button className='border px-5 py-0.5 rounded bg-red-700 text-white cursor-pointer' type='button' 
                      onClick={() => VisitorDeleted(visitor._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
