import AvFeedback from "availity-reactstrap-validation/lib/AvFeedback"
import AvForm from "availity-reactstrap-validation/lib/AvForm"
import AvGroup from "availity-reactstrap-validation/lib/AvGroup"
import AvInput from "availity-reactstrap-validation/lib/AvInput"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "reactstrap/lib/Button"
import Card from "reactstrap/lib/Card"
import CardBody from "reactstrap/lib/CardBody"
import CardFooter from "reactstrap/lib/CardFooter"
import CardHeader from "reactstrap/lib/CardHeader"
import Col from "reactstrap/lib/Col"
import CustomInput from "reactstrap/lib/CustomInput"
import FormGroup from "reactstrap/lib/FormGroup"
import Label from "reactstrap/lib/Label"
import Row from "reactstrap/lib/Row"
import { AvButton } from "views/components/AvButton"
import { CustomOptions } from "views/components/custom"
import { timeTableTitles } from "../../../enums/entities.enum"
import { FILE_ERROR, TITLE_NOT_EMPTY, TYPE_NOT_ENUM, VALIDATION_ERROR } from "../../../enums/errors.enum"
import { queryApi } from "../../../utils/queryApi"

export default function AddTimeTable() {
  const history = useHistory()

  const [showLoader, setShowLoader] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    files: [],
  })

  const [error, setError] = useState({
    visible: false,
    errors: {},
    unique: [],
  })

  function handleInputChange(e) {
    const value = e.target.name === "image" || e.target.name === "file" ? e.target.files[0] : e.target.value
    setForm({ ...form, [e.target.name]: value })
    setError({ ...error, visible: false, errors: {} })
  }

  function handleCancel() {
    history.push("/timeTable")
  }

  async function handleSubmit(e) {
    e.persist()

    setShowLoader(true)
    //Add timeTable
    const [, err] = await queryApi("timeTable", form, "POST", true)
    if (err) {
      setShowLoader(false)
      setError({
        visible: true,
        errors: err.errors,
        unique: err.errors?.titleisUnique && [...error.unique, form.title.toLowerCase()],
      })
    } else history.push("/timeTable")
  }

  return (
    <Card>
      <CardHeader>
        <strong>Fichiers utiles : </strong> Ajouter
      </CardHeader>
      <CardBody>
        {error.visible && (
          <Row className="text-danger justify-content-center text-capitalize">
            <h3>{VALIDATION_ERROR}</h3>
          </Row>
        )}
        <AvForm onValidSubmit={handleSubmit}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Type</Label>
            </Col>
            <Col xs="12" md="9">
              <AvGroup>
                <AvInput required type="select" name="title" value={form.title} onChange={handleInputChange}>
                  <option value="">Veuillez choisir le titre/type</option>
                  <CustomOptions options={timeTableTitles} />
                </AvInput>
                <AvFeedback className="text-capitalize">
                  {error.errors?.titleisEnum ? TYPE_NOT_ENUM : TITLE_NOT_EMPTY}
                </AvFeedback>
              </AvGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Fichier</Label>
            </Col>
            <Col xs="12" md="9">
              <CustomInput id="file" type="file" name="file" accept="application/pdf" onChange={handleInputChange} />
              {error.errors?.file && (
                <Row className="text-capitalize text-danger">
                  <p style={{ marginLeft: "1.1em" }}>{FILE_ERROR + error.errors.file}</p>
                </Row>
              )}
            </Col>
          </FormGroup>

          <CardFooter>
            <center>
              <AvButton type="submit" size="lg" color="primary" className={"mr-5"} disabled={showLoader}>
                {showLoader ? <i className="fa fa-spinner fa-spin"></i> : <i className="fa fa-dot-circle-o"></i>}
                Ajouter
              </AvButton>

              <Button type="reset" size="lg" color="danger" onClick={handleCancel}>
                <i className="fa fa-ban"></i> Annuler
              </Button>
            </center>
          </CardFooter>
        </AvForm>
      </CardBody>
    </Card>
  )
}
