export default function StarCounter({rating}){
    const stars = []
    const fullStars = Math.floor(rating)
    const halfStars = (rating - Math.floor(rating)) >= 0.5

    for(let i = 0; i < fullStars; i++){
      stars.push( <i key={`full-star-${i}`} className="bi bi-star-fill text-warning"></i>)  
    }
    if(halfStars){
      stars.push( <i key={`half-star-1`} className="bi bi-star-half text-warning"></i>)
    }
    const starRating = stars.map((star) => {
      return(
        star
      )
    })

    return(
      <span className="d-flex">
        {starRating}
      </span>
    )
  }