


const REVIEWS_ENDPOINT = "https://63bb0bcecf99234bfa50f42b.mockapi.io/movieReviews";

class MovieReviewListApi {
    get = async () => {
        try {
            const resp = await fetch(REVIEWS_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.log("Movie Reviews List had issues");
        }
    }

    delete = async (movieReviews) => {
        console.log(movieReviews);
        try {
            const resp = await fetch(`${REVIEWS_ENDPOINT}/${movieReviews}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
            return await resp.json();
        } catch (e) {
            console.log("Delete had an issue")
        }
    }
}
export const reviewsApi = new MovieReviewListApi();