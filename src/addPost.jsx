import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const PostForm = () => {
  const [loggeduser, setLoggeduser] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // form onchange values
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const navigate = useNavigate();

  // adding local storage value to initial state value for newpost
  const fromLocal = () => {
    const data = localStorage.getItem("newpost");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };
  const [userPost, setUserPost] = useState(fromLocal());

  // form submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const postDetail = {
        id: userPost.length + 1 || "",
        userName: logUserName.length > 0 ? logUserName[0] : "",
        postContent: inputs.postContent || "",
        likes: "0" || "",
        commendsArray: [],
        image:selectedImage,
        
       
      };

      setUserPost([...userPost, postDetail]);
      setInputs({});
     
    
    }
  };

  // Adding form values into local storage
  useEffect(() => {
    localStorage.setItem("newpost", JSON.stringify(userPost));
  }, [userPost]);

  // form validation
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let valid = true;
    let error = {};
    if (!inputs.postContent) {
      valid = false;
      error["postContent"] = "Please enter your post content!";
    }

    setErrors(error);
    return valid;
  };

  // my login details
  useEffect(() => {
    const loggedUserFromLocal = JSON.parse(
      localStorage.getItem("loggedinuser")
    );
    setLoggeduser(loggedUserFromLocal);
  }, []);

  // my login user array
  const logUserName = loggeduser.map((item, index) => {
    return item.userName;
  });


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('wg',file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      
    }
  };

 

  return (
    <>
      <div className="container  pt-5 mt-5 m-3  ">
        <div className="row">
          <div className=" col-md-4"></div>
          <div className="  col-md-5 border bg-white shadow  my-5 py-4 ">
            <h2 className="row justify-content-center">Create your post</h2>
            <form onSubmit={handleSubmit} className="mt-5 ">
              <div className="mb-3">
                <label className="form-label">Post Content</label>

                <textarea
                  className="form-control"
                  placeholder="type your content..."
                  name="postContent"
                  value={inputs.postContent || ""}
                  onChange={handleChange}
                />

                {errors.postContent && (
                  <div className="text-danger"> {errors.postContent}</div>
                )}
              </div>

              <div className="image">
                <input
                  type="file"
                  name="myImage"
                  onChange={handleImageChange}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Add post
                </button>
              </div>

              <button
                className="btn btn-dark"
                onClick={() => navigate("/posts")}
              >
                back to feed
              </button>
            </form>
          </div>
        </div>


        
      </div>
    </>
  );
};

export default PostForm;
