import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';

export default function CarouselEmployer() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src='/images/employer-1.png' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/employer-2.png' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/employer-3.jpg' />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  )
}