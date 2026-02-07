import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/core/HomePage/common/Navbar";
import LoginForm from "./components/core/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/core/auth/OpenRoute";
import SignupForm from "./components/core/auth/SignupForm";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/core/auth/ProtectedRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EditProfile from "./components/core/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import CourseInfo from "./components/core/addcourses/CourseInfo";
import CreateSection from "./components/core/addcourses/CreateSection";
import SectionInfo from "./components/core/addcourses/SectionInfo";
import { CourseProvider } from "./providers/CourseProvider";
import { Outlet } from "react-router-dom";
import CreateSubsection from "./components/core/addcourses/CreateSubsection";
import UpdateSubSection from "./components/core/updatecourses/UpdateSubSection";
import MyCourses from "./components/core/Dashboard/MyCourses";
import ViewCourse from "./components/core/addcourses/ViewCourse";
import AllCoursesHomePage from "./components/core/HomePage/AllCoursesHomePage";
import BuyCourse from "./components/core/HomePage/BuyCourse";
import ErrorBoundary from "./error/ErrorBoundary";
import Footer from "./components/core/HomePage/common/Footer";
import ChatRoom from "./components/core/ChatRoomPages/ChatRoom";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import DashBord from "./pages/DashBord";
import Setting from "./pages/Setting";

function App() {
  return (
    <div className="w-screen h-screen  flex flex-col bg-richblack-900">
      <div className="w-full h-[10%] pb-4 pt-4">
        <Navbar />
      </div>
      <ErrorBoundary>
        <div className="w-full h-full overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <LoginForm />
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <SignupForm />
                </OpenRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />
            <Route
              path="/update-password/:token"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />

            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/catalog/:type" element={<AllCoursesHomePage />} />
            <Route path="/buy-course/:courseid" element={<BuyCourse />} />

            <Route
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard/my-profile" element={<MyProfile />} />
              <Route path="/dashboard/edit-profile" element={<EditProfile />} />
              <Route path="/dashboard/chat" element={<ChatRoom />} />
              <Route path="/dashboard/instructor" element={<DashBord />} />
              <Route path="/dashboard/settings" element={<Setting />} />
              <Route
                element={
                  <CourseProvider>
                    <Outlet />
                  </CourseProvider>
                }
              >
                <Route path="/dashboard/add-course" element={<CourseInfo />} />
                <Route
                  path="/dashboard/sectioninfo/:courseid"
                  element={<SectionInfo />}
                />
                <Route
                  path="/dashboard/create-section"
                  element={<CreateSection />}
                />
                <Route
                  path="/dashboard/create-subsection"
                  element={<CreateSubsection />}
                />
                <Route
                  path="/dashboard/update-subsection"
                  element={<UpdateSubSection />}
                />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route
                  path="/dashboard/view-course/:courseid"
                  element={<ViewCourse />}
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
