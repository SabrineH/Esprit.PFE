import PropTypes from "prop-types"
import React, { Component } from "react"

export default class Feature extends Component {
  render() {
    //Feature loop start
    const featuredata = this.props.featuresData.map((feature, index) => (
      <div className="col-lg-4 col-md-4" key={index}>
        <div className="single-feature">
          <div className="glyph">
            <i className={feature.icon} />
          </div>
          <h3>{feature.heading}</h3>
          <p>{feature.description}</p>
        </div>
      </div>
    ))
    //Feature loop END
    return (
      <>
        <section className="feature-area">
          <div className="container">
            <div className="row">{featuredata}</div>
          </div>
        </section>
      </>
    )
  }
}

//Props Types
Feature.propTypes = {
  featuresData: PropTypes.array,
}

//Default Props
Feature.defaultProps = {
  featuresData: [
    {
      icon: "icofont-responsive",
      heading: "Beautiful Designs",
      description:
        "We strive to embrace and drive change in our industry which allows us to keep our clients relevant.",
    },
    {
      icon: "icofont-brand-mercedes",
      heading: "Unique Features",
      description:
        "We strive to embrace and drive change in our industry which allows us to keep our clients relevant.",
    },
    {
      icon: "icofont-live-support",
      heading: "Reliable Support",
      description:
        "We strive to embrace and drive change in our industry which allows us to keep our clients relevant.",
    },
  ],
}
