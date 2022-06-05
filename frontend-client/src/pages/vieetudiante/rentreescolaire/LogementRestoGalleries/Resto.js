import { Container, Row } from "react-bootstrap"
import React, { Component } from "react"
import OwlCarousel from "react-owl-carousel"
import Lightbox from "react-image-lightbox"

const images = [
  require("../../../../assets/img/resto1.jpg"),
  require("../../../../assets/img/resto2.png"),
  require("../../../../assets/img/resto3.jpg"),
]

const smallImages = [
  require("../../../../assets/img/resto1.jpg"),
  require("../../../../assets/img/resto2.png"),
  require("../../../../assets/img/resto3.jpg"),
]

export default class Resto extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIndex: 0,
      isOpen: false,
    }
  }

  render() {
    const { photoIndex, isOpen } = this.state
    return (
      <>
        <section id="works" className="our-works">
          {/* <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 text-center">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <div className="section-title">
                                        <h2>{this.props.sectionTitle}</h2>
                                        <p>{this.props.sectionDescription}</p>
                                        <span className="section-title-bg">
                                            {this.props.SectionbgTitle}
                                        </span>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div> */}

          <Container>
            <div className="mdb-lightbox no-margin">
              <Row>
                <OwlCarousel>
                  <div className="col-md-12 col-lg-12">
                    <div className="work-details">
                      <figure>
                        <img src={smallImages[0]} alt="Restaurant Esprit" className="img-fluid" />
                        <div className="box-content">
                          <ul className="icon">
                            <li>
                              <span
                                href="ll"
                                onClick={() => this.setState({ photoIndex: 0, isOpen: true })}
                                className="popup-btn">
                                <i className="icofont-search-2" />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <div className="work-details">
                      <figure>
                        <img src={smallImages[1]} alt="Restaurant Esprit" className="img-fluid" />
                        <div className="box-content">
                          <ul className="icon">
                            <li>
                              <span
                                href="ll"
                                onClick={() => this.setState({ photoIndex: 1, isOpen: true })}
                                className="popup-btn">
                                <i className="icofont-search-2" />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-12">
                    <div className="work-details">
                      <figure>
                        <img src={smallImages[2]} alt="Restaurant Esprit" className="img-fluid" />
                        <div className="box-content">
                          <ul className="icon">
                            <li>
                              <span
                                href="ll"
                                onClick={() => this.setState({ photoIndex: 2, isOpen: true })}
                                className="popup-btn">
                                <i className="icofont-search-2" />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </figure>
                    </div>
                  </div>
                </OwlCarousel>
              </Row>
            </div>
            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                imageTitle={photoIndex + 1 + "/" + images.length}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )}
          </Container>
        </section>
      </>
    )
  }
}
