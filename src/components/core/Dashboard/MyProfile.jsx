
import { useSelector } from "react-redux"
import { Pencil, Mail, Phone, Calendar, Shield, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"



function MyProfile() {
  const {user} = useSelector((state) => state.profile)
 
  const navigate = useNavigate()

  return (
    <div className="h-full w-full bg-richblack-700">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-white">Profile</h1>
                <p className="text-gray-200 mt-1">Manage your personal information and preferences</p>
              </div>

              <button
                onClick={() => navigate("/dashboard/edit-profile")}
                className="inline-flex items-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="p-8 text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
                      <img className=" rounded-full" alt="image" src={user.image}/>
                   </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-slate-900 mt-4">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-slate-600 mt-1">{user?.email}</p>

                <div className="flex items-center justify-center mt-4">
                  <div className="flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Account
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 p-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-600">{user?.email}</span>
                  </div>
                  {user?.additionalDetails?.contactNumber && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-slate-400 mr-3" />
                      <span className="text-slate-600">{user?.user?.additionalDetails?.contactNumber}</span>
                    </div>
                  )}
                  {user?.additionalDetails?.dob && (
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-slate-400 mr-3" />
                      <span className="text-slate-600">{user?.additionalDetails?.dob}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-xs text-slate-600 mt-1">Profile Complete</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="flex items-center justify-center text-2xl font-bold text-emerald-600">
                  <Star className="h-5 w-5 mr-1" />
                  5.0
                </div>
                <div className="text-xs text-slate-600 mt-1">User Rating</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-2xl border border-slate-200">
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">About</h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed">
                      {user?.additionalDetails?.about ||
                        "I'm a dedicated professional with a passion for innovation and continuous learning. I believe in creating meaningful connections and delivering exceptional results in everything I do. My approach combines technical expertise with creative problem-solving to drive success."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-2xl border border-slate-200">
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">First Name</label>
                        <div className="text-slate-900 font-medium">{user?.firstName}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Email Address</label>
                        <div className="text-slate-900 font-medium">{user?.email}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Gender</label>
                        <div className="text-slate-900 font-medium">
                          {user?.additionalDetails?.gender || "Not specified"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Last Name</label>
                        <div className="text-slate-900 font-medium">{user?.lastName}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Phone Number</label>
                        <div className="text-slate-900 font-medium">
                          {user?.additionalDetails?.contactNumber || "Not provided"}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-500 mb-2">Date of Birth</label>
                        <div className="text-slate-900 font-medium">
                          {user?.additionalDetails?.dob || "Not provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="bg-white rounded-2xl border border-slate-200">
                <div className="p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Account Security</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                          <Shield className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Account Verified</div>
                          <div className="text-sm text-slate-600">Your account has been verified and is secure</div>
                        </div>
                      </div>
                      <div className="flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Active
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">Email Notifications</div>
                          <div className="text-sm text-slate-600">Receive updates about your account</div>
                        </div>
                      </div>
                      <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        Enabled
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
