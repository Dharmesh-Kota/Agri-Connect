import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <>
      <div className="mt-5">&nbsp;</div>
      <div className="mt-5">&nbsp;</div>
      <MDBFooter
        className="text-center text-lg-start text-muted"
        style={{ backgroundColor: "#f0fff1" }}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-2 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://github.com/Dharmesh-Kota/Agri-Connect"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="youtube" />
            </a>
            <a
              href="https://github.com/Dharmesh-Kota/Agri-Connect"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="instagram" />
            </a>
            <a
              href="https://github.com/Dharmesh-Kota/Agri-Connect"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="linkedin" />
            </a>
            <a
              href="https://github.com/Dharmesh-Kota/Agri-Connect"
              className="me-4 text-reset"
            >
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-4">
            <MDBRow>
              <MDBCol md="3" lg="4" xl="3" className="mx-auto">
                <h6 className="text-uppercase fw-bold">
                  <MDBIcon icon="gem" className="me-3" />
                  TEAM-BLITZ
                </h6>
                <p>
                  Crafted with passion by Team Blitz for{" "}
                  <strong>HackOut-2024</strong>, showcasing our dedication in
                  every detail.
                </p>
              </MDBCol>
              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  DAIICT, INDIA
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  abc@daiict.ac.in
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className="text-center p-2" style={{ backgroundColor: "#b7e4c7" }}>
          <a
            className="text-reset fw-bold"
            href="https://github.com/Dharmesh-Kota/Agri-Connect"
          >
            TEAM-BLITZ
          </a>
        </div>
      </MDBFooter>
    </>
  );
}
