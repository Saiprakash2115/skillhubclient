import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
// import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";

const LearnPath = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [addblogslist, setAddblogslist] = useState([]);
  const [addblogslist1, setAddblogslist1] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [institutetypeCounts, setInstitutetypeCounts] = useState({});

  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    fetchblogs();
    fetchblogs1();
    if (token == undefined) {
      navigate("/");
    }
  }, []);

  const fetchblogs1 = async () => {
    const api = "http://localhost:4010/DisplayAllVideos";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk"; // Replace with your actual authentication token

    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data;
      setAddblogslist1(data);

      const institutetypeCounts = {};
      data.forEach((item) => {
        const VideofolderName = item.VideofolderName;
        if (institutetypeCounts[VideofolderName]) {
          institutetypeCounts[VideofolderName] += 1;
        } else {
          institutetypeCounts[VideofolderName] = 1;
        }
      });

      setInstitutetypeCounts(institutetypeCounts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  console.log(institutetypeCounts);

  const fetchblogs = async () => {
    const api = "http://localhost:4010/allAddVideosData";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  //Add Institute

  const [VideofolderName, setVideofolderName] = useState("");

  const [data1, setdata1] = useState([]);

  const AddVideosDetails = {
    VideofolderName: VideofolderName,
  };
  console.log(AddVideosDetails);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (VideofolderName !== "") {
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk", // Replace with your actual token
      };

      const AddVideosDetails = {
        VideofolderName: VideofolderName,
      };

      axios
        .post("http://localhost:4010/AddVideoPath", AddVideosDetails, {
          headers,
        })
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            toast.success("Video Folder Created Successfully", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(function () {}, 3000);
            fetchblogs();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.warning("Video path with the same name already exists", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            console.log(error.message);
          }
        });
    } else {
      toast.warning("Enter the Required Details");
    }
  };

  console.log(data1);

  const handleDelete = async (id) => {
    try {
      if (!id) {
        setError("Invalid ID provided for deletion.");
        return;
      }
      console.log("Deleting institute with ID:", id);
      const response = await axios.delete(
        "http://localhost:4010/deleteVideo/" + id
      );
      if (response.status === 200) {
        toast.success("Success: Institute deleted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        fetchblogs();

        const updatedListLength = addblogslist.length - 1;
        console.log("Updated list length:", updatedListLength);
      } else {
        console.log(response.data);
        alert("Error: " + response.data);
        setError("An error occurred while deleting the institute.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the institute.");
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };
  const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

  const toggleInstitutions = () => {
    setIsInstitutionsOpen(!isInstitutionsOpen);
  };
  const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

  const toggleInstitutions1 = () => {
    setIsInstitutionsOpen1(!isInstitutionsOpen1);
  };
  const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

  const toggleInstitutions2 = () => {
    setIsInstitutionsOpen2(!isInstitutionsOpen2);
  };

  // Corporate Office
  return (
    <div>
      <div className="container1">
        <div className="row">
          <div className=" mt-1">
            <div className="row">
              <div className=" col-12 col-md-2 sectioncard121">
                <div className={`sidebar ${isOpen ? "open" : ""}`}>
                  <div class="logo_details">
                    <div class="logo_name">
                      <img src={sideimage} alt="logo" width="125px" />
                    </div>
                    <i
                      id="btn"
                      onClick={toggleSidebar}
                      className={`bx bx-menu ${
                        isOpen ? "bx-menu-alt-right" : "bx-menu"
                      }`}
                    ></i>
                  </div>
                  <ul class="nav-list">
                    <li>
                      <span class="tooltip">Dashboard</span>
                    </li>
                    <li>
                      <a href="/PerfexHome">
                        <i class="bx bx-grid-alt"></i>
                        <span class="link_name">Dashboard</span>
                      </a>
                      <span class="tooltip">Dashboard</span>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-solid fa-house "></i>

                        <span class="link_name">HomePage</span>
                      </a>
                      <span class="tooltip">HomePage</span>
                    </li>
                    <li onClick={toggleInstitutions}>
                      <a href="#">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <span className="link_name ">
                          Institutions{" "}
                          <i className="fa-solid fa-chevron-down"></i>
                        </span>
                      </a>
                      <span className="tooltip">Institutions</span>
                    </li>
                    {isInstitutionsOpen && (
                      <div>
                        <li className="">
                          <a href="/AdminDashboard">
                            <i className="fa-solid fa-building-columns"></i>{" "}
                            <span
                              className="link_name"
                              style={{ color: "#06f9f9" }}
                            >
                              institutions
                            </span>
                          </a>
                          <span className="tooltip">institutions</span>
                        </li>
                        <li>
                          <a href="/BatchYear">
                            <i class="fa-solid fa-calendar-days"></i>
                            <span className="link_name">Batch Years</span>
                          </a>
                          <span className="tooltip">Batch Years</span>
                        </li>
                        <li>
                          <a href="/Batches">
                            <i className="fa-solid fa-building-columns"></i>
                            <span className="link_name">Batches</span>
                          </a>
                          <span className="tooltip">Batches</span>
                        </li>
                        <li>
                          <a href="/UsersDetails">
                            <i className="fa-solid fa-user"></i>
                            <span className="link_name">Users</span>
                          </a>
                          <span className="tooltip">Users</span>
                        </li>
                        <li>
                          <a href="/SearchOption">
                            <i className="fa-brands fa-searchengin"></i>
                            <span className="link_name">Search Users</span>
                          </a>
                          <span className="tooltip">Search Users</span>
                        </li>
                      </div>
                    )}
                    <li onClick={toggleInstitutions1}>
                      <a href="#">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                        <span className="link_name ">
                          LEARNING PATH{" "}
                          <i className="fa-solid fa-chevron-down"></i>
                        </span>
                      </a>
                      <span className="tooltip">Learning Path</span>
                    </li>
                    {isInstitutionsOpen1 && (
                      <div>
                        <li onClick={toggleInstitutions2}>
                          <a href="#">
                            <i class="fa-solid fa-school"></i>

                            <span className="link_name">Learning Path</span>
                            <i className="fa-solid fa-chevron-down"></i>
                          </a>
                          <span className="tooltip">Learning Path</span>
                        </li>
                        {isInstitutionsOpen2 && (
                          <div>
                            <li>
                              <a href="#">
                                <i class="fa-solid fa-chalkboard"></i>
                                <Link to="/Learn">
                                  <span className="link_name">
                                    Learning Path
                                  </span>
                                </Link>
                              </a>
                              <span className="tooltip">Learning Path</span>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fa-solid fa-video"></i>
                                <span className="link_name "style={{ color: "#06f9f9" }}>Video Folders</span>
                              </a>
                              <span className="tooltip">Video Folders</span>
                            </li>
                            <li>
                              <a href="#">
                                <i class="fa-solid fa-record-vinyl"></i>
                                <span className="link_name">Reports</span>
                              </a>
                              <span className="tooltip">Reports</span>
                            </li>
                          </div>
                        )}

                        <li>
                          <a href="#">
                            <i class="fa-brands fa-accessible-icon"></i>
                            <span className="link_name">Access</span>
                          </a>
                          <span className="tooltip">Access</span>
                        </li>
                      </div>
                    )}
                    <li class="profile">
                      <div class="profile_details">
                        <img src={siva} alt="profile image" />
                        <div class="profile_content">
                          <div class="name">Siva</div>
                          <div class="designation">Admin</div>
                        </div>
                      </div>
                      <i
                        class="bx bx-log-out"
                        id="log_out"
                        onClick={handleLogout}
                      ></i>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-10">
                <div class="">
                  <div className="card section-31 shadow">
                    <div className="d-flex flex-row">
                      <div>
                        <h2 className="mt-2 mx-4 mt-3">Categories</h2>
                      </div>
                      <div className="col-12 col-md-7"></div>

                      <div style={{ marginLeft: "auto" }} class="m-2">
                        {/* <b class="resumeh7 ">+ Add Employment</b> */}
                        <div>
                          {/* <i class="fa-solid fa-pen-to-square iconedit"></i> */}
                          <button
                            style={{ border: "none", backgroundColor: "white" }}
                            className=""
                          >
                            <i
                              type="button"
                              class="material-symbols-outlined mx-3 mt-4"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal23"
                            >
                              edit_square
                            </i>
                            <b class="resumeh7 row mx-3">+Add Video Folder</b>
                          </button>

                          <div class="modal" id="myModal23">
                            <div class="modal-dialog ">
                              <div class="modal-content">
                                {/* <!-- Modal Header --> */}
                                <div class="modal-header">
                                  <h4 class="modal-title">Add Vieo Folder</h4>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                  ></button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div class="modal-body">
                                  <form action="" onSubmit={onSubmitForm}>
                                    <div className="col-12 col-md-6 m-2">
                                      <label className="headingAdd">
                                        Folder Name :
                                      </label>
                                      <br />
                                      <input
                                        type="text"
                                        className="etotal"
                                        style={{ border: "1px solid black" }}
                                        placeholder="Enter Head Name"
                                        onChange={(e) =>
                                          setVideofolderName(e.target.value)
                                        }
                                        value={VideofolderName}
                                      />
                                    </div>
                                    <hr />
                                    <div class=" mt-3">
                                      <button
                                        type="submit"
                                        class="btn text-start"
                                        style={{
                                          backgroundColor: "#a5059d",
                                          color: "white",
                                        }}
                                        data-bs-dismiss="modal1"
                                      >
                                        Create
                                      </button>
                                    </div>
                                  </form>
                                </div>

                                {/* <!-- Modal footer --> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                      />
                      <div className=" col-12 col-lg-12">
                        <div className="table-responsive">
                          <table className="table table-striped text-center">
                            <thead>
                              <tr className="table-dark">
                                <th>S.NO</th>
                                <th>FOLDER NAME</th>
                                <th>VIDEOS</th>

                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {addblogslist.map((blog) => (
                                <tr key={blog.id}>
                                  <td>{blog.Sno}</td>
                                  <td>{blog.VideofolderName}</td>
                                  <td>
                                    <div key={blog.VideofolderName}>
                                      {
                                        institutetypeCounts[
                                          blog.VideofolderName
                                        ]
                                      }
                                    </div>
                                  </td>

                                  <td className="text-center">
                                    <a
                                      href="./ShowData"
                                      style={{ color: "black" }}
                                    >
                                      <Link
                                        to={`/VideoPage/${blog.VideofolderName}`}
                                      >
                                        <span
                                          class="material-symbols-outlined  mx-1 p-1"
                                          style={{
                                            color: "black",
                                            backgroundColor: "orange",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          videocam
                                        </span>
                                      </Link>
                                    </a>

                                    <button
                                      style={{
                                        border: "none",
                                        backgroundColor: "white",
                                      }}
                                    >
                                      <Link
                                        to={`/VideoFolderUpdatePage/${blog._id}`}
                                      >
                                        <span
                                          type="button"
                                          className="material-symbols-outlined mx-1 p-1"
                                          style={{
                                            color: "black",
                                            backgroundColor: "pink",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          edit_square
                                        </span>
                                      </Link>
                                    </button>

                                    {/* <button
                                      className="material-symbols-outlined mx-1 p-1"
                                      type="submit"
                                      style={{
                                        backgroundColor: "red",
                                        border: "none",
                                        borderRadius: "5px",
                                      }}
                                      onClick={() => handleDelete(blog._id)}
                                    >
                                      delete
                                    </button> */}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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
    </div>
  );
};

export default LearnPath;
