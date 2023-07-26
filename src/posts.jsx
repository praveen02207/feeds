import React, { useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CommentModel from "./comment";
import "./post.css";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const unlikeStyles = { color: "black", fontSize: "24px" };
const likeStyle = { color: "red", fontSize: "24px" };
const fontStyles = { color: "black", fontSize: "19px" };

const fStyle = { color: "black", fontSize: "20px" };

const NewPosts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loggeduser, setLoggeduser] = useState([]);
  const [CommandInput, setCommandInput] = useState("");

  useEffect(() => {
    const dataFromLocal = JSON.parse(localStorage.getItem("newpost"));
    if (dataFromLocal) {
      setData(dataFromLocal);
    } else {
      setData([]);
    }
  }, []);

  // getting data from local to display posts
  useEffect(() => {
    const loggedUserFromLocal = JSON.parse(
      localStorage.getItem("loggedinuser")
    );
    setLoggeduser(loggedUserFromLocal);
  }, []);

  const handleDeletePost = (id) => {
    const filterPost = data.filter((item) => {
      return item.id !== id;
    });

    setData(filterPost);
    localStorage.setItem("newpost", JSON.stringify(filterPost));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedinuser");
    setLoggeduser([]);
    navigate("/login");
  };

  // comments section
  const handleCommend = (clickedId) => {
    const updatedUser = data.map((item) => {
      if (item.id === clickedId) {
        return {
          ...item,
          commendsArray: [
            ...item.commendsArray,
            {
              id: new Date().valueOf(),
              comment: CommandInput,
              userName: logUserName.length > 0 ? logUserName[0] : "",
            },
          ],
        };
      } else {
        return item;
      }
    });

    setData(updatedUser);
    localStorage.setItem("newpost", JSON.stringify(updatedUser));
    setCommandInput(" ");
  };

  const handleDeleteComment = (postId, commentId) => {
    const updatedData = data.map((item) => {
      if (item.id === postId) {
        const updatedCommentsArray = item.commendsArray.filter(
          (comment) => comment.id !== commentId
        );
        return { ...item, commendsArray: updatedCommentsArray };
      } else {
        return item;
      }
    });

    setData(updatedData);
    localStorage.setItem("newpost", JSON.stringify(updatedData));
  };

  // logged user name to display name in comment username
  const logUserName = loggeduser.map((item, index) => {
    return item.userName;
  });

  // like section
  const handleLikeToggle = (id) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,

          likes: item.isLiked
            ? parseInt(item.likes) - 1
            : parseInt(item.likes) + 1,
          isLiked: !item.isLiked,
        };
      }
      return item;
    });

    setData(updatedData);
    localStorage.setItem("newpost", JSON.stringify(updatedData));
  };

  return (
    <>
      <div className="container-fluid my-5  main">
        <div className="row">
          <div className="col-md-3 mt-5">
            {loggeduser && loggeduser.length > 0 ? (
              loggeduser.map((item, index) => (
                <div key={index} className="border shadow p-3">
                  <h3>login details</h3>
                  <p>
                    <strong>user id :</strong> {item.id}
                  </p>
                  <p>
                    <strong>user name :</strong> {item.userName}
                  </p>
                  <button className="btn btn-primary" onClick={handleLogout}>
                    log out
                  </button>
                </div>
              ))
            ) : (
              <p>{navigate("/login")}</p>
            )}
          </div>
          <div className="col-md-5 mt-5  px-md-5 ">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                  <section className="postContent  p-3  mb-5 border ">
                    {/* user name */}
                    <div className="container  ">
                      <div className="row px-0 ">
                        <div className="col col-md-8  px-0 ">
                          <div className="head d-flex">

                            {item.image ? (
                              <>
                                <img
                                  src={item.image}
                                  alt="img"
                                  height={50}
                                  width={50}
                                  className="rounded-circle"
                                />
                                <p className="mt-2">
                                  <strong className="ms-2">
                                    {item.userName}
                                  </strong>
                                </p>
                              </>
                            ) : (
                              <p className="mt-2">
                                <strong className="ms-2">
                                  {item.userName}
                                </strong>
                              </p>
                            )}
                          </div>
                        </div>

                        <div className=" col col-md-4 col-xs-3 px-0 mt-3">
                          <RiDeleteBin5Fill
                            style={fStyle}
                            className="float-end"
                            onClick={() => handleDeletePost(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* image feed */}
                      
                    <div className="h-25 mt-2">
                      <img
                        src={item.image}
                        alt="add your image" 
                        className="img-fluid rounded text-secondary"
                        // height={50}
                      ></img>
                    </div>

                    {/* post content */}
                    <div>
                      <p>{item.postContent}</p>
                    </div>

                    {/* icons row*/}
                    <div className="d-flex align-items-center">
                      <div className="like">
                        <button
                          onClick={() => handleLikeToggle(item.id)}
                          className="border-0 bg-white  "
                          id="like"
                        >
                          {item.isLiked ? (
                            <AiFillHeart style={likeStyle} />
                          ) : (
                            <FaRegHeart style={unlikeStyles} />
                          )}
                        </button>
                      </div>

                      <CommentModel user={item.userName} />
                      <FaRegPaperPlane style={fontStyles} id="like" />
                    </div>

                    {/* likes */}
                    <div>
                      <p>{item.likes} likes</p>
                    </div>

                    {/* Display Comments */}
                    {item.commendsArray &&
                      item.commendsArray.map((comment) => (
                        <div
                          key={comment.id}
                          className="d-flex align-items-center"
                        >
                          <p className="mb-0">
                            <strong>{comment.userName}</strong>{" "}
                            {comment.comment}
                          </p>
                          {logUserName[0] === comment.userName && (
                            <button
                              className="btn btn-sm  ms-auto border-0 "
                              onClick={() =>
                                handleDeleteComment(item.id, comment.id)
                              }
                            >
                              <RiDeleteBin5Fill style={fStyle} />
                            </button>
                          )}
                        </div>
                      ))}

                    {/* comments */}

                    <div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control "
                          placeholder="add a comment..."
                          onChange={(e) => setCommandInput(e.target.value)}
                          value={CommandInput}
                        />
                        <button
                          className="input-group-text  text-info fw-bold border-0 bg-white"
                          onClick={(e) => handleCommend(item.id)}
                        >
                          post
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              ))
            ) : (
              <p>No posts Yet...</p>
            )}
          </div>
          <div className="col-md-3 mt-5  ">
            <button
              className="btn btn-success"
              onClick={() => navigate("/addform")}
            >
              Add new post+
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPosts;
