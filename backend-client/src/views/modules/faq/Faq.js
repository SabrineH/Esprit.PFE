import React, { useState } from "react"
import Moment from "react-moment"
import { useHistory } from "react-router-dom"
import Button from "reactstrap/lib/Button"
import Card from "reactstrap/lib/Card"
import CardBody from "reactstrap/lib/CardBody"
import CardHeader from "reactstrap/lib/CardHeader"
import Col from "reactstrap/lib/Col"
import Row from "reactstrap/lib/Row"
import { CustomModal } from "views/components/custom"
import { queryApi } from "../../../utils/queryApi"

export function Faq({ currentUser, faq, setFaqs }) {
  const [modal, setModal] = useState({ isOpen: false, title: "", body: "", confirmBtnTxt: "" })
  const history = useHistory()

  function handleDetailsRedirect() {
    history.push("/faq/details/" + faq._id)
  }

  function handleEditRedirect() {
    history.push("/faq/update/" + faq._id)
  }

  // *************************************************************
  async function handleDelete() {
    const onConfirm = async () => {
      const [, err] = await queryApi("faq/" + faq._id, null, "DELETE")
      if (!err) setFaqs(faqs => faqs.filter(c => c._id !== faq._id))
    }

    // show delete confirmation modal
    setModal({
      isOpen: true,
      title: "Suppression faq",
      body: `Veuillez confirmer la suppression du faq : <b>${faq.question}</b>.`,
      confirmBtnTxt: "Supprimer",
      onConfirm,
    })
  }

  function handleAbortModal() {
    setModal({ isOpen: false })
  }

  return (
    <>
      <CustomModal {...modal} onAbort={handleAbortModal} />
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{faq.question.length > 41 ? faq.question.substr(0, 41) + "..." : faq.question}</b>
          </CardHeader>
          <CardBody>
            <p>
              Publié le
              <b>
                <Moment date={faq.createdAt} format=" dddd, Do MMMM  YYYY à hh:mm" locale="fr" />
              </b>
            </p>
            <hr className="my-2" />
            <Row>
              <Col>
                <Button block color="primary" onClick={handleDetailsRedirect}>
                  Détails
                </Button>
              </Col>
              {(currentUser.roles.includes("updateFaq") || currentUser.roles.includes("admin")) && (
                <Col>
                  <Button block color="warning" onClick={handleEditRedirect}>
                    Modifier
                  </Button>
                </Col>
              )}
              {(currentUser.roles.includes("deleteFaq") || currentUser.roles.includes("admin")) && (
                <Col>
                  <Button block color="danger" onClick={handleDelete}>
                    Supprimer
                  </Button>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}
