import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';

export default function CarouselInsurance() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src='/images/insurance-1.jpg' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/insurance-2.jpg' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/insurance-3.jpg' />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  )
}