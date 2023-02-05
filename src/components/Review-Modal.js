import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ReactStars from "./Star-Rateing";
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { reviewsApi } from "../rest/ReviewListApi";
import ModalHeader from "react-bootstrap/esm/ModalHeader";








export default function ReviewModal(props) {
  const [show, setShow] = useState(false);
  const REVIEWS_ENDPOINT =
    "https://63bb0bcecf99234bfa50f42b.mockapi.io/movieReviews";
  const [showEdit, setShowEdit] = useState(false);
  const [postName, setPostName] = useState("");
  const [postInfo, setPostInfo] = useState("");
  const [postStarRating, setPostStarRating] = useState(0);
  const [putNameEdit, setPutNameEdit] = useState("");
  const [putInfoEdit, setPutInfoEdit] = useState("");
  const [putStarEdit, setPutStarEdit] = useState("");
  const [reviewList, setReviewList] = useState([
    {
      id: 1,
      name: 'Geordan',
      info: 'This movie was a highlight of my childhood I spent all my time as a kid watching these movies and really enjoyed them as a child.',
      star: '5★',
    },
    {
      id: 2,
      name: 'Courtney',
      info: 'This movie was a wonder',
      star: '4.5★',
    }
  ]);

  // useEffect(() => {
  //   console.log("putNameEdit", putNameEdit);
  //   console.log("PostName", postName);
  // })

  useEffect(() => {
    getReviews()
  }, []);

  async function getReviews() {
    reviewsApi.get()
      .then((data) => {
        setReviewList(data)
        // console.log(data)
      })
  }

  const post = async () => {
    try {
      const resp = await fetch(`${REVIEWS_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: postName,
          info: postInfo,
          star: postStarRating + "★",
        }),
      });
      await getReviews()
      setPostName("")
      setPostInfo("")
      setPostStarRating(0)
      return await resp.json();
    } catch (e) {
      console.log("Posting had an issue");
    }
    // console.log(reviewList)
  };
  
  const put = async (review) => {
    console.log(review)
    try {
      const resp = await fetch(`${REVIEWS_ENDPOINT}/${review}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: putNameEdit,
          info: putInfoEdit,
          star: putStarEdit + "★",
        }),
      });
      await getReviews()
      setPutNameEdit("")
      setPutInfoEdit("")
      setPutStarEdit("")
      return await resp.json();
    } catch (e) {
      console.log("Updated Reviews had an issue")
    };
  }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);



    const ratingChanged = (newRating) => {
      console.log(newRating);
      setPostStarRating(newRating);
    };
  const ratingEdited = (newRating) => {
    console.log(newRating);
    setPutStarEdit(newRating);
  };


  
    const deleteReview =  (reviewId)  => {
      console.log(reviewId)
       reviewsApi.delete(reviewId)
       getReviews();
    };



    //TODO This function builds all the reviews that are going to be displayed
    function AllReviews() {
      const itemList = () =>
        reviewList.map((review, index) => (
          
          <div key={index}>
            <ListGroup>
              <ListGroupItem>{`${review.name}`}</ListGroupItem>
              <ListGroupItem> {`${review.info}`}</ListGroupItem>
              <ListGroupItem>{`${review.star}`}</ListGroupItem>
              <Button key={review.id} onClick={ handleShowEdit }>Edit</Button>
              <Button variant="danger" onClick={() => deleteReview(review.id)}>Delete</Button>
              
            </ListGroup>
            <Modal key={review.id} variant="success" show={showEdit} onHide={handleCloseEdit}>
              <ModalHeader closeButton>
                <Modal.Title>Edit review for {`${review.name}`}</Modal.Title>
              </ModalHeader>
              <Modal.Body>
                <Form id="reviewForm">
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) => setPutNameEdit(e.target.value)}
                      type="text"
                      placeholder="Name"
                      value={putNameEdit}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-4"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Write your review here"
                      onChange={(e) => setPutInfoEdit(e.target.value)}
                      value={putInfoEdit}
                    />

                    <ReactStars count={5} size={28} onSubmit={ratingEdited} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button  variant="primary" onClick={() => put(review.id)}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
            </div>
        
        ));
      
      
      
    

      return (
        <div>
          {itemList()}
        </div>
      );
    }









    //TODO This is my entire Modal to enter a review
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Movie Reviews
        </Button>

        <Modal  show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review Form for {props.movieTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="reviewForm">
              <Form.Group className="mb-3">
                <Form.Control value={postName} onChange={(e) => setPostName(e.target.value)} type="text" placeholder="Name" />
              </Form.Group>
              <Form.Group
                className="mb-4"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your review here"
                  onChange={(e) => setPostInfo(e.target.value)}
                  value={postInfo}
                />

                <ReactStars count={5} size={28} onChange={ratingChanged} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={post}>
              Submit Review
            </Button>
          </Modal.Footer>
          <h3 className="text-center">
            <b><strong>Reviews</strong></b>
          </h3>
          <div id="this one">
            <AllReviews key={reviewList.id} />
          </div>
        </Modal>
      </>
    );

  }

