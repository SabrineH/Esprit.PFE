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
import FormText from "reactstrap/lib/FormText"
import Input from "reactstrap/lib/Input"
import Label from "reactstrap/lib/Label"
import Row from "reactstrap/lib/Row"
import { AvButton } from "views/components/AvButton"
import { CustomOptions } from "views/components/custom"
import { unitTypes } from "../../../enums/entities.enum"
import {
  FIELD_NOT_EMPTY,
  FILE_ERROR,
  TITLE_LENGTH,
  TITLE_NOT_EMPTY,
  TITLE_UNIQUE,
  TYPE_NOT_EMPTY,
  TYPE_NOT_ENUM,
  VALIDATION_ERROR,
} from "../../../enums/errors.enum"
import { queryApi } from "../../../utils/queryApi"

export default function AddUnit() {
  const history = useHistory()

  const [showLoader, setShowLoader] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    videoUrl: "",
    modules: [],
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
    history.push("/unit")
  }

  async function handleSubmit(e) {
    e.persist()

    setShowLoader(true)
    const [, err] = await queryApi("unit", form, "POST", true)
    if (err) {
      setShowLoader(false)
      setError({
        visible: true,
        errors: err.errors,
        unique: err.errors?.titleisUnique && [...error.unique, form.title.toLowerCase()],
      })
    } else history.push("/unit")
  }

  function checkError() {
    if (error.errors?.titlelength) return TITLE_LENGTH
    return TITLE_NOT_EMPTY
  }

  /*
   * Call this function in validate : {{here}}
   * returns false if value is valid
   * else return true when field MUST be validated
   */
  const checkUniqueness = error.errors?.titleisUnique && error.unique.includes(form.title.toLowerCase())
  function nameIsUnique(value) {
    // if (!value) return true // required replaces it !
    return (!checkUniqueness && error.errors?.titlelength) ?? true
  }

  function handleModulesChange(e, idx) {
    const newModules = form.modules
    newModules[idx].title = e.target.value
    setForm({ ...form, modules: newModules })
  }

  function handleModulesSubjectChange(e, idx, idxsub, field) {
    const newModules = form.modules
    if (field === "title") {
      newModules[idx].subjects[idxsub].title = e.target.value
    } else {
      newModules[idx].subjects[idxsub].ects = parseFloat(e.target.value)
    }
    setForm({ ...form, modules: newModules })
  }

  function addInput() {
    setForm({ ...form, modules: [...form.modules, { title: "", subjects: [] }] })
  }

  function addSubjectInput(idx) {
    const newModules = form.modules
    newModules[idx].subjects.push({ title: "", ects: 1 })
    setForm({ ...form, modules: newModules })
  }

  function deleteInput(idx) {
    const newModules = form.modules
    newModules.splice(idx, 1)
    setForm({ ...form, modules: newModules })
  }

  function deleteSubjectInput(idx, idxsub) {
    const newModules = form.modules
    newModules[idx].subjects.splice(idxsub, 1)
    setForm({ ...form, modules: newModules })
  }

  return (
    <Card>
      <CardHeader>
        <strong>Unit?? d'enseignement : </strong> Ajouter
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
              <Label htmlFor="text-input">Titre</Label>
            </Col>
            <Col xs="12" md="9">
              <AvGroup>
                <AvInput
                  required
                  type="text"
                  name="title"
                  value={form.title || ""}
                  validate={{ nameIsUnique }}
                  onChange={handleInputChange}
                  placeholder="Titre..."
                />
                <AvFeedback className="text-capitalize">
                  {checkUniqueness && TITLE_UNIQUE} {error.errors?.titlelength && checkError()}
                </AvFeedback>
              </AvGroup>

              <FormText color="muted">Titre du module ?? ajouter</FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">Description</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="textarea"
                name="description"
                value={form.description || ""}
                onChange={handleInputChange}
                placeholder="Description..."
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">Url video</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="text"
                name="videoUrl"
                value={form.videoUrl || ""}
                onChange={handleInputChange}
                placeholder="url video..."
              />
              <FormText color="muted">
                Copier seulement la derni??re partie en rouge de l'url EXEMPLE "https://www.youtube.com/watch?v=
                <span style={{ color: "red" }}>QkQapdgAa7o</span>"
              </FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Image</Label>
            </Col>
            <Col xs="12" md="9">
              <CustomInput
                id="image"
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleInputChange}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Fichier</Label>
            </Col>
            <Col xs="12" md="9">
              <CustomInput
                id="file"
                type="file"
                name="file"
                accept="application/pdf,.doc, .docx,.ppt, .pptx"
                onChange={handleInputChange}
              />
              {error.errors?.file && (
                <Row className="text-capitalize text-danger">
                  <p style={{ marginLeft: "1.1em" }}>{FILE_ERROR + error.errors.file}</p>
                </Row>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Unit?? associ??</Label>
            </Col>
            <Col xs="12" md="9">
              <AvGroup>
                <AvInput required type="select" name="type" value={form.type} onChange={handleInputChange}>
                  <option value="">Veuillez choisir l'unit??</option>
                  <CustomOptions options={unitTypes} />
                </AvInput>
                <AvFeedback className="text-capitalize">
                  {error.errors?.typeisEnum ? TYPE_NOT_ENUM : TYPE_NOT_EMPTY}
                </AvFeedback>
              </AvGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3"></Col>
            <Col xs="12" md="9">
              <Button color="info" onClick={e => addInput(e)}>
                Ajouter un module
              </Button>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="text-input">Modules</Label>
            </Col>
            <Col xs="12" md="9">
              {form.modules.map((value, idx) => (
                <Col key={idx} className="module">
                  <Row className="no-margin">
                    <div className="dynamic-input" style={{ width: "100%" }}>
                      <AvGroup>
                        Titre Module:
                        <AvInput
                          required
                          name={"modules" + idx}
                          id={"modules" + idx}
                          placeholder="Titre module"
                          onChange={event => handleModulesChange(event, idx)}
                          value={form.modules[idx].title}
                        />
                        <AvFeedback className="text-capitalize">{FIELD_NOT_EMPTY}</AvFeedback>
                      </AvGroup>
                      <Button color="info" style={{ margin: "0 5px" }} onClick={() => deleteInput(idx)}>
                        Supprimer le module
                      </Button>
                      <Button color="info" onClick={e => addSubjectInput(idx)}>
                        Ajouter une mati??re
                      </Button>
                    </div>
                  </Row>
                  <Row className="no-margin">
                    {form.modules[idx].subjects.map((valuesub, idxsub) => (
                      <div className="dynamic-input" style={{ width: "100%" }} key={idx + "subject" + idxsub}>
                        <AvGroup>
                          <AvInput
                            required
                            name={"modules" + idx + "subject" + idxsub + "title"}
                            id={"modules" + idx + "subject" + idxsub + "title"}
                            placeholder="Titre mati??re"
                            onChange={event => handleModulesSubjectChange(event, idx, idxsub, "title")}
                            value={form.modules[idx].subjects[idxsub].title}
                          />
                          <AvFeedback className="text-capitalize">{FIELD_NOT_EMPTY}</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                          <AvInput
                            required
                            type="number"
                            name={"modules" + idx + "subject" + idxsub + "ects"}
                            placeholder="ects"
                            id={"modules" + idx + "subject" + idxsub + "ects"}
                            style={{ width: "25%" }}
                            onChange={event => handleModulesSubjectChange(event, idx, idxsub, "ects")}
                            value={form.modules[idx].subjects[idxsub].ects}
                          />
                          <AvFeedback className="text-capitalize">{FIELD_NOT_EMPTY}</AvFeedback>
                        </AvGroup>
                        <Button color="info" onClick={() => deleteSubjectInput(idx, idxsub)}>
                          Supprimer la mati??re
                        </Button>
                      </div>
                    ))}
                  </Row>
                </Col>
              ))}
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
