import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';

export default function CarouselHomepage() {
  return (
    <MDBCarousel showIndicators showControls>
      <MDBCarouselInner>
        <MDBCarouselItem className='active'>
          <MDBCarouselElement src='/images/verifiable_credentials.png' />
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/holder.jpg' />
          <MDBCarouselCaption>
            <h5>Holder</h5>
            <p>Manages credentials; Uses them to create presentations of proof for Verifiers</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/issuer.jpg' />
          <MDBCarouselCaption>
            <h5>Issuer</h5>
            <p>Digitally signs attestations; Packages and gives cred to Holder</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem>
          <MDBCarouselElement src='/images/verifier.jpg' />
          <MDBCarouselCaption>
            <h5>Verifier</h5>
            <p>Requets proof; Verifies that issuer attestations satisfy the requirements</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  )
}