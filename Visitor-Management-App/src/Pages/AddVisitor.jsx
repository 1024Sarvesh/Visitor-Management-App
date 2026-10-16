import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'

function AddVisitor() {

  const [id, setId] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [mobileNo, setMobileNo] = useState("")
  const [purpose, setPurpose] = useState("")
  const [date_and_time, setDate_and_time] = useState("")
  const [remarks, setRemarks] = useState("")
  const [address, setAddress] = useState("")


  const Navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const ResetForm = () => {
    setName("");
    setAddress("");
    setEmail("");
    setDate_and_time("");
    setGender("");
    setMobileNo("");
    setPurpose("");
    setRemarks("");
  }



  const HandleForm = async (e) => {
    e.preventDefault()
    console.log("Form Submitted")


    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());


    if (id) {
      const res = await fetch(`http://127.0.0.1:5000/visitors/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)

      })

      const Data = await res.json()
      console.log(Data)
        alert("Visitor Updated Successfully")
        ResetForm()
        Navigate("/")

    } else {
      const res = await fetch("http://127.0.0.1:5000/visitors", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)

      })
      const Data = await res.json()
        alert("Visitor Added Successfully")
        ResetForm()
        Navigate("/")
    }

  }


  useEffect(() => {
    setId(searchParams.get("id"))
    setName(searchParams.get("name"))
    setEmail(searchParams.get("email"))
    setAddress(searchParams.get("address"))
    setGender(searchParams.get("gender"))
    setPurpose(searchParams.get("purpose"))
    setMobileNo(searchParams.get("mobileNo"))
    setRemarks(searchParams.get("remarks"))
    const dateTime = searchParams.get("date_and_time");

    setDate_and_time(
      dateTime ? dateTime.slice(0, 16) : ""
    );

  }, [])

  return (
    <>
      <section className='bg-gray-100 '>

        <Link className='bg-gray-100' to="/">Back to Home</Link>
        <div className="bg-gray-100 flex items-center justify-center p-4 ">
          <div className=" bg-white rounded-2xl shadow-lg p-6 text-4:p-8 sm:w-116 md:min-w-xl max-w-xl lg:min-w-xl max-w-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center sm:w-96 md:w-full lg:w-full">
              Create Visitor Form
            </h2>

            <form className='space-y-5' onSubmit={HandleForm}>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  />
                </div>

                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  />
                </div>

                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    required
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value)
                    }}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNo"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={mobileNo}
                    onChange={(e) => {
                      setMobileNo(e.target.value)
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  />
                </div>

                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Purpose
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={purpose}
                    onChange={(e) => {
                      setPurpose(e.target.value)
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  />
                </div>

                <div>
                  <label className="block text-4 font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="date_and_time"
                    value={date_and_time}
                    onChange={(e) => {
                      setDate_and_time(e.target.value)
                    }}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-4 font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value)
                  }}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                />
              </div>

              <div>
                <label className="block text-4 font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value)
                  }}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none sm:w-96 md:w-full lg:w-full"
                />
              </div>

              <div className="flex flex-col text-4:flex-row gap-3 pt-2 sm:w-96 md:w-full lg:w-full">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white cursor-pointer"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    ResetForm()
                  }}
                  className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddVisitor